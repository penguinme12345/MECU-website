import type { Metadata } from "next";
import Image from "next/image";
import { EmptyState } from "@/components/empty-state";
import { PageBanner, SectionHeading } from "@/components/section-heading";
import { getPage } from "@/sanity/get-page";
import { urlFor } from "@/sanity/image";
import { cachedSanity } from "@/sanity/live";
import { TEAM_QUERY } from "@/sanity/queries";
import type { TEAM_QUERY_RESULT } from "../../../sanity.types";

export const metadata: Metadata = { title: "Council" };

const GROUPS = [
  { value: "executive", title: "Executive Team" },
  { value: "director", title: "Directors" },
  { value: "representative", title: "Program Representatives" },
];

function MemberCard({ member }: { member: TEAM_QUERY_RESULT[number] }) {
  return (
    <article className="flex h-full flex-col items-center rounded-lg border border-mecu-100 bg-white p-5 text-center shadow-sm">
      {member.photo?.asset ? (
        <Image
          src={urlFor(member.photo).width(240).height(240).fit("crop").auto("format").url()}
          alt={member.photo.alt ?? member.name ?? ""}
          width={120}
          height={120}
          className="size-28 rounded-full object-cover"
        />
      ) : (
        <span aria-hidden className="flex size-28 items-center justify-center rounded-full bg-mecu-300 text-3xl font-extrabold text-mecu-800">
          {member.role?.charAt(0)}
        </span>
      )}
      <h3 className="mt-4 font-bold text-mecu-950">{member.name}</h3>
      <p className="text-sm font-semibold text-mecu-700">{member.role}</p>
      <p className="mt-1 text-xs text-zinc-600">{[member.program, member.year].filter(Boolean).join(" · ")}</p>
      {(member.email || member.linkedinUrl) && (
        <p className="mt-3 flex flex-wrap justify-center gap-3 text-xs font-bold">
          {member.email && (
            <a href={`mailto:${member.email}`} className="text-mecu-700 hover:underline">
              Email
            </a>
          )}
          {member.linkedinUrl && (
            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-mecu-700 hover:underline">
              LinkedIn
            </a>
          )}
        </p>
      )}
    </article>
  );
}

export default async function CouncilPage() {
  const [page, { data: team }] = await Promise.all([
    getPage("council"),
    cachedSanity({ query: TEAM_QUERY, perspective: "published", stega: false }),
  ]);

  return (
    <main>
      <PageBanner title={page?.title ?? "Council"} intro={page?.intro} />
      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 sm:px-6">
        {team.length === 0 && <EmptyState>Council members are coming soon.</EmptyState>}
        {GROUPS.map(({ value, title }) => {
          const members = team.filter((member) => member.group === value);
          if (members.length === 0) return null;
          return (
            <section key={value}>
              <SectionHeading title={title} />
              <ul className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {members.map((member) => (
                  <li key={member._id}>
                    <MemberCard member={member} />
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
