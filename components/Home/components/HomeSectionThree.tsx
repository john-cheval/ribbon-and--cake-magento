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
        paddingInline: '55px',
        paddingTop: '100px',
        display: 'flex',
        columnGap: '30px',
        position: 'relative',
      }}
    >
      <Box
        component='div'
        sx={{
          width: '30%',
        }}
      >
        <Typography component='h2' variant='h2'>
          {title || 'Your Imagination, Our Creation'}
        </Typography>

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
            fontFamily: "'Bricolage Grotesque', sans-serif",
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '158%',
            letterSpacing: '0%',
            width: '230px',
            padding: '15px 20px',
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
          width: '45%',
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
            maxHeight: '612px',
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
              columnGap: '30px',
            }}
          >
            <Typography
              component='p'
              variant='h2'
              sx={{
                color: '#F6DBE0 !important',
                paddingBlock: '26px 30px',
              }}
            >
              {index + 1}
            </Typography>

            <Box
              component='div'
              sx={{
                position: 'relative',
                paddingBlock: '26px 30px',

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
                  fontSize: '20px !important',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
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
                  color: '#6F6F6F',
                  textTransform: 'uppercase',
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
          left: '20%',
          bottom: '0',
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
            minHeight: { xs: '200px', md: '250px', lg: '300px' },
          }}
        />
      </Box>
    </Box>
  )
}
