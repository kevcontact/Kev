export type Direction = 'up' | 'down'

/** Devuelve una lista nueva con `id` desplazado una posición. */
export function moveItem(ids: readonly string[], id: string, dir: Direction): string[] {
  const i = ids.indexOf(id)
  const j = dir === 'up' ? i - 1 : i + 1
  if (i < 0 || j < 0 || j >= ids.length) return [...ids]
  return ids.map((x, k) => (k === i ? ids[j] : k === j ? ids[i] : x))
}

/** Posiciones espaciadas (0, 10, 20…) para dejar hueco a inserciones. */
export const positionsFor = (ids: readonly string[]) =>
  ids.map((id, i) => ({ id, position: i * 10 }))
