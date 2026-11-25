import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RichText } from "@/components/rich-text";
import { PageBanner } from "@/components/section-heading";
import { getPage } from "@/sanity/get-page";
import { cachedSanity } from "@/sanity/live";
import { PAGE_SLUGS_QUERY } from "@/sanity/queries";

// Dynamic slugs wait for their content instead of streaming a fallback
export const instant = false;

// Extra pages such as /first-year are created in the Studio
export async function generateStaticParams() {
  const { data } = await cachedSanity({
    query: PAGE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  const params = data.flatMap((item) => (item.slug ? [{ slug: item.slug }] : []));
  // Cache Components requires at least one param; "first-year" 404s until that page exists
  return params.length > 0 ? params : [{ slug: "first-year" }];
}

export async function generateMetadata(props: PageProps<"/[slug]">): Promise<Metadata> {
  const page = await getPage((await props.params).slug);
  return page ? { title: page.title, description: page.intro ?? undefined } : {};
}

export default async function Page(props: PageProps<"/[slug]">) {
  const page = await getPage((await props.params).slug);
  if (!page) notFound();

  return (
    <main>
      <PageBanner title={page.title ?? "Untitled"} intro={page.intro} />
      {Array.isArray(page.body) && (
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <RichText value={page.body} />
        </div>
      )}
    </main>
  );
}
