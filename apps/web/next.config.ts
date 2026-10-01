import path from 'node:path';
import type { NextConfig } from 'next';

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https: wss:",
  "manifest-src 'self'",
  "upgrade-insecure-requests",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
  { key: 'Origin-Agent-Cluster', value: '?1' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
  { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
];

const noIndexHeaders = [
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
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
  compress: true,
  turbopack: {
    root: path.resolve(process.cwd(), '../..'),
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      { source: '/', headers: noStoreHeaders },
      { source: '/api/build-info', headers: [...noStoreHeaders, ...noIndexHeaders] },
      { source: '/api/:path*', headers: noIndexHeaders },
      { source: '/admin/:path*', headers: noIndexHeaders },
      { source: '/messages/:path*', headers: noIndexHeaders },
      { source: '/notifications/:path*', headers: noIndexHeaders },
      { source: '/settings/:path*', headers: noIndexHeaders },
      { source: '/wallet/:path*', headers: noIndexHeaders },
      { source: '/saved/:path*', headers: noIndexHeaders },
      { source: '/subscriptions/:path*', headers: noIndexHeaders },
      { source: '/activity/:path*', headers: noIndexHeaders },
      { source: '/interactions/:path*', headers: noIndexHeaders },
      { source: '/login', headers: noIndexHeaders },
      { source: '/register', headers: noIndexHeaders },
      { source: '/create', headers: noIndexHeaders },
      { source: '/forgot-password', headers: noIndexHeaders },
      { source: '/reset-password', headers: noIndexHeaders },
      { source: '/communities/curators', headers: noIndexHeaders },
      { source: '/verify-email', headers: noIndexHeaders },
      { source: '/welcome', headers: noIndexHeaders },
    ];
  },
};

export default nextConfig;
