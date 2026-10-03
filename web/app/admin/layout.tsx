import type { Metadata } from 'next'
import './admin.css'

// el panel depende de la sesión: nunca se prerenderiza
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'KEV · Panel',
  robots: { index: false, follow: false },
}

export default function AdminRoot({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="adm">{children}</div>
}
