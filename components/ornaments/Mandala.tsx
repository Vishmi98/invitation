export function Mandala({ className }: { className?: string }) {
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: "block",
        width: "100%",
        aspectRatio: "1",
        backgroundColor: "currentColor",
        mask: "url('/images/mandala.svg') center / contain no-repeat",
        WebkitMask: "url('/images/mandala.svg') center / contain no-repeat",
      }}
    />
  );
}
