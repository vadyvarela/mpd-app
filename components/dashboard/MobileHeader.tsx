'use client'

import Link from 'next/link'
import { User } from 'lucide-react'
import type { User as AuthUser } from '@/services/auth.service'
import Image from 'next/image'

function getRole(user: AuthUser): string {
  if (user.is_superuser) return 'Super Admin'
  if (user.is_staff) return 'Admin'
  if (user.groups.length > 0) return user.groups[0]
  return 'Utilizador'
}

export default function MobileHeader({ user }: { user: AuthUser }) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 h-11 bg-white/80 backdrop-blur-md border-b border-gray-300 z-[60] flex items-center justify-between px-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/mpd1.svg" alt="MpD Logo" width={70} height={70} className="rounded-full" />
      </Link>
      <Link href="/perfil" className="flex items-center gap-2">
        <div className="text-right">
          <div className="text-[9px] font-bold text-gray-900 leading-none mb-0.5">{user.username}</div>
          <div className="text-[7px] text-primary font-bold uppercase tracking-wider leading-none">{getRole(user)}</div>
        </div>
        <div className="w-7 h-7 rounded-full bg-[#f0fdf4] flex items-center justify-center border border-primary/10">
          <User className="w-3.5 h-3.5 text-primary" />
        </div>
      </Link>
    </header>
  )
}
