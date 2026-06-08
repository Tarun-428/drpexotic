import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock3, Share2 } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { BlogContentRenderer } from '@/components/blog/BlogContentRenderer'
import { BlogCard } from '@/components/blog/BlogCard'
import { FALLBACK_BLOG_DETAILS, FALLBACK_BLOG_POSTS } from '@/constants/fallbackContent'
import { api } from '@/lib/api'
import type { BlogPost, BlogPostListItem } from '@/types/cms'

function formatDate(value?: string | null) {
  if (!value) return 'Draft'
  return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value))
}

export default function BlogPostPage() {
  const { slug = '' } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [related, setRelated] = useState<BlogPostListItem[]>([])

  useEffect(() => {
    let active = true
    void api
      .getPublicBlog(slug)
      .then((response) => {
        if (active) setPost(response)
      })
      .catch(() => {
        const fallbackPost = FALLBACK_BLOG_DETAILS.find((entry) => entry.slug === slug)
        if (active && fallbackPost) setPost(fallbackPost)
      })

    void api
      .getRelatedBlogs(slug)
      .then((response) => {
        if (active) setRelated(response)
      })
      .catch(() => {
        if (active) setRelated(FALLBACK_BLOG_POSTS.filter((entry) => entry.slug !== slug).slice(0, 3))
      })

    return () => {
      active = false
    }
  }, [slug])

  if (!post) {
    return (
      <div className="section-shell py-24">
        <div className="rounded-[2rem] border border-primary/10 bg-white p-8 text-center text-primary/70 shadow-sm">Loading story...</div>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <PageMeta title={post.seo.meta_title} description={post.seo.meta_description} path={`/journal/${post.slug}`} />

      <article className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-primary text-neutral">
          <img
            src={post.featured_image.url}
            alt={post.featured_image.alt_text || post.title}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,24,18,0.72),rgba(7,24,18,0.92))]" />
          <div className="section-shell page-hero-shell relative z-10">
            <Link to="/journal" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral/90 transition hover:text-accent">
              <ArrowLeft className="size-4" />
              Back to journal
            </Link>
            <div className="mt-8 max-w-4xl">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-accent">{formatDate(post.published_at)}</p>
              <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.3rem,5vw,5rem)] leading-[1.02] text-neutral">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral/86 sm:text-lg">{post.short_description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-neutral/82">
                <span>{post.author_name}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="size-4" />
                  {post.reading_time_minutes} min read
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-14 sm:py-18 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_5rem]">
            <div className="mx-auto w-full max-w-3xl">
              <BlogContentRenderer blocks={post.content_blocks} />
            </div>

            <div className="lg:sticky lg:top-28 lg:h-fit">
              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    void navigator.share({ title: post.title, text: post.short_description, url: shareUrl })
                    return
                  }
                  if (shareUrl) void navigator.clipboard.writeText(shareUrl)
                }}
                className="inline-flex size-12 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-[0_18px_44px_-28px_rgba(11,61,46,0.4)] transition hover:-translate-y-0.5 hover:border-accent/60"
                aria-label="Share article"
              >
                <Share2 className="size-4" />
              </button>
            </div>
          </div>
        </section>

        {related.length > 0 ? (
          <section className="section-shell pb-20 sm:pb-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="section-label">Related reading</span>
                <h2 className="section-title mt-5 max-w-3xl">Continue through the orchard journal.</h2>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <BlogCard key={item.id} post={item} compact />
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </>
  )
}
