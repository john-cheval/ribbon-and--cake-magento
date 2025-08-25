import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ChangePasswordForm,
  getCustomerAccountIsDisabled,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  iconLock,
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

function AccountAuthenticationPage() {
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
        {/*<LayoutTitle size='small' component='span' icon={iconLock}>
          <Trans id='Authentication' />
        </LayoutTitle> */}
      </LayoutOverlayHeader>
      <Container
        maxWidth='md'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          '& .LayoutTitle-root ': {
            marginBottom: 0,
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
        <WaitForCustomer>
          <PageMeta title={i18n._(/* i18n */ 'Authentication')} metaRobots={['noindex']} />
          <LayoutTitle variant='h2' icon={iconLock}>
            <Trans id='Authentication' />
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
            labelLeft={<Trans id='Password' />}
          >
            <ChangePasswordForm />
          </SectionContainer>
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
      '& .LayoutOverlayBase-overlayPane': {
        paddingTop: 'calc(200px * 0.5) !important',
      },
      '& .LayoutOverlayBase-background': {
        backgroundImage: `url(${bgImage.src})`,
        borderRadius: '30px 30px 0 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'cover', md: '100% auto' },
        backgroundPosition: '100% auto',

        '& .LayoutHeaderContent-right button': {
          color: (theme) => theme.palette.custom.main,
          cursor: 'pointer',
        },
      },
    },
  },
}
AccountAuthenticationPage.pageOptions = pageOptions

export default AccountAuthenticationPage

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
