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
import { Box, CircularProgress, Container, Divider, Typography } from '@mui/material'
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
        // sx={(theme) => ({
        //   '&.noAlign': { marginBottom: theme.spacings.sm },
        //   '& + .MuiContainer-root': { marginBottom: theme.spacings.sm },
        // })}
        sx={{
          '& .MuiButtonBase-root': {
            color: (theme: any) => theme.palette.custom.dark,
          },
          '& .MuiButtonBase-root svg': {
            color: (theme: any) => theme.palette.custom.dark,
            fontSize: { xs: '30px', lg: '37px' },
          },
          ['& .LayoutHeaderContent-center']: {
            opacity: '1 !important',
            gridArea: 'left',
            justifySelf: 'flex-start',
          },
          '& .LayoutHeaderContent-right .MuiButtonBase-root': {
            background: 'transparent',
            boxShadow: 'none',
            color: (theme) => theme.palette.custom.main,
            '&:hover': {
              background: 'transparent',
              boxShadow: 'none',
            },
            '&:active': {
              background: 'transparent',
              boxShadow: 'none',
            },
            '&:focus': {
              background: 'transparent',
              boxShadow: 'none',
            },
          },
        }}
        divider={
          <Container>
            <Divider sx={{ background: 'rgba(199, 202, 205, 0.42)' }} />
          </Container>
        }
      >
        <LayoutTitle size='small' component='span'>
          <Typography variant='h2' component='h2'>
            Wishlist
          </Typography>
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
                //width: '100%',
                height: { xs: 'auto', md: '100px' },
                width: '130px',
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
                  fontsize: { xs: '15px', lg: '18px' },
                  fontWeight: 500,
                },

                '& button': {
                  boxShadow: 'none',

                  '& svg': {
                    fontSize: { xs: '20px' },
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
                '& .MuiBox-root .mui-style-38bqm6 span': {
                  color: (theme) => theme.palette.custom.dark,
                  fontSize: { xs: '16px', md: '18px', lg: '20px' },
                  fontWeight: '700',
                  fontVariationSettings: "'wght' 700",
                },
              },
              '& .ActionCard-secondaryAction [aria-label="Add to Cart"] svg ': {
                fontSize: { xs: '26px', md: '30px' },
                top: '3px',
                right: '8px',
              },
              '& .ActionCard-title.sizeResponsive': {
                fontSize: { xs: '15px !important', md: '16px!important' },
                fontWeight: 600,
                color: '#000',
                lineHeight: 'normal',
              },
              '& .ActionCard-title': {
                fontSize: { xs: '15px !important', md: '16px!important' },
                fontWeight: 600,
                color: '#000',
                lineHeight: 'normal',
              },

              '& .ActionCard-secondaryAction a': {
                color: (theme) => theme.palette.custom.main,
                backgroundColor: 'transparent',
                marginBlock: 0,
                paddingBlock: 0,
                transition: 'all 0.4s ease-in-out',

                '&:hover span svg': {
                  transform: 'translateX(5px)',
                },
              },
              '& .ActionCard-title a': {
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'none',
                },
              },
              '& .ActionCard-end .ActionCard-action .MuiButtonBase-root svg': {
                color: '#9d9d9d',
              },
            },
          }}
        >
          {wishlistItems.items.length === 0 ? (
            <FullPageMessage
              sx={{
                '& .MuiContainer-root': {
                  // height: '100%',

                  '& .FullPageMessage-iconWrapper ': {
                    position: 'relative',
                    top: '15px',
                    '& svg': {
                      color: (theme) => theme.palette.custom.main,
                      fontSize: { xs: '24px', md: '30px' },
                    },
                  },
                  '& .FullPageMessage-subject': {
                    '& .MuiTypography-h3': {
                      color: (theme) => theme.palette.custom.main,
                    },
                    '& .MuiBox-root': {
                      color: (theme) => theme.palette.custom.main,
                    },
                  },
                  '& .FullPageMessage-button ': {
                    '& .MuiButtonBase-root': {
                      boxShadow: 'none',
                      borderRadius: '8px',
                      backgroundColor: (theme) => theme.palette.custom.heading,
                      color: '#fff',
                      border: (theme) => `1px solid ${theme.palette.custom.heading}`,
                      transition: 'all 0.4s ease-in-out',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: (theme) => theme.palette.custom.heading,
                      },
                    },
                  },
                },
              }}
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
                <Box
                  key={item.id}
                  sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.custom.borderSecondary}`,
                  }}
                >
                  <WishlistItemActionCard item={item} isIcon={true} />
                </Box>
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
  layoutProps: {
    variantMd: 'right',
    variantSm: 'bottom',
    widthMd: '750px',
    sizeMd: 'floating',
    sizeSm: 'full',
    justifyMd: 'start',
    sx: {
      '& .LayoutOverlayBase-overlay': {
        padding: '0 !important',
      },
      '& .LayoutOverlayBase-overlayPane': {
        borderRadius: '0 !important',
        height: '100%',
        minHeight: '100vh',
        '&.variantSmBottom': {
          paddingTop: { xs: 'calc(46px * 2)', md: 0 },
        },
        // paddingTop: { xs: 'calc(200px * 0.3) !important', md: 0 },
        position: 'relative',
        '& .LayoutOverlayBase-background': {
          paddingTop: '20px',
        },
      },
      '& .LayoutOverlayBase-beforeOverlay': {
        backdropFilter: 'blur(10px)',
      },
    },
  },
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
