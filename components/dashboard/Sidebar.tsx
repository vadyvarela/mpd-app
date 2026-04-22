'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, User, Settings, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { logout } from '@/actions/auth'

const menuItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Eleitores', icon: Users, href: '/eleitores' },
  { name: 'Perfil', icon: User, href: '/perfil' },
  { name: 'Configurações', icon: Settings, href: '/configuracoes' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-20 lg:w-64 border-r border-[#E9ECEF] bg-white flex-col fixed inset-y-0 left-0 z-50 transition-all duration-300">
      <div className="p-4 lg:p-6 flex justify-center lg:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#16a34a] rounded-xl flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-green-100 italic">M</div>
          <div className="hidden lg:block truncate">
            <h1 className="font-display font-bold text-xl tracking-tight text-[#1A1A1A]">MpD</h1>
            <p className="text-xs font-medium text-[#adb5bd] uppercase tracking-widest leading-none">VoterSync</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 lg:px-4 py-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            title={item.name}
            className={cn(
              'w-full flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 lg:py-3 rounded-xl transition-all duration-200 group relative',
              pathname === item.href
                ? 'bg-[#F0FDF4] text-[#16a34a]'
                : 'text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]'
            )}
          >
            <item.icon className={cn('w-5 h-5 flex-shrink-0', pathname === item.href ? 'text-[#16a34a]' : 'group-hover:text-[#1A1A1A]')} />
            <span className="font-medium hidden lg:block">{item.name}</span>
            {pathname === item.href && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute right-2 lg:static lg:ml-auto w-1.5 h-1.5 rounded-full bg-[#16a34a]"
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-[#E9ECEF] flex justify-center lg:justify-start bg-white">
        <form action={logout} className="w-full">
          <button
            type="submit"
            className="w-full flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 lg:py-3 rounded-xl text-[#DC3545] hover:bg-[#FFF5F5] transition-colors font-medium"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="hidden lg:block">Sair</span>
          </button>
        </form>
      </div>
    </aside>
  )
}
