'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Users, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const tabs = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Eleitores', icon: Users, href: '/eleitores' },
  { name: 'Perfil', icon: User, href: '/perfil' },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9ECEF] z-50 flex justify-around items-center py-1 md:py-2 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      {tabs.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'flex flex-col items-center gap-0.5 p-1 transition-all',
            pathname === item.href ? 'text-[#16a34a]' : 'text-[#ADB5BD]'
          )}
        >
          <item.icon className="w-4 h-4" />
          <span className="text-[8px] font-bold uppercase tracking-wider">{item.name}</span>
          {pathname === item.href && (
            <motion.div layoutId="mobileTabIndicator" className="w-1 h-1 rounded-full bg-[#16a34a]" />
          )}
        </Link>
      ))}
    </nav>
  )
}
