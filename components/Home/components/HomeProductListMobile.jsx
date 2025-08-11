import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RenderType } from '@graphcommerce/next-ui'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'
import { productListRenderer } from '../../ProductListItems'

function HomeProductListMobile({
  data = [],
  link = '/',
  initial = '',
  count = 4,
  isCategory = true,
  productList,
}) {
  const [selectedCategory, setSelectedCategory] = useState(data?.[0]?.name || initial)
  const [showAll, setShowAll] = useState(false)
  const itemsToRender = showAll ? productList : productList.slice(0, count)

  const isMobile = useMediaQuery('(max-width:550px)')

  return (
    <Box>
      {/* Prodct Cards Categories */}
      {isCategory && (
        <Box
          component='div'
          sx={{
            display: 'flex',
            columnGap: '5px',
            alignItems: 'center',
            overflowX: 'auto',
            whiteSpace: 'nowrap',

            '&::-webkit-scrollbar': {
              display: 'none',
            },

            scrollbarWidth: 'none',

            '-ms-overflow-style': 'none',

            paddingBottom: '5px',
            marginTop: '10px',
          }}
        >
          {data?.map((category, index) => (
            <Box
              component='span'
              key={index}
              onClick={() => setSelectedCategory(category?.name)}
              sx={{
                backgroundColor:
                  selectedCategory === category?.name
                    ? (theme) => theme.palette.custom.border
                    : 'transparent',
                fontWeight: 400,
                color:
                  selectedCategory === category?.name
                    ? (theme) => theme.palette.custom.main
                    : (theme) => theme.palette.custom.tertiary,
                borderRadius: selectedCategory === category?.name ? '999px' : 'none',
                cursor: 'pointer',
                padding: { xs: '6px 15px', md: '10px 20px' },
                transition: 'all 0.3s ease',
                border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
                '&:hover': {
                  border: (theme) => `1px solid ${theme.palette.custom.border}`,
                  borderRadius: '999px',
                  color: (theme) => theme.palette.custom.main,
                },
              }}
            >
              <Link
                style={{
                  textDecoration: 'none',
                }}
                href={category?.url_path}
              >
                {category?.name}
              </Link>
            </Box>
          ))}
        </Box>
      )}
      {/* Prodct Cards */}
      <AddProductsToCartForm>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
            columnGap: '13px',
            rowGap: '16px',
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
                },
                '& .ProductListItem-titleContainer': {
                  '& .ProductListItem-title': {
                    color: (theme) => theme.palette.custom.dark,
                    minHeight: { xs: '40px', md: '50px' },
                    fontSize: { xs: '12px', sm: '14px', md: '16px' },
                    lineHeight: '158%',
                    minWidth: { xs: '130px' },
                    maxWidth: { xs: '100%' },
                  },
                  '& .MuiButtonBase-root': {
                    width: { xs: '45px', sm: '50px' },
                    height: { xs: '45px', sm: '50px' },
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

      {productList?.length > count && (
        <Box textAlign='center' mt={2}>
          <Typography
            onClick={() => setShowAll(!showAll)}
            sx={{
              fontSize: '14px',
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
    </Box>
  )
}
export default HomeProductListMobile
