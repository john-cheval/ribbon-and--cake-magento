import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import { testimonialsData } from '../../../constants/Home/swiper'

function Clients() {
  return (
    <Box
      component='section'
      sx={{ marginTop: '65px', marginBottom: { xs: '30px', md: '45px', lg: '50px', xl: '90px' } }}
    >
      <Typography
        variant='h2'
        component='h3'
        sx={{ textAlign: 'center', marginBottom: { xs: '20px', md: '30px', xl: '47px' } }}
      >
        Clients
      </Typography>
      <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: '20px', md: '30px', xl: '45px' },
        }}
      >
        {testimonialsData?.map((item, index) => (
          <Box key={item?.id || index}>
            <Image
              src={item?.imageUrl}
              alt={item?.title}
              sx={{
                width: 'auto',
                height: 'auto',
                maxHeight: { xs: '100%', xl: '100px' },
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Clients
