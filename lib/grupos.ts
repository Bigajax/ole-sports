/**
 * As portas que juntam categorias. A Olé tem sete modalidades diretas,
 * nenhuma agrupada: o mapa fica vazio até precisar.
 */
export const GRUPOS: Record<string, { nome: string; categorias: string[] }> = {};

export function categoriasDoGrupo(slug: string): string[] | null {
  return GRUPOS[slug]?.categorias ?? null;
}
