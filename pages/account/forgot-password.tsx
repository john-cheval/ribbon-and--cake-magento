import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { ForgotPasswordForm, getCustomerAccountIsDisabled } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Typography } from '@mui/material'
import type { LayoutOverlayProps } from '../../components'
import { LayoutOverlay } from '../../components'
import bgImage from '../../constants/images/account/Frame.png'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountForgotPasswordPage() {
  return (
    <>
      <LayoutOverlayHeader>
        {/*  <LayoutTitle size='small' component='span'>
          <Trans id='Forgot your password?' />
        </LayoutTitle> */}
      </LayoutOverlayHeader>
      <Container
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        }}
      >
        <PageMeta title={i18n._(/* i18n */ 'Forgot Password')} metaRobots={['noindex']} />
        <LayoutTitle
          sx={{
            marginBottom: '0px !important',
          }}
          variant='h2'
          size='medium'
        >
          <Trans id='Forgot your password?' />
        </LayoutTitle>
        <Typography
          variant='h6'
          align='center'
          sx={{ color: (theme: any) => theme.palette.custom.secondary }}
        >
          <Trans id='No worries! Enter your email address and we will send an email with instructions to reset your password.' />
        </Typography>
        <ForgotPasswordForm
          sx={{
            paddingTop: '0 !important',
          }}
        />
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account-public',
  sharedKey: () => 'account-public',
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
        backgroundSize: { xs: 'unset', md: '100% auto' },
        backgroundPosition: '100% auto',

        '& .LayoutHeaderContent-right button': {
          color: (theme) => theme.palette.custom.main,
          cursor: 'pointer',
        },
        '& .LayoutHeaderContent-left a': {
          color: (theme) => theme.palette.custom.main,
          '& svg': {
            fontSize: '24px',
          },
        },
      },
    },
  },
}
AccountForgotPasswordPage.pageOptions = pageOptions

export default AccountForgotPasswordPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account/signin', title: i18n._(/* i18n */ 'Sign in') },
    },
  }
}
