import { Box, Typography } from '@mui/material'

export type ClientPropsType = {
  clientsData?: string
}

function Clients({ clientsData }: ClientPropsType) {
  return (
    <Box
      component='section'
      sx={{
        marginTop: { xs: '20px', md: '35px', lg: '50px' },
        marginBottom: { xs: '30px', md: '45px' },
      }}
    >
      <Typography
        variant='h2'
        component='h3'
        sx={{
          textAlign: 'center',
          marginBottom: { xs: '10px', sm: '15px', md: '30px', lg: '20px' },
        }}
      >
        Corporate clients
      </Typography>
      {clientsData && (
        <div className='container-wrapper' dangerouslySetInnerHTML={{ __html: clientsData }} />
      )}
    </Box>
  )
}

export default Clients
