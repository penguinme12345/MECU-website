import type { PROGRAMS_QUERY_RESULT } from "../../sanity.types";
import { ArrowIcon, GearIcon } from "./icons";

export function ProgramCard({ program, detailed }: { program: PROGRAMS_QUERY_RESULT[number]; detailed?: boolean }) {
  return (
    <article id={program.slug ?? undefined} className="flex h-full scroll-mt-24 flex-col rounded-lg border-t-4 border-gold bg-white p-6 shadow-md">
      <span className="flex size-12 items-center justify-center rounded-md bg-mecu-700 text-white">
        <GearIcon className="size-6" />
      </span>
      <h3 className="mt-4 text-xl font-extrabold text-mecu-900">{program.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-zinc-700">{program.summary}</p>
      {detailed && program.highlights && program.highlights.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-700 marker:text-mecu-500">
          {program.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}
      {detailed && program.officialUrl && (
        <a
          href={program.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-mecu-700 hover:text-mecu-900"
        >
          TMU program page
          <ArrowIcon className="size-4" />
        </a>
      )}
    </article>
  );
}
