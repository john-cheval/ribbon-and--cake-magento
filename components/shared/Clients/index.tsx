import { Box, Typography } from '@mui/material'

export type ClientPropsType = {
  clientsData?: string
}

function Clients({ clientsData }: ClientPropsType) {
  return (
    <Box
      component='section'
      sx={{ marginTop: '65px', marginBottom: { xs: '30px', md: '45px', lg: '50px' } }}
    >
      <Typography
        variant='h2'
        component='h3'
        sx={{ textAlign: 'center', marginBottom: { xs: '20px', md: '30px', xl: '40px' } }}
      >
        Clients
      </Typography>
      {/*  <Box
        component='div'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: '20px', md: '30px', xl: '45px' },
        }}
      >
        {testimonialsData?.map((item, index) => (
          <Box key={item?.id || index}>
            <Image
              src={item?.imageUrl}
              alt={item?.title}
              sx={{
                width: 'auto',
                height: 'auto',
                maxHeight: { xs: '100%', xl: '100px' },
              }}
            />
          </Box>
        ))}
      </Box> */}
      {clientsData && <div dangerouslySetInnerHTML={{ __html: clientsData }} />}
    </Box>
  )
}

export default Clients
