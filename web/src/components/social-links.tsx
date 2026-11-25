import type { SITE_SETTINGS_QUERY_RESULT } from "../../sanity.types";

export function getSocialLinks(settings: SITE_SETTINGS_QUERY_RESULT) {
  return [
    { label: "Instagram", href: settings?.instagramUrl },
    { label: "LinkedIn", href: settings?.linkedinUrl },
    { label: "Discord", href: settings?.discordUrl },
    { label: "Mailing list", href: settings?.mailingListUrl },
  ].flatMap(({ label, href }) => (href ? [{ label, href }] : []));
}
