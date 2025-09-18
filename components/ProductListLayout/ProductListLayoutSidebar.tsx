import { Image } from '@graphcommerce/image'
import {
  ProductFiltersPro,
  ProductFiltersProAggregations,
  ProductFiltersProAllFiltersChip,
  ProductFiltersProCategorySection,
  ProductFiltersProClearAll,
  ProductFiltersProNoResults,
  productFiltersProSectionRenderer,
  ProductFiltersProSortSection,
  productListApplyCategoryDefaults,
  ProductListDocument,
  ProductListFiltersContainer,
} from '@graphcommerce/magento-product'
import { Container, MediaQuery, memoDeep, StickyBelowHeader } from '@graphcommerce/next-ui'
import { useApolloClient } from '@apollo/client'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { iconArrowDropDown, iconArrowDropDownUp, iconFilterProduct } from '../../plugins/icons'
import filterIcon from '../Assets/instant_mix.svg'
import mix from '../Assets/mix.svg'
import { ProductListItems } from '../ProductListItems'
import Loading from '../shared/Loading'
import type { ProductListLayoutProps } from './types'
import { useLayoutConfiguration } from './types'

export const ProductListLayoutSidebar = memoDeep((props: ProductListLayoutProps) => {
  const {
    filters,
    filterTypes,
    params,
    products,
    handleSubmit,
    category,
    title,
    menuList,
    conf,
    isSearch = false,
    isShopPage = false,
  } = props

  if (!params || !products?.items || !filterTypes) return null
  const { total_count, sort_fields, page_info } = products

  const configuration = useLayoutConfiguration(true)

  const [scroll, setScroll] = useState<boolean>(false)
  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
  }, [])

  // Scroll Pagination
  // const [allPageItems, setAllPageItems] = useState<any[]>([])
  const [allPageItemsData, setAllPageItemsData] = useState<{ [page: number]: any[] }>({})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPage, setTotalPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loaderRef = useRef<HTMLDivElement | null>(null)

  const client = useApolloClient()

  const fetchProducts = async (pageNumber) => {
    setIsLoading(true)

    const pageProducts = await client.query({
      query: ProductListDocument,
      variables: await productListApplyCategoryDefaults(
        {
          ...params,
          sort:
            !params?.sort || Object.keys(params.sort).length === 0
              ? { name: 'ASC' }
              : { ...params?.sort },
          currentPage: pageNumber,
        },
        conf,
        category,
      ),
    })

    // setAllPageItems((prev) => [
    //   ...prev,
    //   ...(pageProducts.data.products?.items ?? []),
    // ])
    setAllPageItemsData((prev: any) => ({
      ...prev,
      [pageNumber]: pageProducts.data.products?.items,
    }))
    setIsLoading(false)
  }

  useEffect(() => {
    if (products?.items) {
      if (products?.page_info?.current_page === 1) {
        // setAllPageItems(products.items)
        setAllPageItemsData({ [products?.page_info?.current_page]: products.items })
      }
      setCurrentPage(products?.page_info?.current_page || 1)
      setTotalPage(products?.page_info?.total_pages || 1)
      setIsLoading(false)
    }
  }, [products?.items, products?.page_info?.current_page])

  useEffect(() => {
    const observer = new IntersectionObserver(async ([entry]) => {
      if (entry.isIntersecting && currentPage < totalPage && !isLoading) {
        setCurrentPage((prev) => prev + 1)
        await fetchProducts(currentPage + 1)
      }
    })

    if (loaderRef.current) observer.observe(loaderRef.current)
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }
  }, [loaderRef.current, currentPage, totalPage, isLoading])

  const curentPath = params?.url?.split('/').filter(Boolean)

  const [expanded, setExpanded] = useState<string | false>(curentPath[0] || false)
  const handleAccordionChange = (categoryName: string) => {
    setExpanded(expanded === categoryName ? false : categoryName)
  }

  const productLength = total_count ?? 0

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
          [theme.breakpoints.up('xs')]: {
            gridTemplateColumns: '1fr',
          },
          ['@media (max-width: 1199px) and (min-width: 769px)']: {
            gridTemplateColumns: '250px 1fr',
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: 'minmax(280px, 350px) 1fr',
          },
          display: isSearch ? 'block' : 'grid',
          alignItems: 'start',
          rowGap: isShopPage ? '0' : { xs: 0, md: theme.spacings.md },
          columnGap: isShopPage ? '0' : { xs: '30px', md: '50px', lg: '60px' },
          mb: theme.spacings.xl,
          // pt: isShopPage ? '0' : { xs: '20px', md: '20px', lg: '30px' },
          // gridTemplate: {
          //   xs: '"title" "horizontalFilters"  "items" ',
          //   md: `
          //    "sidebar count"      auto
          //    "sidebar items"      auto
          //    /${configuration.sidebarWidth}   auto
          //    `,
          // },
          gridTemplateAreas: {
            xs: isShopPage ? 'items' : "'sidebar' 'horizontalFilters' 'items'",
            md: isShopPage ? 'items' : "'sidebar items'",
          },
          paddingInline: { xs: '18px', md: '25px', lg: '55px' },
        })}
      >
        {productLength > 0 ? (
          <Box
            sx={{
              gridArea: 'items',
              marginTop: {
                xs: isSearch ? '30px' : 0,
                md: isSearch ? '50px' : 0,
                lg: isSearch ? '60px' : 0,
              },
              '& .ProductListItemsBase-root': {
                gap: { xs: '20px', md: '20px' },
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: isSearch ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                  md: isSearch ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                  lg: isSearch ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)',
                  xl: isSearch ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)',
                },
                '& .ProductListItem-topLeft': {
                  gridArea: 'unset',
                },

                '& .ProductListItem-titleContainer .MuiButtonBase-root': {
                  width: '40px',
                  height: '40px',
                },
              },
              '& .ProductListItem-imageContainer .ProductListItem-topRight .MuiButtonBase-root': {
                padding: { xs: '8px', xl: '9px' },
                transition: 'all 0.4s ease-in-out',
                '& svg.ProductWishlistChipBase-wishlistIconActive': {
                  fontSize: '18px',
                },
                '&:hover ': {
                  '& svg': {
                    fill: (theme) => theme.palette.custom.wishlistColor,
                  },
                },
              },
              '& .ProductListItem-titleContainer': {
                rowGap: { xs: '2px', md: '0' },
                '& .ProductListItem-title': {
                  color: (theme) => theme.palette.custom.dark,
                  //  minHeight: '50px',
                  fontSize: { xs: '15px', md: '16px' },
                  lineHeight: '158%',
                },
                '& .MuiButtonBase-root': {
                  width: '45px',
                  height: '45px',

                  '& svg': {
                    fontSize: { xs: '25px', md: '28px' },
                    left: { xs: '5px', md: '7px' },
                    top: '4px',
                  },
                },
              },
            }}
          >
            {products.items.length <= 0 ? (
              <ProductFiltersProNoResults search={params.search} />
            ) : (
              <>
                {Object.entries(allPageItemsData)?.map(([page, items]) => (
                  <ProductListItems
                    key={page}
                    {...products}
                    items={items}
                    loadingEager={6}
                    title={(params.search ? `Search ${params.search}` : title) ?? ''}
                    columns={configuration.columns}
                  />
                ))}
              </>
            )}
            <Box
              ref={loaderRef}
              //sx={{ height: 80, width: '100%', background: 'red' }}
              component='div'
            >
              {isLoading && <Loading />}
            </Box>
          </Box>
        ) : (
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
        )}

        {!isShopPage && (
          <>
            <MediaQuery
              query={(theme) => theme.breakpoints.down('md')}
              sx={{
                '& .ProductListFiltersContainer-wrapper': {
                  display: 'inline-block',
                },
              }}
            >
              <StickyBelowHeader
                sx={{
                  gridArea: 'horizontalFilters',
                  display: 'flex',
                  justifyContent: 'start',
                  padding: '0 !important',
                  width: '100%',
                  marginBottom: { xs: '20px', sm: '25px' },
                  //top: '68px !important',
                  position: 'sticky',
                  top: '65px !important',
                  backgroundColor: '#fff',
                  zIndex: 9999,
                  borderTop: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
                }}
              >
                <ProductListFiltersContainer
                  sx={(theme) => ({
                    width: '100%',
                    // display: 'flex',
                    // justifyContent: 'space-between',
                    borderBottom: '1px solid #d4d4d4',
                    padding: '0px',
                    margin: '0 !important',
                    ...(scroll
                      ? { boxShadow: '0px -9px 24px #000000-', backgroundColor: '#fff-' }
                      : {}),

                    '& .ProductListFiltersContainer-container': {
                      textAlign: 'center',
                      justifyContent: 'center',
                      display: 'inline-block',
                      width: '100%',

                      '& .Scroller-root': {
                        padding: 0,
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'space-between',
                        overflow: 'visible',

                        '& > button:nth-child(1)': {
                          position: 'relative',
                          top: '2px',
                          // width: '50%',
                        },
                        '& > .MuiButtonBase-root': {
                          // width: '50%',
                        },
                        '& .MuiChip-outlined': {
                          width: '50%',
                        },
                        '& .ActionCardLayout-root.layoutList': {
                          '& .MuiButtonBase-root': {
                            borderRight: 0,
                          },
                        },
                        '& .MuiButtonBase-root': {
                          borderRight: '1px solid #d4d4d4',
                          borderRadius: 0,
                          paddingRight: { xs: '15px', sm: '30px' },
                          // '& .MuiChip-label .MuiTypography-root': {
                          //   '&::before': {
                          //     content: '""',
                          //     display: 'inline-block',
                          //     backgroundImage: `url(${filterIcon.src})`,
                          //     backgroundPosition: 'center',
                          //     backgroundRepeat: 'repeat',
                          //     width: '16px',
                          //     height: '16px',
                          //     marginRight: '8px',
                          //   },
                          // },

                          '& .MuiChip-label': {
                            paddingInline: '0 !important',
                            position: 'relative',
                            '& p': {
                              display: 'inline-block',
                              lineHeight: 'normal',
                              paddingLeft: '25px',
                              '& svg': {
                                display: 'none',
                              },
                            },

                            '& p::before': {
                              content: '""',
                              display: 'inline-block',
                              width: '16px',
                              height: '15px',
                              marginRight: '8px',
                              backgroundImage: `url(${filterIcon.src})`,
                              backgroundSize: 'contain',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              flexShrink: 0,
                              position: 'absolute',
                              left: 0,
                              marginTop: '2px',
                            },

                            '& span': {
                              display: 'none',
                            },
                          },
                        },
                        '& .MuiAccordionSummary-root': {
                          borderRight: 0,
                          paddingRight: 0,
                        },
                        '& .MuiBox-root': {
                          minWidth: '120px',
                          alignContent: 'center',
                          height: '100%',
                          alignItems: 'center',
                          // paddingLeft: '10px',
                          '& .MuiTypography-root': {
                            display: 'inline-block',
                            verticalAlign: 'top',
                            marginTop: '3px',
                          },
                          '& .MuiInputBase-root': {
                            fontSize: { xs: '15px', md: '16px' },
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
                          fontSize: { xs: '15px', md: '16px' },
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
                    menus={menuList}
                    paramss={params}
                  />

                  <Box sx={{ display: { xs: 'block', md: 'none' }, flexGrow: 1, flexShrink: 0 }}>
                    {props.params && props.products?.items && props.filterTypes && (
                      <ProductFiltersPro
                        params={props.params}
                        aggregations={props.filters?.aggregations}
                        appliedAggregations={props.products?.aggregations}
                        filterTypes={props.filterTypes}
                        autoSubmitMd
                        handleSubmit={props.handleSubmit}
                      >
                        <ProductFiltersProSortSection
                          sort_fields={props.products?.sort_fields}
                          total_count={props.products?.total_count}
                          category={props.category}
                          openAccordionIcon={iconArrowDropDown}
                          closeAccordionIcon={iconArrowDropDownUp}
                          sx={{
                            borderBottom: 'none !important',
                            '& .MuiAccordionSummary-content .MuiTypography-body1': {
                              color: (theme: any) => theme.palette.custom.main,
                              fontWeight: 500,
                              fontSize: { xs: '15px', md: '16px' },
                              marginBottom: '0 !important',
                              position: 'relative',
                            },
                            '& .MuiAccordionDetails-root > div': {
                              position: 'absolute',
                              backgroundColor: '#fff',
                              width: '100%',
                              borderRadius: '4px',
                              zIndex: 1000,
                              border: (theme) => `1px solid ${theme.palette.custom.border}`,
                              '& .ActionCardLayout-root ': {
                                border: (theme) => theme.palette.custom.border,
                                borderRadius: '4px',
                                '& .MuiButtonBase-root': {
                                  borderBottom: (theme) =>
                                    `1px solid ${theme.palette.custom.border}`,

                                  '& .ActionCard-title': {
                                    fontSize: { xs: '15px', md: '16px' },
                                    fontWeight: 400,
                                  },
                                  '& .ActionCard-end': {
                                    display: 'none',
                                  },
                                },
                              },
                              '& .ActionCard-root.selected': {
                                backgroundColor: (theme) => theme.palette.custom.border,
                              },
                            },
                            '& .ActionCardLayout-root ': {
                              backgroundColor: 'white',
                            },
                            '& .ActionCardLayout-root .MuiButtonBase-root': {
                              paddingBlock: '12px',
                              // borderRadius: '2px',
                              textAlign: 'left',

                              '& .ActionCard-title': {
                                color: (theme: any) => theme.palette.custom.main,
                                fontSize: { xs: '15px', md: '16px' },
                                fontWeight: 500,
                                lineHeight: '158%',
                              },
                            },
                            '& .MuiAccordionSummary-expandIconWrapper': {
                              position: 'relative',
                              top: '10px',
                              marginLeft: '15px',
                            },
                            '& .MuiAccordionSummary-content': {
                              flexGrow: 'unset',
                            },

                            // '& .MuiCollapse-root': {
                            //   position: 'absolute',
                            //   height: '100px',
                            //   width: '100%',
                            // },
                          }}
                        // isDropdown={true}
                        // isButton={true}
                        />
                      </ProductFiltersPro>
                    )}
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
                height: 'calc(100vh - 100px)',
              })}
            >
              <Box
                sx={{
                  height: '100%',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  pr: 1,
                  pl: 1,
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                  '& .mui-style-h8pyxy-MuiPaper-root-MuiAccordion-root': {
                    '& .MuiCollapse-vertical': {
                      position: 'relative',
                      top: '-5px',
                    },
                  },
                }}
              >
                {!isSearch && (
                  <>
                    <Box
                      sx={{
                        display: 'flex',
                        //  alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottom: (theme) =>
                          `1px solid ${theme.palette.custom.borderSecondary}`,
                        paddingBottom: '15px',
                        '& .MuiButtonBase-root': {
                          fontSize: { xs: '15px', md: '16px' },
                          lineHeight: 'normal',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',

                          '& picture': {
                            width: '24px',
                            height: '24px',
                          },
                        }}
                      >
                        <Image src={mix} alt='mix_alter' sx={{ width: '24px', height: '24px' }} />{' '}
                        <Typography
                          sx={{
                            fontSize: { xs: '15px', sm: '16px', md: '20px' },
                            fontWeight: 500,
                            lineHeight: '120%',
                            color: (theme: any) => theme.palette.custom.dark,
                          }}
                        >
                          Filter
                        </Typography>
                      </Box>

                      <ProductFiltersProClearAll
                        sx={{
                          alignSelf: 'center',
                          background: 'transparent',
                          padding: 0,
                          borderRadius: '0 !important',
                          color: (theme: any) => theme.palette.custom.tertiary,
                          width: 'fit-content',
                          textDecoration: 'underline',
                          minWidth: 'unset',
                          fontSize: '15px',
                          '&:hover:not(.Mui-disabled)': {
                            backgroundColor: 'transparent',
                          },
                        }}
                        title='Clear'
                        menuList={menuList}
                      />
                    </Box>
                    <ProductFiltersProAggregations renderer={productFiltersProSectionRenderer} />
                    <Typography
                      sx={{
                        fontSize: { xs: '15px', sm: '16px', md: '20px' },
                        fontWeight: 500,
                        lineHeight: '120%',
                        color: (theme: any) => theme.palette.custom.dark,
                        paddingTop: isSearch ? '0px' : '20px',
                        paddingBottom: '15px',
                        borderBottom: (theme) =>
                          `1px solid ${theme.palette.custom.borderSecondary}`,
                      }}
                    >
                      Categories
                    </Typography>
                    {menuList
                      ?.filter((menu) => menu?.uid !== 'MTM=' && menu?.uid !== 'NDc=')
                      .map((menu, index) =>
                        menu?.children?.length > 0 ? (
                          <Box key={index}>
                            <ProductFiltersProCategorySection
                              filterIcons={iconFilterProduct}
                              category={menu}
                              params={params}
                              hideBreadcrumbs
                              urlPath={menu?.url_path}
                              categoryTitle={menu?.name}
                              expanded={expanded === menu?.name}
                              handleChange={() => handleAccordionChange(menu?.name)}
                            />
                          </Box>
                        ) : (
                          <Link href={`/${menu?.url_path}`} legacyBehavior passHref>
                            <Typography
                              sx={{
                                fontSize: { xs: '15px', sm: '16px', md: '20px' },
                                fontWeight: 400,
                                lineHeight: '120%',
                                color: (theme: any) => theme.palette.custom.dark,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                paddingBlock: '15px',
                                cursor: 'pointer',
                                borderBottom: (theme: any) =>
                                  `1px solid ${theme.palette.custom.borderSecondary}`,
                              }}
                            >
                              {menu?.name}
                            </Typography>
                          </Link>
                        ),
                      )}
                  </>
                )}
              </Box>
            </MediaQuery>
          </>
        )}
      </Container>
    </ProductFiltersPro>
  )
})
