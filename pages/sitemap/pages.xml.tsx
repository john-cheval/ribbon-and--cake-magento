import {
  excludeSitemap,
  getServerSidePropsSitemap,
  staticPathsToString,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'

/**
 * Sitemap for static/CMS pages.
 * Add any new public page path here; private pages (account, cart, checkout,
 * wishlist, search, switch-stores) are intentionally excluded.
 */
const staticPages: string[] = [
  '',              // homepage /
  'about',
  'blogs',
  'baking-classes',
  'decor-celebration',
  'contact-us',
  'privacy-policy',
  'refund-policy',
  'terms-conditions',
  'giveaway-class',
]

const excludes: string[] = [
  '*/account*',
  '*/cart*',
  '*/checkout*',
  '*/wishlist*',
  '*/search*',
  '*/switch-stores*',
  '*/404*',
  '*/no-route*',
  '*/customer*',
  '*/guest*',
  '*/compare*',
]

export const getServerSideProps: GetServerSideProps = async (context) => {
  const paths = staticPages
    .map(staticPathsToString)
    .filter(excludeSitemap(excludes))

  return getServerSidePropsSitemap(context, toSitemapFields(context, paths))
}

export default function Sitemap() { }
