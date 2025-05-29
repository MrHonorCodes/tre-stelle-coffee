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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' vercel.live *.vercel.app js.hcaptcha.com *.hcaptcha.com core.sanity-cdn.com;",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com;",
              "img-src 'self' data: cdn.sanity.io avatars.nordpass.com;",
              "font-src 'self' data: fonts.gstatic.com;",
              "connect-src 'self' *.vercel.app cdn.sanity.io *.hcaptcha.com *.api.sanity.io;",
              "frame-src 'self' newassets.hcaptcha.com *.hcaptcha.com https://www.google.com https://maps.google.com https://www.youtube.com;",
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
