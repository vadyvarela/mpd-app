'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export type LoginState = {
  error?: string
}

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Preencha todos os campos.' }
  }

  let data: { access: string; refresh: string; token_type: string; user: unknown }

  try {
    const res = await fetch(`${process.env.API_URL}/api/auth/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    if (!res.ok) {
      return { error: 'Credenciais inválidas. Tente novamente.' }
    }

    data = await res.json()
  } catch {
    return { error: 'Erro de ligação ao servidor. Tente mais tarde.' }
  }

  const cookieStore = await cookies()
  cookieStore.set('access_token', data.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
  cookieStore.set('refresh_token', data.refresh, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })

  redirect('/dashboard')
}

export async function logout() {
  const cookieStore = await cookies()
  const refresh = cookieStore.get('refresh_token')

  if (refresh) {
    try {
      await fetch(`${process.env.API_URL}/api/auth/logout/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refresh.value }),
      })
    } catch {
      // mesmo que a API falhe, limpamos os cookies localmente
    }
  }

  cookieStore.delete('access_token')
  cookieStore.delete('refresh_token')
  redirect('/login')
}
