import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { PageMeta } from '@graphcommerce/next-ui'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation } from '../components'
import { HomePage } from '../components/Home'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../utils/htmlUtils'

export type CmsBlocksProps = { cmsBlocks?: any; layoutData?: any; menu?: any }

export type StoryProductsProps = {
  justInProducts?: any[]
  storyproducts?: any[]
  occasionsproducts: any[]
  minBytesproducts: any[]
  statementCakesProducts: any[]
}

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

export type CmsPageRouteProps = LayoutNavigationProps & CmsBlocksProps & StoryProductsProps

function CmsPage(props: CmsPageRouteProps) {
  const {
    cmsBlocks,
    justInProducts,
    storyproducts,
    menu,
    occasionsproducts,
    minBytesproducts,
    statementCakesProducts,
  } = props

  // console.log(storyproducts, 'this is the story page from the api')
  const homesHeroData = cmsBlocks.find((block) => block.identifier === 'slider')
  const cmsform = cmsBlocks.find((block) => block.identifier === 'test-form')
  const justInHome = cmsBlocks.find((block) => block.identifier === 'just-in-home')
  const homeStoryData = cmsBlocks.find((block) => block.identifier === 'home-story-title')
  const homeOccasionsData = cmsBlocks.find((block) => block.identifier === 'home-occasion-title')
  const homeMinibytsData = cmsBlocks.find((block) => block.identifier === 'home-mini-bytes')
  const homeCollectionsData = cmsBlocks.find((block) => block.identifier === 'home-collections')
  const homeCtaData = cmsBlocks.find((block) => block.identifier === 'home-cta')
  const homeCeleberationsData = cmsBlocks.find((block) => block.identifier === 'home-celeberation')
  const homeImaginationData = cmsBlocks.find((block) => block.identifier === 'home-imagination')

  const decodedHomeHero = decodeHtmlEntities(homesHeroData?.content)
  const decodedHomeHeroJustIn = decodeHtmlEntities(justInHome?.content)
  const decodedHomeStory = decodeHtmlEntities(homeStoryData?.content)
  const decodedHomeOccasions = decodeHtmlEntities(homeOccasionsData?.content)
  const decodedHomeMinibyts = decodeHtmlEntities(homeMinibytsData?.content)
  const decodedHomeCollections = decodeHtmlEntities(homeCollectionsData?.content)
  const decodedHomeCta = decodeHtmlEntities(homeCtaData?.content)
  const decodedHomeCeleberations = decodeHtmlEntities(homeCeleberationsData?.content)
  const decodedHomeImagination = decodeHtmlEntities(homeImaginationData?.content)

  const section4Data = minBytesproducts

  return (
    <>
      <PageMeta
        title='Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/'
      />

      <HomePage
        Categories={menu?.items[0]?.children}
        justInProductList={justInProducts}
        justinHeading={decodedHomeHeroJustIn}
        cakes={storyproducts}
        statementProducts={statementCakesProducts}
        occasionProdcutList={occasionsproducts}
        miniBytesProductList={minBytesproducts}
        storyTitle={decodedHomeStory}
        occasionTitle={decodedHomeOccasions}
        miniBytesTitle={decodedHomeMinibyts}
        CollectionSectionData={decodedHomeCollections}
        homeCta={decodedHomeCta}
        homeCeleberate={decodedHomeCeleberations}
        sectionFourProducts={section4Data}
        homeImagination={decodedHomeImagination}
        homeHeroData={decodedHomeHero}
      />
    </>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default CmsPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  // const url = (await conf).data.storeConfig?.cms_home_page ?? 'home'

  // const cmsPageQuery = staticClient.query({
  //   query: cmsPageDocument,
  //   variables: {
  //     urlKey: url,
  //   },
  // })

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: [
        'slider',
        'just-in-home',
        'home-story-title',
        'home-occasion-title',
        'home-mini-bytes',
        'home-collections',
        'home-cta',
        'home-imagination',
        'home-celeberation',
      ],
    },
  })

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const JustInQuery = await staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
      filters: {
        category_id: { eq: '34' },
      },
    },
  })

  const sweetStoryQuery = await staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
      filters: {
        category_id: { eq: '16' },
      },
    },
  })

  const statementCakesQuery = await staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
      filters: {
        category_id: { eq: '35' },
      },
    },
  })

  const OccasionsQuery = await staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
      filters: {
        category_id: { eq: '25' },
      },
    },
  })

  const MniBytesQuery = await staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 10,
      currentPage: 1,
      filters: {
        category_id: { eq: '28' },
      },
    },
  })

  // const result = await cmsPageQuery
  // const cmsPage = result.data.cmsPage
  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items
  const justInProducts = (await JustInQuery).data?.products?.items
  const storyproducts = (await sweetStoryQuery).data.products?.items
  const statementCakesProducts = (await statementCakesQuery).data.products?.items
  const occasionsproducts = (await OccasionsQuery).data.products?.items
  const minBytesproducts = (await MniBytesQuery).data.products?.items
  const layoutData = (await layout)?.data
  return {
    props: {
      // cmsPage: cmsPage,
      cmsBlocks,
      justInProducts,
      storyproducts,
      statementCakesProducts,
      occasionsproducts,
      minBytesproducts,
      ...(await layout).data,
      layoutData,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
