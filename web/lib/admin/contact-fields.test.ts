import { describe, expect, it } from 'vitest'
import { buildContact, splitContact } from './contact-fields'

const IG = { label: 'Instagram', value: '@kev.film', href: 'https://www.instagram.com/kev.film/' }
const MAIL = { label: 'Email', value: 'hola@kev.co', href: 'mailto:hola@kev.co' }
const WEB = { label: 'Vimeo', value: 'vimeo.com/kev', href: 'https://vimeo.com/kev' }

describe('buildContact', () => {
  it('arma correo e Instagram desde lo que escribe el productor', () => {
    expect(buildContact({ email: ' hola@kev.co ', instagram: '@kev.film', others: [] })).toEqual({
      ok: true,
      contact: [MAIL, IG],
    })
  })

  it('acepta el Instagram como usuario suelto o como URL', () => {
    for (const raw of ['kev.film', 'instagram.com/kev.film', 'https://www.instagram.com/kev.film/?hl=es']) {
      const r = buildContact({ email: '', instagram: raw, others: [] })
      expect(r).toEqual({ ok: true, contact: [IG] })
    }
  })

  it('campos vacíos no generan botones y conserva los demás enlaces', () => {
    expect(buildContact({ email: '', instagram: '  ', others: [WEB] })).toEqual({ ok: true, contact: [WEB] })
  })

  it('rechaza correo o Instagram mal escritos con un mensaje claro', () => {
    const badMail = buildContact({ email: 'hola@', instagram: '', others: [] })
    expect(badMail.ok).toBe(false)
    const badIg = buildContact({ email: '', instagram: 'https://evil.io/kev', others: [] })
    expect(badIg.ok).toBe(false)
  })
})

describe('splitContact', () => {
  it('separa correo e Instagram del resto para precargar el formulario', () => {
    expect(splitContact([WEB, IG, MAIL])).toEqual({ email: 'hola@kev.co', instagram: '@kev.film', others: [WEB] })
  })

  it('sin datos devuelve campos vacíos', () => {
    expect(splitContact([])).toEqual({ email: '', instagram: '', others: [] })
  })
})
