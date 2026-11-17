/**
 * Deterministic geometry for the mandala ornament. Everything is computed from
 * fixed numbers (no randomness, no trig) so server and client output match.
 */

export type Shape =
  | { kind: "path"; d: string; rot: number; w: number; o?: number; fill?: boolean }
  | { kind: "circle"; r: number; cy?: number; rot?: number; w: number; o?: number; fill?: boolean; solid?: boolean };

const f = (n: number) => Math.round(n * 100) / 100;

/** A lotus petal pointing "up" (towards -y), from radius r0 to r1, half-width w. */
export function petal(r0: number, r1: number, w: number): string {
  const len = r1 - r0;
  const a = f(-(r0 + len * 0.3));
  const b = f(-(r1 - len * 0.22));
  return `M0 ${f(-r0)}C${f(w)} ${a} ${f(w * 0.72)} ${b} 0 ${f(-r1)}C${f(-w * 0.72)} ${b} ${f(-w)} ${a} 0 ${f(-r0)}Z`;
}

function ring(count: number, d: string, style: { w: number; o?: number; fill?: boolean }, offset = 0): Shape[] {
  return Array.from({ length: count }, (_, i) => ({ kind: "path", d, rot: offset + (i * 360) / count, ...style }));
}

function dots(count: number, radius: number, size: number, offset = 0): Shape[] {
  return Array.from({ length: count }, (_, i) => ({
    kind: "circle",
    r: size,
    cy: -radius,
    rot: offset + (i * 360) / count,
    w: 0,
    solid: true,
    o: 0.8,
  }));
}

export const MANDALA_VIEWBOX = "-110 -110 220 220";

export const MANDALA: Shape[] = [
  { kind: "circle", r: 106, w: 0.45, o: 0.8 },
  ...ring(48, petal(100, 105.6, 3.6), { w: 0.4, o: 0.85 }),
  { kind: "circle", r: 100, w: 0.6 },
  { kind: "circle", r: 97, w: 0.3, o: 0.7 },
  ...ring(24, petal(70, 96, 10), { w: 0.55, fill: true }),
  ...ring(24, petal(75, 91, 4.6), { w: 0.35, o: 0.75 }),
  ...dots(24, 67.5, 1.2, 7.5),
  { kind: "circle", r: 64.5, w: 0.6 },
  { kind: "circle", r: 62, w: 0.3, o: 0.7 },
  ...ring(16, petal(42, 61, 6.5), { w: 0.35, o: 0.6 }, 11.25),
  ...ring(16, petal(36, 61, 11), { w: 0.55, fill: true }),
  ...ring(16, petal(40, 56, 5.4), { w: 0.35, o: 0.75 }),
  { kind: "circle", r: 34, w: 0.6 },
  ...dots(16, 30.6, 0.95, 11.25),
  { kind: "circle", r: 27.2, w: 0.45 },
  ...ring(8, petal(9, 23, 5.4), { w: 0.4, o: 0.65 }, 22.5),
  ...ring(8, petal(8, 26, 8.6), { w: 0.55, fill: true }),
  ...ring(8, petal(11, 22, 3.6), { w: 0.35, o: 0.75 }),
  { kind: "circle", r: 7, w: 0.6 },
  { kind: "circle", r: 3, w: 0, solid: true },
];

/** The mandala as a standalone SVG string (used by the Open Graph image). */
export function mandalaSvg(color: string, fillOpacity = 0.08): string {
  const body = MANDALA.map((s) => {
    const t = s.rot ? ` transform="rotate(${s.rot})"` : "";
    const o = s.o !== undefined ? ` opacity="${s.o}"` : "";
    if (s.kind === "path") {
      const fill = s.fill ? ` fill="${color}" fill-opacity="${fillOpacity}"` : ` fill="none"`;
      return `<path d="${s.d}"${t}${o}${fill} stroke="${color}" stroke-width="${s.w}"/>`;
    }
    const cy = s.cy ? ` cy="${s.cy}"` : "";
    if (s.solid) return `<circle r="${s.r}"${cy}${t}${o} fill="${color}"/>`;
    return `<circle r="${s.r}"${cy}${t}${o} fill="none" stroke="${color}" stroke-width="${s.w}"/>`;
  }).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MANDALA_VIEWBOX}">${body}</svg>`;
}
