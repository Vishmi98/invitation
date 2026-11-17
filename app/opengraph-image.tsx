import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { mandalaSvg } from "@/components/ornaments/geometry";
import { invitation } from "@/content/invitation";

// Link-preview card for WhatsApp, Facebook, Viber etc.
export const alt = invitation.site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontDir = join(process.cwd(), "assets/fonts");
const [greatVibes, cormorant, montserrat] = await Promise.all([
  readFile(join(fontDir, "GreatVibes-Regular.ttf")),
  readFile(join(fontDir, "CormorantGaramond-SemiBold.ttf")),
  readFile(join(fontDir, "Montserrat-Medium.ttf")),
]);

const mandala = `data:image/svg+xml;base64,${Buffer.from(mandalaSvg("#B98A2F", 0.1)).toString("base64")}`;

export default function OpenGraphImage() {
  const { couple, event, venue } = invitation;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "radial-gradient(circle at 50% 45%, #FFFDF6 0%, #FDF8EC 45%, #F3E6C4 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img src={mandala} width={820} height={820} style={{ position: "absolute", left: 190, top: -95, opacity: 0.28 }} />
        <div
          style={{
            position: "absolute",
            top: 26,
            left: 26,
            right: 26,
            bottom: 26,
            border: "2px solid rgba(185,138,47,0.55)",
            borderRadius: 26,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 38,
            left: 38,
            right: 38,
            bottom: 38,
            border: "1px solid rgba(185,138,47,0.3)",
            borderRadius: 18,
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontFamily: "Montserrat", fontSize: 22, letterSpacing: 9, color: "#8C6420" }}>
            WEDDING INVITATION
          </div>
          <div style={{ fontFamily: "Great Vibes", fontSize: 136, color: "#8C6420", marginTop: 6, lineHeight: 1.25 }}>
            {couple.both.en}
          </div>
          <div style={{ fontFamily: "Cormorant", fontSize: 40, color: "#5A4A33", letterSpacing: 2 }}>{event.fullDate.en}</div>
          <div style={{ fontFamily: "Cormorant", fontSize: 30, color: "#76664C", marginTop: 6 }}>{venue.name.en}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Great Vibes", data: greatVibes, style: "normal", weight: 400 },
        { name: "Cormorant", data: cormorant, style: "normal", weight: 600 },
        { name: "Montserrat", data: montserrat, style: "normal", weight: 500 },
      ],
    },
  );
}
