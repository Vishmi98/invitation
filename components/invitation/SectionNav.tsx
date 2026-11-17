"use client";

import { useEffect, useState } from "react";
import { ui } from "@/content/ui";
import { EnvelopeIcon, HomeIcon, ImagesIcon, PinIcon, RingsIcon } from "@/components/ornaments/icons";
import { useLang } from "@/lib/lang";
import { cn } from "@/lib/reveal";

const ITEMS = [
  { id: "hero", label: ui.nav.home, Icon: HomeIcon },
  { id: "events", label: ui.nav.events, Icon: RingsIcon },
  { id: "gallery", label: ui.nav.gallery, Icon: ImagesIcon },
  { id: "venue", label: ui.nav.venue, Icon: PinIcon },
  { id: "rsvp", label: ui.nav.rsvp, Icon: EnvelopeIcon },
] as const;

/** Which nav item each page section belongs to. */
const SECTION_TO_ITEM: Record<string, string> = {
  hero: "hero",
  countdown: "hero",
  events: "events",
  gallery: "gallery",
  venue: "venue",
  rsvp: "rsvp",
  footer: "rsvp",
};

export function SectionNav() {
  const lang = useLang();
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = Object.keys(SECTION_TO_ITEM)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    // A thin band across the middle of the screen decides the active section.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(SECTION_TO_ITEM[entry.target.id]);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label={ui.nav.label[lang]} className="after-open col-fixed bottom-0 z-40 px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
      <ul className="nav-pill">
        {ITEMS.map(({ id, label, Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label[lang]}
              aria-current={active === id ? "true" : undefined}
              className={cn("nav-link", active === id && "nav-link-active")}
            >
              <Icon className="size-[21px]" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
