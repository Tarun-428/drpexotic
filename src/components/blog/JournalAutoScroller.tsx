import { BlogCard } from '@/components/blog/BlogCard'
import type { BlogPostListItem } from '@/types/cms'

export function JournalAutoScroller({ posts }: { posts: BlogPostListItem[] }) {
  if (posts.length === 0) return null

  const loop = posts.length > 1 ? [...posts, ...posts] : posts

  return (
    <div
      className="journal-auto-scroll md:hidden"
      onTouchStart={(event) => event.currentTarget.classList.add('is-paused')}
      onTouchEnd={(event) => event.currentTarget.classList.remove('is-paused')}
    >
      <div className="journal-auto-scroll__track">
        {loop.map((post, index) => (
          <div key={`${post.id}-${index}`} className="journal-auto-scroll__item">
            <BlogCard post={post} compact />
          </div>
        ))}
      </div>
    </div>
  )
}
