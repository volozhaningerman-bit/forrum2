import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const DEFAULT_SESSION_COOKIE = 'forrum_session';

function getSessionCookieName() {
  return (
    process.env.SESSION_COOKIE_NAME?.trim() ||
    DEFAULT_SESSION_COOKIE
  );
}

// FORRUM_AUTH_PROXY_V6_10
export function proxy(request: NextRequest) {
  const cookieName = getSessionCookieName();

  if (request.cookies.has(cookieName)) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  const nextPath =
    request.nextUrl.pathname +
    request.nextUrl.search;

  loginUrl.searchParams.set('next', nextPath);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/messages/:path*',
    '/create',
    '/events/create',
    '/notifications/:path*',
    '/settings/:path*',
    '/saved/:path*',
    '/subscriptions/:path*',
    '/wallet/:path*',
    '/interactions/:path*',
    '/portfolio/:path*',
    '/admin/:path*',
  ],
};
