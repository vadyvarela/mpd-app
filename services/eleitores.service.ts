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

export async function getEleitores(params?: {
  search?: string
  ordering?: string
}): Promise<Eleitor[]> {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')

  if (!token) return []

  const query = new URLSearchParams()
  if (params?.search) query.set('search', params.search)
  if (params?.ordering) query.set('ordering', params.ordering)

  const res = await fetch(
    `${process.env.API_URL}/api/eleitores/?${query}`,
    {
      headers: { Authorization: `Bearer ${token.value}` },
      cache: 'no-store',
    }
  )

  if (!res.ok) return []

  return res.json()
}
