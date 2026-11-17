/** Interface labels (buttons, headings, form text) in both languages. */

export const ui = {
  coverEyebrow: { si: "මංගල ආරාධනය", en: "Wedding Invitation" },
  coverTitle: { si: "සාදර ඇරයුමයි !", en: "You're Invited!" },
  dear: { si: "ආදරණීය", en: "Dear" },
  dearFallback: { si: "හිතවතුනි", en: "Guest" },
  open: { si: "ආරාධනය විවෘත කරන්න", en: "Open the invitation" },
  and: { si: "සහ", en: "&" },

  nav: {
    label: { si: "කොටස් සංචාලනය", en: "Section navigation" },
    home: { si: "මුල් පිටුව", en: "Home" },
    events: { si: "උත්සව විස්තර", en: "Events" },
    gallery: { si: "ඡායාරූප", en: "Album" },
    venue: { si: "ස්ථානය", en: "Map" },
    rsvp: { si: "පැමිණීම දන්වන්න", en: "RSVP" },
  },

  language: { si: "භාෂාව", en: "Invitation language" },
  music: {
    play: { si: "සංගීතය වාදනය කරන්න", en: "Play music" },
    pause: { si: "සංගීතය නවත්වන්න", en: "Pause music" },
  },

  countdown: {
    eyebrow: "Countdown",
    title: { si: "සුබ මොහොත එළඹෙන තුරු", en: "Until the auspicious moment" },
    units: {
      days: { si: "දින", en: "Days" },
      hours: { si: "පැය", en: "Hours" },
      minutes: { si: "මිනිත්තු", en: "Minutes" },
      seconds: { si: "තත්පර", en: "Seconds" },
    },
    done: { si: "සුබ මොහොත උදා විය!", en: "The auspicious day is here!" },
  },

  events: {
    eyebrow: "Event Details",
    title: { si: "උත්සව විස්තර", en: "The Celebration" },
    schedule: { si: "වැඩසටහන", en: "Programme" },
  },

  calendar: {
    button: { si: "දිනය සුරකින්න", en: "Save the date" },
    hint: { si: "ඔබගේ දින දර්ශනයට එක් කරන්න", en: "Add it to your calendar" },
  },

  gallery: {
    eyebrow: "Gallery",
    title: { si: "ඡායාරූප එකතුව", en: "Our Moments" },
    open: { si: "ඡායාරූපය විශාල කරන්න", en: "View photo" },
    prev: { si: "පෙර ඡායාරූපය", en: "Previous photo" },
    next: { si: "ඊළඟ ඡායාරූපය", en: "Next photo" },
    close: { si: "වසන්න", en: "Close" },
    dialog: { si: "ඡායාරූප නැරඹුම", en: "Photo viewer" },
  },

  venue: {
    eyebrow: "Location",
    title: { si: "උත්සව ස්ථානය", en: "The Venue" },
    map: { si: "සිතියමෙන් බලන්න", en: "View on map" },
  },

  rsvp: {
    eyebrow: "RSVP",
    title: { si: "පැමිණීම දන්වන්න", en: "Kindly Respond" },
    intro: {
      si: "ඔබගේ පැමිණීම අපට මහත් සතුටකි. කරුණාකර කලින් දන්වන්න.",
      en: "Your presence would mean the world to us. Please let us know in advance.",
    },
    name: { si: "සම්පූර්ණ නම", en: "Full name" },
    namePlaceholder: { si: "ඔබගේ නම", en: "Your name" },
    attend: { si: "සහභාගි වෙනවාද?", en: "Will you attend?" },
    yes: { si: "සතුටින් සහභාගි වෙමි", en: "Joyfully accept" },
    no: { si: "සහභාගි විය නොහැක", en: "Regretfully decline" },
    guests: { si: "අමුත්තන් ගණන", en: "Number of guests" },
    decrease: { si: "අමුත්තන් ගණන අඩු කරන්න", en: "Decrease guest count" },
    increase: { si: "අමුත්තන් ගණන වැඩි කරන්න", en: "Increase guest count" },
    submit: { si: "පිළිතුර යවන්න", en: "Send reply" },
    sending: { si: "යවමින්…", en: "Sending…" },
    errName: { si: "කරුණාකර ඔබගේ නම ඇතුළත් කරන්න.", en: "Please enter your name." },
    errAttend: { si: "කරුණාකර ඔබගේ පිළිතුර තෝරන්න.", en: "Please choose whether you can attend." },
    errForm: {
      si: "කණගාටුයි, පිළිතුර යැවීමට නොහැකි විය. කරුණාකර නැවත උත්සාහ කරන්න.",
      en: "Sorry, we couldn't send your reply. Please try again.",
    },
    thanksTitle: { si: "ස්තූතියි!", en: "Thank you!" },
    thanksYes: {
      si: "ඔබ සමඟ මෙම සුබ දිනය සැමරීමට අපි මහත් ආශාවෙන් බලා සිටිමු.",
      en: "We can't wait to celebrate this special day with you.",
    },
    thanksNo: {
      si: "අපට දැනුම් දීම ගැන ස්තූතියි. ඔබගේ සුබ පැතුම් අපට මහත් ශක්තියකි.",
      en: "Thank you for letting us know. Your blessings mean so much to us.",
    },
  },

  footer: {
    saveTheDate: "Save the date",
    love: { si: "ආදරයෙන්, දෙපවුලේ ආරාධනයයි", en: "With love, from both our families" },
    call: { si: "අමතන්න", en: "Call" },
    credit: { si: "ආදරයෙන් නිමැවුණු ආරාධනයකි", en: "Made with love for our special day" },
  },
} as const;
