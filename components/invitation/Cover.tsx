"use client";

import { useState } from "react";
import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { Mandala } from "@/components/ornaments/Mandala";
import { LotusFlourish } from "@/components/ornaments/LotusFlourish";
import { LotusIcon } from "@/components/ornaments/LotusIcon";
import { CornerOrnament } from "@/components/ornaments/CornerOrnament";
import { startInvitationAudio } from "@/lib/audio";
import { GuestName } from "./GuestName";

type Phase = "closed" | "opening" | "open";

/**
 * Full-screen opening card. Tapping "Open" plays the intro drums, blooms the
 * mandala, lifts the cover away and unlocks the page.
 */
export function Cover() {
  const [phase, setPhase] = useState<Phase>("closed");

  if (phase === "open") return null;

  function open() {
    if (phase !== "closed") return;
    setPhase("opening");
    startInvitationAudio(inv.audio);
    window.scrollTo(0, 0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => (document.documentElement.dataset.opened = ""), reduced ? 0 : 850);
    setTimeout(() => setPhase("open"), reduced ? 50 : 1700);
  }

  return (
    <div
      className="cover col-fixed inset-y-0 z-50 overflow-hidden"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cover-title"
    >
      <div className="paper absolute inset-0" />
      <div className="cover-frame pointer-events-none absolute inset-3 sm:inset-4" aria-hidden="true">
        <CornerOrnament className="card-corner card-corner-tl" />
        <CornerOrnament className="card-corner card-corner-tr" />
        <CornerOrnament className="card-corner card-corner-bl" />
        <CornerOrnament className="card-corner card-corner-br" />
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="cover-mandala absolute left-full top-1/2 w-[180%] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold/15">
          <div className="animate-spin-slow">
            <Mandala />
          </div>
        </div>
      </div>

      <div className="cover-content relative flex h-full flex-col items-center justify-center px-10 text-center">
        <p className="eyebrow">
          <T t={ui.coverEyebrow} />
        </p>
        <div className="mt-5 w-48 text-gold">
          <LotusFlourish />
        </div>
        <h2 id="cover-title" className="mt-4 font-display text-[40px] font-bold leading-tight">
          <span className="gold-foil">
            <T t={ui.coverTitle} />
          </span>
        </h2>

        <p className="mt-6 text-[17px] text-ink">
          <T t={ui.dear} />{" "}
          <GuestName className="font-semibold text-gold-deep" fallback={<T t={ui.dearFallback} />} />
          {","}
        </p>

        <p className="couple-name mt-6">
          <span className="gold-foil">
            <T t={inv.couple.both} />
          </span>
        </p>
        <p className="mt-3 font-ui text-xs font-medium tracking-[0.45em] text-gold-deep">{inv.event.shortDate}</p>

        <button type="button" onClick={open} className="btn-gold open-pulse mt-10">
          <LotusIcon className="w-6 text-ivory" />
          <T t={ui.open} />
        </button>
      </div>
    </div>
  );
}
