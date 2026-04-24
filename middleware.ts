import { NextRequest, NextResponse } from 'next/server'

function jwtExpiry(token: string): number | null {
  try {
    const payload = token.split('.')[1]
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = JSON.parse(atob(base64))
    return typeof decoded.exp === 'number' ? decoded.exp : null
  } catch {
    return null
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value
  const refreshToken = req.cookies.get('refresh_token')?.value

  const exp = accessToken ? jwtExpiry(accessToken) : null
  // Refresh proactively when less than 60 s remain, or token is missing/invalid
  const needsRefresh = !exp || exp * 1000 < Date.now() + 60_000

  if (!needsRefresh) return NextResponse.next()

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    })

    if (!res.ok) {
      const response = NextResponse.redirect(new URL('/login', req.url))
      response.cookies.delete('access_token')
      response.cookies.delete('refresh_token')
      return response
    }

    const data: { access: string } = await res.json()
    const response = NextResponse.next()
    response.cookies.set('access_token', data.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })
    return response
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
