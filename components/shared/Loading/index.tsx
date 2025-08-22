import { Box, Typography } from '@mui/material'

function Loading() {
  return (
    <>
      <Typography
        sx={{
          textAlign: 'center',
          color: '#F1A8B6',
          fontSize: { xs: '15px', md: '16px' },
          marginTop: '30px',
          fontWeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
        }}
      >
        Loading
        <Box
          component='span'
          sx={{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: '#F1A8B6',
            animation: 'fade 1s infinite',
            animationDelay: '0s',
          }}
        />
        <Box
          component='span'
          sx={{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: '#F1A8B6',
            animation: 'fade 1s infinite',
            animationDelay: '0.2s',
          }}
        />
        <Box
          component='span'
          sx={{
            height: '8px',
            width: '8px',
            borderRadius: '50%',
            backgroundColor: '#F1A8B6',
            animation: 'fade 1s infinite',
            animationDelay: '0.4s',
          }}
        />
        <style>
          {`
        @keyframes fade {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}
        </style>
      </Typography>
    </>
  )
}

export default Loading
