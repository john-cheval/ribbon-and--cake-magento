import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import About from '../../components/About'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { MpBlogPostsDocument, MpBlogPostsQuery } from '../../graphql/BlogsByCatergoryId.gql'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any; testimoanialsData?: MpBlogPostsQuery }
function AboutPage(props: CmsBlocksProps) {
  const { cmsBlocks, testimoanialsData } = props
  const abuotLeft = cmsBlocks.find((block) => block.identifier === 'about-left')
  const abuotSectionTwoLeft = cmsBlocks.find(
    (block) => block.identifier === 'about-section-two-left',
  )
  const abuotTopCenter = cmsBlocks.find((block) => block.identifier === 'about-top-center')
  const aboutTopRight = cmsBlocks.find((block) => block.identifier === 'about-top-right')
  const aboutSectionTwoRight = cmsBlocks.find(
    (block) => block.identifier === 'about-section-two-right',
  )
  const aboutClients = cmsBlocks.find((block) => block.identifier === 'clients')
  const decodedAboutLeft = decodeHtmlEntities(abuotLeft?.content)
  const decodedAboutSectionTwoLeft = decodeHtmlEntities(abuotSectionTwoLeft?.content)
  const decodedAboutTopCenter = decodeHtmlEntities(abuotTopCenter?.content)
  const decodedAboutTopRight = decodeHtmlEntities(aboutTopRight?.content)
  const decodedAboutTwoRight = decodeHtmlEntities(aboutSectionTwoRight?.content)
  const decodedAboutclients = decodeHtmlEntities(aboutClients?.content)
  return (
    <>
      <PageMeta
        title='About | Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/about'
      />

      <InnerTop title={'About'} isFilter={false} responsiveTitle='Our Story' />

      <About
        left={decodedAboutLeft}
        topCenter={decodedAboutTopCenter}
        topRight={decodedAboutTopRight}
        testimonials={testimoanialsData}
        clients={decodedAboutclients}
        sectionTwoRight={decodedAboutTwoRight}
        sectionTwoLeft={decodedAboutSectionTwoLeft}
      />
    </>
  )
}

AboutPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default AboutPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: [
        'about-left',
        'about-top-center',
        'about-top-right',
        'clients',
        'about-section-two-left',
        'about-section-two-right',
      ],
    },
  })

  const testimoanialQuery = staticClient.query({
    query: MpBlogPostsDocument,
    variables: {
      action: 'get_post_by_categoryId',
      categoryId: 6,
      pageSize: 50,
      currentPage: 1,
    },
  })

  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items
  const testimoanialsData = (await testimoanialQuery)?.data?.mpBlogPosts?.items

  return {
    props: {
      ...(await layout).data,
      cmsBlocks,
      testimoanialsData,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
