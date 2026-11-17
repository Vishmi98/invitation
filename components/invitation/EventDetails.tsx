import type { ReactNode } from "react";
import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { LotusIcon } from "@/components/ornaments/LotusIcon";
import {
  CalendarIcon,
  CalendarPlusIcon,
  ChevronIcon,
  ClockIcon,
  GoogleIcon,
  PinIcon,
} from "@/components/ornaments/icons";
import { googleCalendarUrl } from "@/lib/calendar";
import { rv } from "@/lib/reveal";
import { Card } from "./Card";
import { Countdown } from "./Countdown";
import { SectionHeading } from "./SectionHeading";

function InfoRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-champagne/60 text-gold-deep">
        {icon}
      </span>
      <span className="pt-1.5 text-[16px] leading-snug text-ink">{children}</span>
    </li>
  );
}

export function CountdownSection() {
  return (
    <section id="countdown" className="section-tint scroll-mt-2 px-5 py-16">
      <SectionHeading eyebrow={ui.countdown.eyebrow} title={ui.countdown.title} />
      <div {...rv(100)}>
        <Countdown />
      </div>
      <p {...rv(180)} className="mt-7 text-center font-display text-[18px] text-gold-deep">
        <T t={inv.event.fullDate} />
      </p>
    </section>
  );
}

function AddToCalendar() {
  return (
    <div className="mt-8 text-center">
      <details className="calendar-menu group inline-block w-full">
        <summary className="btn-gold mx-auto">
          <CalendarPlusIcon className="size-5" />
          <T t={ui.calendar.button} />
          <ChevronIcon className="size-4 transition-transform duration-300 group-open:rotate-180" />
        </summary>
        <div className="mx-auto mt-4 grid max-w-[17rem] gap-2.5">
          <a href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <GoogleIcon className="size-4" />
            Google Calendar
          </a>
          <a href="/wedding.ics" download className="btn-outline">
            <CalendarIcon className="size-4" />
            Apple / Outlook (.ics)
          </a>
        </div>
      </details>
      <p className="mt-3 text-[14px] text-ink-muted">
        <T t={ui.calendar.hint} />
      </p>
    </div>
  );
}

export function EventDetails() {
  const { event, venue } = inv;
  return (
    <section id="events" className="scroll-mt-2 px-5 py-16">
      <SectionHeading eyebrow={ui.events.eyebrow} title={ui.events.title} />
      <div {...rv(80)}>
        <Card>
          <div className="text-center">
            <LotusIcon className="mx-auto w-11 text-gold" />
            <h3 className="mt-3 font-display text-[22px] font-semibold leading-snug text-gold-deep">
              <T t={event.title} />
            </h3>
          </div>

          <ul className="mt-7 space-y-4">
            <InfoRow icon={<CalendarIcon className="size-[18px]" />}>
              <T t={event.fullDate} />
            </InfoRow>
            <InfoRow icon={<ClockIcon className="size-[18px]" />}>
              <T t={event.timeShort} />
            </InfoRow>
            <InfoRow icon={<PinIcon className="size-[18px]" />}>
              <T t={venue.hall} />
            </InfoRow>
          </ul>

          <div className="gold-rule my-7" />

          <p className="eyebrow text-center">
            <T t={ui.events.schedule} />
          </p>
          <ol className="relative mx-auto mt-5 max-w-[18rem] space-y-5 border-l border-gold/40 pl-6">
            {event.schedule.map((item) => (
              <li key={item.label.en} className="relative">
                <span
                  className="absolute -left-[31px] top-1.5 size-3.5 rounded-full border border-gold bg-ivory-2 shadow-[0_0_0_3px_var(--color-ivory-2)]"
                  aria-hidden="true"
                />
                <p className="font-ui text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
                  <T t={item.time} />
                </p>
                <p className="text-[16px] text-ink">
                  <T t={item.label} />
                </p>
              </li>
            ))}
          </ol>

          <AddToCalendar />
        </Card>
      </div>
    </section>
  );
}
