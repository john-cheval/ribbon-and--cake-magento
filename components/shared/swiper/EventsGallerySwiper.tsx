'use client'

import { StaticImageData } from 'next/image'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Image } from '@graphcommerce/image'
import { Box } from '@mui/material'
import { useRef, useState } from 'react'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export interface GalleryProps {
  imageGallery: string[] | StaticImageData[]
}

function EventsGallerySwiper({ imageGallery }: GalleryProps) {
  const swiperRef = useRef<SwiperCore | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
  }
  if (!imageGallery || imageGallery.length === 0) return null
  return (
    <Box component='section'>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        loop
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        onSlideChange={handleSlideChange}
        slidesPerView={1}
        grabCursor
      >
        {imageGallery?.map((item, index) => (
          <SwiperSlide key={index}>
            <Box sx={{}}>
              <Image
                src={`https://srv900162.hstgr.cloud/media/${item}`}
                alt={`image-${index + 1}`}
                layout='fill'
                sx={{
                  width: '100%',
                  height: 'auto',
                  // maxHeight: '100px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {imageGallery.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            columnGap: '15px',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: { xs: '5px', md: '10px', lg: '30px' },
            transition: 'all 0.3s ease-in-out',
            width: '100%',
          }}
        >
          {imageGallery?.map((_, i) => (
            <Box
              key={i}
              sx={{
                height: '10px',
                width: '10px',
                borderRadius: '50%',
                transition: 'all 0.3s ease-in-out',
                backgroundColor: activeIndex === i ? '#F1A8B6' : '#E9E9E9',
              }}
              className={`h-[7px] rounded-full transition-all duration-500 ease-in-out ${
                activeIndex === i ? 'w-[50px] bg-[#d81100]' : 'w-[20px] bg-[#D9D9D9]'
              }`}
            ></Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default EventsGallerySwiper
