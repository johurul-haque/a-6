import { NextRequest, NextResponse } from 'next/server';
import { fetchProfile } from './lib/fetch-profile';

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token');
  const path = request.nextUrl.pathname;

  if (!cookie && path !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const res = await fetchProfile(cookie?.value as string);

  if (res.status === 401 && path !== '/login' && path !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!path.startsWith('/dashboard') && res.status === 200) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register'],
};
