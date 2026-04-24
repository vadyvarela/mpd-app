'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/config/navigation'

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 z-50 flex justify-around items-center py-1 md:py-4 px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
      {NAV_ITEMS.filter((item) => !item.desktopOnly).map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'flex flex-col items-center gap-0.5 p-2 transition-all',
            pathname === item.href ? 'text-primary' : 'text-gray-600'
          )}
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
          {pathname === item.href && (
            <motion.div layoutId="mobileTabIndicator" className="w-1 h-1 rounded-full bg-primary" />
          )}
        </Link>
      ))}
    </nav>
  )
}
