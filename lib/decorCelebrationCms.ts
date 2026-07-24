import http from 'http'
import https from 'https'
import { resolveMagentoGraphqlEndpoint } from './magentoGraphqlEndpoint'

export type DecorCmsPage = {
  identifier?: string | null
  url_key?: string | null
  title?: string | null
  meta_title?: string | null
  meta_description?: string | null
  content_heading?: string | null
  content?: string | null
}

type MagentoCmsPageResponse = {
  data?: { cmsPage?: DecorCmsPage | null }
}

type FetchMagentoCmsPageOptions = {
  timeoutMs?: number
}

export async function fetchMagentoCmsPage(
  identifier: string,
  options: FetchMagentoCmsPageOptions = {},
): Promise<DecorCmsPage | null> {
  if (!identifier) return null

  const shouldUseLegacyDecorEnv = identifier.startsWith('decor-celebration')
  const legacyDecorEndpoint =
    shouldUseLegacyDecorEnv &&
    (process.env.DECOR_CELEBRATION_MAGENTO_PROTOCOL ||
      process.env.DECOR_CELEBRATION_MAGENTO_HOSTNAME ||
      process.env.DECOR_CELEBRATION_MAGENTO_GRAPHQL_PATH)
      ? `${process.env.DECOR_CELEBRATION_MAGENTO_PROTOCOL ?? 'https'}://${
          process.env.DECOR_CELEBRATION_MAGENTO_HOSTNAME ?? 'srv900162.hstgr.cloud'
        }${process.env.DECOR_CELEBRATION_MAGENTO_GRAPHQL_PATH ?? '/graphql'}`
      : undefined

  const { url: endpoint, vhost } = resolveMagentoGraphqlEndpoint({
    requestHost: process.env.NEXT_PUBLIC_BASE_URL
      ? new URL(process.env.NEXT_PUBLIC_BASE_URL).host
      : process.env.NODE_ENV !== 'production'
        ? 'rnbcake.local'
        : undefined,
    explicitUrls: [legacyDecorEndpoint],
    urlEnvKeys: [
      'ALEKSEON_FORM_MAGENTO_GRAPHQL_URL',
      'MAGENTO_GRAPHQL_URL',
      ...(shouldUseLegacyDecorEnv ? ['DECOR_CELEBRATION_MAGENTO_GRAPHQL_URL'] : []),
    ],
    vhostEnvKeys: [
      'ALEKSEON_FORM_MAGENTO_VHOST',
      'MAGENTO_GRAPHQL_VHOST',
      ...(shouldUseLegacyDecorEnv ? ['DECOR_CELEBRATION_MAGENTO_VHOST'] : []),
    ],
  })
  const timeoutMs = options.timeoutMs ?? 5000
  const query = `query DecorCmsPage($identifier: String) {
    cmsPage(identifier: $identifier) {
      identifier
      url_key
      title
      meta_title
      meta_description
      content_heading
      content
    }
  }`
  const payload = JSON.stringify({ query, variables: { identifier } })
  const transport = endpoint.protocol === 'https:' ? https : http
  const port =
    endpoint.port ||
    (endpoint.protocol === 'https:' ? '443' : endpoint.protocol === 'http:' ? '80' : undefined)

  return new Promise((resolve) => {
    const request = transport.request(
      {
        hostname: endpoint.hostname,
        port,
        path: `${endpoint.pathname}${endpoint.search}`,
        method: 'POST',
        timeout: timeoutMs,
        headers: {
          ...(vhost ? { Host: vhost } : {}),
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (response) => {
        let body = ''

        response.setEncoding('utf8')
        response.on('data', (chunk) => {
          body += chunk
        })
        response.on('end', () => {
          if ((response.statusCode ?? 500) < 200 || (response.statusCode ?? 500) >= 300) {
            resolve(null)
            return
          }

          try {
            const result = JSON.parse(body) as MagentoCmsPageResponse

            resolve(result.data?.cmsPage ?? null)
          } catch {
            resolve(null)
          }
        })
      },
    )

    request.on('error', () => resolve(null))
    request.on('timeout', () => {
      request.destroy()
      resolve(null)
    })

    request.write(payload)
    request.end()
  })
}
