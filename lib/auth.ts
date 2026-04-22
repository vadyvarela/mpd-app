import { cookies } from 'next/headers'

export type User = {
  id: number
  username: string
  email: string
  is_superuser: boolean
  is_staff: boolean
  groups: string[]
  permissions: string[]
}

export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')

  if (!token) return null

  const res = await fetch(`${process.env.API_URL}/api/auth/me/`, {
    headers: { Authorization: `Bearer ${token.value}` },
    cache: 'no-store',
  })

  if (!res.ok) return null

  return res.json()
}
