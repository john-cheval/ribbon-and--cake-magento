import { Image } from '@graphcommerce/image'
import { Box } from '@mui/material'

function ImageGallery({ courseInnerImages }) {
  if (!courseInnerImages || courseInnerImages.length === 0) return null
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(2, 1fr)',
          // Change this line to create 3 columns
          md: 'repeat(3, 1fr)',
        },
        gap: {
          xs: '10px',
          md: '14px',
        },
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {courseInnerImages?.map((img, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: '8px',
            overflow: 'hidden',
            gridColumn: 'span 1',
          }}
        >
          <Image
            src={`https://srv900162.hstgr.cloud/media/${img}`}
            alt={`image-${index + 1}`}
            width={500}
            height={500}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          />
        </Box>
      ))}
    </Box>
  )
}

export default ImageGallery
