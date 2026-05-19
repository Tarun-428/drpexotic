import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PenSquare, Plus, Search, Send, Star, Trash2, UploadCloud, BookOpenText } from 'lucide-react'
import { AdminPanel } from '@/components/admin/AdminShell'
import { BlogComposer } from '@/components/admin/BlogComposer'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { BlogPost, BlogPostListItem, TaxonomyOption } from '@/types/cms'

const blankPost = (): BlogPost => ({
  id: 'new',
  title: '',
  slug: '',
  short_description: '',
  featured_image: {
    title: '',
    media_type: 'image',
    url: '',
    public_id: '',
    caption: '',
    alt_text: '',
    width: null,
    height: null,
    duration: null,
  },
  content_blocks: [],
  tags: [],
  categories: [],
  seo: {
    meta_title: '',
    meta_description: '',
    canonical_url: null,
  },
  reading_time_minutes: 1,
  status: 'draft',
  is_featured: false,
  author_id: '',
  author_name: '',
  published_at: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
})

function statusTone(status: 'draft' | 'published') {
  return status === 'published' ? 'success' : 'warning'
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function AdminBlogsPage() {
  const token = useAuthStore((state) => state.token)
  const [posts, setPosts] = useState<BlogPostListItem[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [categories, setCategories] = useState<TaxonomyOption[]>([])
  const [tags, setTags] = useState<TaxonomyOption[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'published'>('all')
  const [saving, setSaving] = useState(false)
  const [quickBlog, setQuickBlog] = useState({
    title: '',
    shortDescription: '',
    content: '',
    file: null as File | null,
    preview: '',
  })

  const load = async () => {
    if (!token) return
    const [postsResponse, categoryOptions, tagOptions] = await Promise.all([
      api.listAdminBlogs(token, {
        search: search || undefined,
        status: statusFilter === 'all' ? undefined : statusFilter,
      }),
      api.listCategories(token),
      api.listTags(token),
    ])
    setPosts(postsResponse.items)
    setCategories(categoryOptions)
    setTags(tagOptions)
  }

  useEffect(() => {
    void load()
  }, [token, search, statusFilter])

  useEffect(() => {
    const saved = window.localStorage.getItem('drp-quick-blog-draft')
    if (!saved) return
    try {
      const parsed = JSON.parse(saved) as Pick<typeof quickBlog, 'title' | 'shortDescription' | 'content'>
      setQuickBlog((current) => ({ ...current, ...parsed }))
    } catch {
      window.localStorage.removeItem('drp-quick-blog-draft')
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem(
      'drp-quick-blog-draft',
      JSON.stringify({
        title: quickBlog.title,
        shortDescription: quickBlog.shortDescription,
        content: quickBlog.content,
      }),
    )
  }, [quickBlog.title, quickBlog.shortDescription, quickBlog.content])

  useEffect(() => {
    if (!quickBlog.file) {
      setQuickBlog((current) => (current.preview ? { ...current, preview: '' } : current))
      return
    }
    const url = URL.createObjectURL(quickBlog.file)
    setQuickBlog((current) => ({ ...current, preview: url }))
    return () => URL.revokeObjectURL(url)
  }, [quickBlog.file])

  const createTaxonomy = async (type: 'category' | 'tag', name: string) => {
    if (!token) return
    const payload = { name, slug: slugify(name) }
    try {
      const created = type === 'category' ? await api.createCategory(token, payload) : await api.createTag(token, payload)
      if (type === 'category') {
        setCategories((current) => [...current, created])
      } else {
        setTags((current) => [...current, created])
      }
      toast.success(`${type === 'category' ? 'Category' : 'Tag'} created.`)
    } catch {
      toast.error(`Could not create ${type}.`)
    }
  }

  return (
    <>
      <PageMeta title="Admin journal" description="Editorial publishing tools for DRP Exotic Farms." path="/admin/blogs" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-4 xl:grid-cols-[20rem_minmax(0,1fr)]">
          <AdminPanel className="flex flex-col gap-3 p-3">
            <div className="text-sm text-zinc-600">Select a story to open and edit</div>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="icon" className="size-11 shrink-0 rounded-2xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950" onClick={() => void load()} aria-label="Refresh" title="Refresh">
                <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.75]">
                  <path d="M20 12a8 8 0 1 1-2.34-5.66" />
                  <path d="M20 4v6h-6" />
                </svg>
              </Button>
              <Button type="button" variant="ghost" size="icon" className="size-11 shrink-0 rounded-2xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950" onClick={() => setSelectedPost(blankPost())} aria-label="New draft" title="New draft">
                <Plus className="size-4" />
              </Button>
            </div>

            <div className="mt-2 flex flex-col gap-2 overflow-auto">
              {posts.length === 0 ? (
                <div className="text-sm text-zinc-500">No stories yet</div>
              ) : (
                posts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={async () => {
                      if (!token) return
                      const fullPost = await api.getAdminBlog(token, post.id)
                      setSelectedPost(fullPost)
                    }}
                    className="flex items-center gap-3 rounded-xl p-2 text-left hover:bg-zinc-50"
                    title={post.title}
                  >
                    <img src={post.featured_image?.url || ''} alt={post.title} className="w-16 h-12 rounded object-cover bg-zinc-100" />
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate text-zinc-800">{post.title || 'Untitled'}</div>
                      <div className="text-xs text-zinc-500 truncate">{post.short_description}</div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </AdminPanel>

          <section>
            {selectedPost ? (
              <BlogComposer
                initialPost={selectedPost}
                busy={saving}
                categories={categories}
                tags={tags}
                onCreateCategory={(name) => createTaxonomy('category', name)}
                onCreateTag={(name) => createTaxonomy('tag', name)}
                onUploadImage={(file, details) => {
                  if (!token) throw new Error('Missing token')
                  return api.uploadMedia(token, {
                    file,
                    title: details.title,
                    altText: details.title,
                    description: details.description,
                    mediaType: 'image',
                    tags: ['journal'],
                  })
                }}
                onSubmit={async (payload) => {
                  if (!token) return
                  setSaving(true)
                  try {
                    const saved =
                      selectedPost.id === 'new' ? await api.createBlog(token, payload) : await api.updateBlog(token, selectedPost.id, payload)
                    toast.success(selectedPost.id === 'new' ? 'Story created.' : 'Story updated.')
                    setSelectedPost(saved)
                    await load()
                  } catch {
                    toast.error('Could not save the story. Check the backend response.')
                  } finally {
                    setSaving(false)
                  }
                }}
              />
            ) : (
              <AdminPanel className="grid min-h-[32rem] place-items-center p-6">
                <Button type="button" onClick={() => setSelectedPost(blankPost())} className="size-12 rounded-2xl">
                  <Plus className="size-4" />
                  <span className="sr-only">Open editor</span>
                </Button>
              </AdminPanel>
            )}
          </section>
        </div>
      </div>
    </>
  )
}
