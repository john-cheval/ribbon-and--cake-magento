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
import { PageMeta, type GetStaticProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box, Typography } from '@mui/material'
import type { GetStaticPaths } from 'next'
import type { LayoutNavigationProps } from '../components'
import { LayoutDocument, LayoutNavigation, ProductListLayoutSidebar } from '../components'
import DecorCelebration, { isDecorCelebrationContent } from '../components/DecorCelebration'
import { InnerTop } from '../components/shared/Inner/Innertop'
import type { CategoryPageQuery } from '../graphql/CategoryPage.gql'
import { CategoryPageDocument } from '../graphql/CategoryPage.gql'
import { cmsPageDocument, type cmsPageQuery } from '../graphql/CmsPage.gql'
import { fetchMagentoCmsPage, type DecorCmsPage } from '../lib/decorCelebrationCms'
import { graphqlSharedClient, graphqlSsrClient } from '../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../utils/htmlUtils'

export type CategoryProps = CategoryPageQuery &
  layoutProps &
  ProductListQuery &
  ProductFiltersQuery & { filterTypes?: FilterTypes; params?: ProductListParams } & {
    apolloState?: any
    conf?: any
    cmsPage?: cmsPageQuery['cmsPage'] | DecorCmsPage
    cmsContent?: string
  }
export type CategoryRoute = { url: string[] }
export type layoutProps = { layoutData?: any; menu?: any }

type GetPageStaticPaths = GetStaticPaths<CategoryRoute>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, CategoryProps, CategoryRoute>

function CategoryPage(props: CategoryProps) {
  const { categories, menu, apolloState, conf, cmsPage, cmsContent, ...rest } = props

  if (cmsPage && cmsContent) {
    const title =
      cmsPage.meta_title ??
      cmsPage.title ??
      cmsPage.content_heading ??
      cmsPage.identifier ??
      'Ribbons & Balloons'
    const canonical = `/${cmsPage.url_key ?? cmsPage.identifier ?? ''}`

    return (
      <>
        <PageMeta
          title={title}
          metaDescription={cmsPage.meta_description ?? undefined}
          canonical={canonical}
        />

        {isDecorCelebrationContent(cmsContent) ? (
          <DecorCelebration content={cmsContent} />
        ) : (
          <Box component='main' dangerouslySetInnerHTML={{ __html: cmsContent }} />
        )}
      </>
    )
  }

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
                  conf={conf}
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
  const rawUrlSegments = Array.isArray(params?.url) ? params.url : []
  const rawCmsIdentifier = rawUrlSegments.join('/')
  const [url, query] = extractUrlQuery(params)

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const filterTypes = getFilterTypes(client)

  const staticClient = graphqlSsrClient(context)
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const lastUrlSegment = rawUrlSegments[rawUrlSegments.length - 1]
  const cmsIdentifierCandidates = Array.from(
    new Set(
      [
        rawCmsIdentifier,
        rawCmsIdentifier.replace(/\.html$/, ''),
        Array.isArray(url) ? url.join('/') : url,
        typeof url === 'string' ? url.replace(/\.html$/, '') : undefined,
        lastUrlSegment,
        lastUrlSegment?.replace(/\.html$/, ''),
      ].filter((candidate): candidate is string => Boolean(candidate)),
    ),
  )

  let cmsPagePromise: Promise<CategoryProps['cmsPage'] | null> | undefined

  const resolveCmsPage = () => {
    cmsPagePromise ??= (async () => {
      for (const urlKey of cmsIdentifierCandidates) {
        const localCmsPage = await fetchMagentoCmsPage(urlKey, { timeoutMs: 2500 })
        if (localCmsPage?.content) return localCmsPage

        try {
          const cmsPageResult = await staticClient.query({
            query: cmsPageDocument,
            variables: { urlKey },
            fetchPolicy: 'network-only',
          })

          const cmsPage = cmsPageResult.data.cmsPage
          if (cmsPage?.content) return cmsPage
        } catch {
          // Keep checking the remaining identifier candidates before falling back to 404.
        }
      }

      return null
    })()

    return cmsPagePromise
  }

  const cmsPageResponse = async () => {
    const cmsPage = await resolveCmsPage()

    if (!cmsPage?.content) return null

    return {
      props: {
        ...(await layout).data,
        cmsPage,
        cmsContent: decodeHtmlEntities(cmsPage.content),
        apolloState: await conf.then(() => client.cache.extract()),
      },
      revalidate: 60 * 20,
    }
  }

  if (!url || !query) return (await cmsPageResponse()) ?? { notFound: true }

  const categoryPage = staticClient.query({
    query: CategoryPageDocument,
    variables: { url },
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
        fetchPolicy: 'network-only',
      })
    : undefined

  if (!hasCategory)
    return (await cmsPageResponse()) ?? redirectOrNotFound(staticClient, conf, params, locale)

  if ((await products)?.errors) {
    const totalPages = (await filters)?.data.filters?.page_info?.total_pages ?? 0
    if (productListParams?.currentPage && productListParams.currentPage > totalPages) {
      const to = productListLink({ ...productListParams, currentPage: totalPages })
      return redirectTo(to, false, locale)
    }

    return (await cmsPageResponse()) ?? { notFound: true }
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
      conf: (await conf).data,
    },
    revalidate: 60 * 20,
  }
  flushMeasurePerf()
  return result
}
