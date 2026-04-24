"use server";

import { revalidatePath } from "next/cache";
import { registerVote, unregisterVote } from "@/services/votacoes.service";
import { markNaoVaiVotar } from "@/services/eleitores.service";

export async function registerVoteAction(
  nrEleitor: number,
  nrMesa: string,
  eleitorId: number,
  anulado: boolean = false,
  motivo_n_votou?: string,
): Promise<{ error?: string }> {
  const result = await registerVote({
    nr_eleitor: nrEleitor,
    nr_mesa: nrMesa,
    eleitor_id: eleitorId,
    anulado,
    motivo_n_votou,
  });
  if (result.error) return { error: result.error };

  revalidatePath("/dashboard");
  return {};
}

export async function unregisterVoteAction(
  nrEleitor: number,
  nrMesa: string,
  motivo: string,
  votacaoId?: number,
): Promise<{ error?: string }> {
  const result = await unregisterVote({
    nr_eleitor: nrEleitor,
    nr_mesa: nrMesa,
    motivo,
    votacao_id: votacaoId,
  });

  if (result.error) return { error: result.error };

  revalidatePath("/dashboard");
  revalidatePath("/votacao");
  return {};
}

export async function markNaoVaiVotarAction(
  eleitorId: number,
  motivo: 'ausente' | 'indeciso',
): Promise<{ error?: string }> {
  const result = await markNaoVaiVotar(eleitorId, { [motivo]: true });
  if (result.error) return { error: result.error };

  revalidatePath("/dashboard");
  return {};
}
