import {
  excludeSitemap,
  getServerSidePropsSitemap,
  toSitemapFields,
} from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { SitemapBlogPostsDocument } from '../../graphql/SitemapBlogPosts.gql'

const excludes: string[] = []

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  if (!locale) throw Error('Locale not found')

  let paths: string[] = []

  try {
    const client = graphqlSsrClient(context)
    const { data } = await client.query({
      query: SitemapBlogPostsDocument,
      variables: { pageSize: 500, currentPage: 1 },
    })

    paths = (data?.mpBlogPosts?.items ?? [])
      .map((item: { url_key?: string | null } | null) => item?.url_key)
      .filter((key): key is string => typeof key === 'string' && key.length > 0)
      .map((key: string) => `blogs/${key}`)
      .filter(excludeSitemap(excludes))
  } catch {
    // Blog query not supported by current API — return empty sitemap
    paths = []
  }

  const fields = paths.map((path) => ({
    loc: path,
    changefreq: 'weekly' as const,
    priority: 0.6,
  }))

  return getServerSidePropsSitemap(context, fields)
}

export default function Sitemap() { }
