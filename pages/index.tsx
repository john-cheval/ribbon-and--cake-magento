import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import { getCategoryStaticPaths } from '@graphcommerce/magento-category'
import { ProductListDocument } from '@graphcommerce/magento-product'
// import {
//   ProductListDocument,
//   ProductListQuery,
//   ProductPageName,
// } from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  isTypename,
  // breakpointVal,
  // HeroBanner,
  LayoutHeader,
  LayoutTitle,
  // MetaRobots,
  PageMeta,
} from '@graphcommerce/next-ui'
// import { Button, Container, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, productListRenderer } from '../components'
import { HomePage } from '../components/Home'
import { cmsPageDocument } from '../graphql/CmsPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

// import { CmsPageContent, CmsPageDocument } from '@graphcommerce/magento-cms'
// import type { CmsPageQueryFragment } from '@graphcommerce/magento-cms'

export type CmsPageProps = { cmsPage?: any }
export type StoryProductsProps = { storyproducts?: any[] }

type GetPageStaticProps = GetStaticProps<LayoutNavigationProps>

export type CmsPageRouteProps = LayoutNavigationProps & CmsPageProps & StoryProductsProps

function CmsPage(props: CmsPageRouteProps) {
  const { cmsPage, storyproducts } = props

  // console.log(storyproducts, 'this is the story page from the api')

  // console.log(props, 'this is the props from the api')

  return (
    <>
      {/* <PageMeta
      title={page?.metaTitle ?? page?.title ?? ''}
      metaDescription={page?.metaDescription ?? ''}
      metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
      canonical='/'
    /> */}

      <PageMeta
        title='Ribbon and Balloons'
        metaDescription='Custom cakes, handcrafted desserts — made for your moment.'
        // metaRobots={page?.metaRobots.toLowerCase().split('_') as MetaRobots[] | undefined}
        canonical='/'
      />

      {/*  <LayoutHeader floatingMd hideMd={import.meta.graphCommerce.breadcrumbs}>
        <LayoutTitle size='small' component='span'>
          Home
        </LayoutTitle>
      </LayoutHeader>

      <LayoutHeader floatingMd floatingSm /> */}

      <HomePage />

      {/*  <div dangerouslySetInnerHTML={{__html:cmsPage?.content}}></div> */}
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

  const cmsPageQuery = staticClient.query({ query: cmsPageDocument, variables: { urlKey: url } })

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const cmsPage = (await cmsPageQuery).data.cmsPage

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

  // console.log(storyproducts, 'this is the sweet story query')

  return {
    props: {
      cmsPage: cmsPage,
      storyproducts: storyproducts,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
