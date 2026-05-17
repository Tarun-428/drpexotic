import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Newspaper } from 'lucide-react'
import { api } from '@/lib/api'
import { FALLBACK_BLOG_POSTS } from '@/constants/fallbackContent'
import type { BlogPostListItem } from '@/types/cms'

function formatDate(value?: string | null) {
  if (!value) return 'Soon'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(new Date(value))
}

export function HomeNewsTicker() {
  const [items, setItems] = useState<BlogPostListItem[]>(FALLBACK_BLOG_POSTS)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let active = true
    void api
      .getHomeNews()
      .then((response) => {
        if (active && response.length > 0) setItems(response)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  const queue = items.slice(0, Math.min(items.length, 4))
  const loop = queue.length > 1 ? [...queue, ...queue] : queue

  if (queue.length === 0) return null

  return (
    <section className="section-shell py-6 sm:py-8 lg:py-10">
      <div
        className={`news-ribbon ${paused ? 'is-paused' : ''}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div className="flex items-center gap-2 border-b border-[#e8ddcc] px-3 py-2 sm:px-4">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#edf1e7] text-forest-900">
            <Newspaper className="size-3.5 text-gold-600" />
          </span>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-forest-900/64">Field highlights</p>
          <Link to="/journal" className="ml-auto inline-flex items-center gap-1 text-[0.72rem] font-semibold text-forest-900">
            Journal
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="news-ribbon__track">
          {loop.map((item, index) => (
            <Link
              key={`${item.slug}-${index}`}
              to={`/journal/${item.slug}`}
              className="news-ribbon__item"
              aria-label={`Open ${item.title}`}
            >
              <img
                src={item.featured_image.url}
                alt={item.featured_image.alt_text || item.title}
                className="h-12 w-12 shrink-0 rounded-[0.85rem] object-cover sm:h-14 sm:w-14"
                loading="lazy"
                decoding="async"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#edf1e7] px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-forest-900/68">
                    {item.categories[0] ?? 'Journal'}
                  </span>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-forest-900/42">
                    {formatDate(item.published_at)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-snug text-forest-900">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
