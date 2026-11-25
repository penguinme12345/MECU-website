import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EVENT_CATEGORIES } from "@/components/event-categories";
import { ArrowIcon, PinIcon } from "@/components/icons";
import { formatDate, formatEventTime } from "@/sanity/format";
import { urlFor } from "@/sanity/image";
import { cachedSanity } from "@/sanity/live";
import { EVENT_QUERY, EVENT_SLUGS_QUERY } from "@/sanity/queries";

// Dynamic slugs wait for their content instead of streaming a fallback
export const instant = false;

export async function generateStaticParams() {
  const { data } = await cachedSanity({ query: EVENT_SLUGS_QUERY, perspective: "published", stega: false });
  const params = data.flatMap((item) => (item.slug ? [{ slug: item.slug }] : []));
  // Cache Components requires at least one param; this placeholder 404s until events exist
  return params.length > 0 ? params : [{ slug: "placeholder" }];
}

async function getEvent(slug: string) {
  const { data } = await cachedSanity({ query: EVENT_QUERY, params: { slug }, perspective: "published", stega: false });
  return data;
}

export async function generateMetadata(props: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = await getEvent((await props.params).slug);
  return event ? { title: event.title, description: event.description ?? undefined } : {};
}

export default async function EventPage(props: PageProps<"/events/[slug]">) {
  const event = await getEvent((await props.params).slug);
  if (!event) notFound();
  const category = event.category ? EVENT_CATEGORIES[event.category] : undefined;

  return (
    <main>
      <header className="bg-gradient-to-br from-mecu-900 to-mecu-700 text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mecu-300 hover:text-white"
          >
            <ArrowIcon className="size-4 rotate-180" />
            All events
          </Link>
          {category && <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-gold">{category.label}</p>}
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">{event.title}</h1>
        </div>
        <div className="h-2 bg-gold" />
      </header>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {event.image?.asset && (
          <Image
            src={urlFor(event.image).width(1600).height(900).fit("crop").auto("format").url()}
            alt={event.image.alt ?? ""}
            width={1600}
            height={900}
            priority
            className="mb-10 aspect-video w-full rounded-lg object-cover"
          />
        )}
        {event.startDate && (
          <dl className="grid gap-4 rounded-lg bg-mecu-100 p-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wider text-mecu-700">When</dt>
              <dd className="mt-1 font-semibold text-mecu-950">{formatDate(event.startDate, "full")}</dd>
              <dd className="text-sm text-zinc-700">{formatEventTime(event.startDate, event.endDate)}</dd>
            </div>
            {event.location && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-mecu-700">Where</dt>
                <dd className="mt-1 inline-flex items-center gap-1 font-semibold text-mecu-950">
                  <PinIcon className="size-4 shrink-0" />
                  {event.location}
                </dd>
              </div>
            )}
          </dl>
        )}
        {event.description && <p className="mt-8 whitespace-pre-line text-lg leading-8 text-zinc-800">{event.description}</p>}
        {event.registrationUrl && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-md bg-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-mecu-950 hover:brightness-105"
          >
            Register
          </a>
        )}
      </div>
    </main>
  );
}
