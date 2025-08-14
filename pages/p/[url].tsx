import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  cacheFirst,
  mergeDeep,
  PrivateQueryMaskProvider,
  usePrivateQuery,
} from '@graphcommerce/graphql'
import { CartStartCheckout, useCartQuery } from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import type { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import {
  AddProductsToCartButton,
  AddProductsToCartForm,
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductListPrice,
  ProductPageAddToCartActionsRow,
  ProductPageBreadcrumbs,
  productPageCategory,
  // ProductPageDescription,
  ProductPageGallery,
  ProductPageJsonLd,
  ProductPageMeta,
  ProductPageName,
  ProductScroller,
  ProductShortDescription,
  // ProductSpecs,
} from '@graphcommerce/magento-product'
import { defaultConfigurableOptionsSelection } from '@graphcommerce/magento-product-configurable'
// import { RecentlyViewedProducts } from '@graphcommerce/magento-recently-viewed-products'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { Money, redirectOrNotFound, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  // ProductWishlistChip,
  ProductWishlistChipDetail,
  ProductWishlistIconButton,
} from '@graphcommerce/magento-wishlist'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  // isTypename,
  // LayoutHeader,
  // LayoutTitle,
  nonNullable,
  OverlayStickyBottom,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
// import { Trans } from '@lingui/react'
import { Box, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import type { GetStaticPaths } from 'next'
import Link from 'next/link'
import type { LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutNavigation, productListRenderer } from '../../components'
import HomeProductListMobile from '../../components/Home/components/HomeProductListMobile'
import { AddProductsToCartView } from '../../components/ProductView/AddProductsToCartView'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { linkStyle, ProductSwiper } from '../../components/shared/swiper/ProductSwiper'
// import { Reviews } from '../../components/ProductView/Reviews'
import { fontSize } from '../../components/theme'
import { cmsMultipleBlocksDocument } from '../../graphql/CmsMultipleBlocks.gql'
import type { ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { ProductPage2Document } from '../../graphql/ProductPage2.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { decodeHtmlEntities } from '../../utils/htmlUtils'

export type CmsBlocksProps = { cmsBlocks?: any }

export type Props = ProductPage2Query &
  CmsBlocksProps &
  Pick<AddProductsToCartFormProps, 'defaultValues'> & { urlKey: string }

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductPage(props: Props) {
  const { defaultValues, urlKey, cmsBlocks } = props
  const cmsRelativeProducts = cmsBlocks?.find((block) => block.identifier === 'relative-products')

  const decodedRelativeProductsTitle = decodeHtmlEntities(cmsRelativeProducts?.content)

  const scopedQuery = usePrivateQuery(
    ProductPage2Document,
    { variables: { urlKey, useCustomAttributes: import.meta.graphCommerce.magentoVersion >= 247 } },
    props,
  )
  const { products, relatedUpsells } = scopedQuery.data

  const product = mergeDeep(
    products?.items?.[0],
    relatedUpsells?.items?.find((item) => item?.uid === products?.items?.[0]?.uid),
  )
  console.log(product, 'this is product data')
  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const { error, data } = cart
  const hasError = Boolean(error)
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'
  const isLargeScreen = useMediaQuery('(max-width:1250px)')

  if (!product?.sku || !product.url_key) return null

  return (
    <PrivateQueryMaskProvider mask={scopedQuery.mask}>
      <InnerTop title={product?.name ?? ''} isFilter={false} />
      <Box
        sx={{
          display: { xs: 'flex', lg: 'none' },
          flexDirection: 'column',
          paddingInline: { xs: '18px', md: '25px' },
          marginBottom: { xs: '15px', md: '30px' },
        }}
      >
        <Typography
          variant='h3'
          component='div'
          gutterBottom
          sx={{
            color: (theme: any) => theme.palette.custom.dark,
            fontWeight: 400,
            lineHeight: '120%',
            margin: 0,
          }}
        >
          <ProductPageName product={product} />
        </Typography>
        <ProductListPrice
          {...product.price_range.minimum_price}
          sx={{
            borderBottom: '1px solid rgba(199, 202, 205, 0.42)',
            paddingBottom: { xs: '0', md: '5px' },

            '& .ProductListPrice-finalPrice .MuiBox-root:nth-child(1)': {
              marginRight: '2px',
            },
            '& .ProductListPrice-finalPrice .MuiBox-root:not(:nth-child(1))': {
              ...fontSize(25, 40),
            },
          }}
        />
      </Box>
      <AddProductsToCartForm
        key={product.uid}
        defaultValues={defaultValues}
        sx={{
          '& .SidebarGallery-row': {
            marginBottom: { xs: 0 },
          },
          '& .SidebarGallery-scrollerContainer': {
            // height: '100%',
            overflow: 'hidden',
            '& .Scroller-root .MotionImageAspect picture': {
              aspectRatio: 'unset !important',
              overflow: 'hidden',
              //  width: '100%',
              //  height: '100%',
              borderRadius: '8px',
            },
            '& .SidebarGallery-bottomCenter': {
              bottom: { xs: '20px', md: '30px', lg: isLargeScreen ? '100px' : '50px', xl: '40px' },

              '& .ScrollerThumbnail-thumbnail  img': {
                minHeight: { xs: '50px', lg: '70px' },
              },
            },
          },
          '& .SidebarGallery-sidebarWrapper ': {
            alignContent: 'unset',
            height: '100%',
          },
          '& .SidebarGallery-sidebarWrapper .SidebarGallery-sidebar': {
            padding: 0,
            '& .ActionCardLayout-root': {
              display: 'flex',
              '& .ActionCard-root': {
                padding: '6px 20px ',

                '& .ActionCard-rootInner': {
                  '& .ActionCard-image ': {
                    paddingRight: '8px',
                    '& img': {
                      minWidth: '12px',
                      width: '100%',
                      height: '100%',
                      borderRadius: 0,
                    },
                  },
                  '& .ActionCard-title': {
                    color: (theme) => theme.palette.custom.smallHeading,
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  },
                },
              },
            },
            '& .ProductListPrice-root': {
              marginTop: '10px',
            },
            '& .mui-style-1v4a0za': {
              flexDirection: { xs: 'row', lg: 'column' },
              alignItems: { xs: 'center', lg: 'flex-start' },
              columnGap: { xs: '10px', lg: '0px' },
              rowGap: { xs: '0px', lg: '10px' },
              '& svg': {
                fontSize: '20px',
              },
            },
          },
          '& .SidebarGallery-row.breakoutLeft': {
            paddingLeft: { xs: '18px', md: '25px', xl: '55px' },

            '& .SidebarGallery-root': {
              display: { xs: 'block', lg: 'grid' },
              columnGap: { xs: 0, md: '20px', lg: '30px', xl: '50px' },
            },
          },
        }}
      >
        {/* <LayoutHeader floatingMd hideMd={import.meta.graphCommerce.breadcrumbs}>
          <LayoutTitle size='small' component='span'>
            <ProductPageName product={product} />
          </LayoutTitle>
        </LayoutHeader> */}

        <ProductPageJsonLd
          product={product}
          render={(p) => ({
            '@context': 'https://schema.org',
            ...jsonLdProduct(p),
            ...jsonLdProductOffer(p),
            ...jsonLdProductReview(p),
          })}
        />

        <ProductPageMeta product={product} />

        {import.meta.graphCommerce.breadcrumbs && (
          <ProductPageBreadcrumbs
            product={product}
            sx={(theme) => ({
              py: `calc(${theme.spacings.xxs} / 2)`,
              pl: theme.page.horizontal,
              background: theme.palette.background.paper,
              [theme.breakpoints.down('md')]: {
                '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
              },
            })}
          />
        )}

        <ProductPageGallery
          product={product}
          sx={(theme) => ({
            '& .SidebarGallery-sidebar': {
              display: 'grid',
              rowGap: { xs: '10px', md: '15px' },
              // backgroundColor: 'red',
              //  padding: '0 !important',
              // paddingLeft: { xs: '18px', md: '25px', xl: '55px' },
            },
          })}
          disableSticky
          wishlistButton={
            <Box sx={{ position: 'absolute', right: '0px', top: '0px', zIndex: 1000, alignItems: "center", justifyContent: "flex-end", display: { xs: 'flex', lg: 'none' } }}>
              <ProductWishlistIconButton
                {...product}
                sx={{
                  backgroundColor: (theme: any) => theme.palette.custom.border,
                  padding: 0,
                  height: '40px',
                  width: '40px',
                  border: '1px solid #F6DBE0',
                  transition: 'all 0.4s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                  '&:focus': {
                    backgroundColor: (theme: any) => theme.palette.custom.border,
                  },
                  '&:active': {
                    backgroundColor: (theme: any) => theme.palette.custom.border,
                  },
                  '&.Mui-focusVisible': {
                    backgroundColor: (theme: any) => theme.palette.custom.border,
                  },
                  '& .MuiTouchRipple-root': {
                    color: (theme: any) => theme.palette.custom.border,
                  },
                  '& svg': {
                    stroke: (theme: any) => theme.palette.custom.main,
                  },
                  '& svg.ProductWishlistChipBase-wishlistIconActive': {
                    stroke: (theme: any) => theme.palette.custom.border,
                  },
                }}
              />
            </Box>
          }
        >
          <Box
            sx={{
              flexGrow: 1,
              // height: '600px',
              overflowY: 'scroll',
              overflowX: 'hidden',
              // pr: { xs: '5px', md: '20px' },
              paddingBottom: { xs: '15px', md: '30px', lg: '40px', xl: '50px' },
              // pl: { xs: '5px', md: '20px', lg: '30px', xl: 0 },

              '&::-webkit-scrollbar': {
                //   width: '6px',
                //   borderRadius: '0px',
                //   backgroundColor: '#EBEBEB',
                display: 'none',
                width: 0,
                background: 'transparent',
              },
              '&::-webkit-scrollbar-track': {
                //   backgroundColor: '#EBEBEB',
                //    borderRadius: '0px',
                display: 'none',
              },
              '&::-webkit-scrollbar-thumb': {
                //     backgroundColor: (theme) => theme.palette.primary.main,
                //     borderRadius: '0px',
                display: 'none',
              },

              // --- Hide scrollbar for Firefox ---
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div>
              {/*isTypename(product, ['ConfigurableProduct', 'BundleProduct']) && (
              <Typography component='div' variant='body1' color='text.disabled'>
                <Trans
                  id='As low as <0/>'
                  components={{ 0: <Money {...product.price_range.minimum_price.final_price} /> }}
                />
              </Typography>
            ) */}

              <Box
                sx={{ display: { xs: 'none', lg: 'flex' }, flexDirection: 'column', rowGap: '3px' }}
              >
                <Typography
                  variant='h3'
                  component='div'
                  gutterBottom
                  sx={{
                    color: (theme: any) => theme.palette.custom.dark,
                    fontWeight: 400,
                    lineHeight: '120%',
                    margin: 0,
                  }}
                >
                  <ProductPageName product={product} />
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px',
                    borderBottom: '1px solid rgba(199, 202, 205, 0.42)',
                  }}
                >
                  <ProductListPrice
                    {...product.price_range.minimum_price}
                    sx={{
                      '& .ProductListPrice-finalPrice .MuiBox-root:nth-child(1)': {
                        marginRight: '2px',
                      },
                      '& .ProductListPrice-finalPrice .MuiBox-root:not(:nth-child(1))': {
                        ...fontSize(25, 40),
                      },
                    }}
                  />
                  <ProductWishlistIconButton
                    {...product}
                    sx={{
                      backgroundColor: (theme: any) => theme.palette.custom.border,
                      padding: 0,
                      height: '40px',
                      width: '40px',
                      border: '1px solid #F6DBE0',
                      transition: 'all 0.4s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                      '&:focus': {
                        backgroundColor: (theme: any) => theme.palette.custom.border,
                      },
                      '&:active': {
                        backgroundColor: (theme: any) => theme.palette.custom.border,
                      },
                      '&.Mui-focusVisible': {
                        backgroundColor: (theme: any) => theme.palette.custom.border,
                      },
                      '& .MuiTouchRipple-root': {
                        color: (theme: any) => theme.palette.custom.border,
                      },
                      '& svg': {
                        stroke: (theme: any) => theme.palette.custom.main,
                      },
                      '& svg.ProductWishlistChipBase-wishlistIconActive': {
                        stroke: (theme: any) => theme.palette.custom.border,
                      },
                    }}
                  />
                </Box>
              </Box>
              <ProductShortDescription
                sx={(theme) => ({
                  mb: theme.spacings.xs,
                  color: '#6F6F6F',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  lineHeight: '170%',
                  paddingTop: '15px',
                })}
                product={product}
              />
              {/*  <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' /> */}
            </div>

            <AddProductsToCartView product={product} />
          </Box>
          {/* Buttons */}
          <OverlayStickyBottom
            sx={{
              py: 0.1,
              // px: { xs: '5px', md: '20px', lg: '30px' },
              bottom: 'unset !important',
              '& .CartTotals-root ': {
                backgroundColor: 'transparent',
                borderRadius: 0,
              },
              flexShrink: 0,
              mt: 'auto',
            }}
          >
            <ProductPageAddToCartActionsRow
              product={product}
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
                columnGap: { xs: 0, sm: '10px', md: '15px' },
                alignItems: { xs: 'center', lg: 'end' },
                rowGap: { xs: '10px', md: 0 },
                width: '100%',
                '& .MuiBox-root': {
                  width: { xs: '100%', sm: '50%' },
                  paddingRight: 0,
                },
                '& .MuiBox-root .MuiButtonBase-root': {
                  width: '100%',
                },
                '& .CartStartCheckout-checkoutButtonContainer': {
                  marginBlock: 0,
                },
              }}
            >
              <AddProductsToCartButton
                // fullWidth
                product={product}
                sx={{
                  backgroundColor: '#FFE09D',
                  color: '#441E14',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  fontWeight: 500,
                  lineHeight: '158%',
                  borderRadius: '4px',
                  border: '1px solid #FFE09D ',
                  transition: 'all 0.3s ease',
                  // paddingBlock: { xs: '15px', md: '18px' },
                  boxShadow: 'none !important',
                  width: { xs: '100%', sm: '50%' },
                  paddingRight: 0,
                  '&:hover': {
                    backgroundColor: 'white !important',
                  },
                }}
              />
              {/*  <ProductWishlistChipDetail
              {...product}
              bigButton={true}
              sx={{
                backgroundColor: '#9B7C38',
                color: '#FFFFFF',
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                fontWeight: 500,
                lineHeight: '158%',
                borderRadius: '4px',
                border: '1px solid #9B7C38 ',
                transition: 'all 0.3s ease',
                boxShadow: 'none !important',
                paddingBlock: { xs: '15px', md: '18px' },
                '&:hover': {
                  backgroundColor: 'white !important',
                  color: '#441E14',
                },
              }}
            />
            */}
              <CartStartCheckout
                title='Buy Now'
                sx={{
                  '& .MuiButtonBase-root': {
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: '#9B7C38',
                    border: '1px solid #9B7C38',
                    color: '#fff',
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#2A110A',
                    },
                    '&:hover:not(.Mui-disabled)': {
                      backgroundColor: 'transparent',
                      color: '#2A110A',
                      boxShadow: 'none',
                    },
                  },
                }}
                cart={data?.cart}
                disabled={hasError}
              />
            </ProductPageAddToCartActionsRow>
          </OverlayStickyBottom>
        </ProductPageGallery>

        {/*    <ProductPageDescription product={product} fontSize='responsive' right='' />*/}
      </AddProductsToCartForm>

      {/* Relative Products */}

      {product?.related_products && product?.related_products?.length > 0 && (
        <Box
          sx={{
            paddingInline: { xs: '18px', md: '25px', lg: '55px' },
            paddingTop: { xs: '30px', md: '45px', lg: '60px' },
            paddingBottom: { xs: '30px', md: '45px', lg: '50px' },
          }}
          component='section'
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'space-between' },
              alignItems: 'center',
              //  marginBottom: { xs: '10px', md: '20px' },
              paddingBottom: { xs: '20px', md: '20px', lg: '30px' },
            }}
          >
            {decodedRelativeProductsTitle && (
              <div dangerouslySetInnerHTML={{ __html: decodedRelativeProductsTitle }} />
            )}

            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Link href='/cakes' css={linkStyle}>
                View All
              </Link>
            </Box>
          </Box>

          {/*   <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
            <ProductSwiper
              // data={cakesCategories?.children}
              link='/cakes'
              // initial={cakesCategories?.children[0]?.name}
              productList={product?.related_products}
            />
          </Box>

          <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
            <HomeProductListMobile
              // data={cakesCategories?.children}
              link='/cakes'
              // initial={cakesCategories?.children[0]?.name}
              count={4}
              productList={product?.related_products}
              isCategory={false}
            />
          </Box>*/}
        </Box>
      )}

      {/* <ProductSpecs title='Specs' {...products} /> 
       <Reviews title='Reviews' {...product} /> 
       */}

      {/*product.related_products && product.related_products.length > 0 && (
        <ProductScroller
          title='Explore our other cakes'
          items={product.related_products.filter(nonNullable)}
          productListRenderer={productListRenderer}
          sizes={responsiveVal(200, 400)}
          sx={{
            paddingInline: { xs: '18px', md: '25px', xl: '55px' },
          }}
          itemScrollerProps={{
            sx: (theme) => ({
              mb: theme.spacings.xxl,
              '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
            }),
          }}
        />
      )*/}

      {/* 
      {product.upsell_products && product.upsell_products.length > 0 && (
        <ProductScroller
          title='You may also like'
          items={product.upsell_products.filter(nonNullable)}
          productListRenderer={productListRenderer}
          sizes={responsiveVal(200, 400)}
          itemScrollerProps={{
            sx: (theme) => ({
              mb: theme.spacings.xxl,
              '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
            }),
          }}
        />
      )}

      <RecentlyViewedProducts
        title={<Trans id='Recently viewed products' />}
        exclude={[product.sku]}
        productListRenderer={productListRenderer}
        sizes={responsiveVal(200, 400)}
        itemScrollerProps={{
          sx: (theme) => ({
            mb: theme.spacings.xxl,
            '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
          }),
        }}
        sx={(theme) => ({ mb: theme.spacings.xxl })}
      />
      */}
    </PrivateQueryMaskProvider>
  )
}

ProductPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getProductStaticPaths(graphqlSsrClient({ locale }), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const { locale, params } = context
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPage2Document,
    variables: { urlKey, useCustomAttributes: import.meta.graphCommerce.magentoVersion >= 247 },
  })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const product = productPage.then((pp) =>
    pp.data.products?.items?.find((p) => p?.url_key === urlKey),
  )

  if (!(await product)) return redirectOrNotFound(staticClient, conf, params, locale)

  const category = productPageCategory(await product)
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: '/', title: i18n._(/* i18n */ 'Home') }

  const cmsPageBlocksQuery = staticClient.query({
    query: cmsMultipleBlocksDocument,
    variables: {
      blockIdentifiers: ['relative-products'],
    },
  })

  const cmsBlocks = (await cmsPageBlocksQuery)?.data?.cmsBlocks?.items

  return {
    props: {
      urlKey,
      cmsBlocks,
      ...defaultConfigurableOptionsSelection(urlKey, client, (await productPage).data),
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
