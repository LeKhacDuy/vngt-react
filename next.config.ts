import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    qualities: [75, 100],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://lekhacduy.io.vn/api/:path*',
      },
    ];
  },
};

export default nextConfig;
