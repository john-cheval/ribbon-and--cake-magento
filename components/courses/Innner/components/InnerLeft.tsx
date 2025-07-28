import { Image } from '@graphcommerce/image'
import { Box, Typography } from '@mui/material'
import {
  courseInnerDataList,
  coursesInnerPara,
} from '../../../../constants/courses/inner/coursesInnerData'
import { saxoGrammaticus } from '../../../../lib/fonts'
import banner from './banner.jpg'
import ImageGallery from './ImageGallery'

function InnerLeft() {
  return (
    <Box>
      <Typography
        variant='h1'
        sx={{
          fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
          color: (theme: any) => theme.palette.custom.heading,
        }}
      >
        Create designs with butter cream icing
      </Typography>

      <Box sx={{ marginBlock: { xs: '14px 20px', md: '26px 34px' }, position: 'relative' }}>
        <Image
          src={banner}
          alt='banner'
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
              padding: '15px 25px',
              background: (theme: any) => theme.palette.custom.border,
              borderRadius: '999px',
              border: '1px solid #F6DBE0',
              backdropFilter: 'blur(4.699999809265137px)',
              color: '#2A110A',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
            }}
          >
            Course 1
          </Box>
          <Box
            sx={{
              padding: '15px 25px',
              background: (theme: any) => theme.palette.custom.border,
              borderRadius: '999px',
              border: '1px solid #F6DBE0',
              backdropFilter: 'blur(4.699999809265137px)',
              color: '#2A110A',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
            }}
          >
            2 Days
          </Box>
        </Box>
      </Box>

      {courseInnerDataList?.map((list, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', columnGap: '3px' }}>
          <Box
            component='span'
            sx={{
              display: 'inline-block',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              color: '#6F6F6F',
            }}
          >
            {index + 1}.
          </Box>
          <Typography
            variant='p'
            component='p'
            sx={{
              color: '#6F6F6F',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: ' 174%',
            }}
          >
            {list}
          </Typography>
        </Box>
      ))}
      <Box
        sx={{
          marginBlock: { xs: '27px 35px', md: '40px 50px' },
          display: 'flex',
          flexDirection: 'column',
          rowGap: { xs: '15px', md: '30px' },
        }}
      >
        {coursesInnerPara?.map((para, index) => (
          <Typography
            component='p'
            key={index}
            sx={{
              color: (theme: any) => theme.palette.custom.secondary,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: ' 174%',
            }}
          >
            {para}
          </Typography>
        ))}
      </Box>

      <ImageGallery />
    </Box>
  )
}

export default InnerLeft
