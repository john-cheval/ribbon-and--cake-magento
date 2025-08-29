import { ComposedForm, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  ApolloCartErrorFullPage,
  CartAgreementsForm,
  CartSummary,
  CartTotals,
  EmptyCart,
  getCheckoutIsDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import {
  PaymentMethodActionCardListForm,
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodPlaceOrder,
  useCartLock,
} from '@graphcommerce/magento-cart-payment-method'
import { SubscribeToNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FormActions,
  FullPageMessage,
  iconChevronRight,
  iconId,
  IconSvg,
  LayoutHeader,
  LayoutTitle,
  Stepper,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container, Dialog, Typography } from '@mui/material'
import type { LayoutMinimalProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'
import { useEffect, useState } from 'react'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function PaymentPage() {
  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-and-network' })
  const [{ locked }] = useCartLock()

  const [selected_payment_method, set_selected_payment_method] = useState("")

  const cartExists =
    typeof billingPage.data?.cart !== 'undefined' && (billingPage.data.cart?.items?.length ?? 0) > 0

  useEffect(() => {
    if (billingPage?.data?.cart?.selected_payment_method?.code) {
      set_selected_payment_method(billingPage?.data?.cart?.selected_payment_method?.code || "")
    }
  }, [billingPage?.data?.cart?.selected_payment_method?.code])

  return (
    <ComposedForm>
      <PageMeta title={i18n._(/* i18n */ 'Payment')} metaRobots={['noindex']} />

      <WaitForQueries
        waitFor={[billingPage]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {billingPage.error && <ApolloCartErrorFullPage error={billingPage.error} />}

        {selected_payment_method === "ccavenue" && !cartExists && !billingPage.error && <FullPageMessage
          disableMargin
          icon={<CircularProgress />}
          title={<Trans id='Processing your payment' />}
          sx={{
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Trans id='We’re processing your payment, this will take a few seconds.' />
        </FullPageMessage>}

        {selected_payment_method !== "ccavenue" && !billingPage.error && !cartExists && <EmptyCart disableMargin />}
        {cartExists && !billingPage.error && (
          <>
            <LayoutHeader
              sx={{
                '& .LayoutHeaderContent-content': {
                  '& .LayoutTitle-root': {
                    gap: { xs: '10px' },
                    '& svg': {
                      fontSize: { xs: '23px' },
                      stroke: (theme) => theme.palette.custom.wishlistColor,
                    },
                    '& .MuiTypography-h6': {
                      color: (theme) => theme.palette.custom.heading,
                      fontFamily: 'Saxo Grammaticus',
                      fontWeight: 300,
                    },
                  },
                },
              }}
            // switchPoint={0}
            // primary={
            //   <PaymentMethodButton
            //     type='submit'
            //     color='secondary'
            //     button={{
            //       variant: 'pill',
            //       size: 'medium',
            //       endIcon: <IconSvg src={iconChevronRight} size='small' />,
            //     }}
            //     display='inline'
            //   >
            //     <Trans id='Pay' />
            //   </PaymentMethodButton>
            // }
            // divider={
            //   <Container maxWidth='md'>
            //     <Stepper steps={3} currentStep={3} />
            //   </Container>
            // }
            >
              {/*  <LayoutTitle size='small' icon={iconId}>
                <Trans id='Payment' />
              </LayoutTitle>*/}
            </LayoutHeader>

            <Container
              maxWidth='md'
              sx={{
                '& .ActionCardLayout-root': {
                  '& .mui-style-1brfnwd-MuiButtonBase-root.variantOutlined.layoutList:first-of-type,     .mui-style-1brfnwd-MuiButtonBase-root.variantOutlined.layoutList:last-of-type':
                  {
                    borderTopRightRadius: '4px',
                    borderTopLeftRadius: '4px',
                    boxShadow: 'none',
                    border: (theme) => `1px solid ${theme.palette.custom.border}`,
                  },
                  '& .ActionCard-rootInner': {
                    '& .ActionCard-image': {
                      display: 'none',
                    },
                    '& .ActionCard-title': {
                      fontSize: { xs: '15px', md: '16px' },
                      fontWeight: 700,
                      lineHeight: '158%',
                      color: (theme) => theme.palette.custom.main,
                    },
                    '& .ActionCard-end': {
                      '& .ActionCard-action button': {
                        color: (theme) => theme.palette.custom.main,
                      },
                    },
                  },
                },
              }}
            >
              <Dialog open={!!locked} fullWidth>
                <FullPageMessage
                  disableMargin
                  icon={<CircularProgress />}
                  title={<Trans id='Processing your payment' />}
                >
                  <Trans id='We’re processing your payment, this will take a few seconds.' />
                </FullPageMessage>
              </Dialog>

              <Typography
                variant='h1'
                sx={(theme) => ({
                  mt: theme.spacings.lg,
                  mb: theme.spacings.sm,
                  color: (theme) => theme.palette.custom.heading,
                  textAlign: 'center',
                })}
              >
                <Trans id='Payment method' />
              </Typography>

              <PaymentMethodContextProvider>
                <PaymentMethodActionCardListForm step={4} />

                <CartSummary
                  sx={{
                    '& .CartSummary-detailsContainer': {
                      background: '#fff',
                      border: (theme) => `1px solid ${theme.palette.custom.border}`,
                      borderRadius: '4px',

                      '& .SectionContainer-root': {
                        '& .SectionHeader-root': {
                          borderBottom: '1px solid #e6e6e6',
                          marginBottom: '10px',
                          '& .SectionHeader-left': {
                            fontSize: { xs: '15px', md: '16px' },
                            fontWeight: 700,
                            color: (theme) => theme.palette.custom.main,
                          },
                          '& .SectionHeader-right a': {
                            color: (theme) => theme.palette.custom.main,
                            cursor: 'pointer',
                            fontSize: { xs: '15px', md: '16px' },
                          },
                        },
                      },
                      '& .MuiTypography-body1': {
                        color: (theme) => theme.palette.custom.main,
                        fontSize: { xs: '15px', md: '16px' },
                        fontWeight: 400,
                      },
                    },
                  }}
                  editable
                >
                  <CartTotals
                    sx={{
                      marginTop: '20px',
                      background: '#fff',
                      border: (theme) => `1px solid ${theme.palette.custom.border}`,
                      borderRadius: '4px !important',
                    }}
                  />
                </CartSummary>

                <CouponAccordion isCheckout={true} />
                <SubscribeToNewsletter
                  step={3}
                  label={i18n._(
                    /* i18n */ 'Subscribe to our newsletter to stay informed about our new products!',
                  )}
                  sx={(theme) => ({ marginTop: theme.spacings.xs })}
                />
                <CartAgreementsForm step={2} sx={{ pt: 0 }} />

                <PaymentMethodPlaceOrder step={5} />

                <FormActions
                  sx={(theme) => ({
                    paddingTop: theme.spacings.sm,
                    width: '100%',
                    justifyContent: 'unset',
                    '& button': {
                      borderRadius: '4px',
                      fontSize: { xs: '15px', md: '16px' },
                    },
                    '& svg': {
                      display: 'none',
                    },
                  })}
                >
                  <PaymentMethodButton
                    id='place-order'
                    type='submit'
                    color='secondary'
                    button={{ variant: 'pill', size: 'large' }}
                    breakpoint='xs'
                    endIcon={<IconSvg src={iconChevronRight} />}
                  >
                    <Trans id='Place order' />
                  </PaymentMethodButton>
                </FormActions>
              </PaymentMethodContextProvider>
            </Container>
          </>
        )}
      </WaitForQueries>
    </ComposedForm>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
PaymentPage.pageOptions = pageOptions

export default PaymentPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCheckoutIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/checkout', title: i18n._(/* i18n */ 'Shipping') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
