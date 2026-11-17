import type { ReactNode } from "react";

type IconProps = { className?: string };

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "size-5"}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const HomeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 10.5 12 4l8 6.5" />
    <path d="M6 9v10h12V9" />
    <path d="M10 19v-5h4v5" />
  </Icon>
);

export const RingsIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="14" r="5" />
    <circle cx="15" cy="14" r="5" />
    <path d="m10.5 5 1.5-2 1.5 2-1.5 1.6Z" />
  </Icon>
);

export const ImagesIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <circle cx="9" cy="10" r="1.6" />
    <path d="m21 16-5-5-8 8" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11A6.5 6.5 0 0 1 18.5 10c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.4" />
  </Icon>
);

export const EnvelopeIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="5.5" width="18" height="13" rx="2" />
    <path d="m3.5 7 8.5 6.5L20.5 7" />
  </Icon>
);

export const PhoneIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h3.5l1.6 4.2-2.2 1.4a11 11 0 0 0 6.5 6.5l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
  </Icon>
);

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Icon>
);

export const CalendarPlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4M12 13v5M9.5 15.5h5" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Icon>
);

export const MusicIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 18V6l10-2v12" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="16" r="2.5" />
  </Icon>
);

export const ChevronIcon = ({ className, dir = "down" }: IconProps & { dir?: "down" | "left" | "right" }) => (
  <Icon className={className}>
    {dir === "down" && <path d="m6 9 6 6 6-6" />}
    {dir === "left" && <path d="m15 6-6 6 6 6" />}
    {dir === "right" && <path d="m9 6 6 6-6 6" />}
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const GoogleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12.2c0-.6-.1-1.2-.2-1.7H12v3.3h4.5a3.9 3.9 0 0 1-1.7 2.5v2h2.7c1.6-1.4 2.5-3.6 2.5-6.1Z" />
    <path d="M12 20.5c2.3 0 4.2-.8 5.5-2.1l-2.7-2a5 5 0 0 1-7.5-2.7H4.5v2.1A8.5 8.5 0 0 0 12 20.5Z" />
    <path d="M7.3 13.7a5 5 0 0 1 0-3.4V8.2H4.5a8.5 8.5 0 0 0 0 7.6Z" />
    <path d="M12 6.9c1.3 0 2.5.4 3.4 1.3l2.5-2.5A8.5 8.5 0 0 0 4.5 8.2l2.8 2.1A5 5 0 0 1 12 6.9Z" />
  </Icon>
);
