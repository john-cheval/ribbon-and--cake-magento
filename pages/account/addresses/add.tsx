import type { PageOptions } from '@graphcommerce/framer-next-pages'
import type { AccountDashboardAddressesQuery } from '@graphcommerce/magento-customer'
import {
  CreateCustomerAddressForm,
  CustomerDocument,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconAddresses,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = AccountDashboardAddressesQuery
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function AddNewAddressPage() {
  const addresses = useCustomerQuery(CustomerDocument, {
    fetchPolicy: 'cache-and-network',
  })

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
      <Container
        maxWidth='md'
        sx={{
          '& .LayoutTitle-root ': {
            marginBottom: 0,
            gap: { xs: '10px', md: '15px' },
            '& svg': {
              fontSize: { xs: '25px', md: '35px' },
              stroke: (theme) => theme.palette.custom.wishlistColor,
            },
          },
        }}
      >
        <PageMeta title={i18n._(/* i18n */ 'Add address')} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={addresses}>
          <LayoutTitle icon={iconAddresses}>
            <Trans id='Addresses' />
          </LayoutTitle>
          <SectionContainer
            sx={{
              '& .SectionHeader-root': {
                borderBottom: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
              },
              '& .SectionHeader-left': {
                color: (theme) => theme.palette.custom.main,
              },
            }}
            labelLeft={<Trans id='Add new address' />}
          >
            <CreateCustomerAddressForm />
          </SectionContainer>
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  Layout: LayoutOverlay,
  sharedKey: () => 'account/addresses',
}
AddNewAddressPage.pageOptions = pageOptions

export default AddNewAddressPage

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
