import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  // CartStartCheckoutLinkOrButton,
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
  // iconShoppingBag,
  LayoutOverlayHeader,
  LayoutTitle,
  OverlayStickyBottom,
  // Stepper,
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
            color: '#000000',
            '& .MuiButtonBase-root': {
              backgroundColor: 'red',
            },
          },
          '& .MuiButtonBase-root svg': {
            color: '#000000',
            fontSize: '40px',
          },
          ['& .LayoutHeaderContent-center']: {
            opacity: '1 !important',
            gridArea: 'left',
            justifySelf: 'flex-start',
          },
        }}
        // switchPoint={0}
        // primary={<CartStartCheckoutLinkOrButton cart={data?.cart} disabled={hasError} />}
        divider={
          <Container maxWidth='md'>
            <Divider sx={{ background: 'rgba(199, 202, 205, 0.42)' }} />
          </Container>
        }
      >
        <LayoutTitle size='small' component='span'>
          {/*hasItems ? (
            <Trans
              id='Total <0/>'
              components={{ 0: <Money {...data?.cart?.prices?.grand_total} /> }}
            />
          ) : (
            <Trans id='Cart' />
          )*/}

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
              maxWidth='md'
              sx={{
                flexGrow: 1,
                height: '500px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                pr: { xs: '5px', md: '20px' },
                paddingBottom: '50px',
                pl: { xs: '5px', md: '20px', lg: '30px' },

                '&::-webkit-scrollbar': {
                  width: '6px',
                  borderRadius: '0px',
                  backgroundColor: '#EBEBEB',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#EBEBEB',
                  borderRadius: '0px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  borderRadius: '0px',
                },
              }}
            >
              <CartItemsActionCards
                removeIcon={iconDelete}
                cart={data.cart}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  '& .ActionCard-title': {
                    color: '#000',
                    fontSize: { xs: '14px', md: '16px' },
                    fontWeight: 600,
                    lineHeight: '120%',
                  },
                  '& .ActionCard-details ': {
                    display: 'flex',
                    color: '#2a110a',
                    fontSize: { xs: '14px', md: '16px' },
                    fontWeight: 'normal',
                    colummGap: '2px',
                  },
                  '& .ActionCard-end .ActionCard-price span': (theme) => ({
                    color: '#000',
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
                py: 0.1,
                px: { xs: '5px', md: '20px', lg: '30px' },
                bottom: 'unset !important',
                '& .CartTotals-root ': {
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                },
                flexShrink: 0,
                mt: 'auto',
              }}
            >
              <CartTotals
                containerMargin
                sx={{
                  typography: 'body1',
                  '& .CartTotals-costsRow': {
                    color: '#2A110A',
                  },
                  '& .CartTotals-costsRow:nth-child(2)': {
                    color: '#2A110A',
                    fontWeight: '600 !important',
                    fontSize: '16px !important',
                  },
                }}
              />
              <CartStartCheckout
                sx={{
                  '& .MuiButtonBase-root': {
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: '#9B7C38',
                    border: '1px solid #9B7C38',
                    color: '#fff',
                    // fontSize: { xs: '12px', sm: '14px', md: '16px' },
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
    widthMd: '900px',
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
        position: 'relative',
        '& .LayoutOverlayBase-background': {
          paddingTop: '20px',
        },
      },
      '& .LayoutOverlayBase-beforeOverlay': {
        backdropFilter: 'blur(10px)',
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
