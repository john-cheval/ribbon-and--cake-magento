import type { PluginConfig } from '@graphcommerce/next-config'
import { styled } from '@mui/material'
import React from 'react'

interface MyDesktopNavActionsProps extends React.ComponentProps<'div'> {
  Prev?: React.ElementType
}

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/next-ui',
}

export const DesktopNavActions = styled('div')<MyDesktopNavActionsProps>(({ theme }) => ({
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
