import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { motion } from 'framer-motion'
import type { BlogPostListItem } from '@/types/cms'

function formatDate(value?: string | null) {
  if (!value) return 'Draft'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}

export function BlogCard({ post, featured = false, compact = false }: { post: BlogPostListItem; featured?: boolean; compact?: boolean }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`cinematic-surface overflow-hidden ${compact ? 'rounded-[1.2rem] lg:rounded-[1.45rem]' : 'rounded-[1.35rem] lg:rounded-[2rem]'}`}
    >
      <Link to={`/journal/${post.slug}`} className={`grid h-full ${featured ? 'lg:grid-cols-[0.9fr_1.1fr]' : ''}`}>
        <div className="relative overflow-hidden">
          <img
            src={post.featured_image.url}
            alt={post.featured_image.alt_text || post.title}
            className={`w-full object-cover transition duration-700 hover:scale-[1.04] ${
              featured
                ? 'aspect-[16/10] max-h-[210px] sm:max-h-[250px] lg:h-full lg:max-h-[300px]'
                : compact
                  ? 'aspect-[16/10] max-h-[150px] sm:max-h-[180px] lg:max-h-[220px]'
                  : 'aspect-[16/10] max-h-[185px] sm:max-h-[220px] lg:max-h-[300px]'
            }`}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/56 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-cream-50">
            <span className="rounded-full border border-white/14 bg-black/24 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em]">
              {post.categories[0] ?? 'Journal'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-cream-50/78">
              <Clock3 className="size-3.5" />
              {post.reading_time_minutes} min
            </span>
          </div>
        </div>
        <div className={`flex flex-col justify-between ${compact ? 'p-3.5 lg:p-4' : `p-4 sm:p-5 ${featured ? 'lg:p-7' : 'lg:p-5'}`}`}>
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-forest-900/48">{formatDate(post.published_at)}</p>
            <h3 className={`mt-2.5 font-display leading-[0.98] text-forest-900 ${featured ? 'text-[clamp(1.5rem,3vw,3rem)]' : compact ? 'text-[1.2rem] lg:text-[1.55rem]' : 'text-[1.35rem] lg:text-[1.85rem]'}`}>
              {post.title}
            </h3>
            <p className={`${compact ? 'mt-2 line-clamp-2 text-xs lg:text-sm' : 'mt-2.5 text-sm sm:text-base'} leading-relaxed text-forest-900/72`}>
              {post.short_description}
            </p>
          </div>
          <div className={`${compact ? 'mt-3' : 'mt-4 lg:mt-5'} flex items-center justify-between gap-4`}>
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 2).map((tag, index) => (
                <span key={`${tag}-${index}`} className="rounded-full bg-forest-900/6 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-forest-900/56">
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-forest-900 lg:text-sm">
              Read story
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
