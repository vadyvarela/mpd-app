'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

const features = [
  'Sincronização instantânea',
  'Relatórios de presença',
  'Gestão de delegados',
]

export default function LoginVisual() {
  return (
    <div className="hidden md:flex md:w-[45%] lg:w-[40%] bg-[#16a34a] relative overflow-hidden flex-col items-center justify-center p-12">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-[#15803d] rounded-full opacity-30 blur-3xl"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-[#1a7a3b] rounded-full opacity-20 blur-3xl"
      />

      <div className="relative z-10 text-white max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          //className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-8 border border-white/30"
        >
          <Image src="/mpd.svg" alt="Logo" width={200} height={200} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 mt-6 text-lg leading-relaxed font-medium mb-10"
        >
          Gerencie e acompanhe a presença de eleitores em tempo real com precisão e
          segurança institucional.
        </motion.p>

        <div className="space-y-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-3 text-white/90 text-sm font-bold"
            >
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-3 h-3" />
              </div>
              {feature}
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  )
}
