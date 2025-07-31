import { Box } from '@mui/material'
import Image from 'next/image'
import { courseInnerImages } from '../../../../constants/courses/inner/coursesInnerData'

function ImageGallery() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(12, 1fr)',
        },
        gap: {
          xs: '10px',
          md: '14px',
        },
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {courseInnerImages.map((img, index) => {
        let gridColumn: any = {}

        if (index < 3) {
          gridColumn = { md: 'span 4' }
        } else if (index === 3) {
          gridColumn = { md: 'span 8' }
        } else if (index === 4) {
          gridColumn = { md: 'span 4' }
        }

        if (index === 2) {
          gridColumn.xs = 'span 2'
        } else {
          gridColumn.xs = 'span 1'
        }

        return (
          <Box
            key={index}
            sx={{
              gridColumn,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={img}
              alt={`image-${index + 1}`}
              // width={280}
              // height={300}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}

export default ImageGallery
