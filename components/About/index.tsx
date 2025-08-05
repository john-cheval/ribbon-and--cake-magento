import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import { MpBlogPostsQuery } from '../../graphql/BlogsByCatergoryId.gql'
import aboutSvg from '../Assets/about/Vector_1.svg'
import svgIcon from '../Assets/about/Vector.svg'
import { HoveredButton } from '../shared/Button/HoveredButon'
import Clients from '../shared/Clients'
import Testimonials from '../shared/Testimonials'

// import AboutLeft from './Left'

export type AboutPageProps = {
  left?: string
  topCenter?: string
  topRight?: string
  testimonials?: MpBlogPostsQuery
  clients?: string
}

export function About(props: AboutPageProps) {
  const { left, topCenter, topRight, testimonials, clients } = props
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
        <Box
          sx={{ gridColumn: { xs: 'auto', md: 'span 2' }, display: { xs: 'none', lg: 'block' } }}
        >
          {/*<AboutLeft /> */}
          {left && <div dangerouslySetInnerHTML={{ __html: left }} />}
        </Box>

        <Box
          component='div'
          sx={{
            gridColumn: { xs: 'auto', md: 'span 6' },
            display: 'block',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {/*  <Typography
            component='h2'
            variant='h2'
            sx={{
              color: '#9B7C38',
              fontSize: { xs: '25px !important', md: '30px !important' },
              // maxWidth: '250px',
              display: { xs: 'block', lg: 'none' },
              marginBottom: { xs: '10px' },
            }}
          >
            Create designs with buttercream icing
          </Typography>
          <Box>
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
          </Box>*/}
          {topCenter && <div dangerouslySetInnerHTML={{ __html: topCenter }} />}
        </Box>

        <Box sx={{ gridColumn: { xs: 'auto', md: 'span 6', lg: 'span 4' } }}>
          {/*<Box sx={{ marginBottom: { xs: '20px', md: '35px' } }}>
             <Typography
              component='p'
              variant='p'
              sx={{
                color: (theme: any) => theme.palette.custom.secondary,
                lineHeight: '170% !important',
                fontWeight: '400',
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
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
                color: (theme: any) => theme.palette.custom.secondary,
                lineHeight: '170% !important',
                fontWeight: '400',
                fontSize: { xs: '12px', sm: '14px', md: '16px' },
              }}
            >
              Founded in 2015 by Chitra Bulani, Ribbons and Balloons Bakery specializes in eggless
              cakes and desserts that are both delicious and visually stunning. Discover her edible
              works of art that are guaranteed to make a lasting impression on your mood and senses.
              Each product is methodically created with this in mind. This is why she calls it a
              creation, not just a cake! Founded in
            </Typography> 
          </Box>*/}
          {topRight && <div dangerouslySetInnerHTML={{ __html: topRight }} />}
          <HoveredButton
            text='Explore our collections'
            href='/explore'
            isArrow={true}
            width='fit-content'
            isCenter={true}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            top: { lg: '45%', xl: '40%' },
            left: '15%',
            display: { xs: 'none', lg: 'block' },
          }}
        >
          <Image
            src={aboutSvg}
            alt='svg'
            sx={{ width: '100%', height: '180px', objectCover: 'cover' }}
          />
        </Box>
      </Box>

      <Testimonials testiData={testimonials} />
      <Clients clientsData={clients} />

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
        <Image
          src={svgIcon}
          alt='scgIcon'
          sx={{ width: '100%', height: { xs: 'fit-content', lg: '600px' } }}
        />
      </Box>
    </Box>
  )
}

export default About
