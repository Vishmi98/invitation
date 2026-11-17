import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { Mandala } from "@/components/ornaments/Mandala";
import { LotusFlourish } from "@/components/ornaments/LotusFlourish";
import { PhoneIcon } from "@/components/ornaments/icons";
import { rv } from "@/lib/reveal";

export function SaveTheDate() {
  return (
    <footer id="footer" className="relative scroll-mt-2 overflow-hidden px-6 pb-20 pt-20 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-10 w-[100%] -translate-x-1/2 text-gold/15"
        aria-hidden="true"
      >
        <div className="animate-spin-slower">
          <Mandala />
        </div>
      </div>

      <div className="relative">
        <p {...rv(0)} className="font-script text-[54px] leading-tight">
          <span className="gold-foil">{ui.footer.saveTheDate}</span>
        </p>
        <p {...rv(100)} className="mt-2 font-display text-[26px] font-semibold tracking-[0.3em] text-gold-deep">
          {inv.event.shortDate}
        </p>
        <div {...rv(160)} className="mx-auto mt-6 w-44 text-gold">
          <LotusFlourish />
        </div>
        <p {...rv(220)} className="mt-6 text-[18px] text-ink">
          <T t={ui.footer.love} />
        </p>

        <div {...rv(280)} className="mt-7 flex flex-wrap justify-center gap-3">
          {inv.contacts.map((contact) => (
            <a key={contact.name.en} href={`tel:${contact.phone}`} className="btn-outline">
              <PhoneIcon className="size-4" />
              <span className="sr-only">
                <T t={ui.footer.call} />{" "}
              </span>
              <T t={contact.name} />
            </a>
          ))}
        </div>

        <p className="mt-14 font-ui text-[11px] tracking-[0.2em] text-ink-muted">
          <T t={ui.footer.credit} /> <span className="text-gold">♥</span>
        </p>
      </div>
    </footer>
  );
}
