import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-green-100 italic mb-6">
        M
      </div>
      <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-xs">
        A página que procuras não existe ou foi removida.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-[#15803d] transition-colors"
      >
        Voltar ao início
      </Link>
    </div>
  )
}
