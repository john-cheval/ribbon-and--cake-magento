import { Box, Typography } from '@mui/material'
import { occasionsData } from '../../../constants/Home/swiper'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'
import HomeProductListMobile from './HomeProductListMobile'

// import { HomeOccasionFragment } from './HomeOccasion.gql'

export function HomeOccasion(props) {
  const { title } = props
  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingTop: { xs: '30px', md: '45px', lg: '60px', xl: '70px' },
      }}
      component='section'
    >
      <Typography component='h2' variant='h2' sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        {title || 'shop for occasions'}
      </Typography>

      <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProductSwiper data={occasionsData} link='/cakes' initial='Birthday' />
      </Box>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile data={occasionsData} link='/cakes' initial='Birthday' count={4} />
      </Box>
    </Box>
  )
}
