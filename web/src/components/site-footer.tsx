import Image from "next/image";
import Link from "next/link";
import type { SITE_SETTINGS_QUERY_RESULT } from "../../sanity.types";
import { FOOTER_LINKS } from "./nav";
import { getSocialLinks } from "./social-links";

export function SiteFooter({ settings }: { settings: SITE_SETTINGS_QUERY_RESULT }) {
  const socials = getSocialLinks(settings);

  return (
    <footer className="bg-mecu-950 text-mecu-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex items-start gap-4">
            <Image src="/mecu-logo.png" alt="" width={64} height={64} className="size-16" />
            <div>
              <p className="text-2xl font-extrabold text-white">MECU</p>
              <p className="mt-1 max-w-sm text-sm">
                Mechanical Engineering Course Union
                <br />
                Toronto Metropolitan University
              </p>
            </div>
          </div>
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="mt-5 inline-block text-sm font-semibold hover:text-gold">
              {settings.email}
            </a>
          )}
          {socials.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
              {socials.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm font-semibold uppercase tracking-[0.1em]">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {settings?.landAcknowledgment && (
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Land Acknowledgment</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6">{settings.landAcknowledgment}</p>
          </div>
        </div>
      )}
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-mecu-300 sm:px-6">
          © Mechanical Engineering Course Union, Toronto Metropolitan University
        </p>
      </div>
    </footer>
  );
}
