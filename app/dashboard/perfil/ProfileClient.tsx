'use client'

import { motion } from 'framer-motion'
import { User, LogOut, Shield, Mail, AtSign } from 'lucide-react'
import { logout } from '@/actions/auth'
import type { User as UserType } from '@/services/auth.service'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-0.5">{label}</label>
      {children}
    </div>
  )
}

export default function ProfileClient({ user }: { user: UserType }) {
  const displayName = user.first_name && user.last_name
    ? `${user.first_name} ${user.last_name}`
    : user.username

  const initials = user.first_name && user.last_name
    ? `${user.first_name[0]}${user.last_name[0]}`
    : user.username.slice(0, 2).toUpperCase()

  const role = user.groups[0] ?? (user.is_staff ? 'staff' : 'utilizador')

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="mb-6 md:mb-8 flex justify-between items-end">
        <div>
          <h2 className="font-display font-bold text-xl md:text-3xl text-gray-900 mb-0.5">Meu Perfil</h2>
          <p className="text-gray-500 text-[10px] md:text-sm">Gerencie as suas informações.</p>
        </div>
        <button
          onClick={() => logout()}
          className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-500 bg-red-50 font-bold text-[10px] uppercase tracking-wider"
        >
          <LogOut className="w-3 h-3" />
          Sair
        </button>
      </div>

      <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">

        {/* Avatar Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm overflow-hidden">
            <div className="h-20 bg-linear-to-br from-[#16a34a] to-[#15803d]" />
            <div className="px-6 pb-6 -mt-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white mb-3">
                <div className="w-full h-full rounded-full bg-[#F0FDF4] flex items-center justify-center">
                  <span className="font-display font-bold text-xl text-[#16a34a]">{initials}</span>
                </div>
              </div>

              <h3 className="font-display font-bold text-gray-900 text-base leading-tight mb-0.5">{displayName}</h3>
              <p className="text-gray-500 text-xs mb-3">{user.email}</p>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#16a34a] text-[10px] font-bold uppercase tracking-wider mb-5">
                <Shield className="w-3 h-3" />
                {role}
              </span>

              <button className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm shadow-green-100">
                Alterar Password
              </button>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-5 md:p-7">
            <h4 className="font-display font-bold text-gray-900 text-sm md:text-base mb-5">Informações Pessoais</h4>

            <form className="space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Primeiro Nome">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                    <input
                      type="text"
                      defaultValue={user.first_name}
                      placeholder="Nome"
                      className="text-gray-500 w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-[#F8F9FA] text-xs md:text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-50 transition-all"
                    />
                  </div>
                </Field>
                <Field label="Apelido">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                    <input
                      type="text"
                      defaultValue={user.last_name}
                      placeholder="Apelido"
                      className="text-gray-500 w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-[#F8F9FA] text-xs md:text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-50 transition-all"
                    />
                  </div>
                </Field>
              </div>

              <Field label="Email">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="text-gray-500 w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-[#F8F9FA] text-xs md:text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-50 transition-all"
                  />
                </div>
              </Field>

              <Field label="Username">
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                  <input
                    type="text"
                    defaultValue={user.username}
                    disabled
                    className="text-gray-500 w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 bg-[#F8F9FA] text-xs md:text-sm cursor-not-allowed opacity-50"
                  />
                </div>
              </Field>

              <div className="pt-1 flex justify-end">
                <button
                  type="button"
                  className="w-full sm:w-auto bg-[#16a34a] hover:bg-[#15803d] text-white px-8 py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-sm shadow-green-100 transition-colors"
                >
                  Guardar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </motion.div>
  )
}
