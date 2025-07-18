import 'swiper/css'
import { css } from '@emotion/react'
import { Box } from '@mui/material'
import Link from 'next/link'
import { useRef, useState } from 'react'
import type SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ProductCard } from '../Cards/ProductCard'
import type { SwiperPropType } from '../types/SwiperPropsType'

const linkStyle = css`
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: #000;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`
export function ProductSwiper({ data, link = '/', initial = '' }: SwiperPropType) {
  const swiperRef = useRef<SwiperCore | null>(null)

  const categories = [...new Set(data?.map((tab) => tab?.category).filter(Boolean))]
  const [selectedCategory, setSelectedCategory] = useState(categories?.[0] || initial)

  const filteredData = data.filter((item) => item.category === selectedCategory)

  if (!filteredData) {
    return null
  }
  return (
    <Box component='div'>
      <Box
        component='div'
        sx={{
          paddingTop: '27px',
          paddingBottom: '46px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          component='div'
          sx={{
            display: 'flex',
            columnGap: '35px',
            alignItems: 'center',
          }}
        >
          {categories?.map((category, index) => (
            <Box
              component='span'
              key={category || index}
              onClick={() => setSelectedCategory(category as string)}
              sx={{
                backgroundColor: selectedCategory === category ? '#F6DBE0' : 'transparent',
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: '16px !important',
                fontWeight: 400,
                // color: '#969696',
                color: selectedCategory === category ? '#2A110A' : '#969696',
                borderRadius: selectedCategory === category ? '999px' : 'none',
                cursor: 'pointer',
                padding: '10px 20px',
                transition: 'all 0.3s ease',
              }}
            >
              {category}
            </Box>
          ))}
        </Box>

        <Link href={link} css={linkStyle}>
          View All
        </Link>
      </Box>

      <Box component='div'>
        <Swiper
          key={selectedCategory}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
          // modules={[Autoplay]}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          slidesPerView={4.5}
          spaceBetween={28}
          grabCursor
        >
          {filteredData?.map((item, index) => (
            <SwiperSlide key={item?.id || index}>
              <ProductCard item={item} iconPosition='left' padding='14px' left='25px' />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  )
}
