import type { Metadata } from "next";
import Link from "next/link";
import { ProgramCard } from "@/components/program-card";
import { RichText } from "@/components/rich-text";
import { PageBanner, SectionHeading } from "@/components/section-heading";
import { getPage } from "@/sanity/get-page";
import { cachedSanity } from "@/sanity/live";
import { PROGRAMS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "About Us" };

export default async function AboutPage() {
  const [page, { data: programs }] = await Promise.all([
    getPage("about"),
    cachedSanity({ query: PROGRAMS_QUERY, perspective: "published", stega: false }),
  ]);

  return (
    <main>
      <PageBanner title={page?.title ?? "About Us"} intro={page?.intro} />
      {Array.isArray(page?.body) && page.body.length > 0 && (
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <RichText value={page.body} />
        </div>
      )}
      <section className="bg-mecu-100">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <SectionHeading title="Who we represent" href="/programs" linkLabel="All programs" />
          <ul className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <li key={program._id}>
                <ProgramCard program={program} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-14 sm:px-6">
        <h2 className="text-2xl font-extrabold uppercase text-mecu-700 sm:text-3xl">Meet the people behind MECU</h2>
        <Link
          href="/council"
          className="rounded-md bg-mecu-700 px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-white hover:bg-mecu-800"
        >
          View council
        </Link>
      </section>
    </main>
  );
}
