import Link from "next/link";
import { ArrowIcon } from "./icons";

export function SectionHeading({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-3xl font-extrabold uppercase tracking-tight text-mecu-700 sm:text-4xl">{title}</h2>
      {href && (
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-mecu-700 hover:text-mecu-900">
          {linkLabel}
          <ArrowIcon className="size-4" />
        </Link>
      )}
    </div>
  );
}

export function PageBanner({ title, intro }: { title: string; intro?: string | null }) {
  return (
    <section className="bg-gradient-to-br from-mecu-900 to-mecu-700 text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg text-mecu-300">{intro}</p>}
      </div>
      <div className="h-2 bg-gold" />
    </section>
  );
}
