import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type AdminPageHeaderProps = {
  eyebrow: string
  title: string
  description: string
  actions?: ReactNode
}

export function AdminPageHeader({ eyebrow, title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="admin-page-header">
      <div className="max-w-3xl">
        <span className="admin-eyebrow">{eyebrow}</span>
        <h1 className="admin-page-title">{title}</h1>
        <p className="admin-page-description">{description}</p>
      </div>
      {actions ? <div className="admin-page-actions">{actions}</div> : null}
    </div>
  )
}

type AdminPanelProps = {
  children: ReactNode
  className?: string
}

export function AdminPanel({ children, className }: AdminPanelProps) {
  return <section className={cn('admin-panel', className)}>{children}</section>
}

type AdminSectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
}

export function AdminSectionHeading({ eyebrow, title, description, actions }: AdminSectionHeadingProps) {
  return (
    <div className="admin-section-heading">
      <div>
        <p className="admin-section-eyebrow">{eyebrow}</p>
        <h2 className="admin-section-title">{title}</h2>
        {description ? <p className="admin-section-description">{description}</p> : null}
      </div>
      {actions ? <div className="admin-section-actions">{actions}</div> : null}
    </div>
  )
}

type AdminEmptyStateProps = {
  title: string
  body: string
  action?: ReactNode
}

export function AdminEmptyState({ title, body, action }: AdminEmptyStateProps) {
  return (
    <div className="admin-empty-state">
      <h3 className="font-display text-2xl text-zinc-950">{title}</h3>
      <p className="max-w-md text-sm leading-relaxed text-zinc-500">{body}</p>
      {action ? <div>{action}</div> : null}
    </div>
  )
}
