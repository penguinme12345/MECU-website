import { cachedSanity } from './live'
import { PAGE_QUERY } from './queries'

export async function getPage(slug: string) {
  const { data } = await cachedSanity({
    query: PAGE_QUERY,
    params: { slug },
    perspective: 'published',
    stega: false,
  })
  return data
}
