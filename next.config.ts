import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  /* config options here */
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' vercel.live *.vercel.app;",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com;",
              "img-src 'self' data: cdn.sanity.io;",
              "font-src 'self' fonts.gstatic.com;",
              "connect-src 'self' *.vercel.app cdn.sanity.io;",
              "frame-ancestors 'none';",
              "object-src 'none';",
            ].join(' '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
