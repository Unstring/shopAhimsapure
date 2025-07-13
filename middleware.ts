
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware is intentionally simple to work with `output: 'export'`.
// It allows all paths to pass through. Next.js's static export handling
// will serve existing static files and the client-side router will handle
// dynamic routes like `/verify/[token]`.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
