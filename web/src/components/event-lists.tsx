"use client";

import { EmptyState } from "./empty-state";
import { type CalendarEvent, EventCard, isEventPast } from "./event-card";
import { SectionHeading } from "./section-heading";
import { useNow } from "./use-now";

function EventList({ events, muted }: { events: CalendarEvent[]; muted?: boolean }) {
  return (
    <ul className={`space-y-4 ${muted ? "opacity-80" : ""}`}>
      {events.map((event) => (
        <li key={event._id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}

export function UpcomingEvents({ events, limit }: { events: CalendarEvent[]; limit?: number }) {
  const now = useNow();
  const upcoming = events.filter((event) => !isEventPast(event, now)).slice(0, limit);

  return upcoming.length > 0 ? (
    <EventList events={upcoming} />
  ) : (
    <EmptyState>No upcoming events right now. Check back soon!</EmptyState>
  );
}

export function PastEvents({ events }: { events: CalendarEvent[] }) {
  const now = useNow();
  const past = events
    .filter((event) => isEventPast(event, now))
    .reverse()
    .slice(0, 12);
  if (past.length === 0) return null;

  return (
    <section>
      <SectionHeading title="Past events" />
      <EventList events={past} muted />
    </section>
  );
}
