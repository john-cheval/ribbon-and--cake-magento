import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import { testimonialsData } from '../../../constants/Home/swiper'

function Clients() {
  return (
    <Box component='section' sx={{ marginTop: '65px', marginBottom: '90px' }}>
      <Typography variant='h2' component='h3' sx={{ textAlign: 'center', marginBottom: '47px' }}>
        Clients
      </Typography>
      <Box
        component='div'
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '45px' }}
      >
        {testimonialsData?.map((item, index) => (
          <Box key={item?.id || index}>
            <Image
              src={item?.imageUrl}
              alt={item?.title}
              sx={{
                width: 'auto',
                height: 'auto',
                maxHeight: '100px',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Clients
