import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { ArrowIcon } from "@/components/icons";
import { PageBanner, SectionHeading } from "@/components/section-heading";
import { getPage } from "@/sanity/get-page";
import { cachedSanity } from "@/sanity/live";
import { RESOURCES_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "Resources" };

const CATEGORIES = [
  { value: "academic", title: "Academic" },
  { value: "career", title: "Career & Co-op" },
  { value: "wellness", title: "Wellness" },
  { value: "campus", title: "Campus & Student Life" },
];

export default async function ResourcesPage() {
  const [page, { data: resources }] = await Promise.all([
    getPage("resources"),
    cachedSanity({ query: RESOURCES_QUERY, perspective: "published", stega: false }),
  ]);

  return (
    <main>
      <PageBanner title={page?.title ?? "Resources"} intro={page?.intro} />
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 sm:px-6">
        {resources.length === 0 && <EmptyState>Resources are coming soon.</EmptyState>}
        {CATEGORIES.map(({ value, title }) => {
          const items = resources.filter((resource) => resource.category === value);
          if (items.length === 0) return null;
          return (
            <section key={value} id={value} className="scroll-mt-24">
              <SectionHeading title={title} />
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((resource) => (
                  <li key={resource._id}>
                    <a
                      href={resource.url ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-start justify-between gap-4 rounded-lg border border-mecu-100 bg-white p-5 shadow-sm transition hover:border-mecu-500 hover:shadow-md"
                    >
                      <span>
                        <span className="block font-bold text-mecu-950 group-hover:text-mecu-700">{resource.title}</span>
                        {resource.description && <span className="mt-1 block text-sm text-zinc-600">{resource.description}</span>}
                      </span>
                      <ArrowIcon className="mt-1 size-4 shrink-0 text-mecu-500" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </main>
  );
}
