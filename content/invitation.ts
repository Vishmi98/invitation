/**
 * Every wedding-specific detail lives in this file.
 * Edit the values below to change names, dates, venue, contacts and photos.
 *
 * Bilingual strings use { si, en }. Sinhala text that contains rakaransaya /
 * yansaya (e.g. ප්‍ර, බ්‍ර) needs a zero-width joiner (U+200D) after the hal kirima;
 * the strings below already include it.
 */

export type L = { si: string; en: string };

export const invitation = {
  site: {
    title: "Dinura & Sanuli · Wedding Invitation",
    description:
      "Together with our families, we joyfully invite you to celebrate our wedding on Thursday, 31 December 2026 at Cinnamon Lakeside, Colombo.",
  },

  couple: {
    groom: { si: "දිනුර", en: "Dinura" },
    bride: { si: "සනුලි", en: "Sanuli" },
    both: { si: "දිනුර සහ සනුලි", en: "Dinura & Sanuli" },
  },

  families: {
    bride: {
      si: "මහනුවර පදිංචි පෙරේරා මහතාගේ සහ එම මහත්මියගේ ආදරණීය දියණිය",
      en: "The beloved daughter of Mr. & Mrs. Perera of Kandy",
    },
    groom: {
      si: "ගම්පහ පදිංචි සිල්වා මහතාගේ සහ එම මහත්මියගේ ආදරණීය පුතු",
      en: "The beloved son of Mr. & Mrs. Silva of Gampaha",
    },
  },

  occasion: {
    si: "චාරිත්‍රානුකූලව අතිනත ගැනීමේ ප්‍රීතිය නිමිත්තෙන්",
    en: "On the joyous occasion of their traditional wedding",
  },

  event: {
    /** ISO date-times with the Sri Lanka offset. Used for the countdown and calendar. */
    start: "2026-12-31T09:30:00+05:30",
    end: "2026-12-31T15:30:00+05:30",
    year: "2026",
    day: "31",
    month: { si: "දෙසැම්බර්", en: "December" },
    weekday: { si: "බ්‍රහස්පතින්දා", en: "Thursday" },
    fullDate: { si: "2026 දෙසැම්බර් 31 බ්‍රහස්පතින්දා", en: "Thursday, 31 December 2026" },
    shortDate: "31 . 12 . 26",
    time: { si: "පෙ.ව. 9.30 සිට ප.ව. 3.30 දක්වා", en: "from 9.30 AM to 3.30 PM" },
    timeShort: { si: "පෙ.ව. 9.30 – ප.ව. 3.30", en: "9.30 AM – 3.30 PM" },
    poruwaNote: { si: "(පෝරුවේ චාරිත්‍ර පෙ.ව. 10.00 ට)", en: "(Poruwa ceremony at 10.00 AM)" },
    title: { si: "මංගල උත්සවය සහ පෝරුවේ චාරිත්‍රය", en: "Wedding Ceremony & Poruwa Rituals" },
    calendarTitle: "Wedding of Dinura & Sanuli",
    calendarDetails: "Poruwa ceremony at 10.00 AM, followed by the wedding luncheon.",
    schedule: [
      {
        time: { si: "පෙ.ව. 9.30", en: "9.30 AM" },
        label: { si: "අමුත්තන් පිළිගැනීම", en: "Welcoming our guests" },
      },
      {
        time: { si: "පෙ.ව. 10.00", en: "10.00 AM" },
        label: { si: "පෝරුවේ චාරිත්‍රය", en: "Poruwa ceremony" },
      },
      {
        time: { si: "ඉන් අනතුරුව", en: "Afterwards" },
        label: { si: "මංගල භෝජන සංග්‍රහය", en: "Wedding luncheon" },
      },
    ],
  },

  venue: {
    name: { si: "සිනමන් ලේක්සයිඩ් (කිංග්ස් කෝර්ට්)", en: "Cinnamon Lakeside (King's Court)" },
    hall: {
      si: "සිනමන් ලේක්සයිඩ් කොළඹ – කිංග්ස් කෝර්ට් මංගල ශාලාව",
      en: "Cinnamon Lakeside Colombo – King's Court Ballroom",
    },
    address: {
      si: "අංක 115, සර් චිට්ටම්පලම් ඒ. ගාර්ඩිනර් මාවත, කොළඹ 02.",
      en: "No. 115, Sir Chittampalam A. Gardiner Mawatha, Colombo 02.",
    },
    /** Text Google Maps searches for (embed + "View on map" button). */
    mapQuery:
      "Cinnamon Lakeside (King's Court), 115 Sir Chittampalam A. Gardiner Mawatha, Colombo 02",
  },

  /** The invitation sentence; the guest's name (from ?to=) sits between the two lines. */
  invite: {
    before: { si: "හෝටල් පරිශ්‍රයේ දී පැවැත්වෙන මංගල උත්සවයට", en: "With great joy, we invite" },
    guestFallback: { si: "", en: "you" },
    after: {
      si: "ඔබව අපි ගෞරවයෙන් ආරාධනා කරන්නෙමු.",
      en: "to celebrate with us at the hotel.",
    },
  },

  rsvp: {
    deadlineNote: {
      si: "ඔබගේ පැමිණීම 2026 දෙසැම්බර් 15 දිනට පෙර කරුණාකර දන්වන්න",
      en: "Kindly reply by 15 December 2026",
    },
    maxGuests: 10,
  },

  /** Replace with real numbers (international format). */
  contacts: [
    { name: { si: "දිනුර", en: "Dinura" }, phone: "+94770000000" },
    { name: { si: "සනුලි", en: "Sanuli" }, phone: "+94770000000" },
  ],

  /**
   * Photos live in /public/images. Replace the placeholder files with real photos
   * of the same name (any aspect ratio works; they are cropped to fit).
   */
  images: {
    couple: { src: "/images/couple.png", alt: "Sanuli and Dinura" },
    venue: { src: "/images/hotel.webp", alt: "Cinnamon Lakeside, Colombo" },
    gallery: [
      { src: "/images/g-1.webp", alt: "Dinura and Sanuli, photo 1" },
      { src: "/images/g-2.webp", alt: "Dinura and Sanuli, photo 2" },
      { src: "/images/g-3.webp", alt: "Dinura and Sanuli, photo 3" },
      { src: "/images/g-4.webp", alt: "Dinura and Sanuli, photo 4" },
      { src: "/images/g-5.webp", alt: "Dinura and Sanuli, photo 5" },
      { src: "/images/g-6.webp", alt: "Dinura and Sanuli, photo 6" },
    ],
  },

  /**
   * Audio lives in /public/audio. `intro` plays once when the invitation is opened
   * (e.g. magul bera drums); `music` loops afterwards. If a file is missing the
   * music button simply stays hidden. Set either to null to disable it.
   */
  audio: {
    intro: "/audio/intro.mp3" as string | null,
    music: "/audio/music.mp3" as string | null,
  },
} as const;

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  invitation.venue.mapQuery,
)}`;

export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
  invitation.venue.mapQuery,
)}&z=15&hl=en&output=embed`;
