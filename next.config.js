/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  images : {
    domains: [
      'www.logotaglines.com', 
      'lh3.googleusercontent.com',
      'cdn.sanity.io'
    ],
  }
}

module.exports = nextConfig
