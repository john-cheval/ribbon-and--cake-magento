import 'swiper/css'
import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useRef } from 'react'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import {
  AddProductsToCartFab,
  AddProductsToCartForm,
  ProductListPrice,
} from '@graphcommerce/magento-product'

export function HeroSwiper({ products }) {
  const swiperRef = useRef<SwiperCore | null>(null)
  console.log(products, 'this is the products')

  return (
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
          // modules={[Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          // slidesPerView={4.5}
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 7,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 3.5,
            },
            1500: {
              slidesPerView: 4.5,
            },
          }}
          grabCursor
        >
          {products?.map((item, index) => (
            <SwiperSlide key={item?.id || index}>
              <Box
                sx={{
                  background:
                    'linear-gradient(90deg, rgba(255, 255, 255, 0.73) 0%, rgba(255, 255, 255, 0.79) 100%)',
                  backdropFilter: 'blur(4.050000190734863px)',
                  padding: { xs: '7px', md: '10px' },
                  borderRadius: '8px',
                  display: 'flex',
                  gap: { xs: '10px', md: '12px' },
                  alignItems: 'center',
                  border: '1px solid #fff',
                  '& picture': {
                    width: { xs: '70px', md: '100px' },
                    height: { xs: '70px', md: '100px' },
                  },
                }}
              >
                <Image
                  src={item?.small_image?.url}
                  alt={item?.name || 'product Image'}
                  // width={100}
                  // height={100}
                  // sizes='100vw'
                  layout='fill'
                  sx={{
                    width: '100%',
                    // maxWidth: { xs: '70px', md: '100px' },
                    //maxHeight: { xs: '70px', md: '100px' },
                    height: '100%',
                    // maxHeight: '100px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                  }}
                />

                <Box
                  component='div'
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    // rowGap: '3px',
                    flexGrow: 1,
                    justifyContent: 'center',
                    position: 'relative',
                  }}
                >
                  {item?.categories?.length > 0 && (
                    <Typography
                      component='p'
                      sx={{
                        fontWeight: 300,
                        lineHeight: '170%',
                        fontSize: '12px !important',
                        letterSpacing: '0%',
                        color: '#878787',
                        textDecoration: 'underline',
                      }}
                    >
                      {item?.categories[0]?.name}
                    </Typography>
                  )}

                  <Typography
                    component='p'
                    sx={{
                      color: '#000 !important',
                      fontSize: { xs: '14px', md: '16px' },
                      maxWidth: { xs: '100px', md: '100%' },
                      fontWeight: 300,
                    }}
                  >
                    {item?.name}
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      columnGap: '3px',
                    }}
                  >
                    <ProductListPrice
                      sx={{
                        fontSize: { xs: '12px', sm: '14px', md: '16px' },
                      }}
                      {...item?.price_range?.minimum_price}
                    />

                    <AddProductsToCartFab sku={item?.sku} isButton={true} />
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </AddProductsToCartForm>
    </Box>
  )
}
