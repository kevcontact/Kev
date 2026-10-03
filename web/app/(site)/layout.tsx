import { AppShell } from '@/components/AppShell'
import { instagramOf } from '@/lib/content/contact'
import { getSettings } from '@/lib/content/repository'

/** Chrome del sitio público (cursor, header, menú). /admin no lo hereda. */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell instagram={await headerInstagram()}>{children}</AppShell>
}

/** El botón de Instagram es accesorio: si los ajustes fallan, el sitio sigue sin él. */
async function headerInstagram(): Promise<string | null> {
  try {
    return instagramOf((await getSettings()).contact)?.href ?? null
  } catch (error: unknown) {
    console.error('header: no se pudo leer el Instagram de kev.site_settings', error)
    return null
  }
}
