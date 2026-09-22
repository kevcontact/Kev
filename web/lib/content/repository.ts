import 'server-only'
import { cache } from 'react'
import { createPublicClient } from '@/lib/supabase/public'
import { supabaseEnv } from '@/lib/supabase/env'
import { info as staticInfo, projects as staticProjects } from '@/lib/data'
import { mapProjects, mapSettings } from './map'
import type { Project, SiteSettings } from './types'

const PROJECT_SELECT =
  'slug, title, client, year, kind, blurb, position, media(type, path, poster_path, width, height, duration, position)'

/**
 * Proyectos publicados. Sin Supabase configurado (dev local) usa lib/data.ts.
 * Con Supabase, un error se propaga: Next conserva la última versión buena en caché
 * en lugar de publicar un respaldo desactualizado.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  const env = supabaseEnv()
  if (!env) return staticProjects

  const { data, error } = await createPublicClient(env)
    .from('projects')
    .select(PROJECT_SELECT)
    .eq('published', true)
  if (error) throw new Error(`kev.projects: ${error.message}`)
  return mapProjects(data ?? [])
})

export const getSettings = cache(async (): Promise<SiteSettings> => {
  const env = supabaseEnv()
  if (!env) return staticInfo

  const { data, error } = await createPublicClient(env)
    .from('site_settings')
    .select('bio, clients, services, contact, home_project_slug')
    .maybeSingle()
  if (error) throw new Error(`kev.site_settings: ${error.message}`)
  return mapSettings(data)
})
