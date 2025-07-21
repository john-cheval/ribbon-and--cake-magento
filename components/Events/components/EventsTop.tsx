import { Box, Typography } from '@mui/material'

function EventsTop() {
  return (
    <Box component='section' sx={{ paddingInline: { xs: '18px', md: '25px', lg: '55px' } }}>
      <Typography
        variant='h1'
        component='h1'
        sx={{ color: '#9B7C38', marginBottom: '10px', textAlign: 'center' }}
      >
        Corporate & events
      </Typography>

      <Typography variant='p' component='p' sx={{ color: '#6F6F6F', textAlign: 'center' }}>
        Elevate your next event with Ribbons & Balloons. Our expert team specializes in
        personalizing cakes, cupcakes, and desserts with your brand or image. Just complete the form
        below to get started, no event is too big or small!Elevate your next event with Ribbons &
        Balloons. Our expert team specializes in personalizing cakes, cupcakes, and desserts with
        your brand or image. Just complete the form below to get started, no event is too big or
        small!Elevate your
      </Typography>
    </Box>
  )
}

export default EventsTop
