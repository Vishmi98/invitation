function Vine() {
  return (
    <>
      <path d="M101 31C88 31 82 23 70 24.5C60 26 59.5 35 49.5 33.4C41.5 32 42.5 23.5 50 23.6C55 23.7 56 29.4 51.8 30.2" />
      <path d="M49.5 33.4C37 36 22 33 5 32.4" strokeWidth="0.7" />
      <path d="M80 25.2C76.5 18.6 70.5 16.2 63.5 17.2C67.4 22.4 72.8 25.3 80 25.2Z" fill="currentColor" fillOpacity="0.14" />
      <path d="M38 34.4C35.6 30 31.5 28.6 27 29.5C29.6 33 33.2 34.6 38 34.4Z" fill="currentColor" fillOpacity="0.14" strokeWidth="0.7" />
      <circle cx="5" cy="32.4" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="58" cy="20.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="88" cy="24.5" r="0.9" fill="currentColor" stroke="none" />
    </>
  );
}

/** Horizontal divider: a lotus in the centre with scrolling vines on each side. */
export function LotusFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 40"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.9"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <Vine />
      <g transform="translate(240 0) scale(-1 1)">
        <Vine />
      </g>
      <path d="M118 32.4C107 32.4 99 28.4 95 21.4C104 20.6 112.4 25.4 118 32.4Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M122 32.4C133 32.4 141 28.4 145 21.4C136 20.6 127.6 25.4 122 32.4Z" fill="currentColor" fillOpacity="0.1" />
      <path d="M119 31.6C110 28.6 105 20.6 105.2 11.4C112.4 14.4 117.4 21.4 119 31.6Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M121 31.6C130 28.6 135 20.6 134.8 11.4C127.6 14.4 122.6 21.4 121 31.6Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M120 31.6C113.6 24.6 113.6 13 120 4.6C126.4 13 126.4 24.6 120 31.6Z" fill="currentColor" fillOpacity="0.18" />
      <path d="M120 27.5V12" strokeWidth="0.5" opacity="0.7" />
      <path d="M104 34.6Q120 38.4 136 34.6" />
      <circle cx="120" cy="38.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
