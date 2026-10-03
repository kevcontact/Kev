import type { Metadata } from 'next'
import { WorkIndex } from '@/components/WorkIndex'
import { getProjects } from '@/lib/content/repository'
import { photoProjects } from '@/lib/content/select'

export const metadata: Metadata = { title: 'Photography — KEV' }

/** Photography — photo projects only. */
export default async function PhotographyPage() {
  return <WorkIndex title="Photography" items={photoProjects(await getProjects())} />
}
