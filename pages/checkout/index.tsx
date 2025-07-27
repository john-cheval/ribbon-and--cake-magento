import {
  ComposedForm,
  ComposedSubmit,
  ComposedSubmitButton,
  ComposedSubmitLinkOrButton,
  WaitForQueries,
} from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  ApolloCartErrorFullPage,
  ApolloCartErrorSnackbar,
  EmptyCart,
  getCheckoutIsDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument, ShippingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { EmailForm } from '@graphcommerce/magento-cart-email'
import {
  CustomerAddressForm,
  ShippingAddressForm,
} from '@graphcommerce/magento-cart-shipping-address'
import { ShippingMethodForm } from '@graphcommerce/magento-cart-shipping-method'
import {
  CustomerDocument,
  useCustomerQuery,
  useCustomerSession,
} from '@graphcommerce/magento-customer'
// import { ProductListDocument } from '@graphcommerce/magento-product'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FormActions,
  FullPageMessage,
  iconAddresses,
  iconBox,
  LayoutHeader,
  LayoutTitle,
  Stepper,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutNavigation } from '../../components'
import { AdsOnProduct, OrderSummary, TopBannerMesasge } from '../../components/checkout'
import { InnerTop } from '../../components/shared/Inner/Innertop'
import { AdsOnProductsDocument, AdsOnProductsQuery } from '../../graphql/AdsOnProduct.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

export type adsOnProps = {
  addonProductsData?: AdsOnProductsQuery[]
}
type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

export type ShippingPageProps = GetPageStaticProps & adsOnProps

function ShippingPage(props: ShippingPageProps) {
  const { addonProductsData } = props
  const router = useRouter()
  const session = useCustomerSession()
  const shippingPage = useCartQuery(ShippingPageDocument, { fetchPolicy: 'cache-and-network' })

  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const customerAddresses = useCustomerQuery(CustomerDocument, { fetchPolicy: 'cache-and-network' })

  const cartExists =
    typeof shippingPage.data?.cart !== 'undefined' &&
    (shippingPage.data.cart?.items?.length ?? 0) > 0

  const { error, data: cartData } = cart
  const hasItems = (cartData?.cart?.total_quantity ?? 0) > 0
  return (
    <Box sx={{ backgroundColor: '#f6f6f6' }}>
      <PageMeta title={i18n._(/* i18n */ 'Shipping')} metaRobots={['noindex']} />
      <WaitForQueries
        waitFor={[shippingPage, customerAddresses]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        <InnerTop title={'Cart'} isFilter={false} mainTitle='Your shopping cart' />

        <Box
          component='section'
          sx={{
            paddingInline: { xs: '18px', md: '25px', lg: '55px' },
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
            gridTemplateRows: { xs: 'auto', md: 'auto' },
            gap: { xs: '20px', md: '30px' },
            position: 'relative',
            zIndex: 100,
            paddingTop: { xs: '15px', md: '30px', lg: '35px' },
            paddingBottom: { xs: '19px', md: '30px', lg: '45px' },
          }}
        >
          <Box component='article' sx={{ gridColumn: { xs: 'auto', md: 'span 8' } }}>
            {!session.loggedIn && <TopBannerMesasge />}

            {/* Add On */}
            <Box sx={{ marginTop: session.loggedIn ? 0 : { xs: '30px', md: '20px' } }}>
              <AdsOnProduct adsOnData={addonProductsData} />
            </Box>

            {/* Shiping */}
            <Box>
              {' '}
              <Typography
                sx={{
                  color: '#000',
                  fontsize: { xs: '18px', md: '20px' },
                  lineHeight: '120%',
                  marginTop: { xs: '18px', md: '27px' },
                  marginBottom: { xs: '10px', md: '20px' },
                }}
              >
                Shipping
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  height: '380px',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  padding: { xs: '20px 14px', md: '25px 30px' },
                }}
              >
                <Typography
                  sx={{
                    color: '#000',
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    lineHeight: '120%',
                    marginBottom: { xs: '13px', md: '23px' },
                  }}
                >
                  Add your delivery location or select pick you if you wish to pick up from one of
                  our stores.
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box component='article' sx={{ gridColumn: { xs: 'auto', md: 'span 4' } }}>
            <OrderSummary orderData={cartData} error={error} />
          </Box>
        </Box>

        {shippingPage.error && <ApolloCartErrorFullPage error={shippingPage.error} />}
        {!shippingPage.error && !cartExists && <EmptyCart disableMargin />}
        {!shippingPage.error && cartExists && (
          <ComposedForm>
            <LayoutHeader
            // switchPoint={0}
            // primary={
            //  <ComposedSubmit
            //    onSubmitSuccessful={() => router.push('/checkout/payment')}
            //    render={(renderProps) => (
            //      <ComposedSubmitLinkOrButton {...renderProps}>
            //        <Trans id='Next' />
            //     </ComposedSubmitLinkOrButton>
            //   )}
            // />
            //  }
            // divider={
            //   <Container maxWidth='md'>
            //     <Stepper currentStep={2} steps={3} />
            //   </Container>
            // }
            >
              {shippingPage.data?.cart?.is_virtual ? (
                <LayoutTitle size='small' icon={iconAddresses}>
                  <Trans id='Billing address' />
                </LayoutTitle>
              ) : (
                <LayoutTitle size='small' icon={iconBox}>
                  <Trans id='Shipping' />
                </LayoutTitle>
              )}
            </LayoutHeader>
            <Container maxWidth='md'>
              <>
                {(customerAddresses.data?.customer?.addresses?.length ?? 0) >= 1 ? (
                  <CustomerAddressForm step={2} sx={(theme) => ({ mt: theme.spacings.lg })}>
                    <ShippingAddressForm step={3} />
                  </CustomerAddressForm>
                ) : (
                  <>
                    <Typography
                      variant='h4'
                      gutterBottom
                      sx={(theme) => ({ mt: theme.spacings.lg, mb: theme.spacings.sm })}
                    >
                      <Trans id='Personal details' />
                    </Typography>
                    <EmailForm step={1} />
                    <ShippingAddressForm step={3} />
                  </>
                )}

                {!shippingPage.data?.cart?.is_virtual && (
                  <ShippingMethodForm step={4} sx={(theme) => ({ mt: theme.spacings.lg })} />
                )}

                <ComposedSubmit
                  onSubmitSuccessful={() => router.push('/checkout/payment')}
                  render={(renderProps) => (
                    <>
                      <FormActions>
                        <ComposedSubmitButton {...renderProps} size='large' id='next'>
                          <Trans id='Next' />
                        </ComposedSubmitButton>
                      </FormActions>
                      <ApolloCartErrorSnackbar
                        error={renderProps.buttonState.isSubmitting ? undefined : renderProps.error}
                      />
                    </>
                  )}
                />
              </>
            </Container>
          </ComposedForm>
        )}
      </WaitForQueries>
    </Box>
  )
}

ShippingPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCheckoutIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(context)

  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  const addonProducts = client.query({
    query: AdsOnProductsDocument,
    variables: {
      categoryId: '13',
    },
  })
  return {
    props: {
      ...(await layout).data,
      up: { href: '/cart', title: i18n._(/* i18n */ 'Cart') },
      addonProductsData: (await addonProducts).data?.products?.items || [],
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
