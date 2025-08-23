import { Image } from '@graphcommerce/image'
import { Box } from '@mui/material'
import { MpBlogPostsQuery } from '../../graphql/BlogsByCatergoryId.gql'
import aboutSvg from '../Assets/about/Vector_1.svg'
import svgIcon from '../Assets/about/Vector.svg'
import Clients from '../shared/Clients'
import Testimonials from '../shared/Testimonials'
import AboutSectionTwo from './AboutSectionTwo'

export type AboutPageProps = {
  left?: string
  topCenter?: string
  topRight?: string
  testimonials?: MpBlogPostsQuery
  clients?: string
  sectionTwoRight?: string
  sectionTwoLeft?: string
}

export function About(props: AboutPageProps) {
  const { left, topCenter, topRight, testimonials, clients, sectionTwoLeft, sectionTwoRight } =
    props
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
          {topCenter && <div dangerouslySetInnerHTML={{ __html: topCenter }} />}
        </Box>

        <Box sx={{ gridColumn: { xs: 'auto', md: 'span 6', lg: 'span 4' } }}>
          {topRight && <div dangerouslySetInnerHTML={{ __html: topRight }} />}
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

      <Box
        sx={{
          paddingInline: { xs: '18px', md: '25px', lg: '55px' },
          marginTop: { xs: '20px', md: '30px', lg: '40px' },
        }}
      >
        <AboutSectionTwo sectionLeft={sectionTwoLeft} sectionRight={sectionTwoRight} />
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
