import path from 'node:path';
import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
];

const noStoreHeaders = [
  {
    key: 'Cache-Control',
    value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0',
  },
  { key: 'CDN-Cache-Control', value: 'no-store' },
  { key: 'Cloudflare-CDN-Cache-Control', value: 'no-store' },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/', headers: noStoreHeaders },
      { source: '/api/build-info', headers: noStoreHeaders },
    ];
  },
};

export default nextConfig;
