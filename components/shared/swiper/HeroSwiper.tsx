import 'swiper/css'
import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import Link from 'next/link'
import { useRef } from 'react'
import { IoArrowForwardSharp } from 'react-icons/io5'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { swiperHero } from '../../../constants/Home/swiper'
import dhirams from '../dhirams.svg'

export function HeroSwiper() {
  const swiperRef = useRef<SwiperCore | null>(null)

  return (
    <Box component='div'>
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
        slidesPerView={4.5}
        spaceBetween={20}
        grabCursor
      >
        {swiperHero?.map((item, index) => (
          <SwiperSlide key={item?.id || index}>
            <Box
              sx={{
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0.73) 0%, rgba(255, 255, 255, 0.79) 100%)',
                backdropFilter: 'blur(4.050000190734863px)',
                padding: '10px',
                borderRadius: '8px',
                display: 'flex',
                gap: '18px',
                alignItems: 'center',
              }}
            >
              <Image
                src={item?.image}
                alt={item?.title || 'product Image'}
                width={100}
                height={100}
                sizes='100vw'
                sx={{
                  maxWidth: 'auto',
                  height: 'auto',
                  maxHeight: '100px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
              />

              <Box
                component='div'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '3px',
                  flexGrow: 1,
                  justifyContent: 'center',
                  position: 'relative',
                }}
              >
                <Typography
                  component='p'
                  sx={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 300,
                    lineHeight: '170%',
                    fontSize: '12px !important',
                    letterSpacing: '0%',
                    color: '#878787',
                  }}
                >
                  {item?.category}
                </Typography>

                <Typography
                  component='p'
                  variant='p'
                  sx={{
                    color: '#000 !important',
                  }}
                >
                  {item?.title}
                </Typography>

                <Typography
                  variant='p'
                  component='p'
                  style={{
                    fontWeight: '800 !important',
                    color: '#000 !important',
                    display: 'flex',
                    gap: '3px',
                    alignItems: 'center',
                  }}
                >
                  {' '}
                  <Image
                    src={dhirams}
                    alt='Dhirams'
                    width={18}
                    height={18}
                    sizes='100vw'
                    sx={{
                      width: '100%',
                      maxWidth: '18px',
                      // objectFit: 'cover',
                    }}
                  />
                  {item?.price}
                </Typography>

                <Link
                  href='/cart'
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    fontWeight: 400,
                    lineHeight: '170%',
                    fontSize: '14px !important',
                    color: '#302100',
                    textDecoration: 'underline',
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '4px',
                    justifyContent: 'flex-end',
                    marginLeft: 'auto',
                    position: 'absolute',
                    bottom: '0px',
                    right: '15px',
                  }}
                >
                  Cart <IoArrowForwardSharp />
                </Link>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}
