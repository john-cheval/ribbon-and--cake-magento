import { Box, Link, Typography } from '@mui/material'

function TopBannerMesasge() {
  return (
    <Box
      sx={{ paddingBlock: '13px', width: '100%', borderRadius: '4px', backgroundColor: '#FFEDF0' }}
    >
      <Typography
        component='p'
        sx={{
          color: (theme: any) => theme.palette.custom.dark,
          fontSize: { xs: '15px', md: '16px' },
          fontWeight: 300,
          textAlign: 'center',
        }}
      >
        A sweet start - Enjoy 20% off your first order.{' '}
        <Link
          href='/account/signin'
          sx={{
            fontWeight: '600 !important',
          }}
        >
          {' '}
          Login/Signup
        </Link>
      </Typography>
    </Box>
  )
}

export default TopBannerMesasge
