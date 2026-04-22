import { redirect } from 'next/navigation'
import { getUser } from '@/lib/auth'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUser()

  if (!user) redirect('/login')

  return <DashboardLayout user={user}>{children}</DashboardLayout>
}
