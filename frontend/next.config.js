/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      const isProduction = process.env.NODE_ENV === 'production';
      if (isProduction) {
        console.log = () => {}; // Disable logs in production
      }
    }
    return config;
  },
  reactStrictMode: true,
  experimental: {
    scrollRestoration: false, // ✅ Disables automatic scrolling behavior
  },
};

module.exports = nextConfig;
