import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { EmptyState } from "@/components/empty-state";
import { PageBanner } from "@/components/section-heading";
import { cachedSanity } from "@/sanity/live";
import { ARTICLES_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "News" };

export default async function NewsPage() {
  const { data: articles } = await cachedSanity({
    query: ARTICLES_QUERY,
    params: { limit: 48 },
    perspective: "published",
    stega: false,
  });

  return (
    <main>
      <PageBanner title="News" intro="Announcements and stories from the Mechanical Engineering Course Union." />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {articles.length > 0 ? (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article._id} className="flex">
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState>No news yet. Stay tuned!</EmptyState>
        )}
      </div>
    </main>
  );
}
