/**
 * Genera supabase/seed/kev_seed.sql desde el contenido estático de lib/data.ts.
 * Uso (una sola vez, idempotente por slug):  npx tsx scripts/build-seed.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { info, projects } from '../lib/data'

const OUT = resolve(__dirname, '../../supabase/seed/kev_seed.sql')

/** Literal SQL seguro: comillas simples duplicadas. */
const lit = (v: string | number | null | undefined): string =>
  v === null || v === undefined
    ? 'null'
    : typeof v === 'number'
      ? String(v)
      : `'${v.replace(/'/g, "''")}'`

const arr = (xs: readonly string[]): string =>
  `array[${xs.map(lit).join(', ')}]::text[]`

const lines: string[] = ['-- Generado por web/scripts/build-seed.ts — no editar a mano.', 'begin;']

projects.forEach((p, i) => {
  lines.push(
    `insert into kev.projects (slug, title, client, year, kind, blurb, position)
values (${lit(p.slug)}, ${lit(p.title)}, ${lit(p.client)}, ${lit(p.year)}, ${lit(p.kind)}, ${lit(p.blurb)}, ${i * 10})
on conflict (slug) do nothing;`,
  )
  p.items.forEach((m, j) => {
    lines.push(
      `insert into kev.media (project_id, type, path, poster_path, width, height, duration, position)
select id, ${lit(m.type)}, ${lit(m.src)}, ${lit(m.poster)}, ${m.w}, ${m.h}, ${lit(m.duration)}, ${j * 10}
from kev.projects where slug = ${lit(p.slug)}
  and not exists (select 1 from kev.media x join kev.projects y on y.id = x.project_id where y.slug = ${lit(p.slug)} and x.path = ${lit(m.src)});`,
    )
  })
})

lines.push(
  `update kev.site_settings set
  bio = ${lit(info.bio)},
  clients = ${arr(info.clients)},
  services = ${arr(info.services)},
  contact = '[]'::jsonb, -- placeholders omitidos a propósito: los reales se cargan en /admin
  home_project_slug = 'showreel'
where id;`,
  'commit;',
)

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, lines.join('\n\n') + '\n')
console.log(`seed → ${OUT} (${projects.length} proyectos)`)
