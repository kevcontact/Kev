import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectView } from '@/components/ProjectView'
import { getProjects } from '@/lib/content/repository'
import { bySlug, nextOf } from '@/lib/content/select'

// proyectos nuevos creados en /admin se renderizan bajo demanda
export const dynamicParams = true

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = bySlug(await getProjects(), slug)
  return { title: project ? `${project.title} — KEV` : 'KEV' }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const projects = await getProjects()
  const project = bySlug(projects, slug)
  if (!project) notFound()

  return <ProjectView project={project} next={nextOf(projects, slug)!} />
}
