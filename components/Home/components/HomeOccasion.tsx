import { Box, Typography } from '@mui/material'
import { occasionsData } from '../../../constants/Home/swiper'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'

// import { HomeOccasionFragment } from './HomeOccasion.gql'

export function HomeOccasion(props) {
  const { title } = props
  return (
    <Box sx={{ paddingInline: '55px', paddingTop: '70px' }} component='section'>
      <Typography component='h2' variant='h2'>
        {title || 'shop for occasions'}
      </Typography>

      <Box component='div'>
        <ProductSwiper data={occasionsData} link='/cakes' initial='Birthday' />
      </Box>
    </Box>
  )
}
