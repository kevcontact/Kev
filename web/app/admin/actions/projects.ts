'use server'

import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin/auth'
import { str } from '@/lib/admin/form'
import { moveItem, type Direction } from '@/lib/admin/reorder'
import { dbFail, fail, zodMessage, type ActionResult } from '@/lib/admin/result'
import { projectInputSchema } from '@/lib/content/validation'
import { persistOrder, publishChanges, removeFiles } from './shared'

const parseProjectForm = (fd: FormData) =>
  projectInputSchema.safeParse({
    title: str(fd, 'title'),
    slug: str(fd, 'slug'),
    client: str(fd, 'client'),
    year: str(fd, 'year'),
    kind: str(fd, 'kind'),
    blurb: str(fd, 'blurb'),
    published: fd.get('published') === 'on',
  })

export async function createProject(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  const ctx = await requireAdmin()
  const parsed = parseProjectForm(fd)
  if (!parsed.success) return fail(zodMessage(parsed.error))

  // nuevo proyecto al principio de la lista
  const { data: first } = await ctx.supabase
    .from('projects')
    .select('position')
    .order('position', { ascending: true })
    .limit(1)
    .maybeSingle()

  const { data, error } = await ctx.supabase
    .from('projects')
    .insert({ ...parsed.data, position: (first?.position ?? 0) - 10 })
    .select('id')
    .single()
  if (error) return dbFail('createProject', error.message)

  publishChanges()
  redirect(`/admin/projects/${data.id}`)
}

export async function updateProject(
  id: string,
  _: ActionResult | null,
  fd: FormData,
): Promise<ActionResult> {
  const ctx = await requireAdmin()
  const parsed = parseProjectForm(fd)
  if (!parsed.success) return fail(zodMessage(parsed.error))

  const { error } = await ctx.supabase.from('projects').update(parsed.data).eq('id', id)
  if (error) return dbFail('updateProject', error.message)

  publishChanges()
  return { ok: true, message: 'Guardado.' }
}

export async function deleteProject(id: string): Promise<void> {
  const ctx = await requireAdmin()
  const { data: media } = await ctx.supabase
    .from('media')
    .select('path, poster_path')
    .eq('project_id', id)

  const { error } = await ctx.supabase.from('projects').delete().eq('id', id)
  if (error) {
    console.error(`[kev-admin] deleteProject: ${error.message}`)
    throw new Error('No se pudo borrar el proyecto.')
  }
  await removeFiles(
    ctx,
    (media ?? []).flatMap((m) => [m.path, m.poster_path].filter((p): p is string => !!p)),
  )
  publishChanges()
  redirect('/admin')
}

export async function moveProject(id: string, dir: Direction): Promise<void> {
  const ctx = await requireAdmin()
  const { data, error } = await ctx.supabase
    .from('projects')
    .select('id')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw new Error('No se pudo leer el orden.')

  const failed = await persistOrder(ctx, 'projects', moveItem(data.map((r) => r.id), id, dir))
  if (failed) throw new Error('No se pudo reordenar.')
  publishChanges()
}

export async function setPublished(id: string, published: boolean): Promise<void> {
  const ctx = await requireAdmin()
  const { error } = await ctx.supabase.from('projects').update({ published }).eq('id', id)
  if (error) throw new Error('No se pudo cambiar la visibilidad.')
  publishChanges()
}
