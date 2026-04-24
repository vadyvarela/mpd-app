import { getUser } from '@/services/auth.service'
import ProfileClient from './ProfileClient'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const user = await getUser()
  if (!user) redirect('/login')

  return <ProfileClient user={user} />
}
