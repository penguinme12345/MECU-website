import { defineQuery } from 'next-sanity'

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    announcement,
    mission,
    heroImage,
    email,
    sponsorshipEmail,
    officeLocation,
    officeHours,
    instagramUrl,
    linkedinUrl,
    discordUrl,
    mailingListUrl,
    landAcknowledgment
  }
`)

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)] | order(publishedAt desc)[0...$limit]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    mainImage,
    "author": author->name
  }
`)

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    excerpt,
    publishedAt,
    mainImage,
    body,
    "author": author->{name, image},
    "categories": categories[]->{_id, title, "slug": slug.current}
  }
`)

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)]{"slug": slug.current}
`)

// isPast is a snapshot from when the result was cached; the browser re-checks it against the clock
export const EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && defined(startDate)] | order(startDate asc)[0...300]{
    _id,
    title,
    "slug": slug.current,
    category,
    startDate,
    endDate,
    location,
    description,
    registrationUrl,
    "isPast": coalesce(endDate, startDate) < now()
  }
`)

export const EVENT_QUERY = defineQuery(`
  *[_type == "event" && slug.current == $slug][0]{
    _id,
    title,
    category,
    startDate,
    endDate,
    location,
    description,
    image,
    registrationUrl
  }
`)

export const EVENT_SLUGS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current)]{"slug": slug.current}
`)

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    intro,
    body
  }
`)

// Slugs with their own route are excluded from the generic [slug] page
export const PAGE_SLUGS_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && !(slug.current in ["about", "programs", "council", "get-involved", "resources", "contact", "events", "news"])]{
    "slug": slug.current
  }
`)

export const PROGRAMS_QUERY = defineQuery(`
  *[_type == "program"] | order(order asc){
    _id,
    name,
    "slug": slug.current,
    summary,
    highlights,
    officialUrl
  }
`)

export const TEAM_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc){
    _id,
    name,
    role,
    group,
    year,
    photo,
    email,
    linkedinUrl,
    "program": program->name
  }
`)

export const RESOURCES_QUERY = defineQuery(`
  *[_type == "resource"] | order(order asc){
    _id,
    title,
    description,
    url,
    category
  }
`)

export const OPPORTUNITIES_QUERY = defineQuery(`
  *[_type == "opportunity"] | order(order asc){
    _id,
    title,
    kind,
    description,
    applyUrl,
    deadline
  }
`)
