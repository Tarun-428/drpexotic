import { Link, Outlet } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'

export function AdminLayout() {
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="min-h-dvh bg-cream-200">
      <header className="border-b border-cream-300/80 bg-cream-50/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/admin" className="flex items-center gap-2 font-semibold text-forest-900">
            <span className="inline-flex size-9 items-center justify-center rounded-2xl bg-forest-900 text-gold-400">
              <Shield className="size-4" aria-hidden />
            </span>
            Admin
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="secondary" size="sm">
              <Link to="/">View site</Link>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-red-800 hover:bg-red-500/10"
              onClick={() => logout()}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
