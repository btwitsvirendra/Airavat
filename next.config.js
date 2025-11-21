/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'localhost'],
  },
  // Disable static optimization for pages that use client-side hooks
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
