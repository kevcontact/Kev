import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/auth'
import { mediaUrl } from '@/lib/media'
import { moveProject, setPublished } from '../actions/projects'

type Row = {
  id: string
  slug: string
  title: string
  client: string
  kind: string
  published: boolean
  media: { type: string; path: string; poster_path: string | null; position: number }[]
}

const thumbOf = (r: Row): string | null => {
  const first = r.media.toSorted((a, b) => a.position - b.position)[0]
  if (!first) return null
  return first.type === 'video' ? first.poster_path : first.path
}

export default async function ProjectsPage() {
  const { supabase } = await requireAdmin()
  const { data, error } = await supabase
    .from('projects')
    .select('id, slug, title, client, kind, published, media(type, path, poster_path, position)')
    .order('position', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw new Error('No se pudieron cargar los proyectos.')
  const rows = (data ?? []) as Row[]

  return (
    <section>
      <div className="adm-head">
        <h1 className="adm-h1">Proyectos <span className="adm-count">{rows.length}</span></h1>
        <Link href="/admin/projects/new" className="adm-btn">+ Nuevo proyecto</Link>
      </div>
      <p className="adm-hint">
        El orden de esta lista es el orden del sitio. Un proyecto sin fotos ni videos no aparece.
      </p>
      <ul className="adm-list">
        {rows.map((r, i) => {
          const thumb = thumbOf(r)
          return (
            <li key={r.id} className={r.published ? '' : 'is-draft'}>
              <div className="adm-thumb">{thumb && <img src={mediaUrl(thumb)} alt="" loading="lazy" />}</div>
              <Link href={`/admin/projects/${r.id}`} className="adm-list__main">
                <strong>{r.title}</strong>
                <span>{r.client} · {r.kind} · {r.media.length} archivos{r.published ? '' : ' · BORRADOR'}</span>
              </Link>
              <div className="adm-list__actions">
                <form action={moveProject.bind(null, r.id, 'up')}>
                  <button className="adm-icon" disabled={i === 0} aria-label={`Subir ${r.title}`}>↑</button>
                </form>
                <form action={moveProject.bind(null, r.id, 'down')}>
                  <button className="adm-icon" disabled={i === rows.length - 1} aria-label={`Bajar ${r.title}`}>↓</button>
                </form>
                <form action={setPublished.bind(null, r.id, !r.published)}>
                  <button className="adm-btn adm-btn--ghost">{r.published ? 'Ocultar' : 'Publicar'}</button>
                </form>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
