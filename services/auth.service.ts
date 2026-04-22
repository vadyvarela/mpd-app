import { cookies } from 'next/headers'

export type User = {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_staff: boolean
  is_superuser: boolean
  groups: string[]
  permissions: string[]
  militante_id: number | null
}

export function isDelegado(user: User): boolean {
  return user.groups.includes('delegado')
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
