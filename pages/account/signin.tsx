import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { AccountSignInUpForm, getCustomerAccountIsDisabled } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { useMergeGuestWishlistWithCustomer } from '@graphcommerce/magento-wishlist'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import type { LayoutOverlayProps } from '../../components'
import { LayoutOverlay } from '../../components'
import bgImage from '../../constants/images/account/Frame.png'
import { graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountSignInPage() {
  useMergeGuestWishlistWithCustomer()

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Sign in')} metaRobots={['noindex']} />
      <LayoutOverlayHeader>
        {/*   <LayoutTitle size='small' component='span'>
          <Trans id='Sign in' />
        </LayoutTitle>*/}
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <AccountSignInUpForm />
      </Container>
    </>
  )
}

//   .MuiTypography-h6 a
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
        '& .MuiContainer-root.mui-style-1sy3hvo-MuiContainer-root ': {
          // display: 'flex',
          // alignItems: 'center',
          // justifyContent: 'center',
          // height: '100vh',
          '& .AccountSignInUpForm-titleContainer ': {
            '& .MuiTypography-h6': {
              '& a': {
                color: (theme) => theme.palette.custom.main,
                textDecoration: 'underline',
                '&:hover': {
                  textDecoration: 'none',
                },
              },
            },
            '& .MuiButtonBase-root ': {
              backgroundColor: (theme) => theme.palette.custom.main,
              color: (theme: any) => theme.palette.custom.border,
              borderRadius: '4px',
              fontSize: { xs: '15px', md: '16px' },
              border: (theme: any) => `1px solid ${theme.palette.custom.main}`,
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                backgroundColor: 'transparent',
                color: (theme: any) => theme.palette.custom.main,
                border: (theme: any) => `1px solid ${theme.palette.custom.main}`,
              },
            },
          },
        },
      },
    },
  },
}
AccountSignInPage.pageOptions = pageOptions

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
    },
  }
}
