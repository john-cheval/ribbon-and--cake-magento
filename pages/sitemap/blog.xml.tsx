import {
  excludeSitemap,
  getServerSidePropsSitemap,
} from '@graphcommerce/next-ui'
import type { GetServerSideProps } from 'next'
import { graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { MpBlogPostsDocument } from '../../graphql/BlogsByCatergoryId.gql'

// Category ID 18 = Blogs (confirmed from pages/blogs/index.tsx)
const BLOGS_CATEGORY_ID = 18

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context
  if (!locale) throw Error('Locale not found')

  let paths: string[] = []

  try {
    const client = graphqlSsrClient(context)
    const { data } = await client.query({
      query: MpBlogPostsDocument,
      variables: {
        action: 'get_post_by_categoryId',
        categoryId: BLOGS_CATEGORY_ID,
        pageSize: 500,
        currentPage: 1,
      },
    })

    paths = (data?.mpBlogPosts?.items ?? [])
      .map((item: { url_key?: string | null } | null) => item?.url_key)
      .filter((key): key is string => typeof key === 'string' && key.length > 0)
      .map((key: string) => `blogs/${key}`)
      .filter(excludeSitemap([]))
  } catch (err) {
    console.error('[blog.xml sitemap] Failed to fetch blog posts:', err)
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
