import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { useWishlistItems, WishlistItemActionCard } from '@graphcommerce/magento-wishlist'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  Button,
  FullPageMessage,
  iconHeart,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container } from '@mui/material'
import type { LayoutOverlayProps } from '../components'
import { LayoutOverlay } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function WishlistPage() {
  const wishlistItems = useWishlistItems()

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Wishlist')} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        noAlign
        sx={(theme) => ({
          '&.noAlign': { marginBottom: theme.spacings.sm },
          '& + .MuiContainer-root': { marginBottom: theme.spacings.sm },
        })}
      >
        <LayoutTitle component='span' size='small' icon={iconHeart}>
          <Trans id='Wishlist' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={[wishlistItems]}
        fallback={
          <FullPageMessage title={<Trans id='Loading' />} icon={<CircularProgress />}>
            <Trans id='We are fetching your favorite products, one moment please!' />
          </FullPageMessage>
        }
      >
        <Container
          maxWidth='md'
          sx={{
            '& .AddProductsToCartForm': {
              '& .ActionCard-image img': {
                borderRadius: '8px',
                marginRight: '10px',
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                minWidth: '100px',
              },
              '& .ActionCard-secondaryAction': {
                '& .MuiBox-root': {
                  alignItems: 'center',
                  columnGap: '10px',

                  '&:nth-child(2)': {
                    marginTop: { xs: '5px', md: '10px' },
                    display: { xs: 'inline-flex', md: 'none' },
                  },
                },
                '& .MuiFormControl-root .MuiInputBase-root': {
                  border: '1px solid #F6DBE0 ',
                  padding: '5px',
                  borderRadius: '8px',
                  color: '#333',
                  fontsize: { xs: '12px', md: '14px', lg: '18px' },
                  fontWeight: 500,
                },

                '& button': {
                  boxShadow: 'none',

                  '& svg': {
                    fontSize: { xs: '20px', md: '20px', lg: '25px' },
                  },
                },
              },
              '& .ActionCard-end .ActionCard-action .MuiButtonBase-root': {
                '&:hover': {
                  backgroundColor: 'transparent',
                },
                '&:active': {
                  backgroundColor: 'transparent',
                },

                '&.Mui-focusVisible': {
                  backgroundColor: 'transparent',
                },

                '&:focus': {
                  backgroundColor: 'transparent',
                  outline: 'none',
                },
              },
              '& .ActionCard-end .ActionCard-price ': {
                display: { xs: 'none', md: 'inline-flex' },
              },
            },
          }}
        >
          {wishlistItems.items.length === 0 ? (
            <FullPageMessage
              title={<Trans id='Your wishlist is empty' />}
              icon={<IconSvg src={iconHeart} size='xxl' />}
              button={
                <Button href='/' variant='pill' color='primary' size='large'>
                  <Trans id='Continue shopping' />
                </Button>
              }
            >
              <Trans id='Discover our collection and add items to your wishlist!' />
            </FullPageMessage>
          ) : (
            <>
              {wishlistItems.items.map((item) => (
                <WishlistItemActionCard key={item.id} item={item} isIcon={true} />
              ))}
            </>
          )}
        </Container>
      </WaitForQueries>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'bottom',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
WishlistPage.pageOptions = pageOptions

export default WishlistPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
