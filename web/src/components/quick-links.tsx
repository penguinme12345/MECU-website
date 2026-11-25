import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { BookIcon, CalendarIcon, CapIcon, GearIcon, NewsIcon, UsersIcon } from "./icons";

const QUICK_LINKS: { href: string; label: string; icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { href: "/events#calendar", label: "Calendar", icon: CalendarIcon },
  { href: "/council", label: "Council", icon: UsersIcon },
  { href: "/programs", label: "Programs", icon: GearIcon },
  { href: "/resources", label: "Resources", icon: BookIcon },
  { href: "/first-year", label: "First Year", icon: CapIcon },
  { href: "/news", label: "News", icon: NewsIcon },
];

export function QuickLinks() {
  return (
    <section aria-label="Quick links" className="bg-mecu-300 shadow-[inset_0_6px_8px_-6px_rgb(0_0_0/0.25)]">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-8 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:grid-cols-6">
        {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link href={href} className="group flex flex-col items-center gap-4 text-center">
              <span className="flex size-24 items-center justify-center rounded-md bg-mecu-700 text-white shadow-md transition group-hover:-translate-y-1 group-hover:bg-mecu-800 group-hover:shadow-lg sm:size-28">
                <Icon className="size-12 sm:size-14" />
              </span>
              <span className="text-lg font-bold uppercase tracking-wide text-mecu-700 group-hover:text-mecu-900 sm:text-xl">
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
