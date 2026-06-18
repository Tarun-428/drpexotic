import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper } from 'lucide-react'
import { api } from '@/lib/api'
import { FALLBACK_BLOG_POSTS } from '@/constants/fallbackContent'
import type { BlogPostListItem } from '@/types/cms'

export function HomeNewsTicker() {
  const [items, setItems] = useState<BlogPostListItem[]>(FALLBACK_BLOG_POSTS)

  useEffect(() => {
    let active = true
    void api
      .listPublicBlogs()
      .then((response) => {
        if (active && response.items.length > 0) setItems(response.items)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  const queue = items.slice(0, 5)
  if (queue.length === 0) return null

  return (
    <div className="bg-secondary/40 border-y border-primary/5 overflow-hidden py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2 shrink-0 sm:border-r border-primary/10 sm:pr-6">
          <Newspaper className="size-4 text-accent" />
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-primary hidden sm:inline">Latest Insights</span>
        </div>
        
        <div className="flex-1 overflow-hidden relative">
          <div className="flex gap-12 animate-ticker whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            {[...queue, ...queue].map((item, idx) => (
              <Link 
                key={`${item.id}-${idx}`} 
                to={`/journal/${item.slug}`}
                className="flex items-center gap-3 text-sm font-medium text-primary/80 hover:text-accent transition-colors"
              >
                <span className="text-accent">→</span>
                {item.title}
              </Link>
            ))}
          </div>
          {/* Fades */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-secondary/40 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-secondary/40 to-transparent z-10" />
        </div>

        <Link to="/journal" className="shrink-0 hidden sm:flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-primary/50 hover:text-primary transition-colors">
          View All <ArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  )
}
