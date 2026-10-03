'use server'

import { requireAdmin } from '@/lib/admin/auth'
import { buildContact } from '@/lib/admin/contact-fields'
import { lines, str } from '@/lib/admin/form'
import { dbFail, fail, zodMessage, type ActionResult } from '@/lib/admin/result'
import { settingsInputSchema } from '@/lib/content/validation'
import { publishChanges } from './shared'

const MAX_CONTACTS = 10

/** Otros enlaces (contact_label_0, contact_value_0, contact_href_0…); correo e Instagram van aparte. */
const contactRows = (fd: FormData) =>
  Array.from({ length: MAX_CONTACTS }, (_, i) => ({
    label: str(fd, `contact_label_${i}`).trim(),
    value: str(fd, `contact_value_${i}`).trim(),
    href: str(fd, `contact_href_${i}`).trim(),
  })).filter((c) => c.label || c.value || c.href)

export async function updateSettings(_: ActionResult | null, fd: FormData): Promise<ActionResult> {
  const ctx = await requireAdmin()
  const contact = buildContact({
    email: str(fd, 'contact_email'),
    instagram: str(fd, 'contact_instagram'),
    others: contactRows(fd),
  })
  if (!contact.ok) return fail(contact.error)

  const parsed = settingsInputSchema.safeParse({
    bio: str(fd, 'bio'),
    clients: lines(fd, 'clients'),
    services: lines(fd, 'services'),
    contact: contact.contact,
    homeProjectSlug: str(fd, 'home_project_slug') || null,
  })
  if (!parsed.success) return fail(zodMessage(parsed.error))
  const s = parsed.data

  const { error } = await ctx.supabase
    .from('site_settings')
    .update({
      bio: s.bio,
      clients: s.clients,
      services: s.services,
      contact: s.contact,
      home_project_slug: s.homeProjectSlug,
    })
    .eq('id', true)
  if (error) return dbFail('updateSettings', error.message)

  publishChanges()
  return { ok: true, message: 'Guardado. El sitio ya muestra los cambios.' }
}
