import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow requests to Next.js internal paths and API routes
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Define your valid static paths
  const validStaticPaths = [
    '/',
    '/about',
    '/blog',
    '/products',
    '/contact',
    '/faq',
    '/privacy',
    '/track-order',
    '/coming-soon',
    '/maintenance',
    '/admin',
    '/admin/products',
    '/admin/orders',
    '/admin/customers',
  ];

  // Check if the requested path is a valid static path
  if (validStaticPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Basic check for dynamic routes (adjust regex based on your actual dynamic routes)
  // This example checks for /products/[id] and /blog/[slug]
  const isDynamicProductRoute = pathname.match(/^\/products\/[^/]+$/);
  const isDynamicBlogRoute = pathname.match(/^\/blog\/[^/]+$/);

  if (isDynamicProductRoute || isDynamicBlogRoute) {
      return NextResponse.next();
  }


  // If the path is not a valid static or dynamic route, rewrite to /404
  return NextResponse.rewrite(new URL('/404', request.url))
}
