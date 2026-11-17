import { invitation } from "@/content/invitation";

/** "2026-12-31T09:30:00+05:30" → "20261231T040000Z" (pure; no current-time access). */
export function toUtcStamp(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?([+-])(\d{2}):(\d{2})$/);
  if (!m) throw new Error(`Unsupported date format: ${iso}`);
  const [, y, mo, d, h, mi, s = "00", sign, oh, om] = m;
  const offsetMin = (sign === "+" ? 1 : -1) * (Number(oh) * 60 + Number(om));
  const ms = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s) - offsetMin * 60_000;
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

const { event, venue } = invitation;
const location = `${venue.name.en}, ${venue.address.en}`;

export function googleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.calendarTitle,
    dates: `${toUtcStamp(event.start)}/${toUtcStamp(event.end)}`,
    details: event.calendarDetails,
    location,
    ctz: "Asia/Colombo",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcs(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
}

/** Fold lines longer than 75 characters, as RFC 5545 requires. */
function fold(line: string): string {
  const parts: string[] = [];
  for (let i = 0; i < line.length; i += 74) parts.push(line.slice(i, i + 74));
  return parts.join("\r\n ");
}

export function buildIcs(): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//Mandala Lotus//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wedding-${toUtcStamp(event.start)}@wedding-invitation`,
    // Fixed stamp keeps the file static (Cache Components forbids reading the clock here).
    "DTSTAMP:20261101T000000Z",
    `DTSTART:${toUtcStamp(event.start)}`,
    `DTEND:${toUtcStamp(event.end)}`,
    `SUMMARY:${escapeIcs(event.calendarTitle)}`,
    `LOCATION:${escapeIcs(location)}`,
    `DESCRIPTION:${escapeIcs(event.calendarDetails)}`,
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcs(event.calendarTitle)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}
