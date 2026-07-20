import http from 'http'
import https from 'https'

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

function getMagentoGraphqlEndpoint() {
  const configuredUrl = process.env.DECOR_CELEBRATION_MAGENTO_GRAPHQL_URL

  if (configuredUrl) return new URL(configuredUrl)

  const protocol = process.env.DECOR_CELEBRATION_MAGENTO_PROTOCOL ?? 'http'
  const hostname = process.env.DECOR_CELEBRATION_MAGENTO_HOSTNAME ?? '192.168.0.107'
  const path = process.env.DECOR_CELEBRATION_MAGENTO_GRAPHQL_PATH ?? '/graphql'

  return new URL(`${protocol}://${hostname}${path}`)
}

export async function fetchMagentoCmsPage(
  identifier: string,
  options: FetchMagentoCmsPageOptions = {},
): Promise<DecorCmsPage | null> {
  if (!identifier) return null

  // The direct local endpoint exists only to let this development project read the
  // separate local Magento instance. Production uses GraphCommerce's configured
  // Magento client unless an explicit override URL is supplied.
  if (process.env.NODE_ENV === 'production' && !process.env.DECOR_CELEBRATION_MAGENTO_GRAPHQL_URL) {
    return null
  }

  const endpoint = getMagentoGraphqlEndpoint()
  const vhost =
    process.env.DECOR_CELEBRATION_MAGENTO_VHOST ??
    (process.env.DECOR_CELEBRATION_MAGENTO_GRAPHQL_URL ? '' : 'rnbmage.local')
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
