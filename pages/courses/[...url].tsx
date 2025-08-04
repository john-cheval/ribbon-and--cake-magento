import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { getCategoryStaticPaths } from '@graphcommerce/magento-category'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { GetStaticPaths } from 'next'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import CourseInner from '../../components/courses/Innner'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export type RouteProps = { url: string[] }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

function CoursesInnerPage(props) {
  return (
    <>
      <PageMeta
        title='Courses | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/courses'
      />

      <InnerTop title={''} isFilter={false} />
      <CourseInner />
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
  console.log(paths, 'this is the paths')
  return { paths, fallback: 'blocking' }
}
export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)
  console.log(params?.url, 'params')

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
