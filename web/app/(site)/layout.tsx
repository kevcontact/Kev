import { AppShell } from '@/components/AppShell'

/** Chrome del sitio público (cursor, header, menú). /admin no lo hereda. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>
}
