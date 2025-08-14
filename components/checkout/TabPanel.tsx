import { Box, Typography } from '@mui/material'

export function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ marginTop: index === 0 ? { xs: '15px', md: '25px', lg: '30px' } : 'none' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

// You can use this function to get a11y props for each tab
export function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
