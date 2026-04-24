'use client'

import { motion } from 'framer-motion'
import type { User } from '@/services/auth.service'
import MobileHeader from './MobileHeader'
import Sidebar from './Sidebar'
import MobileNav from './MobileNav'

export default function DashboardLayout({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] overflow-x-hidden">
      <MobileHeader user={user} />
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 md:ml-20 lg:ml-64 min-h-screen bg-[#F8F9FA] pt-14 p-3 md:p-6 lg:p-10 pb-20 md:pb-8"
      >
        {children}
      </motion.main>
      <MobileNav />
    </div>
  )
}
