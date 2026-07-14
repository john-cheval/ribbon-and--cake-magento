import { canonicalize, storefrontConfig } from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'

const subSitemaps = [
  '/sitemap/products.xml',
  '/sitemap/categories.xml',
  '/sitemap/pages.xml',
  '/sitemap/blog.xml',
  '/sitemap/brands.xml',
]

function buildSitemapIndex(locs: string[]): string {
  const lastmod = new Date().toISOString().split('T')[0]
  const entries = locs
    .map(
      (loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`
}

export const getServerSideProps: GetServerSideProps = async ({ res, locale }) => {
  const storefront = storefrontConfig(locale)
  if (!storefront) return { notFound: true }

  const canonicalizeOptions = {
    defaultLocale: storefront.locale,
    pathname: '/',
    isLocaleDomain: false,
    locale: storefront.locale,
  }

  const locs = subSitemaps.map((route) => canonicalize(canonicalizeOptions, route))

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(buildSitemapIndex(locs))
  res.end()

  return { props: {} }
}

export default function SitemapIndex() {
  return null
}
