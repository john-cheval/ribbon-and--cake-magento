import { Box, Typography } from '@mui/material'
import { storyData } from '../../../constants/Home/swiper'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'
import HomeProductListMobile from './HomeProductListMobile'

export function HomeStory(props) {
  const { title } = props

  return (
    <Box
      sx={{
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingTop: { xs: '30px', md: '45px', lg: '60px', xl: '80px' },
      }}
      component='section'
    >
      <Typography component='h2' variant='h2' sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        {title || 'Start your sweet story'}
      </Typography>

      <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
        <ProductSwiper data={storyData} link='/cakes' initial='Custom Cake' />
      </Box>

      <Box component='div' sx={{ display: { xs: 'block', md: 'none' } }}>
        <HomeProductListMobile data={storyData} link='/cakes' initial='Custom Cake' count={4} />
      </Box>
    </Box>
  )
}
