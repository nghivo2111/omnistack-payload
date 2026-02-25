import { ISitemapField, getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest } from 'next/server'
import { unstable_cache } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

const allLocale = ['en', 'vi'] as const

const getIndustriesSitemap = unstable_cache(
  async (originalUrl: string) => {
    const payload = await getPayload({ config: configPromise })
    const allIndustries: Array<{ updatedAt: string, slug: string }> = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const result = await payload.find({
        collection: 'industries',
        limit: 500,
        page,
        depth: 0,
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      result.docs.forEach((doc) => {
        if (doc.slug) {
          allIndustries.push({ slug: doc.slug, updatedAt: doc.updatedAt })
        }
      })

      hasMore = result.hasNextPage
      page++

      if (page > 10) {
        console.warn(`[sitemap/industries] Reached safety limit of 10 pages (5000 industries)`)
        break
      }
    }

    const dateFallback = new Date().toISOString();

    const sitemap: ISitemapField[] = [
      ...allLocale.map((locale) => ({
        loc: `${originalUrl}/${locale}/industries`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8
      })),
      // Individual industry pages can be added here when detail pages are created
      // ...allIndustries.flatMap(({ updatedAt, slug }) => allLocale.map((locale) => ({
      //   loc: `${originalUrl}/${locale}/industries/${slug}`,
      //   lastmod: updatedAt || dateFallback,
      //   changefreq: 'weekly' as const,
      //   priority: 0.7
      // })))
    ]
    return sitemap
  },
  ['industries-sitemap'],
  {
    tags: ['industries-sitemap'],
    revalidate: 86400,
  }
)

export async function GET(request: NextRequest) {
  try {
    const hostname = request.headers.get('host') || ''
    const protocol = hostname.includes('localhost') ? 'http' : 'https'
    const originalUrl = `${protocol}://${hostname}`

    if(!hostname) {
      return new Response('Host not found', { status: 400 })
    }

    const sitemapXml = await getIndustriesSitemap(originalUrl)

    if (sitemapXml.length === 0) {
      return getServerSideSitemap([])
    }

    return getServerSideSitemap(sitemapXml)
  } catch (error) {
    console.error('Error generating industries sitemap:', error)

    return getServerSideSitemap([])
  }
}
