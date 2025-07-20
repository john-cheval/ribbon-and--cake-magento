import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import mainImage from '../Assets/about/abt-img.jpg'
import svgIcon from '../Assets/about/Vector.svg'
import { HoveredButton } from '../shared/Button/HoveredButon'
import Clients from '../shared/Clients'
import Testimonials from '../shared/Testimonials'
import AboutLeft from './Left'

export function About() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        component='section'
        sx={{
          paddingInline: { xs: '18px', md: '25px', lg: '55px' },
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gridTemplateRows: { xs: 'auto', md: 'auto' },
          gap: { xs: '20px', md: '30px' },
          position: 'relative',
          zIndex: 100,
        }}
      >
        <Box sx={{ gridColumn: { xs: 'auto', md: 'span 2' } }}>
          <AboutLeft />
        </Box>

        <Box
          component='div'
          sx={{
            gridColumn: { xs: 'auto', md: 'span 6' },
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Image
            src={mainImage}
            alt={'product Image'}
            // width={551}
            // height={532}
            sizes='100vw'
            sx={{
              borderRadius: '8px',
              width: '100%',
              objectFit: 'cover',
              height: 'auto',
            }}
          />
        </Box>

        <Box sx={{ gridColumn: { xs: 'auto', md: 'span 4' } }}>
          <Box sx={{ marginBottom: { xs: '20px', md: '35px' } }}>
            <Typography
              component='p'
              variant='p'
              sx={{
                color: '#6F6F6F',
                lineHeight: '170% !important',
                fontWeight: '400',
                marginBottom: '20px',
              }}
            >
              Founded in 2015 by Chitra Bulani, Ribbons and Balloons Bakery specializes in eggless
              cakes and desserts that are both delicious and visually stunning. Discover her edible
              works of art that are guaranteed to make a lasting impression on your mood and senses.
              Each product is methodically created with this in mind. This is why she calls it a
              creation, not just a cake!
            </Typography>

            <Typography
              component='p'
              variant='p'
              sx={{
                color: '#6F6F6F',
                lineHeight: '170% !important',
                fontWeight: '400',
              }}
            >
              Founded in 2015 by Chitra Bulani, Ribbons and Balloons Bakery specializes in eggless
              cakes and desserts that are both delicious and visually stunning. Discover her edible
              works of art that are guaranteed to make a lasting impression on your mood and senses.
              Each product is methodically created with this in mind. This is why she calls it a
              creation, not just a cake! Founded in
            </Typography>
          </Box>

          <HoveredButton
            text='Explore our collections'
            href='/explore'
            isArrow={true}
            width='fit-content'
          />
        </Box>
      </Box>

      <Testimonials />
      <Clients />

      <Box
        sx={{
          background: 'rgba(246, 219, 224, 0.51)',
          filter: 'blur(200px)',
          borderRadius: '787px',
          width: '100%',
          height: '787px',
          position: 'absolute',
          top: '10%',
          right: '10%',
        }}
      />

      <Box sx={{ position: 'absolute', top: '10%', right: '20%', zIndex: 55 }}>
        <Image src={svgIcon} alt='scgIcon' sx={{ width: '100%', height: '600px' }} />
      </Box>
    </Box>
  )
}

export default About
