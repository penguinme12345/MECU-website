import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { CircuitPattern } from "@/components/circuit-pattern";
import { EmptyState } from "@/components/empty-state";
import { UpcomingEvents } from "@/components/event-lists";
import { QuickLinks } from "@/components/quick-links";
import { SectionHeading } from "@/components/section-heading";
import { urlFor } from "@/sanity/image";
import { cachedSanity } from "@/sanity/live";
import { ARTICLES_QUERY, EVENTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

export default async function Home() {
  const [{ data: events }, { data: articles }, { data: settings }] = await Promise.all([
    cachedSanity({ query: EVENTS_QUERY, perspective: "published", stega: false }),
    cachedSanity({ query: ARTICLES_QUERY, params: { limit: 3 }, perspective: "published", stega: false }),
    cachedSanity({ query: SITE_SETTINGS_QUERY, perspective: "published", stega: false }),
  ]);

  return (
    <main>
      <section className="relative overflow-hidden bg-gradient-to-br from-mecu-950 via-mecu-800 to-mecu-700 text-white">
        {settings?.heroImage?.asset && (
          <>
            <Image
              src={urlFor(settings.heroImage).width(2000).height(1100).fit("crop").auto("format").url()}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-mecu-900/75" />
          </>
        )}
        <CircuitPattern className="absolute inset-0 h-full w-full text-mecu-500/20" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[auto_1fr] md:py-24 lg:gap-16">
          <Image
            src="/mecu-logo.png"
            alt="MECU logo"
            width={420}
            height={420}
            priority
            className="mx-auto size-56 drop-shadow-2xl sm:size-72 lg:size-[26rem]"
          />
          <div className="text-center md:text-left">
            <p className="text-3xl font-extrabold uppercase tracking-tight sm:text-5xl">Welcome to the</p>
            <h1 className="mt-2 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Mechanical Engineering <span className="text-gold">Course Union</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-mecu-300 md:text-xl">
              {settings?.mission}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/events"
                className="rounded-md bg-gold px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-mecu-950 shadow-lg transition hover:brightness-105"
              >
                Upcoming Events
              </Link>
              <Link
                href="/get-involved"
                className="rounded-md border-2 border-white/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-mecu-900"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      <QuickLinks />

      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
        <section>
          <SectionHeading title="Upcoming Events" href="/events" linkLabel="All events" />
          <UpcomingEvents events={events} limit={4} />
        </section>

        <section>
          <SectionHeading title="Latest News" href="/news" linkLabel="All news" />
          {articles.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {articles.map((article) => (
                <li key={article._id} className="flex">
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No news yet. Stay tuned!</EmptyState>
          )}
        </section>
      </div>
    </main>
  );
}
