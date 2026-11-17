import Image from "next/image";
import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { Mandala } from "@/components/ornaments/Mandala";
import { LotusFlourish } from "@/components/ornaments/LotusFlourish";
import { LotusIcon } from "@/components/ornaments/LotusIcon";
import { rv } from "@/lib/reveal";
import { GuestName } from "./GuestName";

function DateBlock() {
  const { event } = inv;
  return (
    <div className="mx-auto mt-10 max-w-[21rem]">
      <p {...rv(0)} className="font-ui text-sm font-medium tracking-[0.55em] text-gold-deep">
        {event.year}
      </p>
      <div {...rv(100)} className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <p className="date-side">
          <T t={event.month} />
        </p>
        <div className="relative grid size-24 place-items-center rounded-full border border-gold/55">
          <span className="absolute inset-1.5 rounded-full border border-gold/25" aria-hidden="true" />
          <span className="gold-foil font-display text-[50px] font-semibold leading-none">{event.day}</span>
        </div>
        <p className="date-side">
          <T t={event.weekday} />
        </p>
      </div>
      <p {...rv(180)} className="mt-4 text-[16px] text-ink">
        <T t={event.time} />
      </p>
    </div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative scroll-mt-2 px-6 pb-14 pt-20 text-center">
      <h1 className="sr-only">{inv.site.title}</h1>

      <div {...rv(0)} className="mx-auto w-44 text-gold">
        <LotusFlourish />
      </div>
      <p {...rv(80)} className="eyebrow mt-5">
        <T t={ui.coverEyebrow} />
      </p>

      <p {...rv(160)} className="mt-6 text-[18px] text-ink">
        <T t={ui.dear} />{" "}
        <GuestName className="font-semibold text-gold-deep" fallback={<T t={ui.dearFallback} />} />
        {","}
      </p>

      <div className="mt-8 space-y-1.5">
        <p {...rv(220)} className="mx-auto max-w-[19rem] text-[15px] leading-relaxed text-ink-muted">
          <T t={inv.families.bride} />
        </p>
        <p {...rv(280)} className="couple-name">
          <span className="gold-foil">
            <T t={inv.couple.bride} />
          </span>
        </p>
        <div {...rv(330)} className="flex items-center justify-center gap-3 py-1">
          <span className="gold-rule w-14" />
          <span className="font-display text-xl italic text-gold-deep">
            <T t={ui.and} />
          </span>
          <span className="gold-rule w-14" />
        </div>
        <p {...rv(380)} className="mx-auto max-w-[19rem] text-[15px] leading-relaxed text-ink-muted">
          <T t={inv.families.groom} />
        </p>
        <p {...rv(440)} className="couple-name">
          <span className="gold-foil">
            <T t={inv.couple.groom} />
          </span>
        </p>
      </div>

      <div {...rv(0)} className="relative mx-auto mt-12 w-[76%] max-w-[300px]">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 w-[155%] -translate-x-1/2 -translate-y-1/2 text-gold/25"
          aria-hidden="true"
        >
          <div className="animate-spin-slow">
            <Mandala />
          </div>
        </div>
        <div className="arch-frame relative">
          <div className="arch-inner relative aspect-[4/5]">
            <Image
              src={inv.images.couple.src}
              alt={inv.images.couple.alt}
              fill
              loading="eager"
              sizes="(max-width: 480px) 76vw, 300px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <p {...rv(0)} className="mx-auto mt-10 max-w-[19rem] text-[17px] leading-relaxed text-ink">
        <T t={inv.occasion} />
      </p>

      <DateBlock />

      <div className="mx-auto mt-10 max-w-[20rem] space-y-2">
        <div {...rv(0)} className="mx-auto w-9 text-gold">
          <LotusIcon />
        </div>
        <p {...rv(60)} className="font-display text-[22px] font-semibold leading-snug text-gold-deep">
          <T t={inv.venue.name} />
        </p>
        <p {...rv(120)} className="text-[16px] text-ink-muted">
          <T t={inv.invite.before} />
        </p>
        <p {...rv(180)} className="guest-line">
          <GuestName fallback={<T t={inv.invite.guestFallback} />} />
        </p>
        <p {...rv(240)} className="text-[16px] text-ink">
          <T t={inv.invite.after} />
        </p>
        <p {...rv(300)} className="pt-2 text-[15px] italic text-ink-muted">
          <T t={inv.event.poruwaNote} />
        </p>
      </div>
    </section>
  );
}
