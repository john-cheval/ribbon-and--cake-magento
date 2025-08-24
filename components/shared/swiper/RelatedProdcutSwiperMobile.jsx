import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RenderType } from '@graphcommerce/next-ui'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import { productListRenderer } from '../../ProductListItems'

function RelativeProductListMobile({ count = 4, productList }) {
  const itemToRenderer = productList ?? []
  const [showAll, setShowAll] = useState(false)
  const isMobile = useMediaQuery('(max-width:420px)')
  const itemsToRender = showAll ? itemToRenderer : itemToRenderer?.slice(0, count)
  return (
    <Box>
      {/* Prodct Cards */}

      <>
        <AddProductsToCartForm>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2,1fr)',
              columnGap: '13px',
              rowGap: '30px',
              marginTop: { xs: '10px', sm: '15px' },
            }}
          >
            {itemsToRender?.map((product, index) => (
              <Box
                key={product?.uid || index}
                sx={{
                  '& .ProductListItem-imageContainer ': {
                    borderRadius: 'none !important',
                    '& img': {
                      borderRadius: '8px',
                    },
                    '& .ProductListItem-topLeft': {
                      gridArea: 'unset',
                    },
                    '& .ProductListItem-topRight .MuiButtonBase-root': {
                      padding: '9px',
                      '& svg.ProductWishlistChipBase-wishlistIconActive': {
                        fontSize: '18px',
                      },

                      '&:hover ': {
                        '& svg': {
                          fill: (theme) => theme.palette.custom.wishlistColor,
                        },
                      },
                    },
                  },
                  '& .ProductListItem-titleContainer': {
                    '& .ProductListItem-title': {
                      color: (theme) => theme.palette.custom.dark,
                      // minHeight: { xs: '40px', md: '50px' },
                      fontSize: { xs: '15px', md: '16px' },
                      lineHeight: '158%',
                      minWidth: { xs: '130px' },
                      maxWidth: { xs: '100%' },
                    },
                    '& .MuiButtonBase-root': {
                      width: { xs: '45px' },
                      height: { xs: '45px' },
                      '& svg': {
                        fontSize: '28px',
                        left: '7px',
                        top: '4px',
                      },
                    },
                  },
                }}
              >
                <RenderType renderer={productListRenderer} {...product} />
              </Box>
            ))}
          </Box>
        </AddProductsToCartForm>

        {/* Show */}

        {itemToRenderer?.length > count && (
          <Box textAlign='center' mt={2}>
            <Typography
              onClick={() => setShowAll(!showAll)}
              sx={{
                fontSize: '15px',
                fontWeight: 500,
                color: (theme) => theme.palette.custom.main,
                textDecoration: 'underline',
                cursor: 'pointer',
                '&:hover': {
                  color: (theme) => theme.palette.custom.main,
                  background: 'transparent',
                },
              }}
            >
              {showAll ? 'Show Less' : 'View All'}
            </Typography>
          </Box>
        )}
      </>
    </Box>
  )
}
export default RelativeProductListMobile
