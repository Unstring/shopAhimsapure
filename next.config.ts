
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
  generateStaticParams: async () => {
    // This empty function helps with some static export configurations,
    // but the dynamicParams setting is the key fix.
    return [];
  },
  // This tells Next.js to generate pages on-demand for routes that aren't
  // statically generated at build time. It's ideal for dynamic admin pages.
  dynamicParams: true, 
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
};

export default nextConfig;
