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

export type BlogPostItem = {
  post_id: string
  name: string
  url_key: string
  short_description: string
  created_at: string
  image: string
  post_content?: string
}

export type TestimonialsPropsType = {
  data?: BlogPostItem[]
}
export function TestimonialSwiper({ data }: TestimonialsPropsType) {
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

  const spreadeData = [...(data || []), ...(data || [])]
  if (!data) return
  return (
    <Box component='div' sx={{ position: 'relative' }} className='swiper_testi'>
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
        className='swiper-prop-testi'
      >
        {spreadeData?.map((item, index) => (
          <SwiperSlide key={item?.post_id || index}>
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
                  src={item?.image}
                  alt={item?.name}
                  layout='fill'
                  sx={{
                    width: 'auto',
                    height: 'auto',
                    minHeight: '100px',
                  }}
                />
              </Box>

              <Typography
                component='p'
                variant='p'
                sx={{
                  color: (theme: any) => theme.palette.custom.smallHeading,
                  fontSize: { xs: '15px !important', md: '16px !important', lg: '20px !important' },
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBlock: { xs: '10px', md: '0' },
                }}
              >
                {item?.name}
              </Typography>

              <Typography
                component='p'
                variant='p'
                sx={{
                  color: (theme: any) => theme.palette.custom.secondary,
                  fontSize: { xs: '15px', md: '16px' },
                  textAlign: 'center',
                  // maxWidth: '650px',
                }}
              >
                {item?.short_description}
              </Typography>
            </Box>
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
              padding: '13px 15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 'fit-content',
              '& svg': {
                fontSize: { sx: '15px', md: '20px' },
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
              padding: '13px 15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 'fit-content',
              '& svg': {
                fontSize: { sx: '15px', md: '20px' },
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
