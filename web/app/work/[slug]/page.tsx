import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectView } from '@/components/ProjectView'
import { nextProject, projectBySlug, projects } from '@/lib/data'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = projectBySlug(slug)
  return { title: project ? `${project.title} — KEV` : 'KEV' }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projectBySlug(slug)
  if (!project) notFound()

  return <ProjectView project={project} next={nextProject(slug)} />
}
