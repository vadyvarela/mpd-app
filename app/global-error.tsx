'use client'

import { useEffect } from 'react'

export default function GlobalError({
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
    <html lang="pt">
      <body className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center text-center px-4 font-sans">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-green-100 italic mb-6">
          M
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Algo correu mal</h2>
        <p className="text-gray-500 text-sm mb-8 max-w-xs">
          Ocorreu um erro inesperado na aplicação. Tente recarregar a página.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary text-white rounded-xl text-sm font-bold hover:bg-[#15803d] transition-colors"
        >
          Tentar novamente
        </button>
      </body>
    </html>
  )
}
