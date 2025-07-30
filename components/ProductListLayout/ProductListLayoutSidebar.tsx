import {
  CategoryBreadcrumbs,
  CategoryChildren,
  CategoryDescription,
} from '@graphcommerce/magento-category'
import {
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProCategorySection,
  productFiltersProChipRenderer,
  ProductFiltersProClearAll,
  ProductFiltersProLimitChip,
  ProductFiltersProLimitSection,
  ProductFiltersProNoResults,
  productFiltersProSectionRenderer,
  ProductFiltersProSortChip,
  ProductFiltersProSortSection,
  ProductListCount,
  ProductListFiltersContainer,
  ProductListPagination,
  ProductListSuggestions,
} from '@graphcommerce/magento-product'
import {
  ProductFiltersProCategorySectionSearch,
  ProductFiltersProSearchTerm,
} from '@graphcommerce/magento-search'
import { Container, MediaQuery, memoDeep, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { iconCloseAccordion, iconFilterProduct, iconOpenAccordion } from '../../plugins/icons'
import { ProductListItems } from '../ProductListItems'
import type { ProductListLayoutProps } from './types'
import { useLayoutConfiguration } from './types'

const INITIAL_LOAD_SIZE = 12
const LAZY_LOAD_INCREMENT = 6

export const ProductListLayoutSidebar = memoDeep((props: ProductListLayoutProps) => {
  const { filters, filterTypes, params, products, handleSubmit, category, title, menu } = props

  const [loadedProducts, setLoadedProducts] = useState(products?.items || [])
  const [currentPage, setCurrentPage] = useState(products?.page_info?.current_page || 1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loaderRef = useRef<HTMLDivElement>(null) // Reference to the loader element

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products

  const configuration = useLayoutConfiguration(true)

  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
      handleSubmit={handleSubmit}
    >
      {/* import.meta.graphCommerce.breadcrumbs && category && (
        <Container maxWidth={false}>
          <CategoryBreadcrumbs
            category={category}
            sx={(theme) => ({
              mb: theme.spacings.sm,
              [theme.breakpoints.down('md')]: {
                '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
              },
            })}
          />
        </Container>
      ) */}

      <Container
        maxWidth={false}
        sx={(theme) => ({
          display: 'grid',
          alignItems: 'start',
          rowGap: theme.spacings.md,
          columnGap: configuration.columnGap,
          mb: theme.spacings.xl,
          gridTemplate: {
            xs: '"title" "horizontalFilters" "count" "items" "pagination"',
            md: `
            "sidebar count"      auto
            "sidebar items"      auto
            "sidebar pagination" 1fr
            /${configuration.sidebarWidth}   auto
            `,
          },
          paddingInline: { xs: '18px', md: '25px', lg: '55px' },
        })}
      >
        {/* <Box
          className='title'
          sx={(theme) => ({
            gridArea: 'title',
            display: 'grid',
            gridAutoFlow: 'row',
            rowGap: theme.spacings.xs,
          })}
        >
          {category ? (
            <>
              <Typography variant='h1'>{title}</Typography>

              <CategoryDescription
                textAlignMd='start'
                textAlignSm='start'
                description={category?.description}
              />
              <MediaQuery query={(theme) => theme.breakpoints.down('md')}>
                <CategoryChildren params={params}>{category?.children}</CategoryChildren>
              </MediaQuery>
            </>
          ) : (
            <>
              <Typography variant='h2'>
                <ProductFiltersProSearchTerm params={params}>
                  <Trans>All products</Trans>
                </ProductFiltersProSearchTerm>
              </Typography>
              <ProductListSuggestions products={products} />
            </>
          )}
        </Box> */}

        <Box sx={{ gridArea: 'items' }}>
          {products.items.length <= 0 ? (
            <ProductFiltersProNoResults search={params.search} />
          ) : (
            <ProductListItems
              {...products}
              loadingEager={6}
              title={(params.search ? `Search ${params.search}` : title) ?? ''}
              columns={configuration.columns}
            />
          )}
        </Box>

        <MediaQuery query={(theme) => theme.breakpoints.down('md')}>
          <StickyBelowHeader sx={{ gridArea: 'horizontalFilters' }}>
            <ProductListFiltersContainer
              sx={(theme) => ({
                '& .ProductListFiltersContainer-scroller': {
                  px: theme.page.horizontal,
                  mx: `calc(${theme.page.horizontal} * -1)`,
                },
              })}
            >
              <ProductFiltersProAggregations renderer={productFiltersProChipRenderer} />
              {products.items.length > 0 && (
                <>
                  <ProductFiltersProSortChip
                    total_count={total_count}
                    sort_fields={sort_fields}
                    category={category}
                  />
                  <ProductFiltersProLimitChip />
                </>
              )}

              <ProductFiltersProAllFiltersChip
                total_count={total_count}
                sort_fields={sort_fields}
                category={category}
              />
            </ProductListFiltersContainer>
          </StickyBelowHeader>
        </MediaQuery>

        <MediaQuery
          query={(theme) => theme.breakpoints.up('md')}
          display='block'
          sx={(theme) => ({
            gridArea: 'sidebar',
            mt: import.meta.graphCommerce.breadcrumbs === true ? 0 : theme.spacings.lg,
            position: 'sticky',
            top: '100px',
          })}
        >
          <ProductFiltersProClearAll sx={{ alignSelf: 'center' }} />
          <>
            {category ? (
              <ProductFiltersProCategorySection
                filterIcons={iconFilterProduct}
                category={category}
                params={params}
                hideBreadcrumbs
              />
            ) : (
              <ProductFiltersProCategorySectionSearch menu={menu} defaultExpanded />
            )}
          </>

          <ProductFiltersProAggregations renderer={productFiltersProSectionRenderer} />

          {/* Product filters */}
          {/* <ProductFiltersProSortSection
            sort_fields={sort_fields}
            total_count={total_count}
            category={category}
            openAccordionIcon={iconOpenAccordion}
            closeAccordionIcon={iconCloseAccordion}
            sx={{
              paddingTop: (theme) => theme.spacings.xs,
            }}
          /> */}
          <ProductFiltersProLimitSection />
        </MediaQuery>
      </Container>
    </ProductFiltersPro>
  )
})
