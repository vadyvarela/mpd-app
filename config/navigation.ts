import { Home, Users, User, type LucideIcon } from 'lucide-react'

export type NavItem = {
  name: string
  icon: LucideIcon
  href: string
  desktopOnly?: boolean
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', icon: Home, href: '/dashboard' },
  { name: 'Votações', icon: Users, href: '/dashboard/votacao' },
  { name: 'Perfil', icon: User, href: '/dashboard/perfil' }
]
