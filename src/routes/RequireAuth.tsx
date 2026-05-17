import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export function RequireAuth() {
  const token = useAuthStore((s) => s.token)
  const hydrating = useAuthStore((s) => s.hydrating)
  const restore = useAuthStore((s) => s.restore)
  const location = useLocation()

  useEffect(() => {
    void restore()
  }, [restore])

  if (hydrating) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-[#071c15] px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
      </div>
    )
  }

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
