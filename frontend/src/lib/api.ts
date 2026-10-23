import { supabase } from './supabase'

export async function apiGet<T>(path: string): Promise<T> {
  if (!supabase) throw new Error('Supabase is not configured')
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session) throw new Error('Please sign in again')
  const response = await fetch(path, {
    headers: { Authorization: `Bearer ${session.access_token}` },
  })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.json() as Promise<T>
}
