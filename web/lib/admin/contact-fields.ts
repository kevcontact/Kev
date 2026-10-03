/**
 * Contacto del panel en lenguaje del productor: un campo "Correo" y uno "Instagram".
 * Aquí se traducen a los enlaces que guarda kev.site_settings.contact (mailto:/https).
 */
import { instagramOf } from '@/lib/content/contact'
import type { ContactLink } from '@/lib/content/types'

export type ContactFields = { email: string; instagram: string; others: readonly ContactLink[] }
export type BuildResult = { ok: true; contact: ContactLink[] } | { ok: false; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// usuario de Instagram: letras, números, punto y guion bajo (máx. 30)
const HANDLE_RE = /^[A-Za-z0-9._]{1,30}$/
const IG_URL_RE = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([^/?#]+)/i

/** "@kev", "kev", "instagram.com/kev" o la URL completa → "kev"; null si no es un usuario válido. */
function handleOf(raw: string): string | null {
  const fromUrl = raw.match(IG_URL_RE)?.[1]
  const handle = fromUrl ?? raw.replace(/^@/, '')
  if (!fromUrl && raw.includes('/')) return null // URL de otro sitio
  return HANDLE_RE.test(handle) ? handle : null
}

export function buildContact({ email, instagram, others }: ContactFields): BuildResult {
  const mail = email.trim()
  const ig = instagram.trim()
  const links: ContactLink[] = []

  if (mail) {
    if (!EMAIL_RE.test(mail)) return { ok: false, error: 'El correo no es válido (ej.: hola@kevfilm.com).' }
    links.push({ label: 'Email', value: mail, href: `mailto:${mail}` })
  }
  if (ig) {
    const handle = handleOf(ig)
    if (!handle) return { ok: false, error: 'Instagram: escribe el usuario (ej.: @kevfilm) o el enlace de instagram.com.' }
    links.push({ label: 'Instagram', value: `@${handle}`, href: `https://www.instagram.com/${handle}/` })
  }
  return { ok: true, contact: [...links, ...others] }
}

/** Inverso de buildContact: lo guardado → campos del formulario. */
export function splitContact(contact: readonly ContactLink[]): ContactFields & { others: ContactLink[] } {
  const mail = contact.find((c) => c.href.startsWith('mailto:'))
  const ig = instagramOf(contact)
  const handle = ig ? handleOf(ig.href) : null
  return {
    email: mail ? mail.href.slice('mailto:'.length) : '',
    instagram: handle ? `@${handle}` : '',
    others: contact.filter((c) => c !== mail && c !== ig),
  }
}
