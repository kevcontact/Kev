'use server'

import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import { moveItem, type Direction } from '@/lib/admin/reorder'
import { dbFail, fail, zodMessage, type ActionResult } from '@/lib/admin/result'
import { mediaInputSchema, type MediaInput } from '@/lib/content/validation'
import { persistOrder, publishChanges, removeFiles } from './shared'

/** Registra un archivo ya subido al bucket (el navegador sube directo; RLS lo autoriza). */
export async function addMedia(input: MediaInput): Promise<ActionResult> {
  const ctx = await requireAdmin()
  const parsed = mediaInputSchema.safeParse(input)
  if (!parsed.success) return fail(zodMessage(parsed.error))
  const m = parsed.data

  const { data: last } = await ctx.supabase
    .from('media')
    .select('position')
    .eq('project_id', m.projectId)
    .order('position', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { error } = await ctx.supabase.from('media').insert({
    project_id: m.projectId,
    type: m.type,
    path: m.path,
    poster_path: m.posterPath,
    width: m.width,
    height: m.height,
    duration: m.duration,
    position: (last?.position ?? -10) + 10,
  })
  if (error) {
    await removeFiles(ctx, [m.path, m.posterPath].filter((p): p is string => !!p))
    return dbFail('addMedia', error.message)
  }

  publishChanges()
  revalidatePath(`/admin/projects/${m.projectId}`)
  return { ok: true }
}

export async function deleteMedia(id: string, projectId: string): Promise<void> {
  const ctx = await requireAdmin()
  const { data, error } = await ctx.supabase
    .from('media')
    .delete()
    .eq('id', id)
    .select('path, poster_path')
    .single()
  if (error) throw new Error('No se pudo borrar el archivo.')

  await removeFiles(ctx, [data.path, data.poster_path].filter((p): p is string => !!p))
  publishChanges()
  revalidatePath(`/admin/projects/${projectId}`)
}

export async function moveMedia(id: string, projectId: string, dir: Direction): Promise<void> {
  const ctx = await requireAdmin()
  const { data, error } = await ctx.supabase
    .from('media')
    .select('id')
    .eq('project_id', projectId)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw new Error('No se pudo leer el orden.')

  const failed = await persistOrder(ctx, 'media', moveItem(data.map((r) => r.id), id, dir))
  if (failed) throw new Error('No se pudo reordenar.')
  publishChanges()
  revalidatePath(`/admin/projects/${projectId}`)
}
