'use client'

import { motion } from 'framer-motion'

type StatCardProps = {
  label: string
  value: string | number
  color: string
  sub?: string
  icon?: string
  delay?: number
}

export default function StatCard({ label, value, color, sub, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, ease: 'easeOut' }}
      className="relative overflow-hidden bg-white rounded-xl border border-gray-300 p-4 md:p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-widest text-gray-500">
          {label}
        </span>
        {icon && <span className="text-base leading-none">{icon}</span>}
      </div>
      <div className="text-2xl md:text-3xl font-bold tabular-nums mb-1" style={{ color }}>
        {value}
      </div>
      {sub && (
        <div className="text-[10px] md:text-xs text-gray-500 font-medium">{sub}</div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40" style={{ backgroundColor: color }} />
    </motion.div>
  )
}
