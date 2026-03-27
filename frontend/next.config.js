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

  async redirects() {
    return [
      {
        source: '/services/off-road-dump-truck-services',
        destination: '/services/volvo-a35-off-road-dump-truck-rental',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

module.exports = {
  outputFileTracingRoot: __dirname,
};
