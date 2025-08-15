import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { getCategoryStaticPaths } from '@graphcommerce/magento-category'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import CourseInner from '../../components/courses/Innner'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { GetPostByNameDocument, GetPostByNameQuery } from '../../graphql/GetCourseByName.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { coursesData?: GetPostByNameQuery }
function CoursesInnerPage(props) {
  const { coursesData } = props
  const router = useRouter()
  const url = router?.query?.url
  const slug = Array.isArray(url) ? url[1] : null
  const courseDetails = useMemo(() => {
    if (!slug || !Array.isArray(coursesData)) return null

    return coursesData.find((course) => course?.url_key?.toLowerCase() === slug.toLowerCase())
  }, [slug, coursesData])

  return (
    <>
      <PageMeta
        title='Courses | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/courses'
      />

      <InnerTop title={''} isFilter={false} />
      <CourseInner course={courseDetails} />
    </>
  )
}

CoursesInnerPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CoursesInnerPage

// eslint-disable-next-line @typescript-eslint/require-await

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getCategoryStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)
  return { paths, fallback: 'blocking' }
}
export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  // const { url, query } = extractUrlQuery(context)
  // if (!url || !query) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)
  const pageurl = params?.url
  if (!pageurl?.[1]) return { notFound: true }

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const courseQuery = staticClient.query({
    query: GetPostByNameDocument,
    variables: {
      url_key: pageurl?.[1],
    },
  })
  const coursesData = (await courseQuery)?.data?.mpBlogPosts?.items
  return {
    props: {
      ...(await layout).data,
      coursesData,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
