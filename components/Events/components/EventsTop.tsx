import { Box, Typography } from '@mui/material'

export type EventsTopProps = {
  title?: string
  description?: string
  isBorder?: boolean
}

function EventsTop({ title, description, isBorder = false }: EventsTopProps) {
  return (
    <Box
      component='section'
      sx={{
        paddingInline: { xs: '18px', md: '25px', lg: '55px' },
      }}
    >
      <Box
        sx={{
          borderBottom: isBorder ? '1px solid #E6E6E6' : { xs: '1px solid #E6E6E6', lg: 'none' },
          paddingBottom: isBorder
            ? { xs: '10px', md: '25px' }
            : { xs: '14px', md: '10px', lg: '10px' },
          marginTop: { xs: '-10px', md: '0' },
        }}
      >
        <Typography
          variant='h1'
          component='h1'
          sx={{
            color: (theme: any) => theme?.palette.custom.heading,
            marginBottom: { xs: '2px', md: '10px' },
            textAlign: { xs: 'left', md: 'center' },
          }}
        >
          {title}
        </Typography>

        <Typography
          variant='p'
          component='p'
          sx={{
            color: (theme: any) => theme.palette.custom.secondary,
            textAlign: { xs: 'left', md: 'center' },
            fontSize: { xs: '15px', md: '16px' },
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  )
}

export default EventsTop
