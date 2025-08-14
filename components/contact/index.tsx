import { Box } from '@mui/material'
import ContactEnquiryForm from './components/ContactEnquiryForm'

export type ContactPageTypeProps = {
  contactLeft?: string
}

function Contact(props: ContactPageTypeProps) {
  const { contactLeft } = props
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
        gridTemplateColumns: { xs: '1fr', lg: 'repeat(12, 1fr)' },
        gridTemplateRows: { xs: 'auto', lg: 'auto' },
        gap: { xs: '15px', md: '20px', lg: '25px', xl: '30px' },
        paddingTop: { xs: '0px', md: '5px' },
      }}
    >
      <Box
        component='article'
        sx={{
          gridColumn: { xs: 'auto', lg: 'span 8' },
        }}
      >
        {contactLeft && <div dangerouslySetInnerHTML={{ __html: contactLeft }} />}
      </Box>
      <Box
        component='article'
        sx={{
          gridColumn: { xs: 'auto', lg: 'span 4' },
          position: { xs: 'static', lg: 'sticky' },
          top: { xs: 'auto', lg: '100px' },
          alignSelf: { xs: 'unset', lg: 'start' },
        }}
      >
        <ContactEnquiryForm />
      </Box>
    </Box>
  )
}

export default Contact
