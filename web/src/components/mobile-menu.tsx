"use client";

import Link from "next/link";
import { useRef } from "react";
import { NAV_LINKS } from "./nav";

export function MobileMenu() {
  const menu = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={menu} className="group relative xl:hidden">
      <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-md text-mecu-900 hover:bg-mecu-100 [&::-webkit-details-marker]:hidden">
        <span className="sr-only">Menu</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-6 group-open:hidden" aria-hidden>
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="hidden size-6 group-open:block" aria-hidden>
          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
        </svg>
      </summary>
      <nav aria-label="Mobile" className="absolute right-0 top-14 w-60 rounded-lg border border-mecu-100 bg-white p-2 shadow-xl">
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => menu.current?.removeAttribute("open")}
                className="block rounded-md px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-800 hover:bg-mecu-100 hover:text-mecu-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
