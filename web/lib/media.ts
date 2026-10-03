/**
 * Media URL layer.
 * Local dev  → /media/* (symlink public/media → PORTAFOLIO/web)
 * Producción → bucket público `kev-media` derivado de NEXT_PUBLIC_SUPABASE_URL
 *   (NEXT_PUBLIC_MEDIA_BASE lo sobrescribe si hace falta).
 * Paths in data.ts stay identical — only the base changes.
 */
const supabaseMediaBase = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/kev-media`
  : undefined

export const MEDIA_BASE =
  process.env.NEXT_PUBLIC_MEDIA_BASE ?? supabaseMediaBase ?? '/media'

/** Encode each segment — defends against future filenames with spaces/#/?/% */
export const mediaUrl = (path: string): string =>
  `${MEDIA_BASE}/${path.split('/').map(encodeURIComponent).join('/')}`
