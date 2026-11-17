import { buildIcs } from "@/lib/calendar";

/** Calendar file for Apple Calendar / Outlook. Static: prerendered at build time. */
export function GET() {
  return new Response(buildIcs(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="wedding-invitation.ics"',
    },
  });
}
