import 'server-only'
import { createClient } from '@supabase/supabase-js'
import { CONTENT_TAG, KEV_SCHEMA, type SupabaseEnv } from './env'

/** Revalidación de respaldo; el panel invalida al instante vía CONTENT_TAG. */
const CONTENT_REVALIDATE_SECONDS = 3600

/** Cliente anónimo para el sitio público: sin sesión y con fetch cacheado por tag. */
export const createPublicClient = ({ url, anonKey }: SupabaseEnv) =>
  createClient(url, anonKey, {
    db: { schema: KEV_SCHEMA },
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, {
          ...init,
          next: { revalidate: CONTENT_REVALIDATE_SECONDS, tags: [CONTENT_TAG] },
        }),
    },
  })
