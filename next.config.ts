import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'http', hostname: 'lh3.googleusercontent.com' },
      {
        protocol: 'https',
        hostname: 'lol-team-auction.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
