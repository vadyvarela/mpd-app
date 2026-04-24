import { getVotacoes, getVotacoesStats } from '@/services/votacoes.service'
import EleitoresPage from '@/components/dashboard/EleitoresPage'

type Props = {
  searchParams: Promise<{ page?: string; ordering?: string; search?: string; nr_eleitor?: string }>
}

export default async function VotacaoPage({ searchParams }: Props) {
  const { page, ordering, search, nr_eleitor } = await searchParams
  const [data, stats] = await Promise.all([
    getVotacoes({
      page: page ? Number(page) : undefined,
      ordering: ordering ?? '-datetime',
      page_size: 50,
      search: search || undefined,
      nr_eleitor: nr_eleitor ? Number(nr_eleitor) : undefined,
    }),
    getVotacoesStats(),
  ])

  return <EleitoresPage data={data} stats={stats} currentPage={page ? Number(page) : 1} defaultSearch={nr_eleitor ?? search ?? ''} />
}
