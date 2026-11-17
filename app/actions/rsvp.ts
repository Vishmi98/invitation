"use server";

import { invitation } from "@/content/invitation";
import type { RsvpState } from "@/lib/rsvp";

/** Stops spreadsheet formula injection (cells starting with = + - @). */
function safeCell(value: string): string {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function clean(value: FormDataEntryValue | null, max: number): string {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/**
 * Validates an RSVP and appends it to the Google Sheet via the Apps Script web app
 * configured in RSVP_WEBHOOK_URL (see docs/rsvp-google-sheet.md).
 */
export async function submitRsvp(_prev: RsvpState, formData: FormData): Promise<RsvpState> {
  // Bots fill the hidden "website" field; pretend success and drop the submission.
  if (clean(formData.get("website"), 200)) return { status: "success", attending: "yes" };

  const name = clean(formData.get("name"), 80);
  const attendingRaw = formData.get("attending");
  const errors: { name?: boolean; attending?: boolean } = {};
  if (name.length < 2) errors.name = true;
  if (attendingRaw !== "yes" && attendingRaw !== "no") errors.attending = true;
  if (errors.name || errors.attending) return { status: "error", errors };

  const attending = attendingRaw as "yes" | "no";
  const guestsRaw = Math.trunc(Number(formData.get("guests")));
  const guests =
    attending === "yes" ? Math.min(invitation.rsvp.maxGuests, Math.max(1, Number.isFinite(guestsRaw) ? guestsRaw : 1)) : 0;
  const lang = formData.get("lang") === "en" ? "en" : "si";

  const payload = {
    name: safeCell(name),
    attending,
    guests,
    invitedAs: safeCell(clean(formData.get("invitedAs"), 80)),
    lang,
    submittedAt: new Date().toISOString(),
  };

  const url = process.env.RSVP_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[rsvp] RSVP_WEBHOOK_URL is not set; this reply was NOT saved:", payload);
      return { status: "success", attending };
    }
    console.error("[rsvp] RSVP_WEBHOOK_URL is not configured");
    return { status: "error", errors: { form: true } };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, secret: process.env.RSVP_WEBHOOK_SECRET ?? "" }),
      // Apps Script answers with a redirect to the actual response.
      redirect: "follow",
      cache: "no-store",
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !data?.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (error) {
    console.error("[rsvp] failed to save reply", error);
    return { status: "error", errors: { form: true } };
  }

  return { status: "success", attending };
}
