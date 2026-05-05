/**
 * Generates a static Magento GraphQL schema file (magento-schema.json).
 *
 * Run this script whenever the Magento schema changes (new modules, upgrades):
 *   yarn generate-schema
 *
 * The generated file is committed to git so Vercel builds never need to
 * introspect the live Magento endpoint during deployment.
 */

import { getIntrospectionQuery } from 'graphql'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, '..', 'magento-schema.json')

const ENDPOINT = 'https://srv900162.hstgr.cloud/graphql'
const STORE = 'default'
const TIMEOUT_MS = 60_000
const MAX_RETRIES = 3

async function fetchWithRetry(attempt = 1) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    console.log(`Introspecting ${ENDPOINT} (attempt ${attempt}/${MAX_RETRIES})...`)

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Store': STORE,
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const json = await response.json()

    if (json.errors?.length) {
      throw new Error(`GraphQL errors: ${json.errors.map((e) => e.message).join(', ')}`)
    }

    if (!json.data?.__schema) {
      throw new Error(
        `Introspection response missing __schema. Response: ${JSON.stringify(json).slice(0, 300)}`,
      )
    }

    return json.data
  } finally {
    clearTimeout(timer)
  }
}

async function main() {
  let lastError
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const data = await fetchWithRetry(attempt)

      // Save as introspection JSON ({ __schema: {...} }) which graphql-mesh
      // accepts directly via the `source` option in .meshrc.yml
      writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), 'utf8')

      const typeCount = data.__schema.types.filter((t) => !t.name.startsWith('__')).length
      console.log(`\n✓ Schema written to: magento-schema.json`)
      console.log(`  Types: ${typeCount}`)
      console.log(`\nCommit this file to git so Vercel builds use it instead of live introspection.\n`)
      return
    } catch (err) {
      lastError = err
      const isLast = attempt === MAX_RETRIES
      console.error(`  ✗ Attempt ${attempt} failed: ${err.message}`)
      if (!isLast) {
        const delay = attempt * 5_000
        console.log(`  Retrying in ${delay / 1000}s...`)
        await new Promise((r) => setTimeout(r, delay))
      }
    }
  }

  console.error(`\nFailed to generate schema after ${MAX_RETRIES} attempts.`)
  console.error(lastError)
  process.exit(1)
}

main()
