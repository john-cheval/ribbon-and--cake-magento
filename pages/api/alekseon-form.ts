import http from 'http'
import https from 'https'
import type { NextApiRequest, NextApiResponse } from 'next'

type GraphqlResponse<T> = {
  data?: T
  errors?: Array<{ message?: string }>
}

type FormQueryData = {
  AlekseonForm?: {
    Forms?: Array<Record<string, unknown> | null> | null
  } | null
}

type FormMutationData = {
  updateAlekseonForm?: {
    success?: boolean | null
    message?: string | null
  } | null
}

type FormSubmissionField = {
  fieldIdentifier: string
  value: string
}

function getMagentoEndpoint(request: NextApiRequest) {
  const configuredUrl =
    process.env.ALEKSEON_FORM_MAGENTO_GRAPHQL_URL ||
    process.env.DECOR_CELEBRATION_MAGENTO_GRAPHQL_URL

  if (configuredUrl) {
    return {
      url: new URL(configuredUrl),
      vhost:
        process.env.ALEKSEON_FORM_MAGENTO_VHOST ||
        process.env.DECOR_CELEBRATION_MAGENTO_VHOST ||
        '',
    }
  }

  const requestHost = String(request.headers.host || '').split(':')[0]
  const isLocalRequest =
    requestHost === 'rnbcake.local' || requestHost === 'localhost' || requestHost === '127.0.0.1'

  if (isLocalRequest) {
    return { url: new URL('http://127.0.0.1/graphql'), vhost: 'rnbmage.local' }
  }

  return { url: new URL('https://srv900162.hstgr.cloud/graphql'), vhost: '' }
}

async function requestMagento<T>(
  request: NextApiRequest,
  query: string,
  variables: Record<string, unknown>,
): Promise<GraphqlResponse<T>> {
  const { url, vhost } = getMagentoEndpoint(request)
  const payload = JSON.stringify({ query, variables })
  const transport = url.protocol === 'https:' ? https : http

  return new Promise((resolve, reject) => {
    const upstream = transport.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || (url.protocol === 'https:' ? 443 : 80),
        path: `${url.pathname}${url.search}`,
        method: 'POST',
        timeout: 10000,
        headers: {
          ...(vhost ? { Host: vhost } : {}),
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (upstreamResponse) => {
        let body = ''
        upstreamResponse.setEncoding('utf8')
        upstreamResponse.on('data', (chunk) => {
          body += chunk
        })
        upstreamResponse.on('end', () => {
          if ((upstreamResponse.statusCode ?? 500) >= 400) {
            reject(new Error(`Magento returned HTTP ${upstreamResponse.statusCode}.`))
            return
          }

          try {
            resolve(JSON.parse(body) as GraphqlResponse<T>)
          } catch {
            reject(new Error('Magento returned an invalid response.'))
          }
        })
      },
    )

    upstream.on('timeout', () => upstream.destroy(new Error('Magento request timed out.')))
    upstream.on('error', reject)
    upstream.write(payload)
    upstream.end()
  })
}

const formQuery = `
  query AlekseonForm($identifier: String!) {
    AlekseonForm(identifier: $identifier) {
      Forms {
        title
        identifier
        formfield {
          frontend_label
          frontend_input
          is_required
          sort_order
          input_visibility
          attribute_code
          options {
            option_id
            option_code
            sort_order
            label
          }
        }
        widget_setting {
          submit_button_label
          form_submit_success_title
          form_submit_success_message
        }
      }
    }
  }
`

const submitMutation = `
  mutation SubmitAlekseonForm($input: UpdateAlekseonFormInput!) {
    updateAlekseonForm(input: $input) {
      success
      message
    }
  }
`

function isValidIdentifier(identifier: unknown): identifier is string {
  return typeof identifier === 'string' && /^[a-z0-9][a-z0-9_-]{1,99}$/i.test(identifier)
}

function parseSubmissionFields(fields: unknown): FormSubmissionField[] | null {
  if (!Array.isArray(fields) || fields.length < 1 || fields.length > 20) return null

  const parsed: FormSubmissionField[] = []
  for (const field of fields) {
    if (!field || typeof field !== 'object') return null

    const candidate = field as Record<string, unknown>
    if (
      typeof candidate.fieldIdentifier !== 'string' ||
      !/^[a-z0-9_]{1,100}$/i.test(candidate.fieldIdentifier) ||
      typeof candidate.value !== 'string' ||
      candidate.value.length > 10000
    ) {
      return null
    }

    parsed.push({ fieldIdentifier: candidate.fieldIdentifier, value: candidate.value })
  }

  return parsed
}

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  response.setHeader('Cache-Control', 'no-store')

  try {
    if (request.method === 'GET') {
      const identifier = Array.isArray(request.query.identifier)
        ? request.query.identifier[0]
        : request.query.identifier

      if (!isValidIdentifier(identifier)) {
        response.status(400).json({ error: 'A valid form identifier is required.' })
        return
      }

      const result = await requestMagento<FormQueryData>(request, formQuery, { identifier })
      const form = result.data?.AlekseonForm?.Forms?.[0] ?? null

      if (result.errors?.length || !form) {
        response.status(404).json({
          error: result.errors?.[0]?.message || `Magento form "${identifier}" was not found.`,
        })
        return
      }

      response.status(200).json({ form })
      return
    }

    if (request.method === 'POST') {
      const identifier = request.body?.identifier
      const fields = parseSubmissionFields(request.body?.fields)

      if (!isValidIdentifier(identifier) || !fields) {
        response.status(400).json({ error: 'A valid form identifier and fields are required.' })
        return
      }

      const result = await requestMagento<FormMutationData>(request, submitMutation, {
        input: { identifier, fields },
      })
      const submission = result.data?.updateAlekseonForm

      if (result.errors?.length || !submission?.success) {
        response.status(400).json({
          success: false,
          error: result.errors?.[0]?.message || submission?.message || 'Form submission failed.',
        })
        return
      }

      response.status(200).json({ success: true, message: submission.message })
      return
    }

    response.setHeader('Allow', 'GET, POST')
    response.status(405).json({ error: 'Method not allowed.' })
  } catch (error) {
    response.status(502).json({
      error: error instanceof Error ? error.message : 'Magento form service is unavailable.',
    })
  }
}
