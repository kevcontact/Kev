import 'server-only'
import { updateTag } from 'next/cache'
import { CONTENT_TAG, MEDIA_BUCKET } from '@/lib/supabase/env'
import { positionsFor } from '@/lib/admin/reorder'
import type { AdminContext } from '@/lib/admin/auth'

/** El sitio público muestra el cambio en la siguiente visita. */
export const publishChanges = () => updateTag(CONTENT_TAG)

/** Reescribe posiciones de una lista ya ordenada; falla si alguna actualización falla. */
export async function persistOrder(
  { supabase }: AdminContext,
  table: 'projects' | 'media',
  ids: readonly string[],
): Promise<string | null> {
  const results = await Promise.all(
    positionsFor(ids).map(({ id, position }) =>
      supabase.from(table).update({ position }).eq('id', id),
    ),
  )
  return results.find((r) => r.error)?.error?.message ?? null
}

/** Borra archivos del bucket. Un fallo aquí deja huérfanos, no rompe el sitio: se registra. */
export async function removeFiles({ supabase }: AdminContext, paths: readonly string[]) {
  if (paths.length === 0) return
  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove([...paths])
  if (error) console.error(`[kev-admin] storage.remove: ${error.message}`, paths)
}
