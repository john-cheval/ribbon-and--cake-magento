import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
} from '@graphcommerce/magento-cart'
import { CartPageQuery } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { CartCrosssellsScroller, CartItemsActionCards } from '@graphcommerce/magento-cart-items'
import { cartItemToCartItemInput } from '@graphcommerce/magento-cart-items/utils/cartItemToCartItemInput'
import { FullPageMessage, OverlayStickyBottom } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { iconDelete } from '../../../plugins/icons'
import { productListRenderer } from '../../ProductListItems'
import CartItems from './Cart/CartItems'

export type OrderSummaryPropsType = {
  orderData?: CartPageQuery
  error?: any
}

function OrderSummary({ orderData, error }: OrderSummaryPropsType) {
  // console.log(orderData, 'this si the orderData')
  const hasItems =
    (orderData?.cart?.total_quantity ?? 0) > 0 &&
    typeof orderData?.cart?.prices?.grand_total?.value !== 'undefined'
  const cartItems = orderData?.cart?.items
  return (
    <Box>
      <Typography
        sx={{
          color: '#000',
          fontsize: { xs: '16px', md: '20px' },
          lineHeight: '120%',
          marginBottom: { xs: '10px', md: '14px' },
        }}
      >
        Your Oder
      </Typography>

      <Box
        sx={{
          width: '100%',
          borderRadius: '8px',
          backgroundColor: 'white',
          padding: { xs: '10px', md: '24px 20px' },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            height: '500px',
            overflowY: 'scroll',
            overflowX: 'hidden',
            pr: { xs: '5px', md: '10px' },
            paddingBottom: '50px',

            '&::-webkit-scrollbar': {
              width: '8px',
              borderRadius: '0px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#EBEBEB',
              borderRadius: '0px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#441E14',
              borderRadius: '0px',
            },

            scrollbarWidth: 'thin',
            scrollbarColor: '#441E14 #EBEBEB',
          }}
        >
          <Box>
            {cartItems?.map((item, index) => (
              <CartItems items={item} key={index} />
            ))}
          </Box>

          <CouponAccordion key='couponform' sx={(theme) => ({ mt: theme.spacings.md })} />
        </Box>

        <OverlayStickyBottom
          sx={{
            py: 0.1,
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
              },
            }}
            cart={orderData?.cart}
            // disabled={hasError}
          />
        </OverlayStickyBottom>
      </Box>
    </Box>
  )
}

export default OrderSummary
