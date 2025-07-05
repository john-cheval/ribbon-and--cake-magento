import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import type { LayoutDefaultProps } from '@graphcommerce/next-ui/LayoutDefault/components/LayoutDefault'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/next-ui',
}

export function LayoutDefault(props: PluginProps<LayoutDefaultProps>) {
  const { Prev, sx, ...rest } = props

  const customSx = {
    background: '#fff',
    // paddingInline: '20px',
  }

  const mergedSx = Array.isArray(sx) ? [...sx, customSx] : [sx, customSx]
  // const mergedSx = [...existingSx, customSx]

  return <Prev {...rest} sx={mergedSx} />
}
