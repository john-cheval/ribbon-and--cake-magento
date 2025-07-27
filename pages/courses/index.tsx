import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import Courses from '../../components/courses'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { cmsPageDocument } from '../../graphql/CmsPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

function CoursesPage(props) {
  return (
    <>
      <PageMeta
        title='Courses | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/courses'
      />

      <InnerTop title={'Baking Classes'} isFilter={false} />

      <Courses />
    </>
  )
}

CoursesPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CoursesPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const cmspage = staticClient.query({
    query: cmsPageDocument,
    variables: {
      urlKey: 'courses',
    },
    fetchPolicy: cacheFirst(staticClient),
  })

  console.log((await cmspage).data, '===>cmspage')

  return {
    props: {
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
