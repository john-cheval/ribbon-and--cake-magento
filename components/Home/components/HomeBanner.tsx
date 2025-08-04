import { Box, Typography } from '@mui/material'
import { IoArrowForwardSharp } from 'react-icons/io5'
import { HeroSwiper } from '../../shared/swiper/HeroSwiper'

export function HomeBanner({ h }) {
  return (
    <>
      <Box
        component='section'
        sx={{
          // backgroundImage: `url(${heroImage?.url})`,
          backgroundImage:
            'url(https://ap-south-1.graphassets.com/cmbta5lm400l901wb51h39wvi/cmcitkne9247407oel27xdbb6)',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          height: { xs: '600px', lg: '90vh' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            paddingInline: { xs: '18px', md: '25px', lg: '55px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '15px',
            position: 'relative',
            top: '-13%',
          }}
        >
          <Typography
            component='h1'
            variant='h1'
            sx={{
              color: '#302100',
              maxWidth: { xs: '200px', md: '450px' },
            }}
          >
            Celebration begins with R&B
          </Typography>

          <Typography
            component='p'
            sx={{
              maxWidth: { xs: '250px', md: '400px' },
              color: '#302100 !important',
              fontWeight: 400,
              fontSize: { xs: '14px', md: '16px' },
            }}
          >
            Custom cakes, handcrafted desserts — made for your moment.
          </Typography>

          <Box
            component='div'
            sx={{
              display: 'flex',
              alignItems: 'center',
              columnGap: '8px',
              position: 'relative',
              fontWeight: 500,
              fontSize: { xs: '14px', md: '16px' },
              lineHeight: '158%',
              letterSpacing: '0%',
              width: { xs: 'fit-content', md: '200px' },
              padding: { xs: '12px 20px', md: '15px 20px' },
              overflow: 'hidden',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 1,
              color: '#441E14',
              backgroundColor: { xs: '#F6DBE0', md: 'inherit' },
              '&:hover': {
                color: '#fff',
              },

              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '50%',
                backgroundColor: '#F6DBE0',
                borderRadius: '4px',
                zIndex: -1,
                transition: 'all 0.5s ease',
              },

              '&:hover::before': {
                backgroundColor: '#9B7C38',
                width: '100%',
              },
              '&:hover .arrow-icon': {
                transform: 'translateX(5px)',
              },
            }}
          >
            Explore the menu
            <Box
              component='span'
              className='arrow-icon'
              sx={{
                display: 'inline-flex',
                transition: 'transform 0.5s ease',
              }}
            >
              <IoArrowForwardSharp />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: '50px',
            left: { xs: '18px', md: '25px', lg: '55px' },
            right: 0,
            //paddingInline: { xs: '18px', md: '25px', lg: '55px' },
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              lineHeight: '170%',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              color: '#302100',
              textTransform: 'uppercase',
              marginBottom: { xs: '10px', md: '17px' },
            }}
          >
            just in
          </Typography>

          <HeroSwiper />
        </Box>
      </Box>
      <Box
        sx={{
          backdropFilter: 'blur(0px)',
          background: 'linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)',
          width: '100%',
          height: '100%',
          maxHeight: '73px',
          position: 'absolute',
          top: { xs: '64px', lg: '79px' },
          left: 0,
        }}
      />
    </>
  )
}
