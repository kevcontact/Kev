import { describe, expect, it } from 'vitest'
import { mapProjects, mapSettings } from './map'
import { brandVideos, musicVideos, nextOf, photoProjects, videoProjectsOf } from './select'

const media = (o: Partial<Record<string, unknown>> = {}) => ({
  id: 'm' + Math.random(),
  type: 'image',
  path: 'a/1.jpg',
  poster_path: null,
  width: 100,
  height: 150,
  duration: null,
  position: 0,
  ...o,
})

const row = (o: Partial<Record<string, unknown>> = {}) => ({
  id: 'p1',
  slug: 'j-balvin',
  title: 'J Balvin',
  client: 'J Balvin',
  year: '2025',
  kind: 'Photography',
  blurb: null,
  position: 0,
  published: true,
  media: [media()],
  ...o,
})

describe('mapProjects', () => {
  it('convierte filas en proyectos con cover = primer medio por posición', () => {
    const [p] = mapProjects([
      row({
        media: [
          media({ path: 'a/2.jpg', position: 20 }),
          media({ path: 'a/1.jpg', position: 10 }),
        ],
      }),
    ])
    expect(p.slug).toBe('j-balvin')
    expect(p.items.map((m) => m.src)).toEqual(['a/1.jpg', 'a/2.jpg'])
    expect(p.cover.src).toBe('a/1.jpg')
    expect(p.year).toBe('2025')
  })

  it('mapea video con poster y duración', () => {
    const [p] = mapProjects([
      row({
        kind: 'Video',
        media: [media({ type: 'video', path: 'v.mp4', poster_path: 'v-poster.jpg', duration: '12.5' })],
      }),
    ])
    expect(p.cover).toMatchObject({ type: 'video', poster: 'v-poster.jpg', duration: 12.5 })
  })

  it('descarta proyectos sin medios y filas inválidas, sin lanzar', () => {
    const out = mapProjects([
      row({ slug: 'vacio', media: [] }),
      row({ slug: 'malo', kind: 'Nope' }),
      row({ slug: 'ok' }),
    ])
    expect(out.map((p) => p.slug)).toEqual(['ok'])
  })

  it('ordena proyectos por position', () => {
    const out = mapProjects([row({ slug: 'b', position: 20 }), row({ slug: 'a', position: 10 })])
    expect(out.map((p) => p.slug)).toEqual(['a', 'b'])
  })

  it('no muta la entrada', () => {
    const input = [row({ media: [media({ position: 2 }), media({ position: 1 })] })]
    const snapshot = JSON.stringify(input)
    mapProjects(input)
    expect(JSON.stringify(input)).toBe(snapshot)
  })
})

describe('mapSettings', () => {
  it('filtra contactos inválidos (href no seguro)', () => {
    const s = mapSettings({
      bio: 'x',
      clients: ['A'],
      services: ['B'],
      contact: [
        { label: 'Email', value: 'a@b.co', href: 'mailto:a@b.co' },
        { label: 'Bad', value: 'x', href: 'javascript:alert(1)' },
      ],
      home_project_slug: 'showreel',
    })
    expect(s.contact).toHaveLength(1)
    expect(s.homeProjectSlug).toBe('showreel')
  })

  it('devuelve valores vacíos seguros si la fila no existe', () => {
    expect(mapSettings(null)).toMatchObject({ bio: '', clients: [], contact: [] })
  })
})

describe('selectores', () => {
  const ps = mapProjects([
    row({ slug: 'foto', kind: 'Photography' }),
    row({ slug: 'clip', kind: 'Video', position: 1, media: [media({ type: 'video', path: 'c.mp4' })] }),
    row({ slug: 'spot', kind: 'Brand', position: 2, media: [media({ type: 'video', path: 's.mp4' })] }),
    row({ slug: 'lookbook', kind: 'Brand', position: 3 }),
  ])

  it('separa fotografía, clips y marcas en video', () => {
    expect(photoProjects(ps).map((p) => p.slug)).toEqual(['foto'])
    expect(videoProjectsOf(ps).map((p) => p.slug)).toEqual(['clip', 'spot'])
    expect(musicVideos(ps).map((p) => p.slug)).toEqual(['clip'])
    expect(brandVideos(ps).map((p) => p.slug)).toEqual(['spot'])
  })

  it('nextOf da la vuelta al final de la lista', () => {
    expect(nextOf(ps, 'lookbook')?.slug).toBe('foto')
    expect(nextOf([], 'x')).toBeUndefined()
  })
})
