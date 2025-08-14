import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AccountAddresses,
  AccountDashboardAddressesDocument,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { iconAddresses, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import bgImage from '../../../constants/images/account/Frame.png'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function AccountAddressesPage() {
  const addresses = useCustomerQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const { data } = addresses
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
        <LayoutTitle size='small' component='span' icon={iconAddresses}>
          <Trans id='Addresses' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Addresses')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={addresses}>
          {((customer?.addresses && customer.addresses.length >= 1) || !customer?.addresses) && (
            <LayoutTitle icon={iconAddresses} variant='h2'>
              <Trans id='Addresses' />
            </LayoutTitle>
          )}
          <AccountAddresses {...data} loading={!data} addresses={customer?.addresses} />
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
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
  sharedKey: () => 'account/addresses',
}
AccountAddressesPage.pageOptions = pageOptions

export default AccountAddressesPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account', title: i18n._(/* i18n */ 'Account') },
    },
  }
}
