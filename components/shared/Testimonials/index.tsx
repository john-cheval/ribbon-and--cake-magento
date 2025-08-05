import { Box, Typography } from '@mui/material'
import { MpBlogPostsQuery } from '../../../graphql/BlogsByCatergoryId.gql'
import TestimonialSwiper from '../swiper/TestimonialSwiper'

export type TestimonialsPropsType = {
  testiData?: MpBlogPostsQuery
}

function Testimonials({ testiData }) {
  return (
    <Box
      component='section'
      sx={{
        marginTop: { xs: '25px', md: '30px', lg: '40px', xl: '68px' },
        position: 'relative',
        zIndex: 56,
        paddingInline: { xs: '18px', md: 0 },
      }}
    >
      <Typography
        variant='h2'
        component='h3'
        sx={{
          textAlign: 'center',
          marginBottom: { xs: '25px', md: '30px', lg: '40px' },
        }}
      >
        Testimonials
      </Typography>
      <Box component='div'>
        <TestimonialSwiper data={testiData} />
      </Box>
    </Box>
  )
}

export default Testimonials
