import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const sessionCookie = request.cookies.get('icc_session')?.value;
  const authTokenCookie = request.cookies.get('icc_auth_token')?.value;

  let isAuthenticated = false;
  let userRole = 'CEO';

  if (sessionCookie) {
    try {
      const parsed = JSON.parse(decodeURIComponent(sessionCookie));
      if (parsed && parsed.authenticated) {
        isAuthenticated = true;
        userRole = parsed.role || 'CEO';
      }
    } catch (e) {
      // If parsing fails, fall back to checking auth token presence
      isAuthenticated = Boolean(authTokenCookie);
    }
  } else if (authTokenCookie) {
    isAuthenticated = true;
  }

  // 1. Unauthenticated users trying to access dashboard routes -> Redirect to Login
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 2. Authenticated users visiting Login page -> Redirect directly to CEO Dashboard
  if (pathname === '/auth/login') {
    if (isAuthenticated) {
      const targetDashboard = userRole === 'CEO' ? '/dashboard/ceo' : `/dashboard/${userRole.toLowerCase().replace('_', '-')}`;
      return NextResponse.redirect(new URL(targetDashboard, request.url));
    }
  }

  // 3. Root route `/` -> Redirect depending on Auth state
  if (pathname === '/') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard/ceo', request.url));
    } else {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/auth/login'],
};
