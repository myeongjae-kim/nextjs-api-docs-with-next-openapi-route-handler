import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ApiError } from './app/domain/ApiError';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { method } = request;

  const isArticlesPath = pathname === '/api/articles';
  const isArticleIdPath = pathname.startsWith('/api/articles/') && pathname.split('/').length === 4;

  const requiresAuth = (isArticlesPath && method === 'POST') ||
    (isArticleIdPath && (method === 'PUT' || method === 'DELETE'));

  if (requiresAuth) {
    const authHeader = request.headers.get('Authorization');
    const expectedToken = 'Bearer default-token-value-for-docs';

    if (authHeader !== expectedToken) {
      return NextResponse.json(
        new ApiError({
          status: 401,
          error: 'UNAUTHORIZED',
          code: 'AUTH_001',
          message: 'Invalid or missing authentication token',
        }),
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/articles/:path*',
};
