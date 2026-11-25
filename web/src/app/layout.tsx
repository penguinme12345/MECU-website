import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cachedSanity, SanityLive } from "@/sanity/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/queries";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MECU | Mechanical Engineering Course Union",
    template: "%s | MECU",
  },
  description:
    "The Mechanical Engineering Course Union at Toronto Metropolitan University: events, resources and community for Mechanical, Industrial and Mechatronics Engineering students.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const { data: settings } = await cachedSanity({
    query: SITE_SETTINGS_QUERY,
    perspective: "published",
    stega: false,
  });

  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader announcement={settings?.announcement} />
        <div id="content" className="flex-1">
          {children}
        </div>
        <SiteFooter settings={settings} />
        <SanityLive includeDrafts={false} />
      </body>
    </html>
  );
}
