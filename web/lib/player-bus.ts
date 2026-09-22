/**
 * Audio exclusivo entre los players de /video.
 *
 * Los clips arrancan en autoplay muted, así que el conflicto no es el play:
 * es el sonido. Cuando un player toma el audio anuncia su id por el bus y
 * los demás se callan y paran. Sin estado compartido mutable: el evento
 * es el único canal.
 */
const SOLO_EVENT = 'kev:player-solo'

export type SoloDetail = { readonly id: string }

/** Anuncia que `id` toma el audio. Los demás players deben silenciarse. */
export function claimAudio(id: string): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<SoloDetail>(SOLO_EVENT, { detail: { id } }))
}

/**
 * Escucha reclamos de audio ajenos.
 * @returns la función de limpieza para el efecto que la registra.
 */
export function onAudioTaken(selfId: string, onLose: () => void): () => void {
  if (typeof window === 'undefined') return () => {}

  const handler = (event: Event) => {
    const detail = (event as CustomEvent<SoloDetail>).detail
    if (detail?.id && detail.id !== selfId) onLose()
  }

  window.addEventListener(SOLO_EVENT, handler)
  return () => window.removeEventListener(SOLO_EVENT, handler)
}
