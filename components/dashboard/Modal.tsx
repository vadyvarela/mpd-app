'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function Modal({
  open,
  onClose,
  topBar = false,
  children,
}: {
  open: boolean
  onClose: () => void
  topBar?: boolean
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={cn(
              'relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8',
              topBar && 'overflow-hidden',
            )}
          >
            {topBar && <div className="absolute top-0 left-0 w-full h-2 bg-primary" />}
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
