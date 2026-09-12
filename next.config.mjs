/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/sites/650ovdcXNrUyveRRfGW8Ip/:path*',
        destination: '/modules/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(fonts|images|modules)/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
