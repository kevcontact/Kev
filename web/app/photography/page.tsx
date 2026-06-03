import type { Metadata } from 'next'
import { WorkIndex } from '@/components/WorkIndex'
import { projects } from '@/lib/data'

export const metadata: Metadata = { title: 'Photography — KEV' }

/** Photography — photo projects only. */
export default function PhotographyPage() {
  const items = projects.filter((p) => p.kind === 'Photography')
  return <WorkIndex title="Photography" items={items} />
}
