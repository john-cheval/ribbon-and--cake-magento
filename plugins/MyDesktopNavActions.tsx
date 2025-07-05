import { styled } from '@mui/material'
import { PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/next-ui',
}

export const DesktopNavActions = styled('div', {
  name: 'DesktopNavActions',
})(({ theme }) => ({
  display: 'none',
  paddingRight: '35px',

  [theme.breakpoints.up('md')]: {
    display: 'grid',
    pointerEvents: 'none !important' as const,
    '& > *': {
      pointerEvents: 'all',
    },
    alignItems: 'center',
    gridAutoFlow: 'column',
    columnGap: '10px',
  },
}))
