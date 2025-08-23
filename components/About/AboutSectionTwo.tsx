import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import imgs from '../Assets/about/image.png'
import svgIcon from '../Assets/about/Vector_1.svg'
import { HoveredButton } from '../shared/Button/HoveredButon'

function AboutSectionTwo({ sectionLeft, sectionRight }) {
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
        {sectionLeft && <div dangerouslySetInnerHTML={{ __html: sectionLeft }} />}
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
        {sectionRight && <div dangerouslySetInnerHTML={{ __html: sectionRight }} />}

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
