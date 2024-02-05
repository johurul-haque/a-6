import { NextRequest, NextResponse } from 'next/server';
import { SERVER_DOMAIN } from './config';

export async function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token');
  const path = request.nextUrl.pathname;

  if (!cookie && path !== '/login' && path !== '/register') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const res = await fetch(`${SERVER_DOMAIN}/profile`, {
    headers: {
      Authorization: cookie?.value as string,
    },
  });

  if (res.status === 401 && path !== '/login' && path !== '/register') {
    const result = await res.json();
    console.log(result);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!path.startsWith('/dashboard') && res.status === 200) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/login', '/register'],
};
