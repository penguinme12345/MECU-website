import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { RichText } from "@/components/rich-text";
import { PageBanner, SectionHeading } from "@/components/section-heading";
import { getSocialLinks } from "@/components/social-links";
import { formatDate } from "@/sanity/format";
import { getPage } from "@/sanity/get-page";
import { cachedSanity } from "@/sanity/live";
import { OPPORTUNITIES_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "Get Involved" };

const KIND_LABELS: Record<string, string> = {
  council: "Council role",
  volunteer: "Volunteer",
  representative: "Representative",
};

export default async function GetInvolvedPage() {
  const [page, { data: opportunities }, { data: settings }] = await Promise.all([
    getPage("get-involved"),
    cachedSanity({ query: OPPORTUNITIES_QUERY, perspective: "published", stega: false }),
    cachedSanity({ query: SITE_SETTINGS_QUERY, perspective: "published", stega: false }),
  ]);
  const socials = getSocialLinks(settings);

  return (
    <main>
      <PageBanner title={page?.title ?? "Get Involved"} intro={page?.intro} />
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 sm:px-6">
        {Array.isArray(page?.body) && page.body.length > 0 && (
          <div className="max-w-3xl">
            <RichText value={page.body} />
          </div>
        )}
        <section>
          <SectionHeading title="Opportunities" />
          {opportunities.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-3">
              {opportunities.map((opportunity) => (
                <li key={opportunity._id}>
                  <article className="flex h-full flex-col rounded-lg border-t-4 border-mecu-700 bg-white p-6 shadow-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-mecu-500">
                      {KIND_LABELS[opportunity.kind ?? ""] ?? opportunity.kind}
                    </p>
                    <h3 className="mt-2 text-lg font-extrabold text-mecu-950">{opportunity.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-zinc-700">{opportunity.description}</p>
                    {opportunity.deadline && (
                      <p className="mt-3 text-xs font-semibold text-zinc-600">
                        Apply by {formatDate(`${opportunity.deadline}T12:00:00-05:00`, "long")}
                      </p>
                    )}
                    {opportunity.applyUrl ? (
                      <a
                        href={opportunity.applyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 self-start rounded-md bg-mecu-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-mecu-800"
                      >
                        Apply
                      </a>
                    ) : (
                      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-zinc-500">Applications not open yet</p>
                    )}
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState>No open roles right now. Check back soon!</EmptyState>
          )}
        </section>
        <section className="flex flex-wrap items-center justify-between gap-6 rounded-lg bg-mecu-900 p-8 text-white">
          <div>
            <h2 className="text-2xl font-extrabold uppercase">Stay in the loop</h2>
            <p className="mt-1 text-mecu-300">Hear about events and openings first.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {socials.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gold px-4 py-2 text-sm font-bold uppercase tracking-wider text-mecu-950"
              >
                {label}
              </a>
            ))}
            <Link href="/contact" className="rounded-md border-2 border-white/70 px-4 py-2 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-mecu-900">
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
