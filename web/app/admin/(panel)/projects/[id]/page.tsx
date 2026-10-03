import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ConfirmButton } from '@/components/admin/ConfirmButton'
import { MediaUploader } from '@/components/admin/MediaUploader'
import { PendingButton } from '@/components/admin/PendingButton'
import { ProjectForm } from '@/components/admin/ProjectForm'
import { requireAdmin } from '@/lib/admin/auth'
import type { ProjectKind } from '@/lib/content/types'
import { mediaUrl } from '@/lib/media'
import { deleteMedia, moveMedia } from '../../../actions/media'
import { deleteProject, updateProject } from '../../../actions/projects'

type MediaRow = { id: string; type: 'image' | 'video'; path: string; poster_path: string | null; width: number; height: number }

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { supabase } = await requireAdmin()
  const { data: p } = await supabase
    .from('projects')
    .select('id, slug, title, client, year, kind, blurb, published')
    .eq('id', id)
    .maybeSingle()
  if (!p) notFound()

  const { data: mediaData, error } = await supabase
    .from('media')
    .select('id, type, path, poster_path, width, height')
    .eq('project_id', id)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true })
  if (error) throw new Error('No se pudieron cargar los archivos.')
  const media = (mediaData ?? []) as MediaRow[]

  return (
    <section>
      <p><Link href="/admin" className="adm-back">← Proyectos</Link></p>
      <div className="adm-head">
        <h1 className="adm-h1">{p.title}</h1>
        {p.published && media.length > 0 && (
          <a href={`/work/${p.slug}`} target="_blank" rel="noreferrer" className="adm-btn adm-btn--ghost">Ver en el sitio ↗</a>
        )}
      </div>
      {!p.published && <p className="adm-hint">Oculto: no se ve en el sitio hasta marcar «Publicado» y guardar.</p>}
      {p.published && media.length === 0 && (
        <p className="adm-hint">Todavía no se ve en el sitio: sube al menos una foto o un video.</p>
      )}

      <div className="adm-cols">
        <ProjectForm
          action={updateProject.bind(null, p.id)}
          submitLabel="Guardar cambios"
          initial={{
            title: p.title,
            slug: p.slug,
            client: p.client,
            year: p.year ?? '',
            kind: p.kind as ProjectKind,
            blurb: p.blurb ?? '',
            published: p.published,
          }}
        />

        <div>
          <h2 className="adm-h2">Fotos y videos <span className="adm-count">{media.length}</span></h2>
          <p className="adm-hint">El primero es la portada. Para video, el primero es el que se reproduce.</p>
          <MediaUploader projectId={p.id} projectSlug={p.slug} />
          <ul className="adm-grid">
            {media.map((m, i) => (
              <li key={m.id}>
                <div className="adm-grid__img" style={{ aspectRatio: `${m.width} / ${m.height}` }}>
                  <img src={mediaUrl(m.type === 'video' ? (m.poster_path ?? m.path) : m.path)} alt="" loading="lazy" />
                  {m.type === 'video' && <span className="adm-badge">VIDEO</span>}
                  {i === 0 && <span className="adm-badge adm-badge--cover">PORTADA</span>}
                </div>
                <div className="adm-grid__actions">
                  <form action={moveMedia.bind(null, m.id, p.id, 'up')}>
                    <PendingButton className="adm-icon" disabled={i === 0} aria-label="Mover antes" pendingLabel="…">←</PendingButton>
                  </form>
                  <form action={moveMedia.bind(null, m.id, p.id, 'down')}>
                    <PendingButton className="adm-icon" disabled={i === media.length - 1} aria-label="Mover después" pendingLabel="…">→</PendingButton>
                  </form>
                  <form action={deleteMedia.bind(null, m.id, p.id)}>
                    <ConfirmButton message="¿Borrar este archivo? No se puede deshacer." className="adm-icon adm-icon--danger" pendingLabel="…" aria-label="Borrar archivo">✕</ConfirmButton>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <form action={deleteProject.bind(null, p.id)} className="adm-danger-zone">
        <ConfirmButton message={`¿Borrar "${p.title}" y todos sus archivos? No se puede deshacer.`}>
          Borrar proyecto
        </ConfirmButton>
      </form>
    </section>
  )
}
