/**
 * Media URL layer.
 * Local dev  → /media/* (symlink public/media → PORTAFOLIO/web)
 * Producción → set NEXT_PUBLIC_MEDIA_BASE to the Supabase public bucket URL, e.g.
 *   NEXT_PUBLIC_MEDIA_BASE=https://<project>.supabase.co/storage/v1/object/public/portfolio
 * Paths in data.ts stay identical — only the base changes.
 */
export const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_BASE ?? '/media'

export const mediaUrl = (path: string): string => `${MEDIA_BASE}/${path}`
