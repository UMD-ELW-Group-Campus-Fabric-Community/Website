/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    API_URL: "http://localhost:1433/api",
    AUTH_URL: "http://localhost:1433/auth",
  }
}

module.exports = nextConfig
