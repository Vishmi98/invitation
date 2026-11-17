import type { CSSProperties } from "react";

/**
 * Props for a scroll-reveal element. <RevealObserver/> marks it as shown when it
 * enters the viewport; CSS fades it up once the invitation has been opened.
 */
export function rv(delayMs = 0): { "data-reveal": ""; style: CSSProperties } {
  return { "data-reveal": "", style: { "--d": `${delayMs}ms` } as CSSProperties };
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
