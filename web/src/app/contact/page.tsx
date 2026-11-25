import type { Metadata } from "next";
import { PageBanner } from "@/components/section-heading";
import { getSocialLinks } from "@/components/social-links";
import { getPage } from "@/sanity/get-page";
import { cachedSanity } from "@/sanity/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";

export const metadata: Metadata = { title: "Contact" };

function ContactCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border-t-4 border-gold bg-white p-6 shadow-md">
      <h2 className="text-xs font-bold uppercase tracking-wider text-mecu-700">{title}</h2>
      <div className="mt-2 break-words text-lg font-semibold text-mecu-950">{children}</div>
    </section>
  );
}

export default async function ContactPage() {
  const [page, { data: settings }] = await Promise.all([
    getPage("contact"),
    cachedSanity({ query: SITE_SETTINGS_QUERY, perspective: "published", stega: false }),
  ]);
  const socials = getSocialLinks(settings);

  return (
    <main>
      <PageBanner title={page?.title ?? "Contact"} intro={page?.intro} />
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-2">
        {settings?.email && (
          <ContactCard title="General inquiries">
            <a href={`mailto:${settings.email}`} className="hover:text-mecu-700 hover:underline">
              {settings.email}
            </a>
          </ContactCard>
        )}
        {settings?.sponsorshipEmail && (
          <ContactCard title="Sponsorship">
            <a href={`mailto:${settings.sponsorshipEmail}`} className="hover:text-mecu-700 hover:underline">
              {settings.sponsorshipEmail}
            </a>
          </ContactCard>
        )}
        {settings?.officeLocation && <ContactCard title="Find us">{settings.officeLocation}</ContactCard>}
        {settings?.officeHours && <ContactCard title="Office hours">{settings.officeHours}</ContactCard>}
        {socials.length > 0 && (
          <ContactCard title="Follow us">
            <ul className="flex flex-wrap gap-4">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-mecu-700 hover:underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </ContactCard>
        )}
      </div>
    </main>
  );
}
