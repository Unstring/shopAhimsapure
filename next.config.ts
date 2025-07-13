
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
  generateStaticParams: async () => {
    // Return an empty object to indicate no specific dynamic routes to generate at build time.
    // This is a way to handle client-side only dynamic routes with `output: 'export'`.
    return {};
  },
};

export default nextConfig;
