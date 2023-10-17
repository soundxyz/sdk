/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_ALCHEMY_KEY: process.env.PUBLIC_ALCHEMY_KEY,
    PUBLIC_WALLET_PRIVATE_KEY: process.env.PUBLIC_WALLET_PRIVATE_KEY,
  },
}

module.exports = nextConfig
