'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { XCircle, Loader2, Search } from 'lucide-react'
import { toast } from 'sonner'
import { unregisterVoteAction } from '@/actions/votacoes'
import type { VotacoesListResponse, VotacoesStats } from '@/services/votacoes.service'
import Modal from '@/components/dashboard/Modal'
import PersonListItem from '@/components/dashboard/PersonListItem'
import EmptyState from '@/components/dashboard/EmptyState'
import Pagination from '@/components/dashboard/Pagination'

function formatDate(datetime: string) {
  return new Date(datetime).toLocaleString('pt-CV', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function EleitoresPage({
  data,
  stats,
  currentPage,
  defaultSearch = '',
}: {
  data: VotacoesListResponse
  stats: VotacoesStats | null
  currentPage: number
  defaultSearch?: string
}) {
  const router = useRouter()
  const [cancelId, setCancelId] = useState<number | null>(null)
  const [motivo, setMotivo] = useState('')
  const [isCanceling, startCancelTransition] = useTransition()
  const [search, setSearch] = useState(defaultSearch)
  const [, startSearchTransition] = useTransition()
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSearch(value: string) {
    setSearch(value)
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams()
      if (value) {
        if (/^\d+$/.test(value.trim())) {
          params.set('nr_eleitor', value.trim())
        } else {
          params.set('search', value)
        }
      }
      startSearchTransition(() => router.replace(`/dashboard/votacao?${params}`))
    }, 300)
  }

  const cancelingVote = data.results.find((v) => v.id === cancelId)
  const totalPages = Math.ceil(data.count / 50)

  function goToPage(page: number) {
    const params = new URLSearchParams()
    params.set('page', String(page))
    if (search) {
      if (/^\d+$/.test(search.trim())) {
        params.set('nr_eleitor', search.trim())
      } else {
        params.set('search', search)
      }
    }
    router.push(`/dashboard/votacao?${params}`)
  }

  function closeModal() {
    setCancelId(null)
    setMotivo('')
  }

  function handleCancel() {
    if (!cancelingVote || !motivo.trim()) return
    startCancelTransition(async () => {
      const result = await unregisterVoteAction(
        cancelingVote.nr_eleitor,
        cancelingVote.nr_mesa,
        motivo.trim(),
        cancelingVote.id,
      )
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Voto anulado com sucesso.')
        closeModal()
      }
    })
  }

  return (
    <motion.div
      key="eleitores"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="max-w-7xl mx-auto"
    >
      <header className="mb-4 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 md:mb-6">
          <div>
            <h2 className="font-display font-bold text-xl md:text-3xl text-gray-900 mb-0.5">Votação</h2>
            <p className="text-gray-500 text-[10px] md:text-sm">Registos de votos confirmados e anulados.</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 bg-white p-1.5 md:p-2 rounded-lg md:rounded-xl border border-gray-300 shadow-sm overflow-hidden w-full md:min-w-[320px] md:w-auto">
            <Search className="w-4 h-4 text-gray-600 ml-1.5 md:ml-2 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Pesquisar por nome ou nº eleitor..."
              className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm py-1 md:py-2 px-1 text-gray-900 placeholder:text-gray-600"
            />
          </div>
        </div>

        {stats && stats.per_mesa.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4 md:mb-6">
            {stats.per_mesa.map((m, i) => (
              <motion.div
                key={m.nr_mesa}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl border border-gray-300 px-4 py-3 flex items-center justify-between"
              >
                <span className="text-xs font-bold text-gray-900">{m.nr_mesa}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-primary font-bold">{m.votos_validos} válidos</span>
                  {m.anuladas > 0 && <span className="text-[#EF4444] font-bold">{m.anuladas} anulados</span>}
                  <span className="text-gray-600">/ {m.total}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 gap-2 md:gap-3">
        {data.results.length > 0 ? (
          data.results.map((votacao, i) => (
            <PersonListItem
              key={votacao.id}
              name={votacao.eleitor_nome}
              nrEleitor={votacao.nr_eleitor}
              nrMesa={votacao.nr_mesa}
              datetime={formatDate(votacao.datetime)}
              avatarClassName="bg-[#F0FDF4] border border-emerald-100"
              nameClassName="text-gray-600"
              delay={i * 0.02}
              actions={
                <button
                  onClick={() => setCancelId(votacao.id)}
                  className="p-1.5 md:px-6 md:py-3 rounded-md md:rounded-xl text-[#DC3545] bg-[#FFF5F5] border border-red-50 hover:bg-red-100 transition-all font-bold text-xs flex items-center gap-2 active:scale-95"
                >
                  <span className="inline">Anular</span>
                  <XCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              }
            />
          ))
        ) : (
          <EmptyState description="Nenhum voto registado." />
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

      <Modal open={!!cancelId && !!cancelingVote} onClose={() => !isCanceling && closeModal()}>
        <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Anular Voto</h3>
        <p className="text-gray-500 text-sm mb-6">
          Selecione o motivo para anular o voto de <strong>{cancelingVote?.eleitor_nome}</strong>.
        </p>
        <textarea
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          disabled={isCanceling}
          placeholder="Descreva o motivo..."
          rows={3}
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-600 outline-none focus:border-[#DC3545] resize-none transition-colors disabled:opacity-50"
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={closeModal}
            disabled={isCanceling}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-500 border border-gray-300 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleCancel}
            disabled={isCanceling || !motivo.trim()}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#DC3545] hover:bg-[#bb2d3b] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCanceling ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Anular'}
          </button>
        </div>
      </Modal>
    </motion.div>
  )
}
