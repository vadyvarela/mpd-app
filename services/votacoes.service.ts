import { cookies } from 'next/headers'

export type VotacoesListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: Votacao[]
}

export type Votacao = {
  id: number
  assembleia_voto_nr: string
  nr_eleitor: number
  nr_bi_eleitor: string
  nr_mesa: string
  votou: number
  anulado: number
  motivo_n_votou: string
  datetime: string
  eleitor_id: string
  eleitor_nome: string
}

export type VotacoesStats = {
  totals: {
    total: number
    votos_validos: number
    anuladas: number
  }
  per_mesa: {
    nr_mesa: string
    total: number
    votos_validos: number
    anuladas: number
  }[]
}

export type RegisterVoteInput = {
  nr_eleitor: number
  nr_mesa: string
  eleitor_id: number
  assembleia_voto_nr?: string
  anulado?: boolean
  motivo_n_votou?: string
}

export type UnregisterVoteInput = {
  nr_eleitor: number
  nr_mesa: string
  motivo: string
  votacao_id?: number
}

async function getToken(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('access_token')?.value ?? null
}

export async function getVotacoes(params?: {
  ordering?: string
  page?: number
  page_size?: number
  search?: string
  nr_eleitor?: number
}): Promise<VotacoesListResponse> {
  const token = await getToken()
  if (!token) throw new Error('Não autenticado')

  const query = new URLSearchParams()
  if (params?.ordering) query.set('ordering', params.ordering)
  if (params?.page) query.set('page', String(params.page))
  if (params?.page_size) query.set('page_size', String(params.page_size))
  if (params?.search) query.set('search', params.search)
  if (params?.nr_eleitor != null) query.set('nr_eleitor', String(params.nr_eleitor))

  const res = await fetch(`${process.env.API_URL}/api/votacoes/?anulado=false&${query}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Erro ao carregar votações (${res.status})`)
  return res.json()
}

export async function getVotacoesStats(): Promise<VotacoesStats> {
  const token = await getToken()
  if (!token) throw new Error('Não autenticado')

  const res = await fetch(`${process.env.API_URL}/api/votacoes/stats/`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) throw new Error(`Erro ao carregar estatísticas (${res.status})`)
  return res.json()
}

export async function registerVote(input: RegisterVoteInput): Promise<{ data?: Votacao; error?: string }> {
  const token = await getToken()
  if (!token) return { error: "Não autenticado." }
  const res = await fetch(`${process.env.API_URL}/api/votacoes/register-vote/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ assembleia_voto_nr: "s", motivo_n_votou: "", ...input }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { error: err?.detail ?? "Erro ao registar voto." }
  }

  return { data: await res.json() }
}

export async function unregisterVote(input: UnregisterVoteInput): Promise<{ error?: string }> {
  const token = await getToken()
  if (!token) return { error: 'Não autenticado.' }

  const res = await fetch(`${process.env.API_URL}/api/votacoes/unregister-vote/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    return { error: err?.detail ?? 'Erro ao anular voto.' }
  }

  return {}
}
