import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, PageMeta } from '@graphcommerce/next-ui'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '../../components'
import About from '../../components/About'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>
export type CmsBlocksProps = { cmsBlocks?: any }
function AboutPage(props: CmsBlocksProps) {
  const { cmsBlocks } = props
  const abuotLeft = cmsBlocks.find((block) => block.identifier === 'about-left')
  const abuotTopCenter = cmsBlocks.find((block) => block.identifier === 'about-top-center')
  const aboutTopRight = cmsBlocks.find((block) => block.identifier === 'about-top-right')
  const decodedAboutLeft = decodeHtmlEntities(abuotLeft?.content)
  const decodedAboutTopCenter = decodeHtmlEntities(abuotTopCenter?.content)
  const decodedAboutTopRight = decodeHtmlEntities(aboutTopRight?.content)
  console.log(decodedAboutTopRight, 'decodedAboutTopCenter')
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
      blockIdentifiers: ['about-left', 'about-top-center', 'about-top-right'],
    },
  })

  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items

  return {
    props: {
      ...(await layout).data,
      cmsBlocks,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
