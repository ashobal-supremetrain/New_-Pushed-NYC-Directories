import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /api/businesses)
  const path = request.nextUrl.pathname;

  // If it's an API route, add the CORS headers
  if (path.startsWith('/api/')) {
    const response = NextResponse.next();

    // Add the CORS headers
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return response;
  }

  return NextResponse.next();
}

// Configure the middleware
export const config = {
  matcher: '/api/:path*',
}; 