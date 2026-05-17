import { Link, NavLink, Outlet } from 'react-router-dom'
import { BarChart3, BookOpenText, Images, LibraryBig, LogOut, Settings, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'

const links = [
  { to: '/admin', label: 'Overview', icon: BarChart3, end: true },
  { to: '/admin/media', label: 'Media center', icon: LibraryBig },
  { to: '/admin/gallery', label: 'Gallery', icon: Images },
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
  const admin = useAuthStore((state) => state.admin)

  return (
    <div className="min-h-dvh bg-[#061712] text-cream-50">
      <div className="mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[17rem_minmax(0,1fr)]">
        <aside className="border-b border-white/8 bg-[radial-gradient(circle_at_top,rgba(200,169,107,0.14),transparent_24%),linear-gradient(180deg,#071b15,#061410)] p-4 lg:min-h-dvh lg:border-b-0 lg:border-r lg:p-5">
          <div className="cinematic-surface rounded-[2rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <Link to="/admin" className="flex items-center gap-3">
              <span className="inline-flex size-11 items-center justify-center rounded-[1.2rem] bg-gold-500 text-forest-900 shadow-glow">
                <Shield className="size-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-2xl leading-none">DRP CMS</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-cream-50/56">Cinematic control</p>
              </div>
            </Link>
            <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-black/18 p-4">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Signed in</p>
              <p className="mt-2 text-sm font-semibold text-cream-50">{admin?.display_name ?? 'Administrator'}</p>
              <p className="text-sm text-cream-50/58">{admin?.email}</p>
            </div>
          </div>

          <nav className="mt-5 grid gap-2" aria-label="Admin">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/admin'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-[1.4rem] px-4 py-3 text-sm font-semibold transition',
                      isActive
                        ? 'bg-white/10 text-cream-50 shadow-[0_20px_55px_-36px_rgba(200,169,107,0.45)]'
                        : 'text-cream-50/68 hover:bg-white/6 hover:text-cream-50',
                    )
                  }
                >
                  <Icon className="size-4" />
                  {link.label}
                </NavLink>
              )
            })}
          </nav>

          <div className="mt-5 flex flex-col gap-2 lg:mt-auto lg:pt-8">
            <Button asChild variant="secondary" className="justify-start border-white/12 bg-white/6 text-cream-50 hover:bg-white/12">
              <Link to="/">View public site</Link>
            </Button>
            <Button type="button" variant="ghost" className="justify-start text-cream-50/70 hover:bg-white/8 hover:text-cream-50" onClick={() => logout()}>
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </aside>

        <main className="bg-[radial-gradient(circle_at_top,rgba(200,169,107,0.08),transparent_24%),linear-gradient(180deg,#071913,#08120f)] px-4 py-5 sm:px-5 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
