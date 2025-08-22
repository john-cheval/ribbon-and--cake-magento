import { withGraphCommerce } from '@graphcommerce/next-config'
import withSerwistInit from '@serwist/next'
import dotenv from 'dotenv'
import type { NextConfig } from 'next'

dotenv.config()

const withPWA = withSerwistInit({
  // disable: process.env.NODE_ENV === 'development',
  swSrc: 'lib/sw.ts',
  swDest: 'public/sw.js',
  exclude: [/sitemap/, /robots/, 'sw.js'],
})

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 10,
    pagesBufferLength: 10,
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['configurator.reachdigital.dev', 'rnb.chevaldemo.xyz'],
    remotePatterns: [
      { protocol: 'https', hostname: 'configurator.reachdigital.dev' },
      { protocol: 'https', hostname: 'rnb.chevaldemo.xyz' },
      { protocol: 'https', hostname: 'srv900162.hstgr.cloud' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withGraphCommerce(withPWA(nextConfig))
