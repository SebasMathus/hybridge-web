import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'hybridge.education' },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
  async rewrites() {
    return [{ source: '/api/seed', destination: '/seed-internal' }]
  },
}

export default withPayload(nextConfig)
