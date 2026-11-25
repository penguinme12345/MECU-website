import Image from "next/image";
import Link from "next/link";
import { MobileMenu } from "./mobile-menu";
import { NAV_LINKS } from "./nav";

export function SiteHeader({ announcement }: { announcement?: string | null }) {
  return (
    <>
      <a
        href="#content"
        className="sr-only z-50 rounded-md bg-white px-4 py-2 font-semibold text-mecu-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      {announcement && (
        <p className="bg-gold px-4 py-2 text-center text-xs font-semibold text-mecu-950 sm:text-sm">{announcement}</p>
      )}
      <header className="sticky top-0 z-40 border-b border-mecu-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/mecu-logo.png" alt="" width={56} height={56} priority className="size-12 sm:size-14" />
            <span className="leading-none">
              <span className="block text-3xl font-extrabold tracking-tight text-mecu-950 sm:text-4xl">MECU</span>
              <span className="mt-1 block text-[0.55rem] font-bold uppercase tracking-[0.18em] text-mecu-700 sm:text-[0.65rem]">
                Mechanical Engineering Course Union
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-zinc-800 transition-colors hover:text-mecu-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <MobileMenu />
        </div>
      </header>
    </>
  );
}
