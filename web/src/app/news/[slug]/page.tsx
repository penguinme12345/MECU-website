import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowIcon } from "@/components/icons";
import { RichText } from "@/components/rich-text";
import { formatDate } from "@/sanity/format";
import { urlFor } from "@/sanity/image";
import { cachedSanity } from "@/sanity/live";
import { ARTICLE_QUERY, ARTICLE_SLUGS_QUERY } from "@/sanity/queries";

// Dynamic slugs wait for their content instead of streaming a fallback
export const instant = false;

export async function generateStaticParams() {
  const { data } = await cachedSanity({
    query: ARTICLE_SLUGS_QUERY,
    perspective: "published",
    stega: false,
  });
  const params = data.flatMap((item) => (item.slug ? [{ slug: item.slug }] : []));
  // Cache Components requires at least one param; this placeholder 404s until articles exist
  return params.length > 0 ? params : [{ slug: "placeholder" }];
}

async function getArticle(slug: string) {
  const { data } = await cachedSanity({
    query: ARTICLE_QUERY,
    params: { slug },
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(props: PageProps<"/news/[slug]">): Promise<Metadata> {
  const article = await getArticle((await props.params).slug);
  return article ? { title: article.title, description: article.excerpt ?? undefined } : {};
}

export default async function ArticlePage(props: PageProps<"/news/[slug]">) {
  const article = await getArticle((await props.params).slug);
  if (!article) notFound();

  return (
    <main>
      <header className="bg-gradient-to-br from-mecu-900 to-mecu-700 text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mecu-300 hover:text-white"
          >
            <ArrowIcon className="size-4 rotate-180" />
            All news
          </Link>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">{article.title}</h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-gold">
            {[article.author?.name, article.publishedAt && formatDate(article.publishedAt, "long")]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <div className="h-2 bg-gold" />
      </header>
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {article.mainImage?.asset && (
          <Image
            src={urlFor(article.mainImage).width(1600).height(900).fit("crop").auto("format").url()}
            alt={article.mainImage.alt ?? ""}
            width={1600}
            height={900}
            priority
            className="mb-10 aspect-video w-full rounded-lg object-cover"
          />
        )}
        {Array.isArray(article.body) && <RichText value={article.body} />}
      </div>
    </main>
  );
}
