import { AddProductsToCartForm, ProductListDocument } from '@graphcommerce/magento-product'
import { RenderType } from '@graphcommerce/next-ui'
import { useApolloClient } from '@apollo/client'
import { Box, Typography, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { productListRenderer } from '../../ProductListItems'
import Loading from '../../shared/Loading'

function HomeProductListMobile({
  data = [],
  link = '/',
  initial = '',
  count = 4,
  isCategory = true,
  productList = [],
  isRelated = false,
}) {
  const itemToRenderer = productList ?? []
  const [selectedCategory, setSelectedCategory] = useState(data?.[0]?.name || initial)
  const [showAll, setShowAll] = useState(false)
  const [allPageItems, setAllPageItems] = useState([])
  const client = useApolloClient()
  const [isLoading, setIsLoading] = useState(false)

  const fetchProducts = async (categoryId) => {
    if (itemToRenderer?.length > 0) return
    setIsLoading(true)

    const pageProducts = await client.query({
      query: ProductListDocument,
      variables: {
        pageSize: 10,
        currentPage: 1,
        filters: {
          category_id: { eq: categoryId },
        },
      },
    })
    setAllPageItems([...(pageProducts.data.products?.items ?? [])])
    setIsLoading(false)
  }
  const sourceArray = isCategory ? allPageItems : isRelated ? itemToRenderer : productList
  const itemsToRender = showAll ? sourceArray : sourceArray?.slice(0, count)

  function handleCategoryClick(category) {
    setSelectedCategory(category?.name)
    fetchProducts(String(category?.id))
  }

  //const isMobile = useMediaQuery('(max-width:420px)')

  useEffect(() => {
    fetchProducts(String(data?.[0]?.id))
  }, [])
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
            marginBottom: '15px',

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
              onClick={() => handleCategoryClick(category)}
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
                fontSize: { xs: '15px', md: '16px' },
                '&:hover': {
                  border: (theme) => `1px solid ${theme.palette.custom.border}`,
                  borderRadius: '999px',
                  color: (theme) => theme.palette.custom.main,
                },
              }}
            >
              <span
                style={{
                  textDecoration: 'none',
                }}
                href={category?.url_path}
              >
                {category?.name}
              </span>
            </Box>
          ))}
        </Box>
      )}
      {/* Prodct Cards */}

      {isLoading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
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
                        fontSize: { sm: '15px', md: '16px' },
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

          {sourceArray?.length > count && (
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
      )}
    </Box>
  )
}
export default HomeProductListMobile
