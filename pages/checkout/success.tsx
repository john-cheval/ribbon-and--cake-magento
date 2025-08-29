import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst, gql, useMutation } from '@graphcommerce/graphql'
import {
  CartItemSummary,
  CartSummary,
  getCheckoutIsDisabled,
  InlineAccount,
} from '@graphcommerce/magento-cart'
import { SignupNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconParty,
  iconSadFace,
  IconSvg,
  LayoutHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Button, Container, Typography } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import type { LayoutMinimalProps, LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

const CCAVENUE_Complete = gql`
  mutation ccavanueComplete($orderNo: String, $encResp: String) {
    ccavanueComplete(input: { orderNo: $orderNo, encResp: $encResp }) {
      success
      order_id
    }
  }
`

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function OrderSuccessPage({ formData }) {
  const router = useRouter()

  const hasCartId = !!useRouter().query.cart_id

  const orderNumber = useRouter()?.query?.order_number || formData?.orderNo

  const [ccavanueComplete] = useMutation(CCAVENUE_Complete)

  useEffect(() => {
    const ccAvanueCompleteMutation = async () => {
      if (formData?.orderNo) {
        const { data } = await ccavanueComplete({
          variables: {
            ...formData,
          },
        })

        if (data?.ccavanueComplete?.order_id) {
          router.replace({
            pathname: router.pathname,
            query: {
              cart_id: router?.query?.cart_id,
              order_number: formData?.orderNo,
            },
          })
        }
      }
    }

    ccAvanueCompleteMutation()
  }, [])

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Checkout summary')} metaRobots={['noindex']} />
      <LayoutHeader
        floatingMd
        disableBackNavigation
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
        {hasCartId && (
          <LayoutTitle
            size='small'
            icon={iconParty}
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
            <Trans id='Thank you for your order!' />
          </LayoutTitle>
        )}
      </LayoutHeader>
      <Container
        maxWidth='md'
        sx={{
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
              '& .mui-style-1xcaoyx': {
                color: (theme) => theme.palette.custom.main,
              },
            },
            '& .FullPageMessage-button a': {
              background: (theme) => theme.palette.custom.main,
              color: (theme) => theme.palette.custom.border,
              borderRadius: '4px',
              fontSize: { xs: '15px', lg: '16px' },
              border: (theme: any) => `1px solid ${theme.palette.custom.main}`,
              textTransform: 'capitalize',
              transition: 'all 0.4s ease-in-out',
              '&:hover': {
                backgroundColor: 'transparent',
                color: (theme: any) => theme.palette.custom.main,
              },
            },
          },
        }}
      >
        {!hasCartId && (
          <FullPageMessage
            title={<Trans id='You have not placed an order' />}
            icon={<IconSvg src={iconSadFace} size='xxl' />}
            button={
              <Button href='/' variant='pill' color='secondary' size='large'>
                <Trans id='Continue shopping' />
              </Button>
            }
          >
            <Trans id='Discover our collection and add items to your cart!' />
          </FullPageMessage>
        )}
        {hasCartId && (
          <>
            <LayoutTitle icon={iconParty} sx={{ flexDirection: { md: 'column' } }}>
              <Box
                sx={{
                  display: 'grid',
                  columns: 1,
                  justifyItems: 'center',
                  color: (theme) => theme.palette.custom.main,
                }}
              >
                <Trans id='Thank you for your order!' />
                {orderNumber && (
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.custom.main,
                    }}
                    variant='subtitle1'
                  >
                    #{orderNumber}
                  </Typography>
                )}
              </Box>
            </LayoutTitle>
            <CartSummary />
            <CartItemSummary />

            <SignupNewsletter />

            <InlineAccount />

            <Box textAlign='center' m={8}>
              <Button href='/' color='primary' variant='pill' size='large' id='back-to-home'>
                <Trans id='Back to home' />
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
OrderSuccessPage.pageOptions = pageOptions

export default OrderSuccessPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context

  let formData: Record<string, string> | null = null

  if (req?.method && req?.method === 'POST') {
    const body = await new Promise<URLSearchParams>((resolve, reject) => {
      let data = ''
      req.on('data', (chunk) => {
        data += chunk
      })
      req.on('end', () => resolve(new URLSearchParams(data)))
      req.on('error', reject)
    })
    formData = Object.fromEntries(body)
  }

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
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
      formData,
    },
  }
}
