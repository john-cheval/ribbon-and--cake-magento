import { Box } from '@mui/material'
import CourseEnquiryForm from './components/CourseEnquiryFrom'
import InnerLeft from './components/InnerLeft'

function CourseInner() {
  return (
    <Box
      sx={{
        paddingInline: {
          xs: '18px',
          md: '25px',
          lg: '55px',
        },
        paddingTop: { xs: '15px', sm: '25px', md: '35px', lg: '50px' },
        marginBottom: { xs: '35px', md: '45px' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', md: 'auto' },
        gap: { xs: '0px', md: '20px', lg: '30px' },
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: 'auto', md: 'span 8' },
        }}
      >
        <InnerLeft />
      </Box>
      <Box
        sx={{
          gridColumn: { xs: 'auto', md: 'span 4' },
          position: { xs: 'static', md: 'sticky' },
          top: { xs: 'auto', md: '100px' },
          alignSelf: { xs: 'unset', md: 'start' },
        }}
      >
        <CourseEnquiryForm />
      </Box>
    </Box>
  )
}

export default CourseInner
