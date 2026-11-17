import { invitation as inv } from "@/content/invitation";
import { ui } from "@/content/ui";
import { SectionHeading } from "./SectionHeading";
import { GalleryGrid } from "./GalleryGrid";

export function Gallery() {
  return (
    <section id="gallery" className="section-tint scroll-mt-2 px-5 py-16">
      <SectionHeading eyebrow={ui.gallery.eyebrow} title={ui.gallery.title} />
      <GalleryGrid images={inv.images.gallery} />
    </section>
  );
}
