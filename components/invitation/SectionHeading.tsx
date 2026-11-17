import type { L } from "@/content/invitation";
import { T } from "@/components/T";
import { LotusFlourish } from "@/components/ornaments/LotusFlourish";
import { rv } from "@/lib/reveal";

/** English eyebrow over a gold bilingual title, finished with a lotus flourish. */
export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: L }) {
  return (
    <header className="mb-9 text-center">
      <p {...rv(0)} className="eyebrow">
        {eyebrow}
      </p>
      <h2 {...rv(80)} className="mt-2 font-display text-[28px] font-semibold leading-snug">
        <span className="gold-foil">
          <T t={title} />
        </span>
      </h2>
      <div {...rv(160)} className="mx-auto mt-3 w-40 text-gold">
        <LotusFlourish />
      </div>
    </header>
  );
}
