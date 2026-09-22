import { ProjectForm, EMPTY_PROJECT } from '@/components/admin/ProjectForm'
import { createProject } from '../../../actions/projects'

export default function NewProjectPage() {
  return (
    <section>
      <h1 className="adm-h1">Nuevo proyecto</h1>
      <p className="adm-hint">Después de crearlo podrás subir sus fotos o videos.</p>
      <ProjectForm action={createProject} initial={EMPTY_PROJECT} submitLabel="Crear proyecto" />
    </section>
  )
}
