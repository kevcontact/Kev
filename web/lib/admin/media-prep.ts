/**
 * Preparación de medios en el navegador antes de subir (sin servidor intermedio):
 *  · fotos → JPEG, lado largo máx. 2560 px (la web no necesita más; ~10× menos peso)
 *  · videos → solo MP4 ≤ 50 MB (límite del bucket); se extrae póster y metadatos.
 * Transcodificar video en el navegador no es viable: el productor debe exportar
 * H.264 720p/1080p (ver docs del panel).
 */
export const MAX_IMAGE_EDGE = 2560
export const POSTER_EDGE = 1280
export const JPEG_QUALITY = 0.86
export const MAX_VIDEO_BYTES = 50 * 1024 * 1024
export const MAX_IMAGE_INPUT_BYTES = 60 * 1024 * 1024

export type PreparedImage = { kind: 'image'; blob: Blob; width: number; height: number }
export type PreparedVideo = {
  kind: 'video'
  file: File
  poster: Blob
  width: number
  height: number
  duration: number
}

export const fitWithin = (w: number, h: number, max: number) => {
  const scale = Math.min(1, max / Math.max(w, h))
  return { width: Math.round(w * scale), height: Math.round(h * scale) }
}

const canvasToJpeg = (canvas: HTMLCanvasElement): Promise<Blob> =>
  new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('No se pudo codificar la imagen'))),
      'image/jpeg',
      JPEG_QUALITY,
    ),
  )

const draw = (source: CanvasImageSource, w: number, h: number, max: number) => {
  const size = fitWithin(w, h, max)
  const canvas = document.createElement('canvas')
  canvas.width = size.width
  canvas.height = size.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas no disponible en este navegador')
  ctx.drawImage(source, 0, 0, size.width, size.height)
  return { canvas, ...size }
}

export async function prepareImage(file: File): Promise<PreparedImage> {
  if (file.size > MAX_IMAGE_INPUT_BYTES) throw new Error('Foto demasiado pesada (máx. 60 MB)')
  // respeta la orientación EXIF de fotos de cámara/teléfono
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  try {
    const { canvas, width, height } = draw(bitmap, bitmap.width, bitmap.height, MAX_IMAGE_EDGE)
    return { kind: 'image', blob: await canvasToJpeg(canvas), width, height }
  } finally {
    bitmap.close()
  }
}

const once = (el: HTMLVideoElement, event: string) =>
  new Promise<void>((resolve, reject) => {
    el.addEventListener(event, () => resolve(), { once: true })
    el.addEventListener('error', () => reject(new Error('No se pudo leer el video')), { once: true })
  })

export async function prepareVideo(file: File): Promise<PreparedVideo> {
  if (file.type !== 'video/mp4') throw new Error('Solo MP4 (H.264)')
  if (file.size > MAX_VIDEO_BYTES) throw new Error('Video de más de 50 MB: expórtalo en 720p/1080p')

  const url = URL.createObjectURL(file)
  const video = document.createElement('video')
  video.muted = true
  video.playsInline = true
  video.preload = 'auto'
  video.src = url
  try {
    await once(video, 'loadedmetadata')
    const { videoWidth: w, videoHeight: h, duration } = video
    if (!w || !h) throw new Error('El navegador no puede decodificar este MP4 (usa H.264)')
    video.currentTime = Math.min(1, duration / 2)
    await once(video, 'seeked')
    const { canvas } = draw(video, w, h, POSTER_EDGE)
    return { kind: 'video', file, poster: await canvasToJpeg(canvas), width: w, height: h, duration }
  } finally {
    URL.revokeObjectURL(url)
    video.removeAttribute('src')
  }
}
