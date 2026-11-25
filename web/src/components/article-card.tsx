import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/sanity/format";
import { urlFor } from "@/sanity/image";
import type { ARTICLES_QUERY_RESULT } from "../../sanity.types";

type Article = ARTICLES_QUERY_RESULT[number];

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/news/${article.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-mecu-100 bg-white shadow-sm transition hover:shadow-md">
      {article.mainImage?.asset ? (
        <Image
          src={urlFor(article.mainImage).width(800).height(500).fit("crop").auto("format").url()}
          alt={article.mainImage.alt ?? ""}
          width={800}
          height={500}
          className="aspect-[8/5] w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[8/5] items-center justify-center bg-gradient-to-br from-mecu-700 to-mecu-500">
          <span className="text-4xl font-extrabold text-white/80">MECU</span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        {article.publishedAt && (
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-mecu-500">{formatDate(article.publishedAt)}</p>
        )}
        <h3 className="mt-2 text-lg font-bold text-mecu-950 group-hover:text-mecu-700">{article.title}</h3>
        {article.excerpt && <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{article.excerpt}</p>}
      </div>
    </Link>
  );
}
