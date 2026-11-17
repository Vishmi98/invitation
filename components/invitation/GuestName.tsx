"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

type Props = { fallback?: ReactNode; className?: string };

function GuestNameFromLink({ fallback, className }: Props) {
  const raw = useSearchParams().get("to");
  const name = raw?.replace(/\s+/g, " ").trim().slice(0, 60);
  return <span className={className}>{name || fallback}</span>;
}

/**
 * The guest's name from the share link (`/?to=Mr%20%26%20Mrs%20Silva`).
 * Wrapped in Suspense so the rest of the page stays statically prerendered.
 */
export function GuestName({ fallback = null, className }: Props) {
  return (
    <Suspense fallback={<span className={className}>{fallback}</span>}>
      <GuestNameFromLink fallback={fallback} className={className} />
    </Suspense>
  );
}
