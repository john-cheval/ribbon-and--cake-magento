import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

export type MagentoGraphqlEndpoint = {
  url: URL
  vhost: string
}

function hasLocalMagentoBackend() {
  return existsSync('/var/www/html/rnbmage/app/etc/env.php')
}

function getGraphCommerceMagentoEndpoint() {
  try {
    const configFile = readFileSync(join(process.cwd(), 'graphcommerce.config.js'), 'utf8')
    return configFile.match(/magentoEndpoint:\s*['"]([^'"]+)['"]/)?.[1]
  } catch {
    return undefined
  }
}

function firstNonEmpty(...values: Array<string | undefined>) {
  return values.find((value): value is string => Boolean(value && value.trim()))
}

export function resolveMagentoGraphqlEndpoint(
  options: {
    requestHost?: string | null
    localVhost?: string
    explicitUrls?: Array<string | undefined>
    urlEnvKeys?: string[]
    vhostEnvKeys?: string[]
  } = {},
): MagentoGraphqlEndpoint {
  const requestHost = String(options.requestHost || '').split(':')[0]
  const isLocalRequest =
    requestHost === 'rnbcake.local' || requestHost === 'localhost' || requestHost === '127.0.0.1'

  const configuredUrl = firstNonEmpty(
    ...(options.urlEnvKeys ?? []).map((key) => process.env[key]),
    ...(options.explicitUrls ?? []),
    process.env.ALEKSEON_FORM_MAGENTO_GRAPHQL_URL,
    process.env.MAGENTO_GRAPHQL_URL,
    process.env.GRAPHCOMMERCE_MAGENTO_ENDPOINT,
    process.env.NEXT_PUBLIC_MAGENTO_ENDPOINT,
  )

  const endpoint =
    configuredUrl ||
    (process.env.NODE_ENV !== 'production' && isLocalRequest && hasLocalMagentoBackend()
      ? 'http://127.0.0.1/graphql'
      : getGraphCommerceMagentoEndpoint()) ||
    'https://srv900162.hstgr.cloud/graphql'

  const url = new URL(endpoint)
  const configuredVhost = firstNonEmpty(
    ...(options.vhostEnvKeys ?? []).map((key) => process.env[key]),
    process.env.ALEKSEON_FORM_MAGENTO_VHOST,
    process.env.MAGENTO_GRAPHQL_VHOST,
  )

  if (configuredVhost !== undefined) return { url, vhost: configuredVhost }

  const shouldUseLocalVhost =
    process.env.NODE_ENV !== 'production' &&
    isLocalRequest &&
    hasLocalMagentoBackend() &&
    url.hostname === '127.0.0.1'

  return { url, vhost: shouldUseLocalVhost ? (options.localVhost ?? 'rnbmage.local') : '' }
}
