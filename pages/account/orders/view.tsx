import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CancelOrderForm,
  getCustomerAccountIsDisabled,
  OrderDetailPageDocument,
  OrderDetails,
  OrderItems,
  OrderStateLabel,
  OrderTotals,
  ReorderItems,
  useCustomerQuery,
  useOrderCardItemImages,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { iconBox, IconHeader, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import bgImage from '../../../constants/images/account/Frame.png'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function OrderDetailPage() {
  const router = useRouter()
  const { orderNumber } = router.query

  const orders = useCustomerQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderNumber as string },
    skip: !orderNumber,
  })
  const { data } = orders
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]

  return (
    <WaitForCustomer waitFor={orders}>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans>Order #{orderNumber}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        {(!orderNumber || !order) && (
          <IconHeader src={iconBox} size='large'>
            <Trans>Order not found</Trans>
          </IconHeader>
        )}

        <LayoutTitle
          sx={{
            '& svg': {
              display: 'none',
            },
            '&  .MuiTypography-h3': {
              color: (theme) => theme.palette.custom.heading,
              fontWeight: 300,
              fontSize: { xs: '20px', sm: '25px', md: '30px', lg: '40px' },
              lineHeight: 'normal',
              textTransform: 'uppercase',
              fontFamily: 'Saxo Grammaticus',
            },
          }}
          icon={iconBox}
          gutterBottom={false}
          // sx={(theme) => ({ mb: theme.spacings.xxs })}
        >
          <Trans>Ordersss #{orderNumber}</Trans>
        </LayoutTitle>

        {orderNumber && order && (
          <>
            <PageMeta
              title={i18n._(/* i18n */ 'Order #{orderNumber}', { orderNumber })}
              metaRobots={['noindex']}
            />
            <Typography sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.sm })}>
              <OrderStateLabel detail={true} {...order} />
            </Typography>

            <OrderDetails {...order} />
            <OrderItems {...order} images={images} />
            <OrderTotals {...order} />

            <CancelOrderForm order={order} />
          </>
        )}
        {order && (
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
            <ReorderItems order={order} />
          </Box>
        )}
      </Container>
    </WaitForCustomer>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  sharedKey: () => 'account/orders',
  Layout: LayoutOverlay,
  layoutProps: {
    sx: {
      '& .LayoutOverlayBase-background': {
        backgroundImage: `url(${bgImage.src})`,
        borderRadius: '30px 30px 0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'unset', md: 'cover' },
        backgroundPosition: '100% auto',

        '& .LayoutHeaderContent-right button': {
          color: (theme) => theme.palette.custom.main,
          cursor: 'pointer',
        },
      },
    },
  },
}
OrderDetailPage.pageOptions = pageOptions

export default OrderDetailPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const config = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await config.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account/orders', title: i18n._(/* i18n */ 'Orders') },
    },
  }
}
