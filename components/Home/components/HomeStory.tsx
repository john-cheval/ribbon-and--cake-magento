import { Box, Typography } from '@mui/material'
import { storyData } from '../../../constants/Home/swiper'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'

// import { HomeStoryFragment } from './HomeStory.gql'
// import { StorySwiper } from './StorySwiper'

export function HomeStory(props) {
  const { title } = props

  return (
    <Box sx={{ paddingInline: '55px', paddingTop: '80px' }} component='section'>
      <Typography component='h2' variant='h2'>
        {title || 'Start your sweet story'}
      </Typography>

      {/* <Box component='div'>
        <StorySwiper data={storyData} />
      </Box> */}

      <Box component='div'>
        <ProductSwiper data={storyData} link='/cakes' initial='Custom Cake' />
      </Box>
    </Box>
  )
}
