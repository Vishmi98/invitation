import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { rv } from "@/lib/reveal";
import { Card } from "./Card";
import { RsvpForm } from "./RsvpForm";
import { SectionHeading } from "./SectionHeading";

export function Rsvp() {
  return (
    <section id="rsvp" className="section-tint scroll-mt-2 px-5 py-16">
      <SectionHeading eyebrow={ui.rsvp.eyebrow} title={ui.rsvp.title} />
      <div {...rv(60)}>
        <Card>
          <p className="text-center text-[16px] leading-relaxed text-ink">
            <T t={ui.rsvp.intro} />
          </p>
          <p className="mx-auto mt-3 max-w-[17rem] text-center text-[14px] font-semibold leading-relaxed text-gold-deep">
            <T t={inv.rsvp.deadlineNote} />
          </p>
          <div className="gold-rule my-6" />
          <RsvpForm />
        </Card>
      </div>
    </section>
  );
}
