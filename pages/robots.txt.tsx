import {
  canonicalize,
  getServerSidePropsRobotsTxt,
  robotsTxt,
  storefrontAll,
  storefrontConfig,
} from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  const storefront = storefrontConfig(locale)

  if (!storefront) return { notFound: true }

  const allStores = storefront.domain
    ? storefrontAll.filter((store) => store.domain === storefront.domain)
    : storefrontAll.filter((store) => !store.domain)

  const checkStore = allStores.find((store) => store.defaultLocale) ?? allStores[0]
  if (storefront !== checkStore) return { notFound: true }

  const sitemapUrl = canonicalize(
    {
      defaultLocale: storefront.locale,
      pathname: '/',
      isLocaleDomain: false,
      locale: storefront.locale,
    },
    '/sitemap.xml',
  )

  const robots = robotsTxt`
    User-agent: *
    Disallow: /search
    Disallow: /account
    Disallow: /account/
    Disallow: /cart
    Disallow: /checkout
    Disallow: /wishlist
    Disallow: /switch-stores

    Sitemap: ${sitemapUrl}
  `
  return getServerSidePropsRobotsTxt(context, robots)
}

export default function RobotsTxt() { }
