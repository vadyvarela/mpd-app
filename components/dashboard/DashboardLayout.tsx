'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import type { User } from '@/lib/auth'
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
  const [isVisualLoading, setIsVisualLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisualLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isVisualLoading ? (
        <motion.div
          key="visual-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#F8F9FA] flex flex-col items-center justify-center z-[300]"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-6 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-[#16a34a] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-xl shadow-green-100 italic mb-4">M</div>
            <Loader2 className="w-8 h-8 text-[#16a34a] animate-spin" />
          </motion.div>
          <p className="text-[10px] font-bold text-[#ADB5BD] uppercase tracking-[0.2em] animate-pulse">Sincronizando Sistema...</p>
        </motion.div>
      ) : (
        <div key="dashboard-shell" className="flex min-h-screen bg-[#F8F9FA] overflow-x-hidden">
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
      )}
    </AnimatePresence>
  )
}
