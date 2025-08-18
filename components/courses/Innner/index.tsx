import { Box } from '@mui/material'
import CourseEnquiryForm from './components/CourseEnquiryFrom'
import InnerLeft from './components/InnerLeft'

function CourseInner({ course }) {
  return (
    <Box
      sx={{
        paddingInline: {
          xs: '18px',
          md: '25px',
          lg: '55px',
        },
        // paddingTop: { xs: '15px', sm: '25px', md: '35px', lg: '50px' },
        marginBottom: { xs: '35px', md: '45px' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', lg: 'auto' },
        gap: { xs: '0px', md: '20px', lg: '30px' },
      }}
    >
      <Box
        sx={{
          gridColumn: { xs: 'auto', lg: 'span 7', xl: 'span 8' },
        }}
      >
        <InnerLeft coursesData={course} />
      </Box>
      <Box
        sx={{
          gridColumn: { xs: 'auto', lg: 'span 5', xl: 'span 4' },
          position: { xs: 'static', lg: 'sticky' },
          top: { xs: 'auto', lg: '50px', xl: '60px' },
          alignSelf: { xs: 'unset', lg: 'start' },
        }}
      >
        <CourseEnquiryForm defaultTitle={course?.name} />
      </Box>
    </Box>
  )
}

export default CourseInner
