import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, flushMeasurePerf, PrivateQueryMaskProvider } from '@graphcommerce/graphql'
import {
  appendSiblingsAsChildren,
  CategoryMeta,
  findParentBreadcrumbItem,
  getCategoryStaticPaths,
} from '@graphcommerce/magento-category'
import type {
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  categoryDefaultsToProductListFilters,
  extractUrlQuery,
  getFilterTypes,
  parseParams,
  ProductFiltersDocument,
  ProductFiltersPro,
  productListApplyCategoryDefaults,
  ProductListDocument,
  productListLink,
  useProductList,
} from '@graphcommerce/magento-product'
import { redirectOrNotFound, redirectTo, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, Typography } from '@mui/material'
import type { GetStaticPaths } from 'next'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, ProductListLayoutSidebar } from '../components'
import { InnerTop } from '../components/shared/Inner/Innertop'
import type { CategoryPageQuery } from '../graphql/CategoryPage.gql'
import { CategoryPageDocument } from '../graphql/CategoryPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'

export type CategoryProps = CategoryPageQuery &
  layoutProps &
  ProductListQuery &
  ProductFiltersQuery & { filterTypes?: FilterTypes; params?: ProductListParams } & {
    apolloState?: any
  }
export type CategoryRoute = { url: string[] }
export type layoutProps = { layoutData?: any; menu?: any }

type GetPageStaticPaths = GetStaticPaths<CategoryRoute>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CategoryProps, CategoryRoute>

function CategoryPage(props: CategoryProps) {
  const { categories, menu, apolloState, ...rest } = props
  const productList = useProductList({
    ...rest,
    category: categories?.items?.[0],
  })

  const { products, params, category } = productList

  const isLanding = category?.display_mode === 'PAGE'
  const isCategory = params && category && products?.items

  const isShop = false

  const productsLength = products?.total_count ?? 0

  const contexProps = {
    ...productList,
    count: products?.total_count,
    title: category?.name ?? '',
    isFilter: true,
    id: category?.uid,
    category: category,
    isShopPage: isShop,
  }

  return (
    <PrivateQueryMaskProvider mask={productList.mask}>
      <CategoryMeta params={params} {...category} />
      <ProductFiltersPro
        params={contexProps.params ?? ({} as ProductListParams)}
        aggregations={contexProps.filters?.aggregations}
        appliedAggregations={contexProps.products?.aggregations}
        filterTypes={Object.fromEntries(
          Object.entries(contexProps.filterTypes ?? {}).map(([k, v]) => [k, v?.toString()]),
        )}
        autoSubmitMd
        handleSubmit={contexProps.handleSubmit}
      >
        {isCategory && !isLanding && (
          <InnerTop
            {...productList}
            count={products?.total_count}
            title={category.name ?? ''}
            isFilter={true}
            id={category.uid}
            category={category}
            isShopPage={isShop}
            menu={menu?.items[0]?.children}
          />
        )}
        {isCategory && !isLanding && (
          <>
            {import.meta.graphCommerce.productFiltersPro &&
              import.meta.graphCommerce.productFiltersLayout === 'SIDEBAR' && (
                <ProductListLayoutSidebar
                  {...productList}
                  key={category.uid}
                  title={category.name ?? ''}
                  id={category.uid}
                  category={category}
                  menuList={menu?.items[0]?.children}
                  conf={apolloState}
                  isShopPage={isShop}
                />
              )}
          </>
        )}
      </ProductFiltersPro>
    </PrivateQueryMaskProvider>
  )
}

const pageOptions: PageOptions<LayoutNavigationProps> = {
  Layout: LayoutNavigation,
}
CategoryPage.pageOptions = pageOptions

export default CategoryPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  // Disable getStaticPaths while in development mode
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getCategoryStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { params, locale } = context
  const [url, query] = extractUrlQuery(params)
  if (!url || !query) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(context)

  const categoryPage = staticClient.query({
    query: CategoryPageDocument,
    variables: { url },
  })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const productListParams = parseParams(url, query, await filterTypes)
  const filteredCategoryUid = productListParams && productListParams.filters.category_uid?.in?.[0]

  const category = categoryPage.then((res) => res.data.categories?.items?.[0])

  const waitForSiblings = appendSiblingsAsChildren(category, staticClient)
  let categoryUid = filteredCategoryUid
  if (!categoryUid) {
    categoryUid = (await category)?.uid ?? ''
    if (productListParams) productListParams.filters.category_uid = { in: [categoryUid] }
  }

  const hasCategory = !!productListParams && categoryUid

  const filters = hasCategory
    ? staticClient.query({
      query: ProductFiltersDocument,
      variables: categoryDefaultsToProductListFilters(
        await productListApplyCategoryDefaults(productListParams, (await conf).data, category),
      ),
    })
    : undefined

  const products = hasCategory
    ? staticClient.query({
      query: ProductListDocument,
      variables: await productListApplyCategoryDefaults(
        productListParams,
        (await conf).data,
        category,
      ),
      fetchPolicy: "network-only",
    })
    : undefined

  if (!hasCategory) return redirectOrNotFound(staticClient, conf, params, locale)

  if ((await products)?.errors) {
    const totalPages = (await filters)?.data.filters?.page_info?.total_pages ?? 0
    if (productListParams?.currentPage && productListParams.currentPage > totalPages) {
      const to = productListLink({ ...productListParams, currentPage: totalPages })
      return redirectTo(to, false, locale)
    }

    return { notFound: true }
  }

  const { category_url_path, category_name } = findParentBreadcrumbItem(await category) ?? {}

  const up =
    category_url_path && category_name
      ? { href: `/${category_url_path}`, title: category_name }
      : { href: '/', title: i18n._(/* i18n */ 'Home') }

  await waitForSiblings
  const layoutData = (await layout)?.data
  const result = {
    props: {
      ...(await categoryPage).data,
      ...(await products)?.data,
      ...(await filters)?.data,
      ...(await layout).data,
      layoutData,
      filterTypes: await filterTypes,
      params: productListParams,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
  flushMeasurePerf()
  return result
}
