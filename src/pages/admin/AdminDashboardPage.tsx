import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpenText, Images, Settings } from 'lucide-react'
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

  useEffect(() => {
    if (!token) return
    void api.getDashboardOverview(token).then(setOverview).catch(() => undefined)
  }, [token])

  return (
    <>
      <PageMeta title="Admin overview" description="Operational overview for the DRP cinematic CMS." path="/admin" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="section-label border-white/10 bg-white/8 text-cream-50/82">Dashboard</span>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,4vw,4.5rem)] leading-[0.94] tracking-[-0.04em] text-cream-50">
            A premium control room for media, galleries, and editorial publishing.
          </h1>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {overview.stats.map((stat) => (
            <div key={stat.label} className="cinematic-surface rounded-[1.9rem] border border-white/8 bg-white/6 p-5 text-cream-50">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">{stat.label}</p>
              <p className="mt-4 font-display text-5xl leading-none">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { to: '/admin/gallery', label: 'Quick publish gallery', body: 'Drop media, add title, publish instantly.', icon: Images },
            { to: '/admin/blogs', label: 'Quick publish story', body: 'Cover image, summary, article, publish.', icon: BookOpenText },
            { to: '/admin/settings', label: 'Website settings', body: 'Update WhatsApp, contact, map, and footer.', icon: Settings },
          ].map((action) => {
            const Icon = action.icon
            return (
              <div key={action.to} className="cinematic-surface rounded-[1.7rem] border border-white/8 bg-white/6 p-5 text-cream-50">
                <Icon className="size-5 text-gold-400" />
                <h2 className="mt-3 font-display text-2xl leading-none">{action.label}</h2>
                <p className="mt-2 text-sm leading-relaxed text-cream-50/62">{action.body}</p>
                <Button asChild size="sm" className="mt-4">
                  <Link to={action.to}>Open</Link>
                </Button>
              </div>
            )
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="cinematic-surface rounded-[2rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Latest journal activity</p>
            <div className="mt-4 grid gap-3">
              {overview.latest_blog_titles.map((title) => (
                <div key={title} className="rounded-[1.4rem] bg-black/18 px-4 py-3 text-sm text-cream-50/76">
                  {title}
                </div>
              ))}
            </div>
          </section>

          <section className="cinematic-surface rounded-[2rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Latest gallery activity</p>
            <div className="mt-4 grid gap-3">
              {overview.latest_gallery_titles.map((title) => (
                <div key={title} className="rounded-[1.4rem] bg-black/18 px-4 py-3 text-sm text-cream-50/76">
                  {title}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
