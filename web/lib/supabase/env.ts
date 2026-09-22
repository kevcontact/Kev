/** Configuración pública de Supabase. null = sin configurar (dev local → contenido estático). */
export type SupabaseEnv = { url: string; anonKey: string }

export const KEV_SCHEMA = 'kev'
export const MEDIA_BUCKET = 'kev-media'
/** Tag de caché de todo el contenido público; el panel lo invalida al guardar. */
export const CONTENT_TAG = 'kev-content'

export function supabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return url && anonKey ? { url, anonKey } : null
}

export function requireSupabaseEnv(): SupabaseEnv {
  const env = supabaseEnv()
  if (!env) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY (ver web/.env.example)',
    )
  }
  return env
}
