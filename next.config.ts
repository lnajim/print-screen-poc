import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["104.248.131.56:8080"],
    },
  },
};

export default nextConfig;
