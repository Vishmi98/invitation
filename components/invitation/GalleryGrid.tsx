"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ui } from "@/content/ui";
import { ChevronIcon, CloseIcon } from "@/components/ornaments/icons";
import { useLang } from "@/lib/lang";
import { cn, rv } from "@/lib/reveal";

type Photo = { readonly src: string; readonly alt: string };

/** Staggered two-column photo grid with a swipeable lightbox (native <dialog>). */
export function GalleryGrid({ images }: { images: readonly Photo[] }) {
  const lang = useLang();
  const dialog = useRef<HTMLDialogElement>(null);
  const pointer = useRef<{ x: number; moved: boolean } | null>(null);
  const [index, setIndex] = useState(0);

  const show = (i: number) => {
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const go = (step: number) => setIndex((i) => (i + step + images.length) % images.length);
  const current = images[index];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 pb-8">
        {images.map((photo, i) => {
          const arch = i % 3 === 0;
          return (
            <li key={photo.src} {...rv((i % 2) * 120)} className={i % 2 === 1 ? "translate-y-8" : undefined}>
              <button
                type="button"
                onClick={() => show(i)}
                className={cn(
                  "gallery-tile group block w-full border border-gold/45 p-1",
                  arch ? "arch-sm" : "rounded-2xl",
                )}
                aria-label={`${ui.gallery.open[lang]} ${i + 1}`}
              >
                <span
                  className={cn(
                    "relative block aspect-[3/4] w-full overflow-hidden",
                    arch ? "arch-sm" : "rounded-xl",
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 480px) 46vw, 220px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label={ui.gallery.dialog[lang]}
        onClick={(e) => {
          if (e.target === dialog.current && !pointer.current?.moved) close();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={(e) => (pointer.current = { x: e.clientX, moved: false })}
        onPointerUp={(e) => {
          const start = pointer.current;
          if (!start) return;
          const dx = e.clientX - start.x;
          if (Math.abs(dx) > 40) {
            start.moved = true;
            go(dx < 0 ? 1 : -1);
          }
        }}
      >
        <div className="pointer-events-none relative mx-auto h-[72dvh] w-[88vw] max-w-[440px]">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 480px) 88vw, 440px"
            className="lightbox-image object-contain"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-4 text-ivory">
          <button type="button" className="lightbox-btn" onClick={() => go(-1)} aria-label={ui.gallery.prev[lang]}>
            <ChevronIcon dir="left" className="size-5" />
          </button>
          <span className="min-w-14 text-center font-ui text-xs tracking-[0.3em]">
            {index + 1} / {images.length}
          </span>
          <button type="button" className="lightbox-btn" onClick={() => go(1)} aria-label={ui.gallery.next[lang]}>
            <ChevronIcon dir="right" className="size-5" />
          </button>
        </div>
        <button
          type="button"
          className="lightbox-btn absolute right-4 top-4"
          onClick={close}
          aria-label={ui.gallery.close[lang]}
          autoFocus
        >
          <CloseIcon className="size-5" />
        </button>
      </dialog>
    </>
  );
}
