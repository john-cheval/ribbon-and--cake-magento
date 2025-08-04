import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { ProductListDocument } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { PageMeta } from '@graphcommerce/next-ui'
// import { Button, Container, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, productListRenderer } from '../components'
import { HomePage } from '../components/Home'
import { cmsMultipleBlocksDocument } from '../graphql/CmsMultipleBlocks.gql'
import { cmsPageDocument } from '../graphql/CmsPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../utils/htmlUtils'

// import { CmsPageContent, CmsPageDocument } from '@graphcommerce/magento-cms'
// import type { CmsPageQueryFragment } from '@graphcommerce/magento-cms'

export type CmsPageProps = { cmsPage?: any }
export type CmsBlocksProps = { cmsBlocks?: any }

export type StoryProductsProps = { storyproducts?: any[] }

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

export type CmsPageRouteProps = LayoutNavigationProps &
  CmsPageProps &
  CmsBlocksProps &
  StoryProductsProps

function CmsPage(props: CmsPageRouteProps) {
  const { cmsPage, cmsBlocks, storyproducts } = props

  // console.log(storyproducts, 'this is the story page from the api')
  const cmsDummy = cmsBlocks.find((block) => block.identifier === 'slider')
  const cmsform = cmsBlocks.find((block) => block.identifier === 'test-form')

  const hd = cmsDummy?.content.replaceAll('&gt;', '>')
  const hh = hd.replaceAll('&lt;', '<')

  const decodedH = decodeHtmlEntities(cmsDummy?.content || '')

  return (
    <>
      <PageMeta
        title='Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/'
      />

      {/* decodedH && <div dangerouslySetInnerHTML={{ __html: decodedH }}></div> */}
      <HomePage dummy={hh} />

      {/* <div>{cmsDummy?.content}</div> 
      <div dangerouslySetInnerHTML={{ __html: cmsform?.content }}></div>*/}
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

  const url = (await conf).data.storeConfig?.cms_home_page ?? 'home'

  const cmsPageQuery = staticClient.query({
    query: cmsPageDocument,
    variables: {
      urlKey: url,
    },
  })

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: ['slider', 'just-in-home', 'test-form'],
    },
  })

  const cmsBlocks = (await cmsPageBlocksQuery)?.data.cmsBlocks?.items

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const result = await cmsPageQuery

  const cmsPage = result.data.cmsPage
  const sweetStoryQuery = staticClient.query({
    query: ProductListDocument,
    variables: {
      pageSize: 30,
      filter: {
        category_id: { in: ['3', '7'] },
      },
    },
  })

  const storyproducts = (await sweetStoryQuery).data.products?.items

  return {
    props: {
      cmsPage: cmsPage,
      cmsBlocks,
      storyproducts: storyproducts,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
