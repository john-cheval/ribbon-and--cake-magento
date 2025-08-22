import 'swiper/css'
import {
  AddProductsToCartForm /*, ProductListItem */,
  ProductListDocument,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import { RenderType } from '@graphcommerce/next-ui'
import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
// import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { useApolloClient } from '@apollo/client'
import { productListRenderer } from '../../ProductListItems'
import Loading from '../Loading'

export const linkStyle = css`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #000;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`

export function ProductSwiper({ data = [], link = '/', initial = '', productList = [] }) {
  const itemToRender = productList || []
  const swiperRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(initial || data?.[0]?.name)
  const [allPageItems, setAllPageItems] = useState([])
  const client = useApolloClient()

  const fetchProducts = async (categoryId) => {
    if (itemToRender?.length > 0) return
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

  function handleCategoryClick(category) {
    setSelectedCategory(category?.name)
    fetchProducts(String(category?.id))
  }

  useEffect(() => {
    if (itemToRender.length > 0) {
      setAllPageItems(itemToRender)
    } else {
      fetchProducts(String(data?.[0]?.id))
    }
  }, [])

  return (
    <Box component='div'>
      {data?.length > 0 && (
        <Box
          component='div'
          sx={{
            paddingTop: { xs: '15px', md: '20px', lg: '22px' },
            paddingBottom: { xs: '20px', md: '20px', lg: '30px' },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            component='div'
            sx={{
              display: 'flex',
              columnGap: '5px',
              alignItems: 'center',
            }}
          >
            {data?.map((category, index) => (
              <Box
                component='span'
                key={category?.uid || index}
                onClick={() => handleCategoryClick(category)}
                sx={{
                  backgroundColor:
                    selectedCategory === category?.name
                      ? (theme) => theme.palette.custom.border
                      : 'transparent',
                  fontWeight: 400,
                  textAlign: 'center',
                  color:
                    selectedCategory === category?.name
                      ? (theme) => theme.palette.custom.smallHeading
                      : (theme) => theme.palette.custom.tertiary,
                  borderRadius: selectedCategory === category?.name ? '999px' : 'none',
                  cursor: 'pointer',
                  padding: { md: '5px 15px', lg: '8px 20px' },
                  transition: 'all 0.3s ease',
                  border: (theme) => `1px solid ${theme.palette.primary.contrastText}`,
                  fontSize: { xs: '15px', lg: '16px' },
                  '&:hover': {
                    border: (theme) => `1px solid ${theme.palette.custom.border}`,
                    borderRadius: '999px',
                    color: (theme) => theme.palette.custom.smallHeading,
                  },
                }}
              >
                <span
                  style={{
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                  // href={category?.url_path}
                >
                  {category?.name}
                </span>
              </Box>
            ))}
          </Box>

          <Link href={link} css={linkStyle}>
            View All
          </Link>
        </Box>
      )}
      {isLoading ? (
        <Box>
          <Loading />
        </Box>
      ) : (
        <Box
          component='div'
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          <AddProductsToCartForm>
            <Swiper
              key={selectedCategory}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              modules={[Autoplay]}
              loop
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2.5,
                },
                1200: {
                  slidesPerView: 3.5,
                },
                1350: {
                  slidesPerView: 4.5,
                },
              }}
              spaceBetween={28}
              grabCursor
            >
              {allPageItems?.map((product, index) => (
                <SwiperSlide key={product?.uid || index}>
                  {/* <ProductListItem {...product} />*/}
                  <Box
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
                        rowGap: { xs: '2px', md: '0' },
                        '& .ProductListItem-title': {
                          color: (theme) => theme.palette.custom.dark,
                          //  minHeight: '50px',
                          fontSize: { sm: '15px', md: '16px' },
                          lineHeight: '158%',
                        },
                        '& .MuiButtonBase-root': {
                          width: '45px',
                          height: '45px',

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
                </SwiperSlide>
              ))}
            </Swiper>
          </AddProductsToCartForm>
        </Box>
      )}
    </Box>
  )
}
