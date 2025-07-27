import { Box, Typography } from '@mui/material'
import { storyData } from '../../../constants/Home/swiper'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'

export function HomeStory(props) {
  const { title } = props

  return (
    <Box
      sx={{ paddingInline: { xs: '18px', md: '25px', lg: '55px' }, paddingTop: '80px' }}
      component='section'
    >
      <Typography component='h2' variant='h2'>
        {title || 'Start your sweet story'}
      </Typography>

      <Box component='div'>
        <ProductSwiper data={storyData} link='/cakes' initial='Custom Cake' />
      </Box>
    </Box>
  )
}
