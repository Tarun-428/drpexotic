import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Sparkles, TrendingUp } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { api } from '@/lib/api'
import { FALLBACK_BLOG_POSTS } from '@/constants/fallbackContent'
import { LOCAL_ASSETS } from '@/constants/assets'
import type { BlogPostListItem } from '@/types/cms'

function formatDate(value?: string | null) {
  if (!value) return 'Soon'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short' }).format(new Date(value))
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

function StatPill({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/7 px-4 py-3 text-left shadow-[0_16px_50px_-36px_rgba(0,0,0,0.5)] backdrop-blur-sm">
      <div className="text-[1.25rem] font-semibold tracking-[-0.03em] text-cream-50">{value}</div>
      <div className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-cream-50/45">{label}</div>
    </div>
  )
}

/** Compact square card for the grid below the hero */
function SquareCard({ post, index = 0 }: { post: BlogPostListItem; index?: number }) {
  return (
    <Reveal delay={index * 60}>
      <Link
        to={`/journal/${post.slug}`}
        className="group relative flex aspect-square flex-col overflow-hidden rounded-[1.4rem] border border-white/10 bg-white/6 text-cream-50 shadow-[0_14px_48px_-36px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-32px_rgba(0,0,0,0.7)]"
      >
        {/* Background image */}
        <img
          src={post.featured_image.url}
          alt={post.featured_image.alt_text || post.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.07]"
          loading="lazy"
          decoding="async"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/28 to-transparent" />

        {/* Category badge */}
        <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/24 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-cream-50 backdrop-blur-sm">
          <Sparkles className="h-3 w-3 text-gold-400" />
          {post.categories[0] ?? 'Journal'}
        </div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
          <div className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.14em] text-cream-50/45">
            <span>{formatDate(post.published_at)}</span>
            <span className="h-0.5 w-0.5 rounded-full bg-cream-50/25" />
            <span>{post.reading_time_minutes}m</span>
          </div>
          <h3 className="font-display mt-1.5 text-[0.82rem] leading-[1.15] text-cream-50 line-clamp-2">
            {post.title}
          </h3>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-gold-400 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:gap-2">
            Read <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostListItem[]>(FALLBACK_BLOG_POSTS)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 60)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let active = true
    setLoading(true)

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

  const categories = useMemo(() => ['All', ...Array.from(new Set(posts.flatMap((post) => post.categories)))], [posts])

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return posts
    return posts.filter((post) => post.categories.includes(activeCategory))
  }, [activeCategory, posts])

  const featuredPost = useMemo(
    () => filteredPosts.find((post) => post.is_featured) ?? filteredPosts[0] ?? null,
    [filteredPosts],
  )

  const secondaryPosts = useMemo(
    () => filteredPosts.filter((post) => post.id !== featuredPost?.id),
    [featuredPost, filteredPosts],
  )

  const stats = useMemo(
    () => [
      { value: String(filteredPosts.length).padStart(2, '0'), label: 'Stories live' },
      { value: String(categories.length - 1).padStart(2, '0'), label: 'Topics' },
      { value: String(posts[0]?.reading_time_minutes ?? 3).padStart(2, '0'), label: 'Avg read' },
    ],
    [categories.length, filteredPosts.length, posts],
  )

  const heroSpotlight = featuredPost ?? posts[0]

  return (
    <>
      <PageMeta
        title="Journal"
        description="Editorial stories, orchard insights, premium agritech thinking, and field narratives from DRP Exotic Farms."
        path="/journal"
      />

      <div className="page-shell relative overflow-x-hidden">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden px-6 pb-10 pt-22 text-cream-50 sm:pb-12 lg:pb-16 lg:pt-24">
          <div className="absolute inset-0 pointer-events-none opacity-80">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(200,169,107,0.16),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(90,143,99,0.18),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(11,61,46,0.5),transparent_40%)]" />
            <img
              src={LOCAL_ASSETS.orchardNight}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen"
              aria-hidden="true"
              decoding="async"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,61,46,0.62)_0%,rgba(11,61,46,0.74)_52%,rgba(11,61,46,0.92)_100%)]" />
          </div>

          {/* LEFT = text/meta  |  RIGHT = featured image card */}
          <div className="relative z-10 mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">

            {/* ── LEFT: copy block ── */}
            <div className="max-w-xl">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.22em] text-cream-50/82 backdrop-blur-sm"
                style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(16px)', transition: 'opacity .65s ease, transform .65s ease' }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                Journal
              </span>

              <h1
                className="font-display mt-5 text-[clamp(2.45rem,5vw,4.8rem)] leading-[0.95] tracking-[-0.03em] text-cream-50"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'none' : 'translateY(20px)',
                  transition: 'opacity .75s ease 120ms, transform .75s ease 120ms',
                }}
              >
                Stories from the orchard, shaped like a luxury editorial.
              </h1>

              <p
                className="mt-5 text-[clamp(.88rem,1.3vw,1rem)] leading-[1.78] text-cream-50/72"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'none' : 'translateY(18px)',
                  transition: 'opacity .75s ease 220ms, transform .75s ease 220ms',
                }}
              >
                Field notes, harvest thinking, and premium agritech stories curated to feel as intentional as the rest of the brand.
              </p>

              {/* Search */}
              <div
                className="mt-7 flex max-w-[380px] items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2.5 shadow-[0_14px_42px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md"
                style={{
                  opacity: heroVisible ? 1 : 0,
                  transform: heroVisible ? 'none' : 'translateY(14px)',
                  transition: 'opacity .75s ease 320ms, transform .75s ease 320ms',
                }}
              >
                <Search className="h-4 w-4 shrink-0 text-cream-50/40" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search stories, seasons, insights…"
                  className="w-full border-none bg-transparent text-[0.86rem] text-cream-50 outline-none placeholder:text-cream-50/34"
                />
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <StatPill key={stat.label} value={stat.value} label={stat.label} />
                ))}
              </div>

              {/* Spotlight meta (visible on mobile below stats; hidden on desktop — shown inside card) */}
              {heroSpotlight && (
                <div
                  className="mt-6 lg:hidden"
                  style={{
                    opacity: heroVisible ? 1 : 0,
                    transition: 'opacity .75s ease 420ms',
                  }}
                >
                  <div className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-400">Editor's spotlight</div>
                  <h2 className="font-display mt-2 text-[1.4rem] leading-[1.05] text-cream-50">{heroSpotlight.title}</h2>
                  <p className="mt-1.5 text-[0.82rem] leading-[1.65] text-cream-50/68 line-clamp-2">
                    {heroSpotlight.short_description}
                  </p>
                  <Link
                    to={`/journal/${heroSpotlight.slug}`}
                    className="mt-3 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-gold-400"
                  >
                    Continue reading <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* ── RIGHT: featured image card ── */}
            <Reveal className="lg:pl-2">
              {heroSpotlight ? (
                <Link
                  to={`/journal/${heroSpotlight.slug}`}
                  className="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-[0_28px_90px_-48px_rgba(0,0,0,0.75)]"
                >
                  <div className="relative aspect-[4/3] lg:aspect-[16/11]">
                    <img
                      src={heroSpotlight.featured_image.url}
                      alt={heroSpotlight.featured_image.alt_text || heroSpotlight.title}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.06]"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/18 to-transparent" />

                    {/* Overlay card — visible only on desktop */}
                    <div className="absolute inset-x-5 bottom-5 hidden rounded-[1.4rem] border border-white/10 bg-black/20 p-5 backdrop-blur-sm lg:block">
                      <div className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-400">Editor's spotlight</div>
                      <h2 className="font-display mt-2.5 text-[clamp(1.4rem,2.2vw,2rem)] leading-[1.04] text-cream-50">
                        {heroSpotlight.title}
                      </h2>
                      <p className="mt-2 text-[0.82rem] leading-[1.65] text-cream-50/72 line-clamp-2">
                        {heroSpotlight.short_description || "A featured orchard story set against the brand's premium visual language."}
                      </p>
                      <div className="mt-3.5 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-gold-400 transition-all duration-200 group-hover:gap-3">
                        Continue reading
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="rounded-[2rem] border border-white/10 bg-white/6 p-10 text-cream-50/70 backdrop-blur-sm">
                  No stories are available right now.
                </div>
              )}
            </Reveal>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[rgb(11,61,46)]" />
        </section>

        {/* ── TRENDING TOPICS TICKER ── */}
        <section className="section-shell relative z-10 py-4 sm:py-5">
          <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/6 px-5 py-3.5 text-cream-50 shadow-[0_18px_60px_-44px_rgba(0,0,0,0.66)] backdrop-blur-sm sm:px-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[0.72rem] uppercase tracking-[0.18em] text-cream-50/48">
              <span className="inline-flex items-center gap-2 text-gold-400">
                <TrendingUp className="h-4 w-4" />
                Trending topics
              </span>
              {categories.slice(1, 6).map((category) => (
                <span key={category} className="rounded-full border border-white/10 bg-white/7 px-3 py-1 text-cream-50/76">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATEGORY FILTER ── */}
        <section className="section-shell relative z-10 pb-6 pt-4 sm:pb-8 lg:pb-10">
          <Reveal>
            <div className="mb-5 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-cream-50/42">
              <span>Browse by topic</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className="rounded-full border px-4 py-1.5 text-[0.72rem] font-medium tracking-[0.08em] transition-all duration-200"
                  style={{
                    borderColor: activeCategory === category ? '#dcc390' : 'rgba(253,250,244,0.16)',
                    background: activeCategory === category ? 'rgba(220,195,144,0.96)' : 'rgba(255,255,255,0.04)',
                    color: activeCategory === category ? '#0b3d2e' : 'rgba(253,250,244,0.78)',
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── COMPACT SQUARE GRID ── */}
        <section className="section-shell relative z-10 pb-16 pt-4 sm:pb-20 lg:pb-24">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <h2 className="font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight text-cream-50">
                Latest from the field
              </h2>
            </Reveal>
            <Reveal>
              <span className="text-[0.75rem] text-cream-50/38">
                {filteredPosts.length === 1 ? '1 story' : `${filteredPosts.length} stories`}
              </span>
            </Reveal>
          </div>

          {loading && filteredPosts.length === 0 ? (
            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/6 p-8 text-cream-50/60 backdrop-blur-sm">
              Loading stories…
            </div>
          ) : secondaryPosts.length > 0 ? (
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {secondaryPosts.map((post, index) => (
                <SquareCard key={post.id} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/6 p-8 text-cream-50/64 backdrop-blur-sm">
              No stories matched your current filter.
            </div>
          )}
        </section>

        {/* ── JOURNAL VOICE CALLOUT ── */}
        <section className="section-shell relative z-10 pb-16 sm:pb-20 lg:pb-24">
          <Reveal>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_80px_-50px_rgba(0,0,0,0.72)] backdrop-blur-sm sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-400">
                    <Sparkles className="h-4 w-4" />
                    The journal voice
                  </div>
                  <h3 className="font-display mt-5 max-w-2xl text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.04] text-cream-50">
                    Field notes, refined like an editorial feature.
                  </h3>
                  <p className="mt-4 max-w-2xl text-[0.92rem] leading-[1.8] text-cream-50/72">
                    This page now follows the same restraint, contrast, and premium layering as the rest of the site so the blog feels like part of the brand, not a separate system.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/14 p-4 text-cream-50/72">
                    <div className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold-400">Tone</div>
                    <div className="mt-2 text-sm leading-relaxed">Quiet, premium, agricultural, and editorial.</div>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/14 p-4 text-cream-50/72">
                    <div className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold-400">Layout</div>
                    <div className="mt-2 text-sm leading-relaxed">Hero-led, card-rich, and easy to scan on mobile.</div>
                  </div>
                  <div className="rounded-[1.4rem] border border-white/10 bg-black/14 p-4 text-cream-50/72 sm:col-span-2">
                    <div className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-gold-400">Theme</div>
                    <div className="mt-2 text-sm leading-relaxed">Forest, cream, and gold, with soft blur surfaces and elegant spacing.</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </div>
    </>
  )
}