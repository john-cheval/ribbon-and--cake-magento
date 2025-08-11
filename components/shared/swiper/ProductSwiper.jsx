import 'swiper/css'
import { AddProductsToCartForm /*, ProductListItem */ } from '@graphcommerce/magento-product'
import { RenderType } from '@graphcommerce/next-ui'
import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Link from 'next/link'
import { useRef, useState } from 'react'
// import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { productListRenderer } from '../../ProductListItems'

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
export function ProductSwiper({ data = [], link = '/', initial = '', productList }) {
  const swiperRef = useRef(null)

  const [selectedCategory, setSelectedCategory] = useState(initial || data?.[0]?.name)

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
                onClick={() => setSelectedCategory(category?.name)}
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
                  fontSize: { xs: '14px', lg: '16px' },
                  '&:hover': {
                    border: (theme) => `1px solid ${theme.palette.custom.border}`,
                    borderRadius: '999px',
                    color: (theme) => theme.palette.custom.smallHeading,
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

          <Link href={link} css={linkStyle}>
            View All
          </Link>
        </Box>
      )}

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
                slidesPerView: 4.5,
              },
              1500: {
                slidesPerView: 5.5,
              },
            }}
            spaceBetween={28}
            grabCursor
          >
            {productList?.map((product, index) => (
              <SwiperSlide key={product?.uid || index}>
                {/* <ProductListItem {...product} />*/}
                <Box
                  sx={{
                    '& .ProductListItem-imageContainer ': {
                      borderRadius: 'none !important',
                      '& img': {
                        borderRadius: '8px',
                      },
                      '& .ProductListItem-topRight .MuiButtonBase-root': {
                        border: (theme) => `1px solid ${theme.palette.custom.wishlistColor}`,
                        transition: 'all 0.4s ease-in-out',
                        '&:hover': {
                          boxShadow: '1px 3px 1px 0px rgb(0 0 0/ 0.6)',
                        },
                      },
                    },
                    '& .ProductListItem-titleContainer .ProductListItem-title': {
                      color: (theme) => theme.palette.custom.dark,
                      minHeight: '50px',
                      fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      lineHeight: '158%',
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
    </Box>
  )
}
