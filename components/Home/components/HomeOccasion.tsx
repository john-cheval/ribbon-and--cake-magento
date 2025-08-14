import { Box } from '@mui/material'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeOccasion(props) {
  const { occasionCategories, title } = props
  const splittedOccastionCategories = occasionCategories?.children?.slice(0, 6)

  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', lg: '55px' },
        paddingTop: { xs: '30px', md: '45px', lg: '60px', xl: '70px' },
      }}
      component='section'
    >
      {title && <div dangerouslySetInnerHTML={{ __html: title }} />}

      <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProductSwiper
          data={splittedOccastionCategories}
          link='/cakes'
          initial={splittedOccastionCategories?.[0]?.name}
        />
      </Box>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile
          data={splittedOccastionCategories}
          link='/cakes'
          initial={splittedOccastionCategories?.[0]?.name}
          count={4}
        />
      </Box>
    </Box>
  )
}
