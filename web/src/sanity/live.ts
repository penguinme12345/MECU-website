import { defineLive, type StrictDefinedFetchType } from 'next-sanity/live'
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Published content only for now; add tokens when enabling draft previews
  serverToken: false,
  browserToken: false,
  strict: true,
})

// The app's one shared 'use cache' boundary. `sanityFetch` sets cacheTag/cacheLife
// internally, and <SanityLive /> revalidates those tags when content changes.
export const cachedSanity: StrictDefinedFetchType = async (options) => {
  'use cache'
  return sanityFetch(options)
}
