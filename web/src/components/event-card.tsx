import Link from "next/link";
import { dateParts, formatEventTime } from "@/sanity/format";
import type { EVENTS_QUERY_RESULT } from "../../sanity.types";
import { EVENT_CATEGORIES } from "./event-categories";
import { ArrowIcon, PinIcon } from "./icons";

export type CalendarEvent = EVENTS_QUERY_RESULT[number];

export function isEventPast(event: CalendarEvent, now: number | null) {
  if (now === null) return Boolean(event.isPast);
  return new Date(event.endDate ?? event.startDate!).getTime() < now;
}

export function EventCard({ event }: { event: CalendarEvent }) {
  const { month, day } = dateParts(event.startDate!);
  const category = event.category ? EVENT_CATEGORIES[event.category] : undefined;

  return (
    <article className="flex gap-4 rounded-lg border border-mecu-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:gap-5 sm:p-5">
      <div className="flex w-16 shrink-0 flex-col items-center justify-center self-start rounded-md bg-mecu-700 py-3 text-white sm:w-20">
        <span className="text-sm font-bold uppercase tracking-widest text-gold">{month}</span>
        <span className="text-3xl font-extrabold leading-none">{day}</span>
      </div>
      <div className="min-w-0 flex-1">
        {category && (
          <span className={`mb-2 inline-block rounded px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider ${category.chip}`}>
            {category.label}
          </span>
        )}
        <h3 className="text-lg font-bold text-mecu-950">
          <Link href={`/events/${event.slug}`} className="hover:text-mecu-700 hover:underline">
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600">
          <span>{formatEventTime(event.startDate!, event.endDate)}</span>
          {event.location && (
            <span className="inline-flex items-center gap-1">
              <PinIcon className="size-4 text-mecu-500" />
              {event.location}
            </span>
          )}
        </p>
        {event.description && <p className="mt-2 line-clamp-2 text-sm text-zinc-700">{event.description}</p>}
        <Link
          href={`/events/${event.slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-mecu-700 hover:text-mecu-900"
        >
          Details
          <ArrowIcon className="size-4" />
        </Link>
      </div>
    </article>
  );
}
