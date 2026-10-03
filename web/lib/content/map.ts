import { z } from 'zod'
import { contactLinkSchema } from './validation'
import { PROJECT_KINDS, type MediaItem, type Project, type SiteSettings } from './types'

/** Filas de Supabase: datos externos, se validan antes de usarse. */
const mediaRowSchema = z.object({
  type: z.enum(['image', 'video']),
  path: z.string().min(1),
  poster_path: z.string().nullable(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  duration: z.union([z.number(), z.string()]).nullable(),
  position: z.number().int(),
})

const projectRowSchema = z.object({
  slug: z.string().min(1),
  title: z.string(),
  client: z.string(),
  year: z.string().nullable(),
  kind: z.enum(PROJECT_KINDS),
  blurb: z.string().nullable(),
  position: z.number().int(),
  media: z.array(mediaRowSchema),
})

type MediaRow = z.infer<typeof mediaRowSchema>

const byPosition = <T extends { position: number }>(a: T, b: T) => a.position - b.position

const toMediaItem = (m: MediaRow): MediaItem => {
  const duration = m.duration === null ? undefined : Number(m.duration)
  return {
    src: m.path,
    type: m.type,
    poster: m.poster_path ?? undefined,
    w: m.width,
    h: m.height,
    duration: Number.isFinite(duration) ? duration : undefined,
  }
}

/** Filas → proyectos renderizables. Ignora filas inválidas o sin medios (sin lanzar). */
export function mapProjects(rows: readonly unknown[]): Project[] {
  return rows
    .map((r) => projectRowSchema.safeParse(r))
    .flatMap((r) => (r.success ? [r.data] : []))
    .filter((r) => r.media.length > 0)
    .toSorted(byPosition)
    .map((r) => {
      const items = r.media.toSorted(byPosition).map(toMediaItem)
      return {
        slug: r.slug,
        title: r.title,
        client: r.client,
        year: r.year ?? '',
        kind: r.kind,
        blurb: r.blurb ?? undefined,
        cover: items[0],
        items,
      }
    })
}

const settingsRowSchema = z.object({
  bio: z.string(),
  clients: z.array(z.string()),
  services: z.array(z.string()),
  contact: z.array(z.unknown()),
  home_project_slug: z.string().nullable(),
})

export const EMPTY_SETTINGS: SiteSettings = {
  bio: '',
  clients: [],
  services: [],
  contact: [],
  homeProjectSlug: null,
}

export function mapSettings(row: unknown): SiteSettings {
  const parsed = settingsRowSchema.safeParse(row)
  if (!parsed.success) return EMPTY_SETTINGS
  const s = parsed.data
  return {
    bio: s.bio,
    clients: s.clients,
    services: s.services,
    contact: s.contact
      .map((c) => contactLinkSchema.safeParse(c))
      .flatMap((c) => (c.success ? [c.data] : [])),
    homeProjectSlug: s.home_project_slug,
  }
}
