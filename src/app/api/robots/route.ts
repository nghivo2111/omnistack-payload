import { getServerSideURL } from '@/utilities/getURL'
import { NextResponse } from 'next/server'

export async function GET() {
  const url = await getServerSideURL()
  const defaultRobotContent = `# *
  User-agent: *
  Disallow: /admin/
  
  # Host
  Host: ${url}
  
  # Sitemaps
  Sitemap: ${url}/sitemap.xml
  Sitemap: ${url}/pages-sitemap.xml
  Sitemap: ${url}/blog-sitemap.xml
  Sitemap: ${url}/industries-sitemap.xml
  Sitemap: ${url}/solutions-sitemap.xml
  Sitemap: ${url}/technologies-sitemap.xml
  `

  return new NextResponse(defaultRobotContent, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    },
  })
}
