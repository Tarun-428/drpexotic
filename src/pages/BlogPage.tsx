import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Search, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageMeta } from '@/components/seo/PageMeta'
import { api } from '@/lib/api'
import { FALLBACK_BLOG_POSTS } from '@/constants/fallbackContent'
import type { BlogPostListItem } from '@/types/cms'
import { LOCAL_ASSETS } from '@/constants/assets'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

function formatDate(value?: string | null) {
  if (!value) return 'Soon'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value))
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostListItem[]>(FALLBACK_BLOG_POSTS)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const deferredSearch = useDeferredValue(search)

  useEffect(() => {
    let active = true
    void api
      .listPublicBlogs({ search: deferredSearch || undefined })
      .then((response) => {
        if (active && response.items.length > 0) setPosts(response.items)
      })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [deferredSearch])

  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.flatMap((post) => post.categories)))], [posts])

  const filteredPosts = useMemo(() => {
    let result = posts
    if (activeCategory !== 'All') {
      result = result.filter((post) => post.categories.includes(activeCategory))
    }
    return result
  }, [activeCategory, posts])

  const featuredPost = useMemo(() => filteredPosts.find((p) => p.is_featured) || filteredPosts[0], [filteredPosts])
  const regularPosts = useMemo(() => filteredPosts.filter((p) => p.id !== featuredPost?.id), [featuredPost, filteredPosts])

  return (
    <>
      <PageMeta
        title="Journal | DRP Exotic Farms"
        description="Insights, stories, and updates from the world of exotic fruit farming."
        path="/journal"
      />

      {/* HERO */}
      <section className="bg-primary pt-32 pb-20 text-neutral relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={LOCAL_ASSETS.dragonFruitHalves} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-4xl">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">Field Notes</span>
            <h1 className="text-4xl sm:text-7xl font-display leading-tight mt-6 mb-8">
              The <span className="text-accent">DRP Journal</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed max-w-3xl">
              Professional insights, harvest updates, and educational stories from our exotic fruit orchards.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-neutral border-b border-primary/5">
        <div className="section-shell py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-neutral'
                      : 'bg-secondary/50 text-primary hover:bg-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary/30" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-secondary/30 border border-primary/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral">
        <div className="section-shell">
          {/* Featured Post */}
          {featuredPost && activeCategory === 'All' && !search && (
            <motion.div {...fadeIn} className="mb-16 sm:mb-20">
              <Link to={`/journal/${featuredPost.slug}`} className="group grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl">
                  <img
                    src={featuredPost.featured_image.url}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <span className="bg-accent text-primary px-4 py-1 rounded-full text-[0.6rem] font-bold tracking-widest uppercase">
                      Featured
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-4 text-primary/40 text-[0.65rem] font-bold uppercase tracking-widest mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" />
                      {formatDate(featuredPost.published_at)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" />
                      {featuredPost.reading_time_minutes} Min Read
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl lg:text-5xl font-display text-primary leading-tight mb-6 group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-primary/70 text-sm sm:text-lg leading-relaxed mb-8 line-clamp-3">
                    {featuredPost.short_description}
                  </p>
                  <div className="flex items-center gap-2 text-primary text-sm font-bold group-hover:gap-4 transition-all">
                    Read Full Article
                    <ArrowRight className="size-4 sm:size-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Regular Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
            {(activeCategory !== 'All' || search ? filteredPosts : regularPosts).map((post, idx) => (
              <motion.div
                key={post.id}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Link to={`/journal/${post.slug}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 shadow-sm group-hover:shadow-lg transition-all">
                    <img
                      src={post.featured_image.url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center gap-3 text-primary/40 text-[0.6rem] font-bold uppercase tracking-widest mb-3">
                    <span>{formatDate(post.published_at)}</span>
                    <span>•</span>
                    <span>{post.reading_time_minutes} Min Read</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-primary/70 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.short_description}
                  </p>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-primary group-hover:gap-3 transition-all">
                    Read More <ArrowRight className="size-3 sm:size-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-xl sm:text-2xl font-display text-primary/50">No articles found matching your criteria.</h3>
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="bg-secondary/30 py-16 sm:py-20">
        <div className="section-shell text-center">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="section-title">Stay Updated</h2>
            <p className="section-description mx-auto mb-8">
              Join our mailing list to receive the latest harvest updates and agricultural news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-neutral border border-primary/5 focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
              />
              <Button size="lg" className="w-full sm:w-auto">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
