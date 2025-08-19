import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
} from '@graphcommerce/magento-cart'
import { CartPageQuery } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { OverlayStickyBottom } from '@graphcommerce/next-ui'
import { Box, Typography } from '@mui/material'
import CartItems from './Cart/CartItems'

export type OrderSummaryPropsType = {
  orderData?: CartPageQuery
  error?: any
  IsItems?: boolean
}

function OrderSummary({ orderData, error, IsItems }: OrderSummaryPropsType) {
  const cartItems = orderData?.cart?.items

  return (
    <Box>
      <Typography
        sx={{
          color: (theme: any) => theme.palette.custom.dark,
          fontSize: { xs: '16px', md: '18px', lg: '20px' },
          lineHeight: '120%',
          marginBottom: { xs: '10px', md: '14px' },
        }}
      >
        Your Order
      </Typography>

      <Box
        sx={{
          width: '100%',
          borderRadius: '8px',
          backgroundColor: (theme: any) => theme.palette.primary.contrastText,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {IsItems ? (
          <>
            <Box
              sx={{
                flexGrow: 1,
                // height: '500px',
                overflowY: 'scroll',
                overflowX: 'hidden',
                pr: { xs: '5px', md: '10px' },
                paddingBottom: '50px',
                minHeight: '300px',

                // '&::-webkit-scrollbar': {
                //   width: '6px',
                //   borderRadius: '0px',
                //   backgroundColor: '#EBEBEB',
                // },
                // '&::-webkit-scrollbar-track': {
                //   backgroundColor: '#EBEBEB',
                //   borderRadius: '0px',
                // },
                // '&::-webkit-scrollbar-thumb': {
                //   backgroundColor: (theme) => theme.palette.primary.main,
                //   borderRadius: '0px',
                // },
              }}
            >
              <Box
                sx={{
                  padding: { xs: '10px', md: '10px 15px' },
                }}
              >
                {cartItems?.map((item, index) => (
                  <CartItems items={item} key={index} length={cartItems?.length} />
                ))}
              </Box>

              <Box
                sx={{
                  '& .ApplyCouponForm-couponForm': {
                    paddingInline: { xs: '10px', md: '15px' },
                  },
                }}
              >
                <CouponAccordion
                  key='couponform'
                  // sx={(theme) => ({ mt: theme.spacings.md })}
                />
              </Box>
            </Box>

            <OverlayStickyBottom
              sx={{
                py: 0.1,
                // pt: 0.1,
                // pb: { xs: '10px', md: '20px', lg: '30px' },
                px: { xs: '15px', sm: '20px' },
                // boxShadow: '1px 3px 8px #000',
                backgroundColor: (theme: any) => theme.palette.primary.contrastText,
                zIndex: 9999,
                // width: '100%',
                bottom: 'unset !important',
                // px: '55px',
                '& .CartTotals-root ': {
                  backgroundColor: 'transparent',
                  borderRadius: 0,
                },
                flexShrink: 0,
                mt: 'auto',
              }}
            >
              <CartTotals
                // containerMargin
                sx={{
                  padding: '10px 0px',
                  typography: 'body1',
                  '& .CartTotals-costsRow': {
                    color: (theme) => theme.palette.custom.smallHeading,
                  },
                  '& .CartTotals-costsRow:nth-child(2)': {
                    color: (theme) => theme.palette.custom.smallHeading,
                    fontWeight: '600 !important',
                    fontSize: '16px !important',
                  },
                }}
              />
              <CartStartCheckout
                title='Proceed to Pay'
                sx={{
                  '& .MuiButtonBase-root': {
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: (theme) => theme.palette.custom.heading,
                    border: (theme) => `1px solid ${theme.palette.custom.heading}`,
                    color: '#fff',
                    boxShadow: 'none !important',
                    // fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    '&:hover': {
                      backgroundColor: 'transparent !important',
                      color: (theme) => theme.palette.custom.smallHeading,
                      boxShadow: 'none !important',
                    },
                  },
                }}
                cart={orderData?.cart}
                // disabled={hasError}
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
              '& .FullPageMessage-iconWrapper': {
                position: 'relative',
                top: { xs: '24px' },
                right: { xs: '9px' },
              },
            }}
            disableMargin
          >
            {error && <ApolloCartErrorAlert error={error} />}
          </EmptyCart>
        )}
      </Box>
    </Box>
  )
}

export default OrderSummary
