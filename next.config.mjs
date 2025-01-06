/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        "string-width": "commonjs string-width",
      });
    }
    return config;
  },
};

export default nextConfig;
