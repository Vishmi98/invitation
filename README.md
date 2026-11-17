# Mandala Lotus wedding invitation

A single-page, mobile-first digital wedding invitation in ivory and gold. It is in Sinhala by default, with an English toggle, and is built with Next.js 16 and Tailwind CSS v4.

Sections, top to bottom:

- **Cover:** opening card with a blooming mandala, intro drums and background music.
- **Invitation letter:** parents' names, couple photo, date and venue.
- **Countdown**
- **Event details:** programme, plus "Save the date" (Google Calendar and `.ics`).
- **Gallery:** photos with a lightbox.
- **Venue:** photo, embedded map and directions.
- **RSVP:** replies are saved to a Google Sheet.
- **Save the date:** sign-off with call buttons.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Make it yours

| What | Where |
|---|---|
| Names, parents, date and time, venue, phones, RSVP deadline | `content/invitation.ts` |
| Button and heading text (both languages) | `content/ui.ts` |
| Couple, gallery and venue photos | Replace the files in `public/images/`, keeping the same names. Any aspect ratio works. |
| Intro drums and background music | Add `public/audio/intro.mp3` and `public/audio/music.mp3`. The music button only appears once a track is playing. Set a path to `null` in `content/invitation.ts` to turn it off. |
| Colours, fonts, ornaments | `app/globals.css` (tokens at the top), `app/layout.tsx`, `components/ornaments/` |

Use music you are licensed to share, for example a royalty-free track.

## Sharing links

- `https://your-site/?to=Mr%20%26%20Mrs%20Silva` greets the guest by name on the cover and in the letter. Without `to`, the page greets a generic guest.
- Add `&lang=en` to open a link in English. Each guest's choice is remembered on their device.
- Link previews (WhatsApp, Facebook) use `app/opengraph-image.tsx`. Set `SITE_URL` so the preview image has an absolute URL.

## RSVP → Google Sheet

Follow [docs/rsvp-google-sheet.md](docs/rsvp-google-sheet.md), then set `RSVP_WEBHOOK_URL` and `RSVP_WEBHOOK_SECRET` (see `.env.example`).

## Notes

- The page is statically prerendered (`cacheComponents` is on). Only the guest name from `?to=` is filled in on the client.
- The page asks search engines not to index it (`robots: noindex`).
- Fonts are Abhaya Libre, Noto Serif Sinhala, Maname, Cormorant Garamond, Great Vibes and Montserrat, all under the SIL Open Font License. The share image uses copies of three of them, kept in `assets/fonts/`.
