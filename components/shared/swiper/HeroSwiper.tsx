import 'swiper/css'
import { Image } from '@graphcommerce/image'
import { Box, Button, Typography, useMediaQuery } from '@mui/material'
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
import { IoArrowForwardSharp } from 'react-icons/io5'

export function HeroSwiper({ products }) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const isMobile = useMediaQuery('(max-width:769px)')

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
          modules={[Autoplay]}
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
              <Link
                href={`/p/${item?.url_key}`}
                passHref
                legacyBehavior
                style={{
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <Box
                  component='a'
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
                    textDecoration: 'none',
                    cursor: 'pointer',
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
                      // width: '100%',
                      // maxWidth: { xs: '70px', md: '100px' },
                      //maxHeight: { xs: '70px', md: '100px' },
                      // height: '100%',
                      // maxHeight: '100px',
                      objectFit: 'cover',
                      borderRadius: '4px',
                      width: { xs: '70px', md: '105px' },
                      heihgt: { xs: '65px', md: '98px' },
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
                      <Link
                        href={`/${item?.categories[0]?.url_key}`}
                        style={{
                          fontWeight: 300,
                          lineHeight: '170%',
                          fontSize: '12px',
                          letterSpacing: '0%',
                          color: '#878787',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        {item?.categories[0]?.name}
                      </Link>
                    )}

                    <Typography
                      component='p'
                      sx={{
                        color: '#000 !important',
                        fontSize: { xs: '15px', md: '16px' },
                        maxWidth: { xs: '100px', md: '100%' },
                        fontWeight: 300,
                        minHeight: { xs: '0', md: '54px' },
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
                          fontSize: { xs: '15px', md: '16px' },
                        }}
                        {...item?.price_range?.minimum_price}
                      />
                      {item?.__typename === 'SimpleProduct' ? (
                        <AddProductsToCartFab sku={item?.sku} isButton={true} />
                      ) : (
                        <Link href={`/p/${item?.url_key}`} passHref legacyBehavior>
                          <Button
                            type='submit'
                            sx={{
                              fontWeight: 400,
                              lineHeight: '170%',
                              fontSize: { xs: '15px !important', md: '15px !important' },
                              color: '#302100',
                              textDecoration: 'underline',
                              display: 'flex',
                              alignItems: 'center',
                              columnGap: '4px',
                              justifyContent: 'flex-end',
                              marginLeft: 'auto',
                              cursor: 'pointer',
                              pointerEvents: 'auto',
                              '& .arrow-icon': {
                                transition: 'transform 0.3s ease-in-out',
                              },
                              '&:hover .arrow-icon': {
                                transform: 'translateX(5px)',
                              },
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              fontFamily: 'inherit',
                              textAlign: 'inherit',
                              width: 'fit-content',
                              '&:hover': {
                                background: 'transparent',
                              },
                            }}
                          >
                            Cart
                            <Box
                              component='span'
                              className='arrow-icon'
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                              }}
                            >
                              <IoArrowForwardSharp />
                            </Box>
                          </Button>
                        </Link>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </AddProductsToCartForm>
    </Box>
  )
}
