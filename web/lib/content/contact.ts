import type { ContactLink } from './types'

const INSTAGRAM_HOSTS = new Set(['instagram.com', 'www.instagram.com'])

/** El Instagram del contacto (lo carga el productor en /admin/settings), o null si no hay. */
export function instagramOf(contact: readonly ContactLink[]): ContactLink | null {
  return (
    contact.find((c) => {
      try {
        return INSTAGRAM_HOSTS.has(new URL(c.href).hostname)
      } catch {
        return false // href que no es URL: no es un Instagram
      }
    }) ?? null
  )
}
