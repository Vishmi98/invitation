import type { CSSProperties } from "react";

/**
 * Drifting gold dust. Values are fixed (not random) so the page can be
 * prerendered under Cache Components and hydrates identically.
 * [left %, size px, fall s, fall delay s, sway s, sway delay s]
 */
const PARTICLES: [number, number, number, number, number, number][] = [
  [6, 4, 17, 0, 5, 0],
  [15, 3, 21, 6, 4.5, 1],
  [24, 5, 16, 3, 6, 2],
  [33, 3, 24, 11, 4, 3],
  [42, 4, 18, 8, 5.5, 4],
  [51, 6, 22, 1, 7, 5],
  [60, 3, 16, 13, 4, 6],
  [68, 4, 25, 5, 6.5, 7],
  [76, 5, 19, 9, 5, 8],
  [84, 3, 23, 2, 4.5, 9],
  [91, 4, 17, 15, 6, 10],
  [97, 3, 21, 7, 5, 11],
];

export function GoldDust() {
  return (
    <div aria-hidden="true" className="dust-layer col-fixed inset-y-0 z-[60] overflow-hidden">
      {PARTICLES.map(([left, size, fall, fallDelay, sway, swayDelay], i) => (
        <span
          key={i}
          className="dust-fall"
          style={{ left: `${left}%`, animationDuration: `${fall}s`, animationDelay: `-${fallDelay}s` } as CSSProperties}
        >
          <span
            className="dust-mote"
            style={{ width: size, height: size, animationDuration: `${sway}s`, animationDelay: `-${swayDelay}s` }}
          />
        </span>
      ))}
    </div>
  );
}
