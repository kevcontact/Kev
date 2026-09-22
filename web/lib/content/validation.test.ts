import { describe, expect, it } from 'vitest'
import {
  contactLinkSchema,
  mediaInputSchema,
  projectInputSchema,
  slugify,
  storagePathFor,
} from './validation'

describe('slugify', () => {
  it('normaliza acentos, símbolos y espacios', () => {
    expect(slugify('Maluma × Maisak — Días')).toBe('maluma-maisak-dias')
    expect(slugify('  ¡Hola!  ')).toBe('hola')
  })
})

describe('projectInputSchema', () => {
  const base = { title: 'En Otra Vida', slug: 'en-otra-vida', client: '', year: '', kind: 'Video', blurb: '', published: true }

  it('acepta un proyecto válido y convierte vacíos en null', () => {
    const r = projectInputSchema.parse(base)
    expect(r).toMatchObject({ year: null, blurb: null, kind: 'Video' })
  })

  it('rechaza slug inválido, año mal formado y kind desconocido', () => {
    expect(projectInputSchema.safeParse({ ...base, slug: 'Mal Slug' }).success).toBe(false)
    expect(projectInputSchema.safeParse({ ...base, year: '25' }).success).toBe(false)
    expect(projectInputSchema.safeParse({ ...base, kind: 'Otro' }).success).toBe(false)
    expect(projectInputSchema.safeParse({ ...base, title: '' }).success).toBe(false)
  })
})

describe('contactLinkSchema', () => {
  it('acepta mailto e https', () => {
    expect(contactLinkSchema.safeParse({ label: 'Email', value: 'k@kev.co', href: 'mailto:k@kev.co' }).success).toBe(true)
    expect(contactLinkSchema.safeParse({ label: 'IG', value: '@kev', href: 'https://www.instagram.com/kev/' }).success).toBe(true)
  })

  it('rechaza javascript:, http plano y mailto inválido', () => {
    for (const href of ['javascript:alert(1)', 'http://x.com', 'mailto:nada', 'data:text/html,x']) {
      expect(contactLinkSchema.safeParse({ label: 'x', value: 'x', href }).success, href).toBe(false)
    }
  })
})

describe('mediaInputSchema', () => {
  const ok = { projectId: '7f1c8a52-3b8e-4a36-9d2b-6f2f4a0b1c11', type: 'image', path: 'projects/j-balvin/a.jpg', posterPath: null, width: 10, height: 10, duration: null }

  it('acepta rutas dentro de projects/', () => {
    expect(mediaInputSchema.safeParse(ok).success).toBe(true)
  })

  it('rechaza traversal, rutas absolutas y fuera del prefijo', () => {
    for (const path of ['../x.jpg', '/projects/a.jpg', 'projects/../../x', 'otra/a.jpg']) {
      expect(mediaInputSchema.safeParse({ ...ok, path }).success, path).toBe(false)
    }
  })
})

describe('storagePathFor', () => {
  it('construye una ruta única bajo projects/<slug>/', () => {
    const p = storagePathFor('j-balvin', 'Foto Final.JPG', 'abc')
    expect(p).toBe('projects/j-balvin/abc-foto-final.jpg')
  })
})
