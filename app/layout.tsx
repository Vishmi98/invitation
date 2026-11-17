import type { Metadata, Viewport } from "next";
import {
  Abhaya_Libre,
  Cormorant_Garamond,
  Great_Vibes,
  Maname,
  Montserrat,
  Noto_Serif_Sinhala,
} from "next/font/google";
import { invitation } from "@/content/invitation";
import { LANG_SCRIPT } from "@/lib/lang-script";
import "./globals.css";

// Latin fonts come first in each stack; Sinhala glyphs fall through to the Sinhala font.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});
const abhaya = Abhaya_Libre({
  subsets: ["sinhala"],
  weight: ["400", "500", "700"],
  variable: "--font-abhaya",
});
const notoSerifSinhala = Noto_Serif_Sinhala({
  subsets: ["sinhala"],
  variable: "--font-noto-si",
});
const maname = Maname({
  subsets: ["sinhala"],
  weight: "400",
  variable: "--font-maname",
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const siteUrl = process.env.SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: invitation.site.title,
  description: invitation.site.description,
  openGraph: {
    title: invitation.site.title,
    description: invitation.site.description,
    type: "website",
  },
  // A private invitation: keep it out of search engines.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#FDF8EC",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [cormorant, abhaya, notoSerifSinhala, maname, greatVibes, montserrat].map((f) => f.variable).join(" ");
  return (
    <html lang="si" data-lang="si" data-scroll-behavior="smooth" suppressHydrationWarning className={`${fonts} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
