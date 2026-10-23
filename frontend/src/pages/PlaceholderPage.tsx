import type { ReactNode } from 'react'

interface PlaceholderPageProps { eyebrow: string; title: string; description: string; emptyTitle: string; emptyDescription: string; children?: ReactNode }

export function PlaceholderPage({ eyebrow, title, description, emptyTitle, emptyDescription, children }: PlaceholderPageProps) {
  return <section className="page"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p className="lead">{description}</p>
    <div className="card empty"><div className="empty-icon" aria-hidden="true">✦</div><h2>{emptyTitle}</h2><p>{emptyDescription}</p>{children}</div>
  </section>
}
