'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle2, XCircle, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Eleitor } from '@/services/eleitores.service'

export default function EleitoresHome({
  eleitores,
  defaultSearch = '',
}: {
  eleitores: Eleitor[]
  defaultSearch?: string
}) {
  const router = useRouter()
  const [search, setSearch] = useState(defaultSearch)
  const [, startTransition] = useTransition()
  const [selectedMesa, setSelectedMesa] = useState<string | null>(null)
  const [confirmId, setConfirmId] = useState<number | null>(null)
  const [notVoteId, setNotVoteId] = useState<number | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSearch(value: string) {
    setSearch(value)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams()
      if (value) params.set('search', value)
      startTransition(() => router.replace(`/dashboard?${params}`))
    }, 300)
  }

  const stats = {
    total: eleitores.length,
    voted: eleitores.filter(e => e.descarga).length,
    missing: eleitores.filter(e => e.nao_vai_votar).length,
    percentage: eleitores.length > 0
      ? Math.round((eleitores.filter(e => e.descarga).length / eleitores.length) * 100)
      : 0,
  }

  const mesas = [...new Set(eleitores.map(e => e.nr_mesa))].sort()

  // search is handled server-side; only mesa filter is client-side
  const pending = eleitores.filter(e => {
    if (e.descarga) return false
    if (selectedMesa && e.nr_mesa !== selectedMesa) return false
    return true
  })

  const confirmingVoter = eleitores.find(e => e.id === confirmId)
  const notVotingVoter = eleitores.find(e => e.id === notVoteId)

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-4 md:mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-10">
          <div>
            <h2 className="font-display font-bold text-xl md:text-3xl text-[#1A1A1A] mb-0.5">Pendentes</h2>
            <p className="text-[#6C757D] text-[10px] md:text-sm">Aguardando confirmação de presença na votação.</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl border border-[#E9ECEF] shadow-sm overflow-hidden w-full md:min-w-[320px] md:w-auto">
            <Search className="w-4 h-4 text-[#ADB5BD] ml-1.5 md:ml-2 flex-shrink-0" />
            <input
              type="text"
              value={search}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Pesquisar por nome ou nº eleitor..."
              className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm py-1 md:py-2 px-1 text-[#1A1A1A] placeholder:text-[#ADB5BD]"
            />
          </div>
        </div>

        {mesas.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
            {mesas.map(mesa => (
              <button
                key={mesa}
                onClick={() => setSelectedMesa(selectedMesa === mesa ? null : mesa)}
                className={cn(
                  'px-3 py-1 rounded-full text-[10px] md:text-xs font-bold transition-all',
                  selectedMesa === mesa
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-[#6C757D] border border-[#E9ECEF] hover:bg-[#F8F9FA]'
                )}
              >
                {mesa}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {[
            { label: 'Total', value: stats.total, sub: 'Inscritos', color: 'text-blue-600', dot: 'bg-blue-600' },
            { label: 'Votos', value: stats.voted, sub: `${stats.percentage}%`, color: 'text-primary', dot: 'bg-primary' },
            { label: 'Faltas', value: stats.missing, sub: 'Com motivo', color: 'text-red-600', dot: 'bg-red-600' },
            { label: 'Progresso', value: `${stats.percentage}%`, sub: 'Realizado', color: 'text-purple-600', dot: 'bg-purple-600' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white p-3 md:p-6 rounded-xl md:rounded-2xl border border-[#E9ECEF] shadow-sm"
            >
              <div className="flex items-center gap-1 md:gap-1.5 mb-1 md:mb-2">
                <div className={cn('w-1 h-1 md:w-1.5 md:h-1.5 rounded-full', stat.dot)} />
                <span className="text-[8px] md:text-[10px] font-bold text-[#ADB5BD] uppercase tracking-tighter md:tracking-wider">{stat.label}</span>
              </div>
              <div className={cn('text-lg md:text-2xl font-display font-bold md:mb-1', stat.color)}>{stat.value}</div>
              <div className="text-[8px] md:text-[10px] text-[#6C757D] font-medium">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-2 md:gap-4 lg:gap-6">
        {pending.length > 0 ? (
          pending.map((eleitor, i) => (
            <motion.div
              key={eleitor.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white rounded-lg md:rounded-2xl border border-[#E9ECEF] p-2 md:p-6 transition-all hover:bg-[#F8F9FA]/30"
            >
              <div className="flex items-center justify-between gap-2 md:gap-6 overflow-hidden">
                <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                  <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-xl shrink-0 flex items-center justify-center text-[10px] md:text-lg font-bold bg-[#F8F9FA] text-primary border border-[#E9ECEF]">
                    {eleitor.nome.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-[#1A1A1A] text-[11px] md:text-base leading-tight truncate md:whitespace-normal">
                      {eleitor.nome}
                    </h3>
                    <div className="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
                      <span className="text-[7px] md:text-[10px] text-[#ADB5BD] font-bold bg-[#F8F9FA] px-1 md:px-2 py-0.5 rounded border border-[#E9ECEF]">
                        Nº {eleitor.nr_eleitor}
                      </span>
                      <span className="text-[10px] text-[#ADB5BD] hidden md:inline">• {eleitor.nr_mesa}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 md:gap-3 flex-shrink-0">
                  <button
                    onClick={() => setConfirmId(eleitor.id)}
                    className="bg-primary text-white px-2.5 md:px-8 py-1.5 md:py-3 rounded-md md:rounded-xl text-[10px] md:text-sm font-bold shadow-sm hover:bg-[#15803d] flex items-center justify-center min-w-[50px] md:min-w-[120px] transition-all active:scale-95"
                  >
                    Votou
                  </button>
                  <button
                    onClick={() => setNotVoteId(eleitor.id)}
                    className="p-1.5 md:px-6 md:py-3 rounded-md md:rounded-xl text-[#DC3545] bg-[#FFF5F5] border border-red-50 hover:bg-red-100 transition-all font-bold text-xs flex items-center gap-2 active:scale-95"
                  >
                    <span className="hidden md:inline">Não Votou</span>
                    <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center col-span-full">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1A1A1A]">Meta Batida</h3>
            <p className="text-[#6C757D] text-xs">Tudo sincronizado.</p>
          </div>
        )}
      </div>

      {/* Modal — Confirmar Votação */}
      <AnimatePresence>
        {confirmId && confirmingVoter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setConfirmId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
              <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-display font-bold text-[#1A1A1A] text-center mb-2">Confirmar Votação?</h3>
              <p className="text-[#6C757D] text-center text-sm mb-8">
                Confirmar que <strong>{confirmingVoter.nome}</strong> votou.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setConfirmId(null)} className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-[#6C757D] border border-[#E9ECEF]">
                  Cancelar
                </button>
                <button onClick={() => setConfirmId(null)} className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-[#15803d] flex items-center justify-center gap-2">
                  Confirmar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal — Não Votou */}
      <AnimatePresence>
        {notVoteId && notVotingVoter && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setNotVoteId(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-[#DC3545]" />
              <h3 className="text-xl font-display font-bold text-[#1A1A1A] mb-2">Motivo da Ausência</h3>
              <p className="text-[#6C757D] text-sm mb-6">
                Selecione o motivo pelo qual <strong>{notVotingVoter.nome}</strong> não votou.
              </p>
              <div className="space-y-2">
                {['Falecido', 'Viajou', 'Ausente', 'Outro'].map(reason => (
                  <button
                    key={reason}
                    onClick={() => setNotVoteId(null)}
                    className="w-full text-left px-5 py-4 rounded-2xl border border-[#E9ECEF] hover:border-primary hover:bg-[#F0FDF4] hover:text-primary font-bold text-sm transition-all group relative overflow-hidden"
                  >
                    {reason}
                    <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </button>
                ))}
              </div>
              <button onClick={() => setNotVoteId(null)} className="w-full mt-6 py-3 text-sm font-bold text-[#ADB5BD] hover:text-[#1A1A1A] transition-colors">
                Cancelar
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
