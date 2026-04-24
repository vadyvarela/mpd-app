'use client'

import { useEffect } from 'react'
import { AlertTriangle } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Ocorreu um erro</h2>
      <p className="text-gray-500 text-sm mb-6 max-w-sm">
        Não foi possível carregar os dados. Verifique a ligação e tente novamente.
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-[#15803d] transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  )
}
