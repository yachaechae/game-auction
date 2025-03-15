import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authStore } from '@/store/authStore';

export function middleware(request: NextRequest) {
  const token = authStore.getState().token;
  const pathname = request.nextUrl.pathname;

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/*'],
};
