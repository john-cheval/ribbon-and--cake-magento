import { Box, Typography } from '@mui/material'
import { testimonialsData } from '../../../constants/Home/swiper'
import TestimonialSwiper from '../swiper/TestimonialSwiper'

function Testimonials() {
  return (
    <Box component='section' sx={{ marginTop: '68px', position: 'relative', zIndex: 56 }}>
      <Typography variant='h2' component='h3' sx={{ textAlign: 'center', marginBottom: '60px' }}>
        Testimonials
      </Typography>
      <Box component='div'>
        <TestimonialSwiper data={testimonialsData} />
      </Box>
    </Box>
  )
}

export default Testimonials
