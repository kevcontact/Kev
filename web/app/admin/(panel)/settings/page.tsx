import { SettingsForm } from '@/components/admin/SettingsForm'
import { requireAdmin } from '@/lib/admin/auth'
import { mapSettings } from '@/lib/content/map'
import { updateSettings } from '../../actions/settings'

export default async function SettingsPage() {
  const { supabase } = await requireAdmin()
  const [settings, projects] = await Promise.all([
    supabase.from('site_settings').select('bio, clients, services, contact, home_project_slug').maybeSingle(),
    supabase.from('projects').select('slug, title').order('position', { ascending: true }),
  ])
  if (settings.error || projects.error) throw new Error('No se pudo cargar la información.')

  return (
    <section>
      <h1 className="adm-h1">Información</h1>
      <SettingsForm
        action={updateSettings}
        initial={mapSettings(settings.data)}
        projectOptions={projects.data ?? []}
      />
    </section>
  )
}
