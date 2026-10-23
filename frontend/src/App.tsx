import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth/AuthProvider'
import { configurationError, supabase } from './lib/supabase'
import { AuthPage } from './pages/AuthPage'
import { PlaceholderPage } from './pages/PlaceholderPage'

function Protected({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth()
  if (loading) return <main className="center" role="status">Loading your session…</main>
  if (!session) return <Navigate to="/login" replace />
  return children
}

const navigation = [
  ['Dashboard', '/dashboard'], ['Profile', '/profile'], ['Documents', '/documents'],
  ['Bursaries', '/bursaries'], ['Applications', '/applications'],
] as const

function Shell({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()
  return <div className="app-shell"><header className="topbar"><Link className="brand" to="/dashboard"><span className="brand-mark">A</span> Application OS</Link><span className="account">{session?.user.email}</span><button className="quiet" onClick={() => void supabase?.auth.signOut()}>Sign out</button></header>
    <div className="layout"><nav aria-label="Main navigation" className="sidebar">{navigation.map(([label, href]) => <NavLink key={href} to={href} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav><main className="content">{children}</main></div></div>
}

function Pages() {
  return <Shell><Routes>
    <Route path="/dashboard" element={<PlaceholderPage eyebrow="OVERVIEW" title="Your application workspace" description="A home for your bursary preparation, documents and checks." emptyTitle="Your workspace is ready" emptyDescription="Your profile and application data will appear here when the database flow is connected. No sample data is shown as live information." />} />
    <Route path="/profile" element={<PlaceholderPage eyebrow="ABOUT YOU" title="Your profile" description="Keep your personal and education details ready for future applications." emptyTitle="Profile editing is coming" emptyDescription="Profile forms and secure database saving will be added after the schema and access policies are in place." />} />
    <Route path="/documents" element={<PlaceholderPage eyebrow="YOUR FILES" title="Documents" description="Reuse documents across applications once private storage and safety checks are ready." emptyTitle="No documents yet" emptyDescription="Uploads are unavailable until ownership checks, file validation and malware scanning are implemented." />} />
    <Route path="/bursaries" element={<PlaceholderPage eyebrow="OPPORTUNITIES" title="Find bursaries" description="Compare official requirements with your circumstances." emptyTitle="No bursaries connected" emptyDescription="Verified listings with source links and application cycles will appear here later. Eligibility is separate from application completeness." />} />
    <Route path="/applications" element={<PlaceholderPage eyebrow="YOUR PROGRESS" title="Applications" description="Prepare applications and review requirement checks before submission." emptyTitle="No applications yet" emptyDescription="A check will explain missing or uncertain items. It cannot guarantee funding or verify document authenticity." />} />
    <Route path="/applications/:id/checks" element={<PlaceholderPage eyebrow="REVIEW" title="Application check" description="Requirement findings for this application will appear here." emptyTitle="No check results yet" emptyDescription="The checking engine is not available in this scaffold. No fictional result is presented as a real check." />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes></Shell>
}

export default function App() {
  if (configurationError) return <main className="center setup"><h1>Setup needed</h1><p>{configurationError}</p><p>Use your Supabase project's public key. Keep secret keys on the server.</p></main>
  return <Routes>
    <Route path="/login" element={<AuthPage mode="login" />} />
    <Route path="/signup" element={<AuthPage mode="signup" />} />
    <Route path="/*" element={<Protected><Pages /></Protected>} />
  </Routes>
}
