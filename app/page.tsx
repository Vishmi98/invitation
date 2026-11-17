import { Cover } from "@/components/invitation/Cover";
import { CountdownSection, EventDetails } from "@/components/invitation/EventDetails";
import { FloatingControls } from "@/components/invitation/FloatingControls";
import { Gallery } from "@/components/invitation/Gallery";
import { Hero } from "@/components/invitation/Hero";
import { RevealObserver } from "@/components/invitation/RevealObserver";
import { Rsvp } from "@/components/invitation/Rsvp";
import { SaveTheDate } from "@/components/invitation/SaveTheDate";
import { SectionNav } from "@/components/invitation/SectionNav";
import { Venue } from "@/components/invitation/Venue";
import { GoldDust } from "@/components/ornaments/GoldDust";

export default function InvitationPage() {
  return (
    <>
      <Cover />
      <FloatingControls />
      <GoldDust />

      <main className="page-col">
        <Hero />
        <CountdownSection />
        <EventDetails />
        <Gallery />
        <Venue />
        <Rsvp />
        <SaveTheDate />
      </main>

      <SectionNav />
      <RevealObserver />
    </>
  );
}
