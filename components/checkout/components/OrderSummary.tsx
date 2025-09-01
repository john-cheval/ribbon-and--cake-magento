import { ComposedForm, ComposedSubmit, ComposedSubmitButton } from '@graphcommerce/ecommerce-ui'
import {
  ApolloCartErrorAlert,
  ApolloCartErrorSnackbar,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageQuery, ShippingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { ShippingMethodForm } from '@graphcommerce/magento-cart-shipping-method'
import { FormActions, OverlayStickyBottom } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import CartItems from './Cart/CartItems'

export type OrderSummaryPropsType = {
  orderData?: CartPageQuery
  error?: any
  IsItems?: boolean
}

function OrderSummary({ orderData, error, IsItems }: OrderSummaryPropsType) {
  const cartItems = orderData?.cart?.items
  const shippingPage = useCartQuery(ShippingPageDocument, { fetchPolicy: 'cache-and-network' })
  const router = useRouter()

  const cartExists =
    typeof shippingPage.data?.cart !== 'undefined' &&
    (shippingPage.data.cart?.items?.length ?? 0) > 0

  const selectedMethod = shippingPage?.data?.cart?.shipping_addresses?.[0]?.selected_shipping_method

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
                <CouponAccordion key='couponform' />
              </Box>
            </Box>

            <OverlayStickyBottom
              sx={{
                py: 0.1,
                px: { xs: '15px', sm: '20px' },
                backgroundColor: (theme: any) => theme.palette.primary.contrastText,
                zIndex: 9999,
                borderBottomLeftRadius: '8px',
                borderBottomRightRadius: '8px',
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
              {/*   <CartStartCheckout
                title='Proceed to Pay'
                sx={{
                  '& .MuiButtonBase-root': {
                    width: '100%',
                    borderRadius: '4px',
                    backgroundColor: (theme) => theme.palette.custom.heading,
                    border: (theme) => `1px solid ${theme.palette.custom.heading}`,
                    color: '#fff',
                    boxShadow: 'none !important',
                    '&:hover': {
                      backgroundColor: 'transparent !important',
                      color: (theme) => theme.palette.custom.smallHeading,
                      boxShadow: 'none !important',
                    },
                  },
                }}
                cart={orderData?.cart}
                // disabled={hasError}
              />*/}
              {!shippingPage.error && cartExists && (
                <ComposedForm>
                  <Box>
                    <>
                      {/* {!shippingPage.data?.cart?.is_virtual && (
                        <ShippingMethodForm
                          step={4}
                          sx={(theme) => ({ mt: theme.spacings.lg })}
                        //  isPickup={value === 1}
                        />
                      )} */}

                      <ComposedSubmit
                        onSubmitSuccessful={() => router.push('/checkout/payment')}
                        render={(renderProps) => (
                          <>
                            <FormActions
                              sx={{
                                paddingTop: { xs: '10px', md: '15px', lg: '25px' },
                                paddingBottom: 0,
                                justifyContent: 'unset',
                                '& .mui-style-dhqdz6-MuiButtonBase-root-MuiButton-root-MuiLoadingButton-root:not(.Mui-disabled):not(.MuiButton-disableElevation) ':
                                {
                                  boxShadow: 'none',
                                },
                                '& .MuiButtonBase-root': {
                                  fontSize: { xs: '15px', md: '16px' },
                                  backgroundColor: (theme) => theme.palette.custom.heading,
                                  borderColor: (theme) => theme.palette.custom.heading,
                                  borderRadius: '4px',
                                  '& span': {
                                    display: 'none',
                                  },
                                },
                              }}
                            >
                              <ComposedSubmitButton {...renderProps} disabled={selectedMethod?.carrier_code ? false : true} size='large' id='next'>
                                <Trans id='Proceed To Pay' />
                              </ComposedSubmitButton>
                            </FormActions>
                            <ApolloCartErrorSnackbar
                              error={
                                renderProps.buttonState.isSubmitting ? undefined : renderProps.error
                              }
                            />
                          </>
                        )}
                      />
                    </>
                  </Box>
                </ComposedForm>
              )}
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
