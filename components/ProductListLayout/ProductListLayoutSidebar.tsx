import { Image } from '@graphcommerce/image'
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
  useProductFiltersPro,
  useProductFiltersProClearAllAction,
} from '@graphcommerce/magento-product'
import {
  ProductFiltersProCategorySectionSearch,
  ProductFiltersProSearchTerm,
} from '@graphcommerce/magento-search'
import { Container, MediaQuery, memoDeep, StickyBelowHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { iconCloseAccordion, iconFilterProduct, iconOpenAccordion } from '../../plugins/icons'
import filterSvg from '../Assets/filter.svg'
import mix from '../Assets/mix.svg'
import { ProductListItems } from '../ProductListItems'
import CustomSelectInput from '../shared/Inputs/CustomSelectInput'
import type { ProductListLayoutProps } from './types'
import { useLayoutConfiguration } from './types'

const INITIAL_LOAD_SIZE = 12
const LAZY_LOAD_INCREMENT = 6

export const ProductListLayoutSidebar = memoDeep((props: ProductListLayoutProps) => {
  const { filters, filterTypes, params, products, handleSubmit, category, title, menu, menuList } =
    props

  const [loadedProducts, setLoadedProducts] = useState(products?.items || [])
  const [currentPage, setCurrentPage] = useState(products?.page_info?.current_page || 1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loaderRef = useRef<HTMLDivElement>(null) // Reference to the loader element

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products

  const configuration = useLayoutConfiguration(true)

  const [sortValue, setSortValue] = useState('Latest')
  const handleSortChange = (event: SelectChangeEvent) => {
    setSortValue(event.target.value as string)
  }
  const [scroll, setScroll] = useState<boolean>(false)
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    // return window.removeEventListener('scroll', handleScroll)
  }, [])
  // const { form } = useProductFiltersPro()
  //const clearAll = useProductFiltersProClearAllAction()
  return (
    <ProductFiltersPro
      params={params}
      aggregations={filters?.aggregations}
      appliedAggregations={products?.aggregations}
      filterTypes={filterTypes}
      autoSubmitMd
      handleSubmit={handleSubmit}
    >
      <Container
        maxWidth={false}
        sx={(theme) => ({
          display: 'grid',
          alignItems: 'start',
          rowGap: { xs: 0, md: theme.spacings.md },
          columnGap: { xs: '30px', md: '50px', lg: '60px', xl: '70px' },
          mb: theme.spacings.xl,
          gridTemplate: {
            xs: '"title" "horizontalFilters"  "items" ',
            md: `
            "sidebar count"      auto
            "sidebar items"      auto
            /${configuration.sidebarWidth}   auto
            `,
          },
          paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        })}
      >
        <Box
          sx={{
            gridArea: 'items',
            '& .ProductListItemsBase-root': {
              gap: { xs: '15px', md: '20px' },
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4,1fr)',
              },

              '& .ProductListItem-titleContainer .MuiButtonBase-root': {
                width: '40px',
                height: '40px',
              },
            },
            '& .ProductListItem-imageContainer .ProductListItem-topRight button': {
              padding: { xs: '8px', xl: '10px' },
            },
            '& .ProductListItem-imageContainer .ProductListItem-topRight svg': {
              fontSize: { xs: '20px', xl: '22px' },
            },
          }}
        >
          {products.items.length <= 0 ? (
            <ProductFiltersProNoResults search={params.search} />
          ) : (
            <ProductListItems
              {...products}
              loadingEager={6}
              title={(params.search ? `Search ${params.search}` : title) ?? ''}
              columns={configuration.columns}
              sx={{}}
            />
          )}
        </Box>

        <MediaQuery query={(theme) => theme.breakpoints.down('md')}>
          <StickyBelowHeader
            sx={{
              gridArea: 'horizontalFilters',
              display: 'flex',
              justifyContent: 'start',
              padding: '0 !important',
              width: '100%',
              marginBottom: { xs: '20px', sm: '25px' },
              //top: '68px !important',
              position: 'static',
            }}
          >
            <ProductListFiltersContainer
              sx={(theme) => ({
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #d4d4d4',
                padding: '0px',
                margin: '0 !important',
                ...(scroll
                  ? { boxShadow: '0px -9px 24px #000000-', backgroundColor: '#fff-' }
                  : {}),

                '& .ProductListFiltersContainer-container': {
                  textAlign: 'center',
                  justifyContent: 'center',

                  '& .Scroller-root': {
                    padding: 0,
                    alignItems: 'center',
                    '& .MuiButtonBase-root': {
                      borderRight: '1px solid #d4d4d4',
                      borderRadius: 0,
                      paddingRight: { xs: '15px', sm: '30px' },

                      '& .MuiChip-label': {
                        paddingInline: '0 !important',
                        position: 'relative',

                        '& p::before': {
                          content: '""',
                          display: 'inline-block',
                          width: '16px',
                          height: '16px',
                          marginRight: '8px',
                          // backgroundImage: `url(${filterSvg.src})`,
                          // backgroundSize: 'contain',
                          // backgroundPosition: 'center',
                          // backgroundRepeat: 'no-repeat',
                          // flexShrink: 0,
                          backgroundColor: 'red',
                        },

                        '& span': {
                          display: 'none',
                        },
                      },
                    },
                    '& .MuiBox-root': {
                      minWidth: '200px',
                      alignContent: 'center',
                      height: '100%',
                      alignItems: 'center',
                      paddingLeft: '10px',
                      '& .MuiTypography-root': {
                        display: 'inline-block',
                        verticalAlign: 'top',
                        marginTop: '3px',
                      },
                      '& .MuiInputBase-root': {
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      },
                    },
                  },
                },

                '& .ProductListFiltersContainer-scroller': {
                  // px: theme.page.horizontal,
                  // mx: `calc(${theme.page.horizontal} * -1)`,

                  '& .MuiButtonBase-root': {
                    border: 'none',
                    backgroundColor: 'transparent',

                    '& span .MuiTypography-root': {
                      color: (theme: any) => theme.palette.custom.main,
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      fontWeight: 500,
                      lineHeight: 500,
                    },
                  },
                },
              })}
            >
              {/* <ProductFiltersProAggregations renderer={productFiltersProChipRenderer} />*/}
              {/*products.items.length > 0 && (
                <>
                  <ProductFiltersProSortChip
                    total_count={total_count}
                    sort_fields={sort_fields}
                    category={category}
                  />
                  <ProductFiltersProLimitChip />
                </>
              )*/}

              <ProductFiltersProAllFiltersChip
                total_count={total_count}
                sort_fields={sort_fields}
                category={category}
              />
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Typography
                  variant='p'
                  sx={{
                    color: '#441E14 !important',
                    fontWeight: 500,
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  }}
                >
                  Sort by :{' '}
                </Typography>

                <FormControl
                  variant='standard'
                  sx={{ m: 0, minWidth: 120, fontSize: { xs: '12px', sm: '14px', md: '16px' } }}
                >
                  {' '}
                  <Select
                    value={sortValue}
                    onChange={handleSortChange}
                    displayEmpty
                    input={<CustomSelectInput />}
                    inputProps={{ 'aria-label': 'Sort by' }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: '#F6DBE0',
                          '& .MuiMenuItem-root': {
                            // padding: 2,
                            color: '#441E14',

                            fontSize: { xs: '12px', sm: '14px', md: '16px' },
                            fontWeight: 500,
                            lineHeight: '158%',
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value='Latest'>Latest</MenuItem>
                    <MenuItem value='Price_ASC'>Price: Low to High</MenuItem>
                    <MenuItem value='Price_DESC'>Price: High to Low</MenuItem>
                    <MenuItem value='Name_ASC'>Name: A-Z</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </ProductListFiltersContainer>
          </StickyBelowHeader>
        </MediaQuery>

        <MediaQuery
          query={(theme) => theme.breakpoints.up('md')}
          display='block'
          sx={(theme) => ({
            gridArea: 'sidebar',
            // mt: import.meta.graphCommerce.breadcrumbs === true ? 0 : theme.spacings.lg,
            position: 'sticky',
            top: '100px',
            mt: { xs: '30px' },
          })}
        >
          <ProductFiltersProClearAll sx={{ alignSelf: 'center' }} />
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box
              sx={{
                fontSize: { xs: '14px', sm: '16px', md: '20px' },
                fontWeight: 500,
                lineHeight: '120%',
                color: (theme: any) => theme.palette.custom.dark,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '15px',
              }}
            >
              <Image src={mix} alt='mix_alter' sx={{ width: '24px', height: 'auto' }} /> Filter
            </Box>

            <ProductFiltersProClearAll
              sx={{
                alignSelf: 'center',
                background: 'transparent',
                padding: 0,
                borderRadius: '0 !important',
                color: (theme: any) => theme.palette.custom.tertiary,
                fontSize: { sm: '12px', md: '14px' },
                '&:hover:not(.Mui-disabled)': {
                  backgroundColor: 'transparent',
                },
              }}
              title='clear'
            />
          </Box>

          <ProductFiltersProAggregations renderer={productFiltersProSectionRenderer} />
          <>
            {category ? (
              <ProductFiltersProCategorySection
                filterIcons={iconFilterProduct}
                category={category}
                params={params}
                hideBreadcrumbs
                menus={menuList}
              />
            ) : (
              <ProductFiltersProCategorySectionSearch menu={menu} defaultExpanded />
            )}
          </>

          {/* Product filters */}
          {/*  <ProductFiltersProSortSection
            sort_fields={sort_fields}
            total_count={total_count}
            category={category}
            openAccordionIcon={iconOpenAccordion}
            closeAccordionIcon={iconCloseAccordion}
            sx={{
              paddingTop: (theme) => theme.spacings.xs,
            }}
          />
          <ProductFiltersProLimitSection />*/}
        </MediaQuery>
      </Container>
    </ProductFiltersPro>
  )
})
