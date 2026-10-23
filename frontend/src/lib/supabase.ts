import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

export const configurationError = !url || !key || url.includes('your-project') || key.includes('your-')
  ? 'Add your Supabase project URL and publishable key to frontend/.env, then restart Vite.'
  : null

export const supabase: SupabaseClient | null = configurationError ? null : createClient(url, key)
