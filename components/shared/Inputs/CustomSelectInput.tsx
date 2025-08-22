// components/CustomSelectInput.tsx
import { InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomSelectInput = styled(InputBase)(({ theme }) => ({
  '& .MuiSelect-select': {
    color: '#441E14',
    fontFamily: '"Bricolage Grotesque", sans-serif',
    fontSize: { xs: '15px', md: '16px' },
    fontWeight: 500,
    lineHeight: '158%',
    padding: '0px 16px',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:focus': {
      backgroundColor: 'transparent',
      outline: 'none',
    },
  },
  '& .MuiSelect-icon': {
    color: '#F1A8B6',
  },
  '&.MuiInputBase-root': {
    border: 'none',
    outline: 'none',
    '&:before': {
      borderBottom: 'none !important',
    },
    '&:after': {
      borderBottom: 'none !important',
    },
    '& .MuiInputBase-input': {
      border: 'none',
      '&:focus': {
        outline: 'none',
        boxShadow: 'none',
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '&.Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
  },
}))

export default CustomSelectInput
