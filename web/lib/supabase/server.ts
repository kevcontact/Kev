import 'server-only'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { KEV_SCHEMA, requireSupabaseEnv } from './env'

/** Cliente con la sesión del productor (cookies). Solo para /admin y server actions. */
export async function createSessionClient() {
  const { url, anonKey } = requireSupabaseEnv()
  const store = await cookies()
  return createServerClient(url, anonKey, {
    db: { schema: KEV_SCHEMA },
    cookies: {
      getAll: () => store.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options))
        } catch {
          // Llamado desde un Server Component: el proxy ya refresca la sesión.
        }
      },
    },
  })
}
