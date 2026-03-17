import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['es', 'en']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/favicon') || pathname.match(/\.\w+$/)) {
    return NextResponse.next()
  }
  const hasLocale = locales.some((l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`)
  if (!hasLocale) {
    return NextResponse.redirect(new URL(`/es${pathname}`, request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/((?!_next|admin|api|favicon\\.ico|.*\\..*).*)'] }
