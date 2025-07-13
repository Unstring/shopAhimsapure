
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  trailingSlash: true,
  // This allows client-side handling of dynamic routes with `output: 'export'`.
  // Requests to `/verify/some-token` will serve the `/verify/index.html` page.
  async rewrites() {
    return [
      {
        source: '/verify/:path*',
        destination: '/verify/',
      },
    ]
  },
};

export default nextConfig;
