import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, flushMeasurePerf, PrivateQueryMaskProvider } from '@graphcommerce/graphql'
import type { MenuQueryFragment } from '@graphcommerce/magento-category'
import type {
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  extractUrlQuery,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  ProductListDocument,
} from '@graphcommerce/magento-product'
import type { CategorySearchQuery } from '@graphcommerce/magento-search'
import {
  CategorySearchDocument,
  productListApplySearchDefaults,
  searchDefaultsToProductListFilters,
  SearchField,
  useProductList,
} from '@graphcommerce/magento-search'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, Typography } from '@mui/material'
import type { LayoutNavigationProps } from '../../components'
import {
  LayoutDocument,
  LayoutNavigation,
  ProductListLayoutClassic,
  ProductListLayoutDefault,
  ProductListLayoutSidebar,
} from '../../components'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { toTitleCase } from '../../utils/toCamelCase'

type SearchResultProps = MenuQueryFragment &
  ProductListQuery &
  ProductFiltersQuery &
  CategorySearchQuery & { filterTypes: FilterTypes; params: ProductListParams } & {
    apolloState?: any
  }
type RouteProps = { url: string[] }
export type GetPageStaticProps = GetStaticProps<
  LayoutNavigationProps,
  SearchResultProps,
  RouteProps
>

function SearchResultPage(props: SearchResultProps) {
  const { apolloState, menu: menuList } = props
  const productList = useProductList(props)
  const { params, menu, products } = productList
  const search = params.url.split('/')[1]
  const currentPath = toTitleCase(search)

  if (!menuList?.items || menuList.items.length === 0) return

  const productsLength = productList?.products?.total_count ?? 0
  if (!productsLength) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: { xs: '15px', lg: '20px' },
            color: (theme) => theme.palette.custom.main,
          }}
        >
          No Products Found For this Category
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <PageMeta
        title={
          search
            ? i18n._(/* i18n */ 'Results for ‘{search}’', { search })
            : i18n._(/* i18n */ 'Search')
        }
        metaRobots={['noindex']}
        canonical='/search'
      />
      {/*  <LayoutHeader floatingMd switchPoint={0}>
        <SearchField size='small' formControl={{ sx: { width: '81vw' } }} />
      </LayoutHeader>
       */}

      <InnerTop
        count={productList?.products?.total_count}
        title={currentPath ?? ''}
        isFilters={true}
        //id={category.uid}
        //category={category}
        // isShopPage={false}
      />

      <PrivateQueryMaskProvider mask={productList.mask}>
        {import.meta.graphCommerce.productFiltersPro &&
          import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
            <ProductListLayoutSidebar
              {...productList}
              // menu={menu}
              menuList={menuList?.items[0]?.children}
              conf={apolloState}
              isSearch={true}
            />
          )}
        {/*import.meta.graphCommerce.productFiltersPro &&
          import.meta.graphCommerce.productFiltersLayout !== 'SIDEBAR' && (
            <ProductListLayoutDefault {...productList} menu={menu} />
          )}
        {!import.meta.graphCommerce.productFiltersPro && (
          <ProductListLayoutClassic {...productList} menu={menu} />
        )*/}
      </PrivateQueryMaskProvider>
    </>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}

SearchResultPage.pageOptions = pageOptions

export default SearchResultPage

export const getServerSideProps: GetPageStaticProps = async (context) => {
  const { params } = context
  const [searchShort = '', query = []] = extractUrlQuery(params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client, true)

  const staticClient = graphqlSsrClient(context)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const productListParams = parseParams(
    search ? `search/${search}` : 'search',
    query,
    await filterTypes,
    search,
  )

  if (!productListParams) return { notFound: true }

  const filters = staticClient.query({
    query: ProductFiltersDocument,
    variables: searchDefaultsToProductListFilters(
      productListApplySearchDefaults(productListParams, (await conf).data),
    ),
  })

  const products = staticClient.query({
    query: ProductListDocument,
    variables: productListApplySearchDefaults(productListParams, (await conf).data),
  })

  const categories = false
    ? staticClient.query({ query: CategorySearchDocument, variables: { search } })
    : undefined

  const result = {
    props: {
      ...(await products).data,
      ...(await filters).data,
      ...(await categories)?.data,
      ...(await layout)?.data,
      filterTypes: await filterTypes,
      params: productListParams,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
  flushMeasurePerf()
  return result
}
