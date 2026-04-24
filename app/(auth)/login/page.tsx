import LoginVisual from '@/components/login/LoginVisual'
import LoginForm from '@/components/login/LoginForm'
import { getUser } from '@/services/auth.service'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const user = await getUser()
  if (user) redirect('/dashboard')
    
  return (
    <div className="fixed inset-0 bg-[#F8F9FA] flex flex-col md:flex-row overflow-hidden z-[200]">
      <LoginVisual />
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <LoginForm />
      </div>
    </div>
  )
}
