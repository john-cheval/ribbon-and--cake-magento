import { getServerSidePropsSitemap } from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'
import type { SitemapField } from '@graphcommerce/next-ui'

/**
 * Brands sitemap.
 * Populate `brandPaths` when a brand listing page / brand-specific routes
 * are available in the store. Currently returns an empty (but valid) sitemap.
 */
const brandPaths: SitemapField[] = []

export const getServerSideProps: GetServerSideProps = async (context) => {
  return getServerSidePropsSitemap(context, brandPaths)
}

export default function Sitemap() { }
