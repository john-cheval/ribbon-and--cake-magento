// import type { LinkProps } from '@mui/material'
import { Box, Link } from '@mui/material'
import { useRouter } from 'next/router'
import { extendableComponent } from '@graphcommerce/next-ui/Styles/extendableComponent' // Adjust path if needed

// Import the original types from @graphcommerce/next-ui
import type { DesktopNavItemLinkProps, DesktopNavItemButtonProps } from '@graphcommerce/next-ui'

// Import PluginConfig and PluginProps
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

// Define the component name and its selectors (matching the original)
const { classes, selectors } = extendableComponent('DesktopNavItem', ['root', 'line'] as const)

// Helper function from the original component
function isLinkProps(
  props: DesktopNavItemLinkProps | DesktopNavItemButtonProps,
): props is DesktopNavItemLinkProps {
  return 'href' in props
}

// Define the plugin configuration
export const config: PluginConfig = {
  type: 'component',

  module: '@graphcommerce/next-ui',
}

export function DesktopNavItem(
  props: PluginProps<DesktopNavItemLinkProps | DesktopNavItemButtonProps>,
) {
  const router = useRouter()

  if (!isLinkProps(props)) {
    // Button-like behavior
    const { onClick, children, sx = [], active, ...linkProps } = props

    return (
      <Link
        className={classes.root}
        component='div'
        variant='h6'
        color='#2A110A'
        underline='none'
        {...linkProps}
        onClick={onClick}
        sx={[
          { whiteSpace: 'nowrap', paddingTop: '6px', cursor: 'pointer' },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{children}</Box>
      </Link>
    )
  }

  // Link-like behavior
  const { href, children, sx = [], active, ...linkProps } = props
  const activeValue =
    typeof active === 'undefined' ? router.asPath.startsWith((href ?? '').toString()) : active

  return (
    <Link
      href={href}
      className={classes.root}
      variant='h6'
      color='#2A110A'
      underline='none'
      {...linkProps}
      sx={[{ whiteSpace: 'nowrap', paddingTop: '6px' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{children}</Box>
      <Box
        component='span'
        className={classes.line}
        sx={{
          maxWidth: 40,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          height: 2,
          background: (theme) => theme.palette.primary.main,
          margin: '0 auto',
          marginTop: '6px',
          opacity: activeValue ? 1 : 0,
        }}
      />
    </Link>
  )
}

// Export selectors if they are meant to be used externally (GraphCommerce often uses them)
DesktopNavItem.selectors = selectors
