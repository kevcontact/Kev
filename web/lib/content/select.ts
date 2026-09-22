import type { Project } from './types'

export const photoProjects = (ps: readonly Project[]): Project[] =>
  ps.filter((p) => p.kind === 'Photography')

/** Proyectos cuyo primer medio es video: los que viven en la pestaña Video. */
export const videoProjectsOf = (ps: readonly Project[]): Project[] =>
  ps.filter((p) => p.items[0]?.type === 'video')

export const musicVideos = (ps: readonly Project[]): Project[] =>
  videoProjectsOf(ps).filter((p) => p.kind === 'Video')

export const brandVideos = (ps: readonly Project[]): Project[] =>
  videoProjectsOf(ps).filter((p) => p.kind === 'Brand')

export const bySlug = (ps: readonly Project[], slug: string): Project | undefined =>
  ps.find((p) => p.slug === slug)

export const nextOf = (ps: readonly Project[], slug: string): Project | undefined => {
  if (ps.length === 0) return undefined
  const i = ps.findIndex((p) => p.slug === slug)
  return ps[(i + 1) % ps.length]
}
