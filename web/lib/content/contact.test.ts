import { describe, expect, it } from 'vitest'
import { instagramOf } from './contact'

const ig = { label: 'Instagram', value: '@kev', href: 'https://www.instagram.com/kev' }
const mail = { label: 'Email', value: 'hola@kev.co', href: 'mailto:hola@kev.co' }

describe('instagramOf', () => {
  it('encuentra el enlace por su destino, no por la etiqueta', () => {
    expect(instagramOf([mail, ig])).toEqual(ig)
    expect(instagramOf([{ ...ig, label: 'IG' }])?.href).toBe(ig.href)
    expect(instagramOf([{ ...ig, href: 'https://instagram.com/kev' }])).not.toBeNull()
  })

  it('sin Instagram (o con un dominio que solo lo imita) no hay botón', () => {
    expect(instagramOf([])).toBeNull()
    expect(instagramOf([mail])).toBeNull()
    expect(instagramOf([{ ...ig, href: 'https://instagram.com.evil.io/kev' }])).toBeNull()
    expect(instagramOf([{ ...ig, href: 'no es url' }])).toBeNull()
  })
})
