import LoginVisual from '@/components/login/LoginVisual'
import LoginForm from '@/components/login/LoginForm'

export default function LoginPage() {
  return (
    <div className="fixed inset-0 bg-[#F8F9FA] flex flex-col md:flex-row overflow-hidden z-[200]">
      <LoginVisual />
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <LoginForm />
      </div>
    </div>
  )
}
