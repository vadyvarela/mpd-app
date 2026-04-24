'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type PersonListItemProps = {
  name: string
  nrEleitor: number
  nrMesa: string
  datetime?: string
  avatarClassName?: string
  nameClassName?: string
  actions: React.ReactNode
  delay?: number
}

export default function PersonListItem({
  name,
  nrEleitor,
  nrMesa,
  datetime,
  avatarClassName,
  nameClassName,
  actions,
  delay = 0,
}: PersonListItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-lg md:rounded-xl border border-gray-200 p-2 md:p-4 transition-all hover:bg-[#F8F9FA]/30"
    >
      <div className="flex items-center justify-between gap-2 md:gap-6 overflow-hidden">
        <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <div
            className={cn(
              'w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-xl shrink-0 flex items-center justify-center text-[10px] md:text-lg font-bold text-primary',
              avatarClassName ?? 'bg-[#F8F9FA] border border-gray-200',
            )}
          >
            {name.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <h3
              className={cn(
                'font-bold text-[11px] md:text-base leading-tight line-clamp-2 md:whitespace-normal',
                nameClassName ?? 'text-gray-900',
              )}
            >
              {name}
            </h3>
            <div className="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1 flex-wrap">
              <span className="text-[10px] md:text-[12px] text-gray-400 font-bold md:bg-[#F8F9FA] px-0 md:px-2 py-0.5 rounded md:border border-gray-100">
                Nº {nrEleitor}
              </span>
              <span className="text-xs font-bold text-gray-400 hidden md:inline">• {nrMesa}</span>
              {datetime && (
                <span className="text-[10px] md:text-xs text-gray-400">{datetime}</span>
              )}
            </div>
          </div>
        </div>
        <div className="shrink-0">{actions}</div>
      </div>
    </motion.div>
  )
}
