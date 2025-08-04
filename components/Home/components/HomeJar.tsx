import { Box, Typography } from '@mui/material'
import { miniBitesData } from '../../../constants/Home/swiper'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeJar(props) {
  const { title } = props

  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingTop: { xs: '30px', md: '45px', lg: '60px', xl: '80px' },
        paddingBottom: { xs: '30px', sm: '35px', md: '40px', lg: '55px' },
      }}
      component='section'
    >
      <Typography component='h2' variant='h2' sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        {title || 'Mini Bites & Jars'}
      </Typography>

      <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProductSwiper data={miniBitesData} link='/cakes' initial='Brownie' />
      </Box>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile data={miniBitesData} link='/cakes' initial='Brownie' count={4} />
      </Box>
    </Box>
  )
}
