import type { Metadata } from 'next'
import { WorkIndex } from '@/components/WorkIndex'
import { getProjects } from '@/lib/content/repository'

export const metadata: Metadata = { title: 'Overview — KEV' }

/** Overview — every project, all kinds. */
export default async function WorkPage() {
  return <WorkIndex title="Overview" items={await getProjects()} />
}
