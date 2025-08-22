import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import {
  type DesktopNavItemButtonProps as DesktopNavItemButtonPropsOriginal,
  type DesktopNavItemLinkProps as DesktopNavItemLinkPropsOriginal,
} from '@graphcommerce/next-ui'
import { extendableComponent } from '@graphcommerce/next-ui/Styles'
import { Box, Link } from '@mui/material'
import { useRouter } from 'next/router'

type DesktopNavItemLinkProps = DesktopNavItemLinkPropsOriginal & Record<string, unknown>
type DesktopNavItemButtonProps = DesktopNavItemButtonPropsOriginal & Record<string, unknown>

const { classes, selectors } = extendableComponent('DesktopNavItem', ['root', 'line'] as const)

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
      sx={[
        {
          whiteSpace: 'nowrap',
          padding: activeValue ? '7px 16px' : { lg: '9px 12px', xl: '9px 20px' },
          background: activeValue && '#F6DBE0',
          borderRadius: activeValue && '999px',
          fontSize: { xs: '15px', lg: '15px', xl: '16px' },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>{children}</Box>
    </Link>
  )
}

// Export selectors if they are meant to be used externally (GraphCommerce often uses them)
DesktopNavItem.selectors = selectors
