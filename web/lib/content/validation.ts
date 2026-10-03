import { z } from 'zod'
import { PROJECT_KINDS } from './types'

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const slugify = (s: string): string =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** '' → null, para campos opcionales que llegan de formularios. */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((v) => (v === '' ? null : v))

export const projectInputSchema = z.object({
  title: z.string().trim().min(1, 'El título es obligatorio').max(120),
  slug: z.string().trim().regex(SLUG_RE, 'Slug: minúsculas, números y guiones').max(80),
  client: z.string().trim().max(120).default(''),
  year: optionalText(4).refine((v) => v === null || /^\d{4}$/.test(v), 'Año de 4 dígitos'),
  kind: z.enum(PROJECT_KINDS),
  blurb: optionalText(2000),
  published: z.boolean(),
})
export type ProjectInput = z.infer<typeof projectInputSchema>

const isSafeHref = (href: string): boolean => {
  if (href.startsWith('mailto:')) return EMAIL_RE.test(href.slice('mailto:'.length))
  try {
    return new URL(href).protocol === 'https:'
  } catch {
    return false
  }
}

export const contactLinkSchema = z.object({
  label: z.string().trim().min(1).max(40),
  value: z.string().trim().min(1).max(120),
  href: z.string().trim().max(300).refine(isSafeHref, 'Usa mailto:correo o una URL https://'),
})

export const settingsInputSchema = z.object({
  bio: z.string().trim().max(2000),
  clients: z.array(z.string().trim().min(1).max(80)).max(60),
  services: z.array(z.string().trim().min(1).max(80)).max(30),
  contact: z.array(contactLinkSchema).max(10),
  homeProjectSlug: z.string().regex(SLUG_RE).nullable(),
})
export type SettingsInput = z.infer<typeof settingsInputSchema>

/** Rutas subidas desde el panel: siempre bajo projects/, sin traversal. */
const uploadPath = z
  .string()
  .max(512)
  .regex(/^projects\/[a-z0-9-]+\/[a-z0-9._-]+$/, 'Ruta de archivo inválida')
  .refine((p) => !p.includes('..'), 'Ruta de archivo inválida')

export const mediaInputSchema = z.object({
  projectId: z.uuid(),
  type: z.enum(['image', 'video']),
  path: uploadPath,
  posterPath: uploadPath.nullable(),
  width: z.number().int().positive().max(20000),
  height: z.number().int().positive().max(20000),
  duration: z.number().nonnegative().max(36000).nullable(),
})
export type MediaInput = z.infer<typeof mediaInputSchema>

/** projects/<slug>/<id>-<nombre-normalizado>.<ext> */
export const storagePathFor = (projectSlug: string, fileName: string, id: string): string => {
  const dot = fileName.lastIndexOf('.')
  const base = dot > 0 ? fileName.slice(0, dot) : fileName
  const ext = dot > 0 ? fileName.slice(dot + 1).toLowerCase() : 'bin'
  return `projects/${projectSlug}/${id}-${slugify(base) || 'file'}.${ext.replace(/[^a-z0-9]/g, '')}`
}
