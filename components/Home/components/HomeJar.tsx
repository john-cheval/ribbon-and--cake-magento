import { Box, Typography } from '@mui/material'
// import { HomeJarFragment } from './HomeJar.gql'
import { miniBitesData } from '../../../constants/Home/swiper'
import { ProductSwiper } from '../../shared/swiper/ProductSwiper'

export function HomeJar(props) {
  const { title } = props

  return (
    <Box
      sx={{ paddingInline: '55px', paddingTop: '88px', paddingBottom: '55px' }}
      component='section'
    >
      <Typography component='h2' variant='h2'>
        {title || 'Mini Bites & Jars'}
      </Typography>

      <Box component='div'>
        <ProductSwiper data={miniBitesData} link='/cakes' initial='Brownie' />
      </Box>
    </Box>
  )
}
