import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  async function submit(event: FormEvent) {
    event.preventDefault()
    if (!supabase) return
    setBusy(true)
    setMessage('')
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        if (data.session) navigate('/dashboard')
        else setMessage('Check your email for a confirmation link before signing in. If you already have an account, sign in instead.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/dashboard')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Authentication failed. Please try again.')
    } finally { setBusy(false) }
  }

  return <main className="auth-shell">
    <div className="auth-intro"><span className="eyebrow">APPLICATION OS</span><h1>Make every application count.</h1><p>Keep your details in one place and prepare for each bursary with a clear checklist.</p></div>
    <form className="card auth-card" onSubmit={submit}>
      <h2>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h2>
      <p>{mode === 'login' ? 'Sign in to continue your applications.' : 'Start preparing your bursary applications.'}</p>
      <label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
      <label htmlFor="password">Password</label><input id="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={6} required value={password} onChange={e => setPassword(e.target.value)} />
      <button disabled={busy} type="submit">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}</button>
      {message && <p role="status" className="form-message">{message}</p>}
      <p className="switch">{mode === 'login' ? <>New here? <Link to="/signup">Create an account</Link></> : <>Already registered? <Link to="/login">Sign in</Link></>}</p>
    </form>
  </main>
}
