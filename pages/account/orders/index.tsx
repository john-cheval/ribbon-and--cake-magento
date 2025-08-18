import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountDashboardOrdersDocument,
  AccountOrders,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconBox,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import bgImage from '../../../constants/images/account/Frame.png'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountOrdersPage() {
  const { query } = useRouter()

  const orders = useCustomerQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: 5,
      currentPage: Number(query?.page ?? 1),
    },
  })
  const { data } = orders
  const customer = data?.customer

  return (
    <>
      <LayoutOverlayHeader
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
      >
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans id='Orders' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container
        maxWidth='md'
        sx={{
          '& .LayoutTitle-root ': {
            marginBottom: 0,
            '& h1': {
              color: (theme) => theme.palette.custom.heading,
              fontWeight: 300,
            },
            gap: { xs: '10px', md: '15px' },
            '& svg': {
              fontSize: { xs: '25px', md: '35px' },
              stroke: (theme) => theme.palette.custom.wishlistColor,
              position: 'relative',
              // top: '-5px',
            },
          },
        }}
      >
        <PageMeta title={i18n._(/* i18n */ 'Orders')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={orders}>
          {customer?.orders && customer.orders.items.length > 0 && (
            <>
              <LayoutTitle icon={iconBox}>Orders</LayoutTitle>
              <AccountOrders {...customer} />
            </>
          )}

          {customer?.orders && customer.orders.items.length < 1 && (
            <FullPageMessage
              sx={{
                '& .FullPageMessage-iconWrapper svg': {
                  stroke: (theme: any) => theme.palette.custom.main,
                },
                '& .MuiTypography-h3, .mui-style-1xcaoyx': {
                  color: (theme: any) => theme.palette.custom.main,
                },
              }}
              title={<Trans id='You have no orders yet' />}
              icon={<IconSvg src={iconBox} size='xxl' />}
            >
              <Trans id='Discover our collection and place your first order!' />
            </FullPageMessage>
          )}
        </WaitForCustomer>
      </Container>
    </>
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
        backgroundSize: { xs: 'unset', md: '100% auto' },
        backgroundPosition: '100% auto',

        '& .LayoutHeaderContent-right button': {
          color: (theme) => theme.palette.custom.main,
          cursor: 'pointer',
        },
      },
    },
  },
}
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account', title: i18n._(/* i18n */ 'Account') },
    },
  }
}
