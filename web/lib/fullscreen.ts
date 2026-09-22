/**
 * Pantalla completa con los prefijos que todavía hacen falta.
 * Safari desktop expone `webkitRequestFullscreen`; iOS solo deja pasar a
 * fullscreen el propio <video> (`webkitEnterFullscreen`), nunca un contenedor,
 * y avisa de los cambios en el <video>, no en el document.
 */
type FullscreenBox = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void
}

type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void
  webkitExitFullscreen?: () => void
  webkitDisplayingFullscreen?: boolean
}

type FullscreenDoc = Document & {
  webkitFullscreenElement?: Element | null
  webkitExitFullscreen?: () => Promise<void> | void
}

/** El elemento que está en pantalla completa ahora mismo, si hay alguno. */
export function fullscreenElement(): Element | null {
  if (typeof document === 'undefined') return null
  const doc = document as FullscreenDoc
  return doc.fullscreenElement ?? doc.webkitFullscreenElement ?? null
}

/**
 * ¿Está `box` (o su <video>, en el camino nativo de iOS) en pantalla completa?
 * Se pregunta por elemento y no en global: la página monta varios players y
 * cada uno tiene que saber si el fullscreen es suyo.
 */
export function isElementFullscreen(
  box: HTMLElement | null,
  video: HTMLVideoElement | null,
): boolean {
  if (box && fullscreenElement() === box) return true
  return Boolean((video as FullscreenVideo | null)?.webkitDisplayingFullscreen)
}

/** Sale de pantalla completa. No falla si no había nada abierto. */
export function exitFullscreen(video?: HTMLVideoElement | null): void {
  if (typeof document === 'undefined') return
  const doc = document as FullscreenDoc
  const nativeVideo = video as FullscreenVideo | null

  try {
    if (nativeVideo?.webkitDisplayingFullscreen) nativeVideo.webkitExitFullscreen?.()
    else if (doc.exitFullscreen) void doc.exitFullscreen()
    else if (doc.webkitExitFullscreen) void doc.webkitExitFullscreen()
  } catch {
    /* el navegador ya cerró el fullscreen por su cuenta */
  }
}

/**
 * Pone `box` en pantalla completa; si el navegador no deja (iOS), cae al
 * fullscreen nativo del `video`.
 * @returns true si algún camino fue aceptado.
 */
export function requestFullscreen(
  box: HTMLElement | null,
  video: HTMLVideoElement | null,
): boolean {
  const target = box as FullscreenBox | null
  const nativeVideo = video as FullscreenVideo | null

  if (target?.requestFullscreen) {
    // el rechazo (gesto no confiable, permisos) cae al fallback de iOS
    target.requestFullscreen().catch(() => nativeVideo?.webkitEnterFullscreen?.())
    return true
  }

  if (target?.webkitRequestFullscreen) {
    void target.webkitRequestFullscreen()
    return true
  }

  if (nativeVideo?.webkitEnterFullscreen) {
    nativeVideo.webkitEnterFullscreen()
    return true
  }

  return false
}

/**
 * Suscribe a los cambios de fullscreen: los del document (estándar + webkit)
 * y los que iOS dispara en el propio <video>.
 * @returns la función de limpieza para el efecto que la registra.
 */
export function onFullscreenChange(
  listener: () => void,
  video?: HTMLVideoElement | null,
): () => void {
  if (typeof document === 'undefined') return () => {}

  document.addEventListener('fullscreenchange', listener)
  document.addEventListener('webkitfullscreenchange', listener)
  video?.addEventListener('webkitbeginfullscreen', listener)
  video?.addEventListener('webkitendfullscreen', listener)

  return () => {
    document.removeEventListener('fullscreenchange', listener)
    document.removeEventListener('webkitfullscreenchange', listener)
    video?.removeEventListener('webkitbeginfullscreen', listener)
    video?.removeEventListener('webkitendfullscreen', listener)
  }
}
