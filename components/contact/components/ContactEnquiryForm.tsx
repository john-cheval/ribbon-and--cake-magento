import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

const inputFieldSx: SxProps<Theme> = {
  borderRadius: '4px',
  color: '#441E14',
  // padding: '16px ',
  height: 'fit-content',

  '& .MuiOutlinedInput-input, & .MuiOutlinedInput-input::placeholder': {
    fontFamily: '"Bricolage Grotesque"',
    fontSize: { xs: '12px', sm: '14px', md: '16px' },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '158%',
    color: 'inherit',
  },
  '& .MuiOutlinedInput-input::placeholder': {
    fontFamily: '"Bricolage Grotesque"',
    fontSize: { xs: '12px', sm: '14px', md: '16px' },
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '158%',
    color: '#441E14',
    opacity: 1,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#D5B1B8',
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#D5B1B8 !important',
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#D5B1B8 !important',
    borderWidth: '1px !important',
  },
}
function ContactEnquiryForm() {
  return (
    <Box
      sx={{
        // marginTop: '40px',
        backgroundColor: '#F6F6F6',
        borderRadius: '8px',
        padding: { xs: '26px 14px', md: '35px 38px 40px' },
      }}
    >
      <Typography variant='h2' component='h3' sx={{ textTransform: 'uppercase' }}>
        Enquire Now
      </Typography>

      <Box sx={{ marginTop: '30px', display: 'flex', rowGap: '11px', flexDirection: 'column' }}>
        <OutlinedInput fullWidth placeholder='First Name' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Email' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Phone Number' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Preferred Month & Week' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Subject' sx={inputFieldSx} />

        <Box>
          <TextField
            id='custom-textarea'
            label='Message'
            multiline
            rows={5}
            fullWidth
            variant='outlined'
            sx={{
              mt: 2,
              backgroundColor: '#fff',
              color: '#441E14',
              fontSizse: '20px',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#D5B1B8',
                },
                '&:hover fieldset': {
                  borderColor: '#D5B1B8 !important', // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#D5B1B8 !important', // Focus border color
                  borderWidth: '1px !important',
                },
                '& textarea': {
                  padding: '10px',
                  fontFamily: '"Bricolage Grotesque"',
                },
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
          <Button
            sx={{
              // marginTop: '18px',
              backgroundColor: '#441E14',
              color: '#F6DBE0',
              fontSize: { xs: '12px', sm: '14px', md: '18px' },
              fontWeight: 500,
              lineHeight: '158%',
              borderRadius: '4px',
              border: '1px solid #441e14',
              transition: 'all 0.3s ease',
              boxShadow: 'none !important',
              paddingBlock: { xs: '15px', md: '18px' },
              width: '500px',

              '&:hover': {
                backgroundColor: '#f6dbe0 !important',
                color: '#441E14',
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ContactEnquiryForm
