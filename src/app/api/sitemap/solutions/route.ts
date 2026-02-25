import { ISitemapField, getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { NextRequest } from 'next/server'
import { unstable_cache } from 'next/cache'

export const dynamic = 'force-dynamic'
export const revalidate = 86400 // 24 hours

const allLocale = ['en', 'vi'] as const

const getSolutionsSitemap = unstable_cache(
  async (originalUrl: string) => {
    const payload = await getPayload({ config: configPromise })
    const allSolutions: Array<{ updatedAt: string, slug: string }> = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const result = await payload.find({
        collection: 'solutions',
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
          allSolutions.push({ slug: doc.slug, updatedAt: doc.updatedAt })
        }
      })

      hasMore = result.hasNextPage
      page++

      if (page > 10) {
        console.warn(`[sitemap/solutions] Reached safety limit of 10 pages (5000 solutions)`)
        break
      }
    }

    const dateFallback = new Date().toISOString();

    const sitemap: ISitemapField[] = [
      ...allLocale.map((locale) => ({
        loc: `${originalUrl}/${locale}/solutions`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8
      })),
      // Individual solution pages can be added here when detail pages are created
      // ...allSolutions.flatMap(({ updatedAt, slug }) => allLocale.map((locale) => ({
      //   loc: `${originalUrl}/${locale}/solutions/${slug}`,
      //   lastmod: updatedAt || dateFallback,
      //   changefreq: 'weekly' as const,
      //   priority: 0.7
      // })))
    ]
    return sitemap
  },
  ['solutions-sitemap'],
  {
    tags: ['solutions-sitemap'],
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

    const sitemapXml = await getSolutionsSitemap(originalUrl)

    if (sitemapXml.length === 0) {
      return getServerSideSitemap([])
    }

    return getServerSideSitemap(sitemapXml)
  } catch (error) {
    console.error('Error generating solutions sitemap:', error)

    return getServerSideSitemap([])
  }
}
