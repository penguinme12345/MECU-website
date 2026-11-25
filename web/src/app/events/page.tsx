import type { Metadata } from "next";
import { EventCalendar } from "@/components/event-calendar";
import { PastEvents, UpcomingEvents } from "@/components/event-lists";
import { PageBanner, SectionHeading } from "@/components/section-heading";
import { cachedSanity } from "@/sanity/live";
import { EVENTS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "Events" };

export default async function EventsPage() {
  const { data: events } = await cachedSanity({ query: EVENTS_QUERY, perspective: "published", stega: false });

  return (
    <main>
      <PageBanner title="Events" intro="Socials, workshops, industry nights and council meetings from MECU." />
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6">
        <section id="calendar" className="scroll-mt-24">
          <SectionHeading title="Calendar" />
          <EventCalendar events={events} />
        </section>
        <div className="mx-auto max-w-4xl space-y-16">
          <section>
            <SectionHeading title="Upcoming" />
            <UpcomingEvents events={events} />
          </section>
          <PastEvents events={events} />
        </div>
      </div>
    </main>
  );
}
