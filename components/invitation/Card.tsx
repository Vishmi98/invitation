import type { ReactNode } from "react";
import { CornerOrnament } from "@/components/ornaments/CornerOrnament";
import { cn } from "@/lib/reveal";

/** Ivory card with a double gold hairline frame and mandala corners. */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("card", className)}>
      <CornerOrnament className="card-corner card-corner-tl" />
      <CornerOrnament className="card-corner card-corner-tr" />
      <CornerOrnament className="card-corner card-corner-bl" />
      <CornerOrnament className="card-corner card-corner-br" />
      <div className="relative">{children}</div>
    </div>
  );
}
