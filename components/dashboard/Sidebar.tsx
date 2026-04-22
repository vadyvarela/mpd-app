'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, User, Settings, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { logout } from '@/actions/auth'

const menuItems = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Eleitores', icon: Users, href: '/dashboard/eleitores' },
  { name: 'Perfil', icon: User, href: '/dashboard/perfil' },
  { name: 'Configurações', icon: Settings, href: '/dashboard/configuracoes' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex w-20 lg:w-64 bg-white border-r border-[#E9ECEF] flex-col fixed inset-y-0 left-0 z-50 transition-all duration-300">
      <div className="p-4 lg:p-6 flex justify-center lg:justify-start border-b border-[#F8F9FA]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-sm italic">M</div>
          <div className="hidden lg:block truncate">
            <h1 className="font-display font-bold text-lg tracking-tight text-[#1A1A1A]">MpD</h1>
            <p className="text-[9px] font-bold text-[#ADB5BD] uppercase tracking-widest leading-none">VoterSync</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "w-full flex items-center justify-center lg:justify-start gap-4 p-3.5 lg:px-4 lg:py-3.5 rounded-xl transition-all duration-200 group relative",
              pathname === item.href 
                ? "bg-[#F0FDF4] text-primary" 
                : "text-[#6C757D] hover:bg-[#F8F9FA] hover:text-[#1A1A1A]"
            )}
            title={item.name}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0 transition-colors", 
              pathname === item.href ? "text-primary" : "group-hover:text-[#1A1A1A]"
            )} />
            <span className="font-semibold text-sm hidden lg:block">{item.name}</span>
            
            {pathname === item.href && (
              <motion.div 
                layoutId="activeTabIndicator" 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-l-full" 
              />
            )}
          </Link>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-[#F8F9FA]">
        <button 
          onClick={() => logout()}
          className="w-full flex items-center justify-center lg:justify-start gap-4 p-3.5 lg:px-4 lg:py-3.5 rounded-xl text-[#DC3545] hover:bg-[#FFF5F5] transition-all duration-200 font-semibold text-sm group"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <span className="hidden lg:block">Sair do Sistema</span>
        </button>
      </div>
    </aside>
  )
}
