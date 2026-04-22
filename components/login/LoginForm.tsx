'use client'

import { useActionState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Mail, Lock, ChevronRight } from 'lucide-react'
import { login, type LoginState } from '@/actions/auth'
import Image from 'next/image'

const initialState: LoginState = {}

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-[420px]"
    >
      <div className="md:hidden flex items-center justify-center flex-col gap-3 mb-10">
        <Image src="/mpd1.svg" alt="Logo" width={200} height={200} />
       
      </div>

      <div className="flex items-center justify-center flex-col mb-10">
        <h2 className="text-3xl font-display font-bold text-[#1A1A1A] mb-2">Bem-vindo</h2>
        <p className="text-[#6C757D] text-sm font-medium">
          Introduza as suas credenciais para aceder ao painel de gestão.
        </p>
      </div>

      {state.error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-bold mb-6 flex items-center gap-2"
        >
          <div className="w-1 h-1 bg-red-600 rounded-full" />
          {state.error}
        </motion.div>
      )}

      <form action={formAction} className="space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-[#ADB5BD] uppercase tracking-wider ml-1">
            Email Institucional
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ADB5BD] group-focus-within:text-[#16a34a] transition-colors">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              name="username"
              placeholder="exemplo@mpd.cv"
              required
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#E9ECEF] bg-white text-sm outline-none focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/5 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-[10px] font-bold text-[#ADB5BD] uppercase tracking-wider">
              Palavra-passe
            </label>
            <button
              type="button"
              className="text-[10px] font-bold text-[#16a34a] hover:underline uppercase tracking-wider"
            >
              Esqueceu a senha?
            </button>
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ADB5BD] group-focus-within:text-[#16a34a] transition-colors">
              <Lock className="w-5 h-5" />
            </div>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-[#E9ECEF] bg-white text-sm outline-none focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/5 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-primary text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-green-100 hover:bg-[#15803d] transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-70"
        >
          {pending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              Entrar
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

    </motion.div>
  )
}
