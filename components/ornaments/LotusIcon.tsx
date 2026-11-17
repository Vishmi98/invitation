/** Small lotus glyph used for headings, bullets and the RSVP thank-you state. */
export function LotusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 34"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M22 29.5C12 29.5 5 25.6 2 19.4C10 18.8 17.4 22.8 22 29.5Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M26 29.5C36 29.5 43 25.6 46 19.4C38 18.8 30.6 22.8 26 29.5Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M23 29C15 26 10.6 18.4 11 10C17.4 12.8 21.8 19.6 23 29Z" fill="currentColor" fillOpacity="0.16" />
      <path d="M25 29C33 26 37.4 18.4 37 10C30.6 12.8 26.2 19.6 25 29Z" fill="currentColor" fillOpacity="0.16" />
      <path d="M24 29.2C17.6 22.4 17.6 10.6 24 2.2C30.4 10.6 30.4 22.4 24 29.2Z" fill="currentColor" fillOpacity="0.22" />
      <path d="M9 32.4Q24 35.6 39 32.4" strokeLinecap="round" />
    </svg>
  );
}
