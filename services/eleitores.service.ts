import { cookies } from 'next/headers'

export type Eleitor = {
  id: number
  nome: string
  nominho: string
  concelho: string
  zona: string
  nr_mesa: string
  nr_eleitor: number
  mpd: boolean
  indeciso: boolean
  nao_vai_votar: boolean
  descarga: boolean
}

export type EleitoresListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Eleitor[]
}

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('access_token')?.value ?? null
}

export async function getEleitores(params?: {
  search?: string
  ordering?: string
  page?: number
  page_size?: number
}): Promise<EleitoresListResponse> {
  const token = await getToken()
  if (!token) throw new Error('Não autenticado')

  const query = new URLSearchParams()
  if (params?.search) query.set('search', params.search)
  if (params?.ordering) query.set('ordering', params.ordering)
  if (params?.page) query.set('page', String(params.page))
  if (params?.page_size) query.set('page_size', String(params.page_size))

  const res = await fetch(`${process.env.API_URL}/api/eleitores/?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Erro ao carregar eleitores (${res.status})`)
  return res.json()
}

export async function markDescarga(elitorId: number): Promise<{ error?: string }> {
  const token = await getToken()
  if (!token) return { error: 'Não autenticado.' }

  const res = await fetch(`${process.env.API_URL}/api/eleitores/${elitorId}/mark-descarga/`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { error: err?.detail ?? 'Erro ao marcar descarga.' }
  }

  return {}
}

export async function markNaoVaiVotar(
  elitorId: number,
  motivo: { ausente?: boolean; indeciso?: boolean },
): Promise<{ error?: string }> {
  const token = await getToken()
  if (!token) return { error: 'Não autenticado.' }
  const res = await fetch(`${process.env.API_URL}/api/eleitores/${elitorId}/mark-flags/`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...motivo, descarga: true }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { error: err?.detail ?? 'Erro ao marcar ausência.' }
  }

  return {}
}
