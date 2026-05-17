import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { BlogCard } from '@/components/blog/BlogCard'
import { PreviewSection } from '@/components/preview/PreviewSection'
import { api } from '@/lib/api'
import { LOCAL_ASSETS } from '@/constants/assets'
import { FALLBACK_BLOG_POSTS } from '@/constants/fallbackContent'
import type { BlogPostListItem } from '@/types/cms'

const pagePreviews = [
  { eyebrow: 'About', title: 'Origin and philosophy', body: 'Read the estate story behind the field notes.', to: '/about', image: LOCAL_ASSETS.orchardTeam },
  { eyebrow: 'Produce', title: 'The fruit collection', body: 'Connect journal mood to the varieties in season.', to: '/produce', image: LOCAL_ASSETS.dragonFruitHalves },
  { eyebrow: 'Gallery', title: 'Visual farm journal', body: 'Step from written stories into orchard imagery.', to: '/gallery', image: LOCAL_ASSETS.dragonFruitRows },
] as const

function formatDate(value?: string | null) {
  if (!value) return 'Soon'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(new Date(value))
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostListItem[]>(FALLBACK_BLOG_POSTS)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let active = true
    window.queueMicrotask(() => {
      if (active) setLoading(true)
    })
    void api
      .listPublicBlogs({ search: search || undefined })
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
  }, [search])

  const [featured, ...rest] = useMemo(() => posts, [posts])
  const ribbonItems = (rest.length > 0 ? rest : posts).slice(0, 4)
  const ribbonLoop = ribbonItems.length > 1 ? [...ribbonItems, ...ribbonItems] : ribbonItems

  return (
    <>
      <PageMeta
        title="Journal"
        description="Editorial stories, orchard insights, premium agritech thinking, and field narratives from DRP Exotic Farms in a more compact journal experience."
        path="/journal"
      />

      <div className="relative overflow-hidden">
        <section className="section-shell py-10 sm:py-12 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end">
            <div>
              <span className="section-label">Editorial journal</span>
              <h1 className="mt-4 font-display text-[clamp(2rem,6vw,5rem)] leading-[0.94] tracking-[-0.04em] text-forest-900">
                Premium orchard storytelling, made faster to scan.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-forest-900/72 sm:text-base lg:text-lg">
                A compact stream of harvest notes, orchard insights, agritech thinking, and field activity.
              </p>
            </div>
            <div className="rounded-[1.2rem] border border-[#ddd3c4] bg-white/82 p-3.5 shadow-[0_16px_30px_-24px_rgba(11,61,46,0.18)]">
              <div className="flex items-center gap-2 rounded-[1rem] border border-[#e8dfd0] bg-[#f8f3ea] px-3 py-2.5">
                <Search className="size-4 text-forest-900/46" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search stories"
                  className="h-6 w-full bg-transparent text-sm text-forest-900 outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {ribbonItems.length > 0 ? (
          <section className="section-shell py-2 sm:py-4 lg:py-6">
            <div
              className={`news-ribbon ${paused ? 'is-paused' : ''}`}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              <div className="news-ribbon__track">
                {ribbonLoop.map((item, index) => (
                  <Link key={`${item.id}-${index}`} to={`/journal/${item.slug}`} className="news-ribbon__item">
                    <img src={item.featured_image.url} alt={item.featured_image.alt_text || item.title} className="h-12 w-12 shrink-0 rounded-[0.85rem] object-cover" loading="lazy" decoding="async" />
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
        ) : null}

        <section className="section-shell pb-10 pt-6 sm:pb-14 sm:pt-8 lg:pb-20">
          {featured ? <BlogCard post={featured} featured /> : null}

          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3 lg:mt-6 lg:gap-5">
            {(rest.length > 0 ? rest : posts).map((post) => (
              <div key={post.id}>
                <BlogCard post={post} compact />
              </div>
            ))}
          </div>

          {!loading && posts.length === 0 ? (
            <div className="mt-6 rounded-[1.3rem] border border-[#ddd3c4] bg-white/82 p-6 text-center text-sm text-forest-900/68 lg:rounded-[2rem] lg:p-8">
              No stories matched the current search.
            </div>
          ) : null}
        </section>

        <PreviewSection eyebrow="More paths" title="Let each article open into the wider orchard experience." items={pagePreviews} />
      </div>
    </>
  )
}
