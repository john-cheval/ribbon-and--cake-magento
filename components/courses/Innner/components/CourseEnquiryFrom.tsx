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
function CourseEnquiryForm() {
  return (
    <Box
      sx={{
        marginTop: { xs: '20px', md: '0' },
        backgroundColor: '#F6F6F6',
        borderRadius: '8px',
        padding: { xs: '26px 14px', md: '35px 38px 40px' },
      }}
    >
      <Typography variant='h2' component='h3' sx={{ textTransform: 'uppercase' }}>
        Apply Now
      </Typography>

      <Box
        sx={{
          marginTop: { xs: '10px', md: '30px' },
          display: 'flex',
          rowGap: '11px',
          flexDirection: 'column',
        }}
      >
        <OutlinedInput
          fullWidth
          placeholder='Create Design with Butter Cream icing'
          sx={inputFieldSx}
          disabled
          defaultValue='Create Design with Butter Cream icing'
        />
        <OutlinedInput fullWidth placeholder='Your Name' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Your Phone' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Your Email' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Preferred Month & Week' sx={inputFieldSx} />
        <OutlinedInput fullWidth placeholder='Number of attendees' sx={inputFieldSx} />

        <Box>
          <TextField
            id='custom-textarea'
            label='Your Message (Optional)'
            multiline
            rows={5}
            fullWidth
            variant='outlined'
            sx={{
              mt: 2,
              backgroundColor: (theme: any) => theme.palette.primary.contrastText,
              color: (theme: any) => theme.palette.custom.main,
              fontSizse: '20px',
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: (theme: any) => theme.palette.custom.borderInput,
                },
                '&:hover fieldset': {
                  borderColor: (theme: any) => theme.palette.custom.borderInput,
                },
                '&.Mui-focused fieldset': {
                  borderColor: (theme: any) => theme.palette.custom.borderInput,
                  borderWidth: '1px !important',
                },
                '& textarea': {
                  padding: '10px',
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

export default CourseEnquiryForm
