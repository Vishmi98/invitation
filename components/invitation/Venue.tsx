import Image from "next/image";
import { invitation as inv, mapsEmbedUrl, mapsSearchUrl } from "@/content/invitation";
import { ui } from "@/content/ui";
import { T } from "@/components/T";
import { PinIcon } from "@/components/ornaments/icons";
import { rv } from "@/lib/reveal";
import { SectionHeading } from "./SectionHeading";

export function Venue() {
  const { venue, images } = inv;
  return (
    <section id="venue" className="scroll-mt-2 px-5 py-16 text-center">
      <SectionHeading eyebrow={ui.venue.eyebrow} title={ui.venue.title} />

      <div
        {...rv(60)}
        className="relative mx-auto w-[85%] max-w-3xl aspect-[4/3] overflow-hidden"
      >
        <Image
          src={images.venue.src}
          alt={images.venue.alt}
          fill
          sizes="(max-width: 768px) 90vw, 70vw"
          className="object-contain object-center"
          priority
        />
      </div>

      <h3 {...rv(0)} className="mt-8 font-display text-[22px] font-semibold leading-snug text-gold-deep">
        <T t={venue.name} />
      </h3>
      <p {...rv(80)} className="mx-auto mt-2 max-w-[19rem] text-[16px] leading-relaxed text-ink-muted">
        <T t={venue.address} />
      </p>

      <div {...rv(120)} className="map-frame mt-8">
        <iframe
          title={`Map of ${venue.name.en}`}
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-tint block h-64 w-full border-0"
          allowFullScreen
        />
      </div>

      <a {...rv(160)} href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
        <PinIcon className="size-5" />
        <T t={ui.venue.map} />
      </a>
    </section>
  );
}
