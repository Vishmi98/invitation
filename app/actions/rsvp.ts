"use server";

import { invitation } from "@/content/invitation";
import type { RsvpState } from "@/lib/rsvp";

/** Apps Script can take several seconds to wake up; past this the guest is asked to try again. */
const WEBHOOK_TIMEOUT_MS = 20_000;

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
  const secret = process.env.RSVP_WEBHOOK_SECRET;
  const problem = !url
    ? "RSVP_WEBHOOK_URL is not set (see docs/rsvp-google-sheet.md)"
    : !secret
      ? "RSVP_WEBHOOK_SECRET is not set (see docs/rsvp-google-sheet.md)"
      : await postToSheet(url, { ...payload, secret });

  // Only thank the guest once the Sheet has confirmed the row. The payload is logged on
  // failure so a lost reply can still be recovered from the server logs.
  if (problem) {
    console.error(`[rsvp] reply NOT saved: ${problem}`, payload);
    return { status: "error", errors: { form: true } };
  }
  return { status: "success", attending };
}

/** Posts the reply to the Apps Script. Returns null once it is saved, otherwise why it wasn't. */
async function postToSheet(url: string, body: Record<string, unknown>): Promise<string | null> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Apps Script runs doPost, then redirects to the JSON it returned.
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
  } catch (error) {
    return error instanceof Error && error.name === "TimeoutError"
      ? `the Google script did not answer within ${WEBHOOK_TIMEOUT_MS / 1000}s`
      : `could not reach the Google script (${error instanceof Error ? error.message : String(error)})`;
  }

  const text = await res.text().catch(() => "");
  let data: { ok?: unknown; error?: unknown } | null = null;
  try {
    data = JSON.parse(text);
  } catch {
    // Not JSON: usually Google's sign-in or error page.
  }

  if (res.ok && data?.ok === true) return null;
  if (data?.error === "unauthorized") {
    return "the Google script rejected the secret; RSVP_WEBHOOK_SECRET must equal SECRET in the script";
  }
  if (data) return `the Google script answered HTTP ${res.status} with error "${String(data.error ?? "unknown")}"`;
  return (
    `the Google script answered HTTP ${res.status} with ${res.headers.get("content-type") ?? "no content type"}, ` +
    `not JSON. Check that RSVP_WEBHOOK_URL is the web app URL ending in /exec and that the deployment's ` +
    `"Who has access" is "Anyone".`
  );
}
