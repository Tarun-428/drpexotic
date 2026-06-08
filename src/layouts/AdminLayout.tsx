import { Link, NavLink, Outlet } from 'react-router-dom'
import { BarChart3, BookOpenText, LayoutGrid, LogOut, Settings, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const links = [
  { to: '/admin', label: 'Overview', icon: BarChart3, end: true },
  { to: '/admin/gallery', label: 'Gallery', icon: LayoutGrid },
  { to: '/admin/blogs', label: 'Journal', icon: BookOpenText },
  { to: '/admin/settings', label: 'Website settings', icon: Settings },
] as const satisfies ReadonlyArray<{
  to: string
  label: string
  icon: typeof BarChart3
  end?: boolean
}>

export function AdminLayout() {
  const logout = useAuthStore((state) => state.logout)

  return (
    <div className="min-h-dvh bg-[#f5f7f2] text-zinc-950">
      <div className="mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="border-b border-zinc-200 bg-white/85 p-4 backdrop-blur-xl lg:min-h-dvh lg:border-b-0 lg:border-r lg:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 lg:flex-col lg:items-stretch lg:justify-start">
            <Link to="/admin" className="inline-flex size-11 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700 shadow-sm" aria-label="Admin home" title="Admin home">
              <Shield className="size-5" aria-hidden />
            </Link>

            <nav className="flex items-center gap-2 overflow-x-auto lg:flex-col lg:items-stretch lg:overflow-visible" aria-label="Admin navigation">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/admin'}
                  title={link.label}
                  aria-label={link.label}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-3 rounded-2xl px-2 py-1 transition',
                      isActive
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm'
                        : 'border-transparent text-zinc-700 hover:text-zinc-900',
                    )
                  }
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 group-hover:bg-zinc-50">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm text-zinc-900 font-normal">{link.label}</span>
                </NavLink>
              )
            })}
            </nav>

            <div className="flex items-center gap-4 lg:flex-col lg:items-stretch lg:pt-2">
              <Link to="/" className="flex items-center gap-3" aria-label="Public site" title="Public site">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500">
                  <LayoutGrid className="size-4" aria-hidden />
                </span>
                <span className="text-sm text-zinc-900">Preview</span>
              </Link>

              <button type="button" onClick={() => logout()} className="flex items-center gap-3" aria-label="Sign out" title="Sign out">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500">
                  <LogOut className="size-4" aria-hidden />
                </span>
                <span className="text-sm text-zinc-900">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        <main className="admin-shell min-w-0 bg-[#f7f8f4] px-4 py-5 sm:px-5 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
