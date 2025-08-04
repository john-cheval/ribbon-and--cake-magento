import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import { IoArrowForwardSharp } from 'react-icons/io5'
import { cutomize } from '../../../constants/Home/swiper'
// import { HomeSectionThreeFragment } from './HomeSectionThree.gql'
import heroImage from '../../Assets/image.jpg'
import svgImage from '../../Assets/name.svg'

export function HomeSectionThree(props) {
  const { title } = props
  return (
    <Box
      component='section'
      sx={{
        paddingInline: { xs: '18px', md: '25px', xl: '55px' },
        paddingTop: { xs: '35px', md: '50px', lg: '75px', xl: '100px' },
        display: 'flex',
        columnGap: { xs: 0, md: '15px', lg: '30px' },
        position: 'relative',
        flexDirection: { xs: 'column', lg: 'row' },
        rowGap: '20px',
      }}
    >
      <Box
        component='div'
        sx={{
          width: { xs: '100%', lg: '30%' },
        }}
      >
        <Typography component='h2' variant='h2' sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
          {title || 'Your Imagination, Our Creation'}
        </Typography>

        <Typography
          component='p'
          variant='p'
          sx={{
            color: (theme: any) => theme.palette.custom.secondary,
            lineHeight: '170% !important',
            fontWeight: '400',
            marginBottom: '20px',
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            textAlign: { xs: 'center', lg: 'left' },
          }}
        >
          Our cakes are not just desserts they are edible masterpieces. We specialize in creating
          highly detailed
        </Typography>
        <Box
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '8px',
            position: 'relative',
            fontWeight: 500,
            fontSize: { xs: '12px', sm: '14px', md: '16px' },
            lineHeight: '158%',
            letterSpacing: '0%',
            width: { xs: 'fit-content', md: '230px' },
            padding: { xs: '12px 20px', lg: '15px 20px' },
            overflow: 'hidden',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 1,
            marginInline: { xs: 'auto', lg: '0' },
            backgroundColor: { xs: '#F6DBE0', md: 'inherit' },
            color: (theme: any) => theme.palette.custom.main,
            '&:hover': {
              color: (theme: any) => theme.palette.primary.contrastText,
            },

            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '50%',
              backgroundColor: (theme: any) => theme.palette.custom.border,
              borderRadius: '4px',
              zIndex: -1,
              transition: 'all 0.5s ease',
            },

            '&:hover::before': {
              backgroundColor: (theme: any) => theme.palette.custom.heading,
              width: '100%',
            },
            '&:hover .arrow-icon': {
              transform: 'translateX(5px)',
            },
          }}
        >
          Customize your cake
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
        component='div'
        sx={{
          width: { xs: '100%', lg: '45%' },
        }}
      >
        <Image
          src={heroImage}
          alt='customize Image'
          width={456}
          height={612}
          sizes='100vw'
          sx={{
            // maxWidth: '456px',
            objectFit: 'cover',
            borderRadius: '8px',
            height: '100%',
            maxHeight: { xs: '100%', md: '100%', xl: '612px' },
          }}
        />
      </Box>

      <Box>
        {cutomize?.map((item, index) => (
          <Box
            key={item?.id || index}
            component='div'
            sx={{
              display: 'flex',
              columnGap: { xs: '25px', md: '30px' },
            }}
          >
            <Typography
              component='p'
              variant='h2'
              sx={{
                color: (theme: any) => theme.palette.custom.border,
                paddingBlock: '26px 30px',
              }}
            >
              {index + 1}
            </Typography>

            <Box
              component='div'
              sx={{
                position: 'relative',
                paddingBlock: { xs: '20px ', md: '26px 30px' },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '1px',
                  width: '100%',
                  background: 'linear-gradient(90deg, #F1A8B6 0%, #FFF 100%)',
                  transition: 'all 0.5s ease',
                },
                ...(index === cutomize.length - 1 && {
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '1px',
                    width: '100%',
                    background: 'linear-gradient(90deg, #F1A8B6 0%, #FFF 100%)',
                    transition: 'all 0.5s ease',
                  },
                }),
              }}
            >
              <Typography
                variant='p'
                component='p'
                sx={{
                  fontWeight: 400,
                  fontSize: { xs: '14px', sm: '16px', md: '20px' },
                  textTransform: 'uppercase',
                  marginBottom: { xs: '5px', lg: '10px' },
                }}
              >
                {item?.title}
              </Typography>
              <Typography
                variant='p'
                component='p'
                sx={{
                  fontWeight: 400,
                  lineHeight: '170% !important',
                  color: (theme: any) => theme.palette.custom.secondary,
                  textTransform: 'uppercase',
                  fontSize: { xs: '12px', sm: '14px', md: '16px' },
                }}
              >
                {item?.description}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        component='div'
        sx={{
          position: 'absolute',
          left: { xs: '20px', lg: '20%' },
          bottom: { xs: 'unset', lg: 'none' },
          top: { xs: '13%', sm: '8%', lg: 'unset' },
        }}
      >
        <Image
          src={svgImage}
          alt='customize Image'
          // width={456}
          // height={612}
          // sizes='100vw'
          sx={{
            // maxWidth: '456px',
            objectFit: 'cover',
            borderRadius: '8px',
            width: '100%',
            height: 'auto',
            minHeight: { xs: '180px', md: '200px', lg: '300px' },
          }}
        />
      </Box>
    </Box>
  )
}
