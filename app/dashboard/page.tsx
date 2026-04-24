import { getEleitores } from '@/services/eleitores.service'
import EleitoresHome from '@/components/dashboard/EleitoresHome'

type Props = {
  searchParams: Promise<{ search?: string; ordering?: string; page?: string }>
}

export default async function DashboardPage({ searchParams }: Props) {
  const { search, ordering, page } = await searchParams
  const currentPage = page ? Number(page) : 1
  const data = await getEleitores({ search, ordering, page: currentPage, page_size: 50 })

  return <EleitoresHome data={data} defaultSearch={search ?? ''} currentPage={currentPage} />
}
