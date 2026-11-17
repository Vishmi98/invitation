import type { ReactNode } from "react";
import type { L } from "@/content/invitation";

/**
 * Bilingual text. Both languages are rendered; CSS on <html data-lang> hides the
 * inactive one, so this works in Server Components and switches without re-rendering.
 */
export function T({ t, si, en }: { t?: L; si?: ReactNode; en?: ReactNode }) {
  return (
    <>
      <span data-l="si" lang="si">
        {t ? t.si : si}
      </span>
      <span data-l="en" lang="en">
        {t ? t.en : en}
      </span>
    </>
  );
}
