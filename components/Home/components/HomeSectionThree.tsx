import { Image } from '@graphcommerce/image'
import { Box } from '@mui/material'
import svgImage from '../../Assets/name.svg'

export function HomeSectionThree(props) {
  const { content } = props
  return (
    <Box
      component='section'
      sx={{
        position: 'relative',
      }}
    >
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}

      <Box
        component='div'
        sx={{
          position: 'absolute',
          left: { xs: '20px', lg: '22%', xl: '26%' },
          bottom: { xs: 'unset', lg: 'none' },
          top: { xs: '12%', sm: '8%', md: '6%', lg: '51%', xl: '53%' },
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
            minHeight: { xs: '100px', sm: '180px', md: '200px', lg: '300px' },
          }}
        />
      </Box>
    </Box>
  )
}
