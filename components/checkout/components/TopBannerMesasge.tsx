import { Box, Link, Typography } from '@mui/material'
import { saxoGrammaticus } from '../../../lib/fonts'

function TopBannerMesasge() {
  return (
    <Box
      sx={{
        paddingBlock: { xs: '20px', md: '36px' },
        width: '100%',
        borderRadius: '4px',
        background: 'linear-gradient(90deg, #5F2A1C 0%, #2A110A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography
        component='p'
        sx={{
          color: '#fff',
          fontSize: { xs: '18px', md: '20px', lg: '30px' },
          fontWeight: 300,
          textAlign: 'center',
          fontFamily: `${saxoGrammaticus.style.fontFamily}, sans-serif`,
          lineHeight: '1.5',
          textTransform: 'uppercase',
        }}
      >
        A sweet start <br /> - Enjoy 20% off your first order.{' '}
      </Typography>

      <Box
        sx={{
          marginTop: { xs: '10px', md: '10px' },
          display: 'flex',
          gap: { xs: '10px', md: '8px' },
        }}
      >
        <Link
          href='/account/signin?tab=signin'
          sx={{
            backgroundColor: (theme) => theme.palette.custom.heading,
            borderRadius: '4px',
            fontSize: { xs: '15px', md: '16px' },
            fontWeight: 'normal',
            lineHeight: '158%',
            color: '#fff',
            padding: { xs: '8px 30px', md: '10px 40px' },
            textDecoration: 'none',
          }}
        >
          Login
        </Link>

        <Link
          href='/account/signin?tab=signup'
          sx={{
            backgroundColor: (theme) => theme.palette.custom.heading,
            borderRadius: '4px',
            fontSize: { xs: '15px', md: '16px' },
            fontWeight: 'normal',
            lineHeight: '158%',
            color: '#fff',
            padding: { xs: '10px 30px', md: '10px 40px' },
            textDecoration: 'none',
          }}
        >
          Signup
        </Link>
      </Box>
    </Box>
  )
}

export default TopBannerMesasge
