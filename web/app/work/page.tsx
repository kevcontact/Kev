import type { Metadata } from 'next'
import { WorkIndex } from '@/components/WorkIndex'
import { projects } from '@/lib/data'

export const metadata: Metadata = { title: 'Overview — KEV' }

/** Overview — every project, all kinds. */
export default function WorkPage() {
  return <WorkIndex title="Overview" items={projects} />
}
