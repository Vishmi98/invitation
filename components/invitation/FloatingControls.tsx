"use client";

import { ui } from "@/content/ui";
import { MusicIcon } from "@/components/ornaments/icons";
import { toggleMusic, useMusicState } from "@/lib/audio";
import { setLang, useLang } from "@/lib/lang";
import { cn } from "@/lib/reveal";

/** Language switch (always visible, also on the cover) and the music button. */
export function FloatingControls() {
  const lang = useLang();
  const music = useMusicState();
  const hasMusic = music === "playing" || music === "paused";

  return (
    <div className="col-fixed top-0 z-[70] pointer-events-none">
      <div className="flex items-center justify-end gap-2 p-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        {hasMusic && (
          <button
            type="button"
            onClick={toggleMusic}
            className={cn("control-chip pointer-events-auto size-10 justify-center", music === "playing" && "is-playing")}
            aria-label={(music === "playing" ? ui.music.pause : ui.music.play)[lang]}
            aria-pressed={music === "playing"}
          >
            <MusicIcon className="size-[18px]" />
          </button>
        )}
        <div role="group" aria-label={ui.language[lang]} className="control-chip pointer-events-auto p-1">
          <button
            type="button"
            onClick={() => setLang("si")}
            aria-pressed={lang === "si"}
            lang="si"
            className={cn("lang-btn", lang === "si" && "lang-btn-active")}
          >
            සිං
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            lang="en"
            className={cn("lang-btn", lang === "en" && "lang-btn-active")}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
