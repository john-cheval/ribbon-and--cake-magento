import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
// import {
//   courseInnerDataList,
//   coursesInnerPara,
// } from '../../../../constants/courses/inner/coursesInnerData'
import { saxoGrammaticus } from '../../../../lib/fonts'
// import banner from './banner.jpg'
import ImageGallery from './ImageGallery'

function InnerLeft({ coursesData }) {
  return (
    <Box>
      <Typography
        variant='h1'
        sx={{
          fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
          color: (theme: any) => theme.palette.custom.heading,
        }}
      >
        {coursesData?.name}
      </Typography>

      <Box sx={{ marginBlock: { xs: '14px 10px', md: '15px 15px' }, position: 'relative' }}>
        <Image
          src={coursesData?.image}
          alt={coursesData?.name}
          width={775}
          height={400}
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            columnGap: { xs: '5px', md: '12px' },
            position: 'absolute',
            top: { xs: '15px', md: '30px' },
            left: { xs: '15px', md: '30px' },
          }}
        >
          <Box
            sx={{
              padding: '6px 20px',
              background: (theme: any) => theme.palette.custom.border,
              borderRadius: '999px',
              border: '1px solid #F6DBE0',
              backdropFilter: 'blur(4.699999809265137px)',
              color: (theme: any) => theme.palette.custom.smallHeading,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
            }}
          >
            Course 1
          </Box>
          <Box
            sx={{
              padding: '6px 20px',
              background: (theme: any) => theme.palette.custom.border,
              borderRadius: '999px',
              border: '1px solid #F6DBE0',
              backdropFilter: 'blur(4.699999809265137px)',
              color: (theme: any) => theme.palette.custom.smallHeading,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
            }}
          >
            2 Days
          </Box>
        </Box>
      </Box>

      <div
        className='coursesInner'
        dangerouslySetInnerHTML={{ __html: coursesData?.post_content }}
      />

      <ImageGallery courseInnerImages={coursesData?.gallery_images} />
    </Box>
  )
}

export default InnerLeft
