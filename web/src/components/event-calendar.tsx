"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { dayKey, formatTime } from "@/sanity/format";
import type { CalendarEvent } from "./event-card";
import { EVENT_CATEGORIES } from "./event-categories";
import { ArrowIcon } from "./icons";
import { useNow } from "./use-now";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_MS = 86_400_000;

function toKey(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month, day)).toISOString().slice(0, 10);
}

// Multi-day events appear on every day they span
function groupByDay(events: CalendarEvent[]) {
  const days = new Map<string, CalendarEvent[]>();
  for (const event of events) {
    const startKey = dayKey(event.startDate!);
    const endKey = event.endDate ? dayKey(event.endDate) : startKey;
    let time = Date.parse(`${startKey}T00:00:00Z`);
    const last = Math.min(Date.parse(`${endKey}T00:00:00Z`), time + 31 * DAY_MS);
    for (; time <= last; time += DAY_MS) {
      const key = new Date(time).toISOString().slice(0, 10);
      days.set(key, [...(days.get(key) ?? []), event]);
    }
  }
  return days;
}

export function EventCalendar({ events }: { events: CalendarEvent[] }) {
  const now = useNow();
  const [visibleMonth, setVisibleMonth] = useState<{ year: number; month: number } | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const eventsByDay = useMemo(() => groupByDay(events), [events]);

  if (now === null) {
    return <div className="h-[34rem] animate-pulse rounded-lg bg-mecu-100" aria-label="Loading calendar" />;
  }

  const todayKey = dayKey(now);
  const [todayYear, todayMonth] = todayKey.split("-").map(Number);
  const { year, month } = visibleMonth ?? { year: todayYear, month: todayMonth - 1 };
  const leadingBlanks = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const monthLabel = new Date(Date.UTC(year, month, 1)).toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const changeMonth = (delta: number) => {
    const next = new Date(Date.UTC(year, month + delta, 1));
    setVisibleMonth({ year: next.getUTCFullYear(), month: next.getUTCMonth() });
    setSelectedDay(null);
  };
  const goToToday = () => {
    setVisibleMonth(null);
    setSelectedDay(todayKey);
  };

  const monthPrefix = toKey(year, month, 1).slice(0, 7);
  const listedEvents = selectedDay
    ? (eventsByDay.get(selectedDay) ?? [])
    : events.filter((event) =>
        [...eventsByDay.entries()].some(([key, dayEvents]) => key.startsWith(monthPrefix) && dayEvents.includes(event)),
      );
  const listHeading = selectedDay
    ? new Date(`${selectedDay}T12:00:00Z`).toLocaleDateString("en-CA", { dateStyle: "full", timeZone: "UTC" })
    : `All events in ${monthLabel}`;

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="rounded-lg border border-mecu-100 bg-white p-3 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h3 aria-live="polite" className="text-xl font-extrabold uppercase tracking-tight text-mecu-900 sm:text-2xl">
            {monthLabel}
          </h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToToday}
              className="h-10 rounded-md border border-mecu-300 px-3 text-xs font-bold uppercase tracking-wider text-mecu-700 hover:bg-mecu-100"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
              className="flex size-10 items-center justify-center rounded-md bg-mecu-700 text-white hover:bg-mecu-800"
            >
              <ArrowIcon className="size-4 rotate-180" />
            </button>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
              className="flex size-10 items-center justify-center rounded-md bg-mecu-700 text-white hover:bg-mecu-800"
            >
              <ArrowIcon className="size-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px overflow-hidden rounded-md border border-mecu-100 bg-mecu-100">
          {WEEKDAYS.map((weekday) => (
            <div key={weekday} className="bg-mecu-700 py-2 text-center text-[0.65rem] font-bold uppercase tracking-wider text-white sm:text-xs">
              {weekday}
            </div>
          ))}
          {Array.from({ length: leadingBlanks }, (_, index) => (
            <div key={`blank-${index}`} className="bg-mecu-100/60" />
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const key = toKey(year, month, day);
            const dayEvents = eventsByDay.get(key) ?? [];
            const isToday = key === todayKey;
            const isSelected = key === selectedDay;
            const dayLabel = new Date(`${key}T12:00:00Z`).toLocaleDateString("en-CA", { dateStyle: "long", timeZone: "UTC" });

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedDay(isSelected ? null : key)}
                aria-pressed={isSelected}
                aria-label={`${dayLabel}, ${dayEvents.length} ${dayEvents.length === 1 ? "event" : "events"}`}
                className={`flex min-h-12 min-w-0 flex-col items-start gap-1 p-1 text-left transition sm:min-h-24 sm:p-1.5 ${
                  isSelected ? "bg-mecu-300" : "bg-white hover:bg-mecu-100"
                }`}
              >
                <span
                  className={`flex size-6 items-center justify-center rounded-full text-xs font-bold ${
                    isToday ? "bg-gold text-mecu-950" : "text-zinc-700"
                  }`}
                >
                  {day}
                </span>
                <span className="flex flex-wrap gap-0.5 px-0.5 sm:hidden">
                  {dayEvents.slice(0, 3).map((event) => (
                    <span
                      key={event._id}
                      className={`size-1.5 rounded-full ${EVENT_CATEGORIES[event.category ?? ""]?.dot ?? "bg-mecu-700"}`}
                    />
                  ))}
                </span>
                <span className="hidden w-full flex-col gap-0.5 sm:flex">
                  {dayEvents.slice(0, 2).map((event) => (
                    <span
                      key={event._id}
                      className={`truncate rounded px-1 py-0.5 text-[0.65rem] font-semibold ${
                        EVENT_CATEGORIES[event.category ?? ""]?.chip ?? "bg-mecu-700 text-white"
                      }`}
                    >
                      {event.title?.replace("[Placeholder] ", "")}
                    </span>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="px-1 text-[0.65rem] font-semibold text-mecu-700">+{dayEvents.length - 2} more</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {Object.entries(EVENT_CATEGORIES).map(([value, { label, dot }]) => (
            <li key={value} className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600">
              <span className={`size-2.5 rounded-full ${dot}`} />
              {label}
            </li>
          ))}
        </ul>
      </div>

      <aside className="rounded-lg bg-mecu-100 p-5">
        <h3 className="font-extrabold text-mecu-900">{listHeading}</h3>
        {listedEvents.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {listedEvents.map((event) => (
              <li key={event._id}>
                <Link href={`/events/${event.slug}`} className="block rounded-md bg-white p-3 shadow-sm hover:shadow-md">
                  <span className="block text-xs font-bold uppercase tracking-wide text-mecu-700">
                    {new Date(event.startDate!).toLocaleDateString("en-CA", {
                      month: "short",
                      day: "numeric",
                      timeZone: "America/Toronto",
                    })}{" "}
                    · {formatTime(event.startDate!)}
                  </span>
                  <span className="mt-1 block text-sm font-bold text-mecu-950">{event.title}</span>
                  {event.location && <span className="mt-0.5 block text-xs text-zinc-600">{event.location}</span>}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-zinc-600">Nothing scheduled.</p>
        )}
      </aside>
    </div>
  );
}
