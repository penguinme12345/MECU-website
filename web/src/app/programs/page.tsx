import type { Metadata } from "next";
import { EmptyState } from "@/components/empty-state";
import { ProgramCard } from "@/components/program-card";
import { PageBanner } from "@/components/section-heading";
import { getPage } from "@/sanity/get-page";
import { cachedSanity } from "@/sanity/live";
import { PROGRAMS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "Programs" };

export default async function ProgramsPage() {
  const [page, { data: programs }] = await Promise.all([
    getPage("programs"),
    cachedSanity({ query: PROGRAMS_QUERY, perspective: "published", stega: false }),
  ]);

  return (
    <main>
      <PageBanner title={page?.title ?? "Programs"} intro={page?.intro} />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {programs.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-3">
            {programs.map((program) => (
              <li key={program._id}>
                <ProgramCard program={program} detailed />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState>Program details are coming soon.</EmptyState>
        )}
      </div>
    </main>
  );
}
