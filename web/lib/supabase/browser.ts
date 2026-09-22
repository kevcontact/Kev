'use client'
import { createBrowserClient } from '@supabase/ssr'
import { KEV_SCHEMA } from './env'

/** Cliente del navegador para login y subida directa al bucket (RLS decide). */
export const createBrowserSupabase = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: KEV_SCHEMA } },
  )
