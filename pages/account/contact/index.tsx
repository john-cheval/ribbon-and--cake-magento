import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CustomerDocument,
  getCustomerAccountIsDisabled,
  UpdateCustomerEmailForm,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconEmailOutline,
  LayoutOverlayHeader,
  LayoutTitle,
  SectionContainer,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import bgImage from '../../../constants/images/account/Frame.png'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountContactPage() {
  const dashboard = useCustomerQuery(CustomerDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = dashboard.data?.customer

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
        <LayoutTitle size='small' component='span' icon={iconEmailOutline} variant='h2'>
          <Trans id='Contact' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForCustomer waitFor={dashboard}>
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
          <PageMeta title={i18n._(/* i18n */ 'Contact')} metaRobots={['noindex']} />

          <LayoutTitle icon={iconEmailOutline} variant='h2'>
            <Trans id='Contact' />
          </LayoutTitle>

          <SectionContainer
            labelLeft='Email'
            sx={{
              '& .SectionHeader-root': {
                borderBottom: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
              },
              '& .SectionHeader-left': {
                color: (theme) => theme.palette.custom.main,
              },
            }}
          >
            {customer && <UpdateCustomerEmailForm email={customer.email ?? ''} />}
          </SectionContainer>
        </Container>
      </WaitForCustomer>
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
        ' .FullPageMessage-root': {
          display: 'flex',
          alignItems: 'center',
          height: '100vh',
          justifyContent: 'cneter',
        },
        '& .FullPageMessage-root .MuiContainer-root ': {
          '& .FullPageMessage-iconWrapper svg': {
            stroke: (theme) => theme.palette.custom.main,
            fontSize: { xs: '30px', md: '35px' },
          },
          '& .FullPageMessage-subject': {
            marginTop: 0,
            '& h3': {
              color: (theme) => theme.palette.custom.main,
            },
          },
        },
      },
    },
  },
}
AccountContactPage.pageOptions = pageOptions

export default AccountContactPage

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
