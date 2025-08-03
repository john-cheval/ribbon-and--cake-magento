'use client'

import 'swiper/css'
import 'swiper/css/autoplay'
import { Image } from '@graphcommerce/image'
import { Box, Button, Typography } from '@mui/material'
import { useRef, useState } from 'react'
import { IoArrowBackOutline, IoArrowForward } from 'react-icons/io5'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import quote from '../../Assets/about/quote.svg'
import { TestimonialSwiperPropsType } from '../types/SwiperPropsType'

function TestimonialSwiper({ data }: TestimonialSwiperPropsType) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev()
    }
  }

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext()
    }
  }

  const handleSlideChange = () => {
    if (swiperRef.current) {
      setActiveSlide(swiperRef.current.realIndex)
    }
  }
  return (
    <Box component='div' sx={{ position: 'relative' }}>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSlideChange}
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        // slidesPerView={1.5}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 28,
          },
        }}
        spaceBetween={28}
        grabCursor
        centeredSlides
      >
        {data?.map((item, index) => (
          <SwiperSlide key={item?.id || index}>
            <Box
              sx={{
                borderRadius: '8px',
                position: 'relative',
                backgroundColor: activeSlide === index ? '#F6DBE0' : '#Ffff',
                border: activeSlide === index ? 'none' : '1px solid #E6E6E6',
                transition: 'all 0.3s ease',
                padding: { xs: '30px', xl: '30px 80px 60px' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { x: '10px', md: '15px', lg: '25px' },
              }}
            >
              <Box>
                <Image
                  src={item?.imageUrl}
                  alt={item?.title}
                  sx={{
                    width: 'auto',
                    height: 'auto',
                    maxHeight: '100px',
                  }}
                />
              </Box>

              <Typography
                component='p'
                variant='p'
                sx={{
                  color: (theme: any) => theme.palette.custom.smallHeading,
                  fontSize: { xs: '14px !important', md: '16px !important', lg: '20px !important' },
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                {item?.title}
              </Typography>

              <Typography
                component='p'
                variant='p'
                sx={{
                  color: (theme: any) => theme.palette.custom.secondary,
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                  textAlign: 'center',
                  // maxWidth: '650px',
                }}
              >
                {item?.description}
              </Typography>
            </Box>
            {activeSlide === index && (
              <Box
                sx={{
                  position: 'absolute',
                  top: '-80px',
                  left: '50px',
                  zIndex: 1999999,
                }}
              >
                <Image
                  src={quote}
                  alt='quote'
                  width={200}
                  height={200}
                  sx={{ width: '100%', height: '200px' }}
                />
              </Box>
            )}
          </SwiperSlide>
        ))}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '28px',
            marginTop: { xs: '20px', md: '25px' },
          }}
        >
          <Button
            sx={{
              border: '1px solid #DEDEDE',
              padding: '20px 15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': {
                fontSize: '20px',
              },
            }}
            disableRipple
            onClick={handlePrev}
          >
            <IoArrowBackOutline color='#22334F' />
          </Button>
          <Button
            sx={{
              border: '1px solid #DEDEDE',
              padding: '20px 15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& svg': {
                fontSize: '20px',
              },
            }}
            disableRipple
            onClick={handleNext}
          >
            <IoArrowForward color='#22334F' />
          </Button>
        </Box>
      </Swiper>
    </Box>
  )
}

export default TestimonialSwiper
