import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import Events from '../../components/Events'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { MpBlogPostsDocument, MpBlogPostsQuery } from '../../graphql/BlogsByCatergoryId.gql'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any; eventsData?: MpBlogPostsQuery }
function EventsPage(props: CmsBlocksProps) {
  const { cmsBlocks, eventsData } = props
  const eventsTop = cmsBlocks.find((block) => block.identifier === 'events-top')
  const decodedEventsTop = decodeHtmlEntities(eventsTop?.content)
  return (
    <>
      <PageMeta
        title='Corporate & Events | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/Corporate & events'
      />

      <InnerTop title={'Corporate & events'} isFilter={false} />

      <Events eventsTopContent={decodedEventsTop} eventsList={eventsData} />
    </>
  )
}

EventsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default EventsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const cmsBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: ['events-top'],
    },
  })

  const eventsQuery = staticClient.query({
    query: MpBlogPostsDocument,
    variables: {
      action: 'get_post_by_categoryId',
      categoryId: 5,
      pageSize: 50,
      currentPage: 1,
    },
  })

  const cmsBlocks = (await cmsBlocksQuery)?.data?.cmsBlocks?.items
  const eventsData = (await eventsQuery)?.data?.mpBlogPosts?.items

  return {
    props: {
      ...(await layout).data,
      cmsBlocks,
      eventsData,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
