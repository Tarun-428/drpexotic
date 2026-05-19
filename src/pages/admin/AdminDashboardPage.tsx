import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, BookOpenText, GalleryHorizontalEnd, Settings } from 'lucide-react'
import { AdminPanel } from '@/components/admin/AdminShell'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { DashboardOverview } from '@/types/cms'

const emptyOverview: DashboardOverview = {
  stats: [],
  latest_blog_titles: [],
  latest_gallery_titles: [],
}

export default function AdminDashboardPage() {
  const token = useAuthStore((state) => state.token)
  const [overview, setOverview] = useState<DashboardOverview>(emptyOverview)
  const shortcuts = [
    { to: '/admin/gallery', label: 'Gallery', icon: GalleryHorizontalEnd },
    { to: '/admin/blogs', label: 'Journal', icon: BookOpenText },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ] as const

  useEffect(() => {
    if (!token) return
    void api.getDashboardOverview(token).then(setOverview).catch(() => undefined)
  }, [token])

  return (
    <>
      <PageMeta title="Admin overview" description="Operational overview for the DRP cinematic CMS." path="/admin" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 text-sm text-zinc-600">Overview metrics and quick shortcuts — click any item to open that section.</div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overview.stats.map((stat, index) => {
            const icons = [BarChart3, GalleryHorizontalEnd, BookOpenText, Settings] as const
            const Icon = icons[index % icons.length]

            return (
              <AdminPanel key={stat.label} className="admin-metric-card flex min-h-44 flex-col justify-between p-5">
                <div className="flex items-center justify-between">
                  <Icon className="size-5 text-emerald-600" aria-hidden />
                  <div className="text-sm text-zinc-600">{stat.label}</div>
                </div>
                <p className="mt-6 font-display text-5xl leading-none text-zinc-950">{stat.value}</p>
              </AdminPanel>
            )
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {shortcuts.map((shortcut) => {
            const Icon = shortcut.icon
            return (
              <Link key={shortcut.to} to={shortcut.to} className="flex flex-col items-center gap-2">
                <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="text-xs text-zinc-700">{shortcut.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
