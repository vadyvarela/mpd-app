import { logout } from '@/actions/auth'

export default function SemPermissao() {
  return (
    <div className="fixed inset-0 bg-[#F8F9FA] flex items-center justify-center p-6">
      <div className="w-full max-w-sm text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-100">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>

        <h1 className="font-display font-bold text-2xl text-gray-900 mb-2">Acesso Restrito</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">
          A sua conta não tem permissões para aceder a esta área.<br />
          Apenas delegados autorizados podem entrar.
        </p>

        <div className="bg-white rounded-2xl border border-gray-300 p-4 mb-8 text-left">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1">Conta Autenticada</p>
          <p className="text-sm font-bold text-gray-900">Grupo sem acesso atribuído</p>
          <p className="text-xs text-gray-500 mt-0.5">Contacte o administrador do sistema.</p>
        </div>

        <form action={logout}>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 rounded-2xl font-bold text-sm hover:bg-black transition-colors"
          >
            Terminar Sessão
          </button>
        </form>

        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-8">
          Suporte: <span className="text-gray-900">geral@mpd.cv</span>
        </p>
      </div>
    </div>
  )
}
