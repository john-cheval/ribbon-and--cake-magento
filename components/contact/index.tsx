import { Box } from '@mui/material'
import ContactEnquiryForm from './components/ContactEnquiryForm'
import ContactLeft from './components/ContactLeft'

function Contact() {
  return (
    <Box
      component='section'
      sx={{
        paddingInline: {
          xs: '18px',
          md: '25px',
          lg: '55px',
        },
        // paddingTop: '18px',
        marginBottom: { xs: '20px', md: '35px', lg: '45px' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', md: 'auto' },
        gap: { xs: '15px', md: '20px', lg: '25px', xl: '30px' },
        paddingTop: { xs: '10px', md: '20px' },
      }}
    >
      <Box
        component='article'
        sx={{
          gridColumn: { xs: 'auto', md: 'span 8' },
        }}
      >
        <ContactLeft />
      </Box>
      <Box
        component='article'
        sx={{
          gridColumn: { xs: 'auto', md: 'span 4' },
          position: { xs: 'static', md: 'sticky' },
          top: { xs: 'auto', md: '100px' },
          alignSelf: { xs: 'unset', md: 'start' },
        }}
      >
        <ContactEnquiryForm />
      </Box>
    </Box>
  )
}

export default Contact
