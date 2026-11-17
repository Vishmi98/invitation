"use client";

import { useActionState, useState } from "react";
import { submitRsvp } from "@/app/actions/rsvp";
import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { LotusIcon } from "@/components/ornaments/LotusIcon";
import { useLang } from "@/lib/lang";
import { cn } from "@/lib/reveal";
import { initialRsvpState } from "@/lib/rsvp";

export function RsvpForm() {
  const lang = useLang();
  const [state, formAction, pending] = useActionState(submitRsvp, initialRsvpState);
  // Controlled fields keep their values if the server returns a validation error.
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [guests, setGuests] = useState(1);
  const max = inv.rsvp.maxGuests;

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center py-4 text-center" role="status">
        <LotusIcon className="w-14 text-gold" />
        <p className="mt-4 font-display text-[26px] font-semibold">
          <span className="gold-foil">
            <T t={ui.rsvp.thanksTitle} />
          </span>
        </p>
        <p className="mt-2 max-w-[18rem] text-[16px] leading-relaxed text-ink">
          <T t={state.attending === "yes" ? ui.rsvp.thanksYes : ui.rsvp.thanksNo} />
        </p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.errors : {};

  return (
    <form
      noValidate
      className="space-y-6"
      action={(formData) => {
        formData.set("invitedAs", new URLSearchParams(window.location.search).get("to") ?? "");
        formData.set("lang", lang);
        formAction(formData);
      }}
    >
      {/* Honeypot: hidden from people, tempting for bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="rsvp-website">Website</label>
        <input id="rsvp-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="rsvp-name" className="field-label">
          <T t={ui.rsvp.name} />
        </label>
        <input
          id="rsvp-name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={ui.rsvp.namePlaceholder[lang]}
          autoComplete="name"
          maxLength={80}
          required
          aria-invalid={errors.name || undefined}
          aria-describedby={errors.name ? "rsvp-name-error" : undefined}
          className="field-input"
        />
        {errors.name && (
          <p id="rsvp-name-error" className="field-error">
            <T t={ui.rsvp.errName} />
          </p>
        )}
      </div>

      <fieldset aria-describedby={errors.attending ? "rsvp-attend-error" : undefined}>
        <legend className="field-label">
          <T t={ui.rsvp.attend} />
        </legend>
        <div className="grid gap-2.5">
          {(["yes", "no"] as const).map((value) => (
            <label key={value} className={cn("choice", attending === value && "choice-checked")}>
              <input
                type="radio"
                name="attending"
                value={value}
                checked={attending === value}
                onChange={() => setAttending(value)}
                className="sr-only"
              />
              <span className="choice-dot" aria-hidden="true" />
              <T t={value === "yes" ? ui.rsvp.yes : ui.rsvp.no} />
            </label>
          ))}
        </div>
        {errors.attending && (
          <p id="rsvp-attend-error" className="field-error">
            <T t={ui.rsvp.errAttend} />
          </p>
        )}
      </fieldset>

      {attending === "yes" && (
        <div>
          <p id="rsvp-guests-label" className="field-label">
            <T t={ui.rsvp.guests} />
          </p>
          <div className="stepper" role="group" aria-labelledby="rsvp-guests-label">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              disabled={guests <= 1}
              aria-label={ui.rsvp.decrease[lang]}
            >
              −
            </button>
            <output aria-live="polite" className="font-display text-[26px] font-semibold text-gold-deep lining-nums">
              {guests}
            </output>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(max, g + 1))}
              disabled={guests >= max}
              aria-label={ui.rsvp.increase[lang]}
            >
              +
            </button>
          </div>
        </div>
      )}
      <input type="hidden" name="guests" value={attending === "yes" ? guests : 0} />

      {errors.form && (
        <p className="field-error text-center" role="alert">
          <T t={ui.rsvp.errForm} />
        </p>
      )}

      <div className="pt-1 text-center">
        <button type="submit" className="btn-gold min-w-[13rem]" disabled={pending}>
          {pending ? <T t={ui.rsvp.sending} /> : <T t={ui.rsvp.submit} />}
        </button>
      </div>
    </form>
  );
}
