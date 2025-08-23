import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import imgs from '../Assets/about/image.png'
import svgIcon from '../Assets/about/Vector_1.svg'
import { HoveredButton } from '../shared/Button/HoveredButon'

function AboutSectionTwo() {
  return (
    <Box
      component='section'
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gridTemplateRows: { xs: 'auto', md: 'auto' },
        gap: { xs: '25px', md: '30px' },
        position: 'relative',
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          order: { xs: 2, md: 1 },
        }}
      >
        <div className='about-text-content'>
          <p className='about-description responsive-fonts mb-20'>
            We proudly offer over 50 exquisite flavors and deliver 100+ cakes daily to our loyal
            cake lovers, ensuring variety, freshness, and unmatched taste for every occasion
          </p>

          <p className='about-description responsive-fonts mb-20'>
            But we are not just about cakes—we customize and personalize desserts to match your
            theme and event. From edible brand logos and photo-inspired creations to intricate 3D
            characters, our team has worked with many leading brands to curate successful events and
            bespoke setups that leave a lasting impression.
          </p>
          <p className='about-description responsive-fonts mb-20'>
            Our philosophy is simple: use only the finest ingredients, never compromise on quality,
            and deliver creations that are as stunning to look at as they are to taste. This
            dedication has established Ribbons & Balloons as a premium destination for cakes and
            desserts that redefine celebration.
          </p>

          <p className='about-description responsive-fonts '>
            Because here, it’s never just a cake—it’s a creation to be remembered.
          </p>
        </div>
        <HoveredButton
          text='Explore our collections'
          href='/shop'
          isArrow={true}
          width='fit-content'
          isCenter={true}
        />
      </Box>

      <Box
        sx={{
          position: 'relative',
          order: { xs: 1, md: 2 },
        }}
      >
        <Image src={imgs} alt='imagesectoionTwo' className='sectionTwoImageAbout' />

        <Box
          sx={{
            position: 'absolute',
            bottom: { lg: '-5%', xl: '-6%' },
            left: '-10%%',
            display: { xs: 'none', lg: 'block' },
          }}
        >
          <Image
            src={svgIcon}
            alt='svg'
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default AboutSectionTwo
