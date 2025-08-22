import 'swiper/css'
import { AddProductsToCartForm } from '@graphcommerce/magento-product'
import { RenderType } from '@graphcommerce/next-ui'
import { css } from '@emotion/react'
import { Box } from '@mui/material'
import { useRef } from 'react'
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

export function RelativeProductSwiper({ data = [], link = '/', initial = '', productList }) {
  const itemToRender = productList || []
  const swiperRef = useRef(null)

  return (
    <Box component='div'>
      <Box
        component='div'
        onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
        onMouseLeave={() => swiperRef.current?.autoplay?.start()}
      >
        <AddProductsToCartForm>
          <Swiper
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
            {itemToRender?.map((product, index) => (
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
                        fontSize: { xs: '15px', md: '16px' },
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
    </Box>
  )
}
