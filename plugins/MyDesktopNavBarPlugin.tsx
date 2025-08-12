// /plugins/MyDesktopNavBarPlugin.tsx

import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { MediaQuery } from '@graphcommerce/next-ui' // Import MediaQuery if you still want it
import type { MenuTabsProps } from '@graphcommerce/next-ui/LayoutParts/DesktopNavBar'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/next-ui',
}

export function DesktopNavBar(props: PluginProps<MenuTabsProps>) {
  const { sx = [], children, ...rest } = props

  const customRootSx = {
    display: { xs: 'none', lg: 'flex !important' },
    justifyContent: 'center',
    columnGap: { xs: 0, lg: '2px', xl: '5px' },
    // columnGap: { md: '15px', xl: '30px' },
  }

  const mergedRootSx = Array.isArray(sx) ? [...sx, customRootSx] : [sx, customRootSx]

  return (
    <MediaQuery
      component='span'
      query={(theme) => theme.breakpoints.up('md')}
      display='grid'
      sx={[
        {
          width: '100%',
          alignItems: 'center',
          position: 'relative',
          pointerEvents: 'all',
          textDecoration: 'none',
        },
        ...(Array.isArray(mergedRootSx) ? mergedRootSx : [mergedRootSx]),
      ]}
      {...rest}
    >
      {children}
    </MediaQuery>
  )
}
