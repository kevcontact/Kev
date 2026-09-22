/** Tipos de contenido del sitio público (independientes de la fuente: Supabase o estático). */
export type MediaItem = {
  src: string
  type: 'image' | 'video'
  poster?: string
  w: number
  h: number
  /** seconds — videos only */
  duration?: number
}

export const PROJECT_KINDS = ['Photography', 'Video', 'Brand'] as const
export type ProjectKind = (typeof PROJECT_KINDS)[number]

export type Project = {
  slug: string
  title: string
  client: string
  year: string
  kind: ProjectKind
  blurb?: string
  /** index hover preview + cover */
  cover: MediaItem
  items: MediaItem[]
}

/** Un contacto de la pestaña Information: se renderiza como enlace directo. */
export type ContactLink = {
  label: string
  /** lo que se lee en pantalla */
  value: string
  /** destino real: mailto: para correo, URL https para redes */
  href: string
}

export type SiteSettings = {
  bio: string
  clients: string[]
  services: string[]
  contact: ContactLink[]
  homeProjectSlug: string | null
}
