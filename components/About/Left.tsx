import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import LwdtImage from '../Assets/about/img.jpg'

function AboutLeft() {
  return (
    <Box>
      <Typography variant='h1' component='h1' sx={{ color: '#9B7C38', marginBottom: '5px' }}>
        Our Story
      </Typography>

      <Typography
        component='h2'
        variant='h2'
        sx={{
          color: '#9B7C38',
          fontSize: { xs: '25px !important', md: '30px !important' },
          maxWidth: '250px',
        }}
      >
        Create designs with buttercream icing
      </Typography>
      <Box sx={{ display: { xs: 'none', md: 'block' }, marginTop: { md: '40px', lg: '70px' } }}>
        <Image
          src={LwdtImage}
          alt={'product Image'}
          //width={243}
          //height={235}
          // sizes='100vw'
          sx={{
            borderRadius: '8px',
            height: '100%',
            width: '100%',
            // minHeight: '280px',
            objectFit: 'cover',
          }}
        />
      </Box>
    </Box>
  )
}

export default AboutLeft
