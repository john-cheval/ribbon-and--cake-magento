import { Box, Button, OutlinedInput, TextField, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'

const inputFieldSx: SxProps<Theme> = {
  borderRadius: '4px',
  color: (theme: any) => theme.palette.custom.main,
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
    color: (theme: any) => theme.palette.custom.main,
    opacity: 1,
  },

  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme: any) => theme.palette.custom.borderInput,
  },

  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme: any) => theme.palette.custom.borderInput,
  },

  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: (theme: any) => theme.palette.custom.borderInput,
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

      <Box
        sx={{
          marginTop: { xs: '10px', md: '30px' },
          display: 'flex',
          rowGap: '11px',
          flexDirection: 'column',
        }}
      >
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
              color: (theme: any) => theme.palette.custom.main,
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: (theme: any) => theme.palette.custom.borderInput,
                },
                '&:hover fieldset': {
                  borderColor: (theme: any) => theme.palette.custom.borderInput, // Hover border color
                },
                '&.Mui-focused fieldset': {
                  borderColor: (theme: any) => theme.palette.custom.borderInput, // Focus border color
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
              backgroundColor: (theme: any) => theme.palette.custom.main,
              color: (theme: any) => theme.palette.custom.border,
              fontSize: { xs: '12px', sm: '14px', md: '18px' },
              fontWeight: 500,
              lineHeight: '158%',
              borderRadius: '4px',
              border: '1px solid #441e14',
              transition: 'all 0.3s ease',
              boxShadow: 'none !important',
              paddingBlock: { xs: '15px', md: '18px' },
              // width: { xs: '100%', sm: '400px', md: '500px' },
              width: '100%',

              '&:hover': {
                backgroundColor: (theme: any) => theme.palette.custom.border,
                color: (theme: any) => theme.palette.custom.main,
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
