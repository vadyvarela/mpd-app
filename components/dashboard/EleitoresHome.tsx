"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, CheckCircle2, XCircle, ChevronRight, Loader2, BoxIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { EleitoresListResponse } from "@/services/eleitores.service";
import { registerVoteAction, markNaoVaiVotarAction } from "@/actions/votacoes";
import Modal from "@/components/dashboard/Modal";
import PersonListItem from "@/components/dashboard/PersonListItem";
import EmptyState from "@/components/dashboard/EmptyState";
import Pagination from "@/components/dashboard/Pagination";
import { PAGE_SIZE } from "@/config/constants";

export default function EleitoresHome({
  data,
  defaultSearch = "",
  currentPage = 1,
}: {
  data: EleitoresListResponse;
  defaultSearch?: string;
  currentPage?: number;
}) {
  const eleitores = data.results;
  const totalPages = Math.ceil(data.count / PAGE_SIZE);
  const router = useRouter();
  const [search, setSearch] = useState(defaultSearch);
  const [, startSearchTransition] = useTransition();
  const [isVoting, startVoteTransition] = useTransition();
  const [loadingMotivo, setLoadingMotivo] = useState<'ausente' | 'indeciso' | null>(null);
  const [selectedMesa, setSelectedMesa] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [notVoteId, setNotVoteId] = useState<number | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleSearch(value: string) {
    setSearch(value);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value) params.set("search", value);
      startSearchTransition(() => router.replace(`/dashboard?${params}`));
    }, 300);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams();
    params.set("page", String(page));
    if (search) params.set("search", search);
    router.push(`/dashboard?${params}`);
  }

  const mesas = [...new Set(eleitores.map((e) => e.nr_mesa))].sort();

  const pending = eleitores.filter((e) => {
    if (e.descarga) return false;
    if (selectedMesa && e.nr_mesa !== selectedMesa) return false;
    return true;
  });

  const confirmingVoter = eleitores.find((e) => e.id === confirmId);
  const notVotingVoter = eleitores.find((e) => e.id === notVoteId);

  function handleConfirmVote() {
    if (!confirmingVoter) return;
    startVoteTransition(async () => {
      try {
        const result = await registerVoteAction(
          confirmingVoter.nr_eleitor,
          confirmingVoter.nr_mesa,
          confirmingVoter.id,
          false,
          "",
        );
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success("Voto registado com sucesso.");
          setConfirmId(null);
        }
      } catch {
        toast.error("Erro ao registar voto.");
      }
    });
  }

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
            <h2 className="font-display font-bold text-xl md:text-3xl text-gray-900 mb-0.5">
              Pendentes
            </h2>
            <p className="text-gray-500 text-[10px] md:text-sm">
              Aguardando confirmação de presença na votação.
            </p>
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

        {mesas.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
            {mesas.map((mesa) => (
              <button
                key={mesa}
                onClick={() => setSelectedMesa(selectedMesa === mesa ? null : mesa)}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] md:text-xs font-bold transition-all",
                  selectedMesa === mesa
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-300 hover:bg-[#F8F9FA]",
                )}
              >
                {mesa}
              </button>
            ))}
          </div>
        )}

       
      </header>

      <div className="grid grid-cols-1 gap-2 md:gap-3 lg:gap-4">
        {pending.length > 0 ? (
          pending.map((eleitor, i) => (
            <PersonListItem
              key={eleitor.id}
              name={eleitor.nome}
              nrEleitor={eleitor.nr_eleitor}
              nrMesa={eleitor.nr_mesa}
              avatarClassName="bg-[#F0FDF4] border border-emerald-100"
              delay={i * 0.03}
              actions={
                <div className="flex items-center gap-1 md:gap-3">
                  <button
                    onClick={() => setConfirmId(eleitor.id)}
                    className="bg-primary text-white px-2.5 md:px-8 py-1.5 md:py-3 rounded-md md:rounded-xl text-[10px] md:text-sm font-bold shadow-sm hover:bg-[#15803d] flex items-center justify-center min-w-12.5 md:min-w-30 transition-all active:scale-95"
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
              }
            />
          ))
        ) : (
          <EmptyState
            icon={<BoxIcon className="w-8 h-8 text-primary" />}
            title="Nenhum eleitor encontrado"
            description="Tente ajustar os filtros ou verifique se os eleitores estão cadastrados corretamente."
          />
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} />

      <Modal open={!!confirmId && !!confirmingVoter} onClose={() => setConfirmId(null)} topBar>
        <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-display font-bold text-gray-900 text-center mb-2">
          Confirmar Votação?
        </h3>
        <p className="text-gray-500 text-center text-sm mb-8">
          Confirmar que <strong>{confirmingVoter?.nome}</strong> votou.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setConfirmId(null)}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-500 border border-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmVote}
            disabled={isVoting}
            className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-primary hover:bg-[#15803d] flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isVoting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmar"}
          </button>
        </div>
      </Modal>

      <Modal open={!!notVoteId && !!notVotingVoter} onClose={() => !loadingMotivo && setNotVoteId(null)}>
        <h3 className="text-xl font-display font-bold text-gray-900 mb-2">Motivo da Ausência</h3>
        <p className="text-gray-500 text-sm mb-6">
          Selecione o motivo pelo qual <strong>{notVotingVoter?.nome}</strong> não votou.
        </p>
        <div className="space-y-2">
          {([
            { label: 'Ausente', motivo: 'ausente' as const },
            { label: 'Indeciso', motivo: 'indeciso' as const },
          ]).map(({ label, motivo }) => (
            <button
              key={motivo}
              disabled={!!loadingMotivo}
              onClick={async () => {
                if (!notVotingVoter) return
                setLoadingMotivo(motivo)
                const result = await markNaoVaiVotarAction(notVotingVoter.id, motivo)
                setLoadingMotivo(null)
                if (result.error) {
                  toast.error(result.error)
                } else {
                  toast.success(`${notVotingVoter.nome} marcado como ${label.toLowerCase()}.`)
                  setNotVoteId(null)
                }
              }}
              className="w-full text-left px-5 py-4 text-gray-700 rounded-2xl border border-gray-400 hover:border-primary hover:bg-[#F0FDF4] hover:text-primary font-bold text-sm transition-all group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMotivo === motivo ? <Loader2 className="w-4 h-4 animate-spin" /> : label}
              <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
            </button>
          ))}
        </div>
        <button
          onClick={() => setNotVoteId(null)}
          disabled={!!loadingMotivo}
          className="w-full mt-6 py-3 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          Cancelar
        </button>
      </Modal>
    </motion.div>
  );
}
