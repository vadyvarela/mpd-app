import { getEleitores } from '@/services/eleitores.service'
import EleitoresHome from '@/components/dashboard/EleitoresHome'

type Props = {
  searchParams: Promise<{ search?: string; ordering?: string }>
}

export default async function DashboardPage({ searchParams }: Props) {
  const { search, ordering } = await searchParams
  const eleitores = await getEleitores({ search, ordering })

  return <EleitoresHome eleitores={eleitores} defaultSearch={search ?? ''} />
}
