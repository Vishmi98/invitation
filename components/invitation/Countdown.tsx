"use client";

import { useSyncExternalStore } from "react";
import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { LotusIcon } from "@/components/ornaments/LotusIcon";

const TARGET = Date.parse(inv.event.start);

// A shared one-second clock. The time is only read in the browser after mount,
// never while prerendering (Cache Components forbids reading the clock there).
let now = 0;
let timer: ReturnType<typeof setInterval> | undefined;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    const tick = () => {
      now = Date.now();
      listeners.forEach((l) => l());
    };
    tick();
    timer = setInterval(tick, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown() {
  const current = useSyncExternalStore(
    subscribe,
    () => now,
    () => 0,
  );
  const diff = current ? Math.max(0, TARGET - current) : null;
  const done = diff === 0;

  const units = [
    { label: ui.countdown.units.days, value: diff === null ? 0 : Math.floor(diff / 86_400_000) },
    { label: ui.countdown.units.hours, value: diff === null ? 0 : Math.floor(diff / 3_600_000) % 24 },
    { label: ui.countdown.units.minutes, value: diff === null ? 0 : Math.floor(diff / 60_000) % 60 },
    { label: ui.countdown.units.seconds, value: diff === null ? 0 : Math.floor(diff / 1000) % 60 },
  ];

  if (done) {
    return (
      <div className="flex flex-col items-center gap-3 py-4 text-center">
        <LotusIcon className="w-12 text-gold" />
        <p className="font-display text-2xl font-semibold text-gold-deep">
          <T t={ui.countdown.done} />
        </p>
      </div>
    );
  }

  return (
    <div role="timer" aria-live="off" className="grid grid-cols-4 gap-2.5 sm:gap-3">
      {units.map(({ label, value }) => (
        <div key={label.en} className="countdown-tile">
          <span className="font-display text-[30px] font-semibold leading-none text-gold-deep lining-nums">
            {pad(value)}
          </span>
          <span className="mt-1 font-ui text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            <T t={label} />
          </span>
        </div>
      ))}
    </div>
  );
}
