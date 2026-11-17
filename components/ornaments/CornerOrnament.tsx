import { petal } from "./geometry";

const PETAL = petal(4, 21, 4.6);
const BUD = petal(29, 41, 5);

/** Quarter-mandala for card corners. Drawn for the top-left; flip it with CSS for others. */
export function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <g transform="translate(2 2)">
        {[90, 112.5, 135, 157.5, 180].map((angle) => (
          <path key={angle} d={PETAL} transform={`rotate(${angle})`} fill="currentColor" fillOpacity="0.1" />
        ))}
        <path d={BUD} transform="rotate(135)" fill="currentColor" fillOpacity="0.12" />
        {[105, 165].map((angle) => (
          <circle key={angle} r="1.1" cy="-32" transform={`rotate(${angle})`} fill="currentColor" stroke="none" />
        ))}
      </g>
      <path d="M26 2A24 24 0 0 1 2 26" />
      <path d="M31 2A29 29 0 0 1 2 31" strokeWidth="0.5" opacity="0.7" />
      <path d="M36 2H60" strokeWidth="0.6" />
      <path d="M2 36V60" strokeWidth="0.6" />
      <circle cx="62" cy="2" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="2" cy="62" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
