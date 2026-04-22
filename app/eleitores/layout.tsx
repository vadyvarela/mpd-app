import { redirect } from 'next/navigation'
import { getUser, isDelegado } from '@/services/auth.service'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import SemPermissao from '@/components/dashboard/SemPermissao'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  if (!user) redirect('/login')

  if (!isDelegado(user)) return <SemPermissao />

  return <DashboardLayout user={user}>{children}</DashboardLayout>
}
