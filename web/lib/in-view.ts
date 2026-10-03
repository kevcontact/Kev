/**
 * Visibilidad de los players para el scroll.
 *
 * Un clip "está a la vista" cuando se ve al menos la mitad de él o, si es más
 * alto que la pantalla (9:16 a todo el ancho), cuando llena media pantalla.
 * Así al bajar el de arriba para antes de que el de abajo arranque.
 */
const SHARE = 0.5
/** Umbrales cada 10 %: el observer avisa en cada paso del scroll, no solo al entrar/salir. */
const THRESHOLDS = Array.from({ length: 11 }, (_, i) => i / 10)

/** Regla pura: alto visible frente al alto del clip y al de la pantalla. */
export function isInView(visibleH: number, elementH: number, viewportH: number): boolean {
  if (visibleH <= 0 || elementH <= 0) return false
  return visibleH >= Math.min(elementH, viewportH) * SHARE
}

/**
 * Avisa cada vez que `el` entra o sale de la vista.
 * @returns la función de limpieza para el efecto que la registra.
 */
export function onViewChange(el: Element, onChange: (inView: boolean) => void): () => void {
  if (typeof IntersectionObserver === 'undefined') return () => {}

  let last: boolean | null = null
  const io = new IntersectionObserver(
    ([entry]) => {
      const now = isInView(
        entry.intersectionRect.height,
        entry.boundingClientRect.height,
        entry.rootBounds?.height ?? window.innerHeight,
      )
      if (now === last) return
      last = now
      onChange(now)
    },
    { threshold: THRESHOLDS },
  )
  io.observe(el)
  return () => io.disconnect()
}
