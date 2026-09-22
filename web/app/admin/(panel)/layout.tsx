import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/auth'
import { signOut } from '../actions/session'

/** Todo lo que cuelga de aquí exige ser admin de KEV. */
export default async function PanelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { email } = await requireAdmin()
  return (
    <>
      <header className="adm-top">
        <Link href="/admin" className="adm-brand">KEV · Panel</Link>
        <nav className="adm-nav">
          <Link href="/admin">Proyectos</Link>
          <Link href="/admin/settings">Información</Link>
          <a href="/" target="_blank" rel="noreferrer">Ver sitio ↗</a>
        </nav>
        <form action={signOut} className="adm-who">
          <span>{email}</span>
          <button type="submit" className="adm-btn adm-btn--ghost">Salir</button>
        </form>
      </header>
      <main className="adm-main">{children}</main>
    </>
  )
}
