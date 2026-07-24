export type MagentoGraphqlEndpoint = {
  url: URL
  vhost: string
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
  const configuredUrl = firstNonEmpty(
    ...(options.urlEnvKeys ?? []).map((key) => process.env[key]),
    ...(options.explicitUrls ?? []),
    process.env.ALEKSEON_FORM_MAGENTO_GRAPHQL_URL,
    process.env.MAGENTO_GRAPHQL_URL,
    process.env.GRAPHCOMMERCE_MAGENTO_ENDPOINT,
    process.env.NEXT_PUBLIC_MAGENTO_ENDPOINT,
  )

  const endpoint = configuredUrl || 'https://srv900162.hstgr.cloud/graphql'

  const url = new URL(endpoint)
  const configuredVhost = firstNonEmpty(
    ...(options.vhostEnvKeys ?? []).map((key) => process.env[key]),
    process.env.ALEKSEON_FORM_MAGENTO_VHOST,
    process.env.MAGENTO_GRAPHQL_VHOST,
  )

  if (configuredVhost !== undefined) return { url, vhost: configuredVhost }

  return { url, vhost: '' }
}
