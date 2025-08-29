import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
  getCartDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { CartCrosssellsScroller, CartItemsActionCards } from '@graphcommerce/magento-cart-items'
import { Money, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  LayoutOverlayHeader,
  LayoutTitle,
  OverlayStickyBottom,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container, Divider, Typography } from '@mui/material'
import type { LayoutOverlayProps } from '../components'
import { LayoutOverlay, productListRenderer } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'
import { iconDelete } from '../plugins/icons'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function CartPage() {
  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const { error, data } = cart
  const hasError = Boolean(error)
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'

  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'Cart ({0})', { 0: data?.cart?.total_quantity ?? 0 })}
        metaRobots={['noindex']}
      />
      <LayoutOverlayHeader
        sx={{
          '& .MuiButtonBase-root': {
            color: (theme: any) => theme.palette.custom.dark,
          },
          '& .MuiButtonBase-root svg': {
            color: (theme: any) => theme.palette.custom.dark,
            fontSize: '30px',
          },
          ['& .LayoutHeaderContent-center']: {
            opacity: '1 !important',
            gridArea: 'left',
            justifySelf: 'flex-start',
          },
        }}
        divider={
          <Container>
            <Divider sx={{ background: 'rgba(199, 202, 205, 0.42)' }} />
          </Container>
        }
      >
        <LayoutTitle size='small' component='span'>
          <Typography variant='h2' component='h2'>
            Cart
          </Typography>
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={cart}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {hasItems ? (
          <>
            <Container
              // maxWidth='md'
              sx={{
                flexGrow: 1,
                // minHeight: { xs: '200px', lg: '500px' },
                minHeight: 'calc(100vh - 360px)',

                overflowY: 'scroll',
                // overflowX: 'hidden',
                pr: { xs: '15px', sm: '20px' },
                paddingBottom: '50px',
                pl: { xs: '15px', sm: '20px', lg: '30px' },

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
              <CartItemsActionCards
                removeIcon={iconDelete}
                cart={data.cart}
                sx={{
                  position: 'relative',
                  zIndex: 1,

                  '& .ActionCard-title a': {
                    color: (theme: any) => theme.palette.custom.dark,
                    fontSize: { xs: '15px', md: '16px' },
                    fontWeight: 600,
                    lineHeight: '120%',
                  },
                  '& .ActionCard-image img': {
                    width: { xs: '110px', sm: '125px' },
                    height: { xs: '110px', sm: '125px' },
                    // width: '100% !important',
                  },
                  '& .ActionCard-details ': {
                    display: 'grid',
                    gridTemplateColumns: 'auto auto',
                    color: (theme: any) => theme.palette.custom.smallHeading,
                    fontSize: { xs: '15px', md: '16px' },
                    fontWeight: 'normal',
                    colummGap: '2px',
                    marginTop: '5px',
                  },
                  '& .ActionCard-action': {
                    marginBottom: 0,
                  },
                  '& .ActionCard-end .ActionCard-action .edit-actions': {
                    display: 'flex',
                    flexDirection: 'row',
                    '& form .MuiButtonBase-root': {
                      marginTop: '-5px',
                    },
                  },
                  '& .ActionCard-end .ActionCard-action .MuiBox-root:nth-child(2)': {
                    display: { xs: 'none', md: 'inline-flex' },
                  },
                  '& .ActionCard-secondaryAction': {
                    marginTop: 'auto',
                    '&  .MuiBox-root .MuiBox-root': {
                      display: { xs: 'inline-flex', md: 'none' },
                    },
                  },

                  '& .ActionCard-end .ActionCard-price span': (theme) => ({
                    color: (theme: any) => theme.palette.custom.dark,
                    fontSize: { xs: '16px', md: '20px' },
                    fontWeight: '700 !important',
                    lineHeight: '120%',
                  }),
                }}
              />
              <CouponAccordion key='couponform' sx={(theme) => ({ mt: theme.spacings.md })} />

              <ApolloCartErrorAlert error={error} />
            </Container>
            <CartCrosssellsScroller
              renderer={productListRenderer}
              sx={(theme) => ({ mt: theme.spacings.md })}
            />
            <OverlayStickyBottom
              sx={{
                pt: 0.1,
                pb: { xs: '10px', md: '20px', lg: '30px' },
                px: { xs: '15px', sm: '20px', lg: '30px' },
                //boxShadow: '1px 3px 8px #000',

                bottom: 0,
                //position: 'absolute',
                backgroundColor: (theme: any) => theme.palette.primary.contrastText,
                width: '100%',
                // bottom: '0',
                //  bottom: 'unset !important',
                '& .CartTotals-root ': {
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                  paddingInline: 0,
                },
                flexShrink: 0,
                mt: 'auto',
              }}
            >
              <CartTotals
                //containerMargin
                sx={{
                  typography: 'body1',
                  '& .CartTotals-costsRow': {
                    color: (theme: any) => theme.palette.custom.smallHeading,
                    '& .MuiBox-root.mui-style-0': {
                      color: (theme: any) => theme.palette.custom.smallHeading,
                      fontSize: { xs: '15px', md: '16px' },
                      fontWeight: 400,
                      lineHeight: 'normal',
                    },
                    '& .CartTotals-money.MuiBox-root': {
                      '& span span': {
                        color: (theme: any) => theme.palette.custom.smallHeading,
                        fontWeight: 600,
                        fontSize: { xs: '15px', md: '16px' },
                        textTransform: 'capitalize',
                      },
                    },
                  },
                  '& .CartTotals-costsRow:nth-child(2)': {
                    color: (theme: any) => theme.palette.custom.smallHeading,
                    fontWeight: '600 !important',
                    fontSize: '16px !important',
                  },
                  '& .MuiBox-root': {
                    '& .MuiBox-root.mui-style-0': {
                      color: (theme: any) => theme.palette.custom.smallHeading,
                      fontSize: { xs: '15px', md: '16px' },
                      fontWeight: 400,
                      lineHeight: 'normal',
                      textTransform: 'capitalize',
                    },
                    '& .CartTotals-money.MuiBox-root': {
                      '& span span': {
                        color: (theme: any) => theme.palette.custom.smallHeading,
                        fontWeight: 600,
                        fontSize: { xs: '15px', md: '16px' },
                      },
                    },
                  },

                  '& .CartTotals-costsGrandTotal': {
                    '& .MuiBox-root.mui-style-0': {
                      color: (theme: any) => theme.palette.custom.smallHeading,
                      fontSize: { xs: '16px', md: '20px' },
                      fontWeight: 700,
                      lineHeight: 'normal',
                      textTransform: 'capitalize',
                    },
                    '& .CartTotals-money.MuiBox-root': {
                      '& span span:first-child': {
                        backgroundPosition: '0px  center',
                      },
                      '& span span': {
                        color: (theme: any) => theme.palette.custom.smallHeading,
                        fontWeight: 700,
                        fontSize: { xs: '16px', md: '20px' },
                        textTransform: 'capitalize',
                      },
                    },
                  },
                }}
              />
              <CartStartCheckout
                sx={{
                  margin: '0 !important',
                  '& .MuiButtonBase-root': {
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: (theme: any) => theme.palette.custom.heading,
                    border: '1px solid #9B7C38',
                    color: '#fff',
                    // fontSize: { xs: '12px', sm: '15px', md: '16px' },
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: (theme: any) => theme.palette.custom.smallHeading,
                    },
                    '&:hover:not(.Mui-disabled)': {
                      backgroundColor: 'transparent',
                      color: (theme: any) => theme.palette.custom.smallHeading,
                      boxShadow: 'none',
                    },
                  },
                }}
                cart={data.cart}
                disabled={hasError}
              />
            </OverlayStickyBottom>
          </>
        ) : (
          <EmptyCart
            sx={{
              minHeight: '100vh',
              margin: 'auto',
              display: 'flex',
              '&  .FullPageMessage-button .MuiButtonBase-root': {
                backgroundColor: (theme: any) => theme.palette.custom.heading,
                borderRadius: '8px',
                color: 'white',
                boxShadow: 'none !important',
              },
              '& svg': {
                fontSize: '40px',
                stroke: 'unset !important',
              },
            }}
            disableMargin
          >
            {error && <ApolloCartErrorAlert error={error} />}
          </EmptyCart>
        )}
      </WaitForQueries>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'cart',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    variantSm: 'bottom',
    widthMd: '750px',
    sizeMd: 'floating',
    sizeSm: 'full',
    justifyMd: 'start',
    sx: {
      '& .LayoutOverlayBase-overlay': {
        padding: '0 !important',
      },
      '& .LayoutOverlayBase-overlayPane': {
        borderRadius: '0 !important',
        height: '100%',
        minHeight: '100vh',
        '&.variantSmBottom': {
          paddingTop: { xs: 'calc(46px * 2)', md: 0 },
        },
        position: 'relative',
        '& .LayoutOverlayBase-background': {
          paddingTop: '20px',
        },
      },
      '& .LayoutOverlayBase-beforeOverlay': {
        backdropFilter: 'blur(10px)',
      },
      '& .LayoutHeaderContent-left .MuiButtonBase-root .MuiButton-icon  svg': {
        display: 'none',
      },
    },
  },
}
CartPage.pageOptions = pageOptions

export default CartPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCartDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
