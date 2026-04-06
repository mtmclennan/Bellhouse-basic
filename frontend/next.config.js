/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  reactStrictMode: true,
  images: {
    qualities: [70, 80],
  },
  webpack: (config, { isServer }) => {
    if (!isServer && process.env.NODE_ENV === 'production') {
      console.log = () => {};
    }

    return config;
  },
  experimental: {
    scrollRestoration: false,
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
