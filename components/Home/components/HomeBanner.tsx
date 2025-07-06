import { Box, Typography } from '@mui/material'
import { IoArrowForwardSharp } from 'react-icons/io5'
import { HeroSwiper } from '../../shared/swiper/HeroSwiper'

// import { HomeBannerFragment } from './HomeBanner.gql'

export function HomeBanner(props) {
  // const { heroImage, title, description, linkText } = props

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
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            paddingInline: '55px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          <Typography
            component='h1'
            variant='h1'
            sx={{
              color: '#302100',
              maxWidth: '450px',
            }}
          >
            Celebration begins with R&B
          </Typography>

          <Typography
            component='p'
            variant='p'
            sx={{
              maxWidth: '400px',
              color: '#302100 !important',
              fontWeight: 400,
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
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '158%',
              letterSpacing: '0%',
              width: '200px',
              padding: '24px 20px',
              overflow: 'hidden',
              borderRadius: '4px',
              cursor: 'pointer',
              zIndex: 1,
              color: '#441E14',
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
            left: 0,
            right: 0,
            paddingLeft: '55px',
          }}
        >
          <Typography
            component='p'
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              lineHeight: '170%',
              fontSize: '16px !important',
              color: '#302100',
              textTransform: 'uppercase',
              marginBottom: '17px',
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
          top: '100px',
          left: 0,
        }}
      />
    </>
  )
}
