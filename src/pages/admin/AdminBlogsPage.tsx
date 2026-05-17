import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PenSquare, Plus, Send, Trash2, UploadCloud } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { BlogComposer } from '@/components/admin/BlogComposer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { BlogPost, BlogPostListItem } from '@/types/cms'

export default function AdminBlogsPage() {
  const token = useAuthStore((state) => state.token)
  const [posts, setPosts] = useState<BlogPostListItem[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [search, setSearch] = useState('')
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
    const postsResponse = await api.listAdminBlogs(token, search ? { search } : undefined)
    setPosts(postsResponse.items)
  }

  useEffect(() => {
    void load()
  }, [token, search])

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

  return (
    <>
      <PageMeta title="Admin journal" description="Editorial publishing tools for DRP Exotic Farms." path="/admin/blogs" />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
          <section className="space-y-5">
            <div className="cinematic-surface rounded-[2rem] border border-white/8 bg-white/6 p-5 text-cream-50">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Journal archive</p>
                  <h1 className="mt-2 font-display text-3xl">Published and draft stories</h1>
                </div>
                <Button type="button" size="sm" onClick={() => setSelectedPost(null)}>
                  <Plus className="size-4" />
                  New
                </Button>
              </div>
              <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search stories" className="admin-field mt-4" />
              <div className="mt-4 grid gap-3">
                {posts.map((post) => (
                  <article key={post.id} className="rounded-[1.5rem] border border-white/8 bg-black/18 p-4">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-gold-400">{post.status}</p>
                    <h2 className="mt-2 font-display text-2xl leading-none text-cream-50">{post.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-cream-50/64">{post.short_description}</p>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={async () => {
                          if (!token) return
                          const fullPost = await api.getAdminBlog(token, post.id)
                          setSelectedPost(fullPost)
                        }}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream-50/76"
                      >
                        <PenSquare className="size-4" />
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (!token) return
                          await api.deleteBlog(token, post.id)
                          setPosts((current) => current.filter((item) => item.id !== post.id))
                          if (selectedPost?.id === post.id) setSelectedPost(null)
                          toast.success('Story deleted.')
                        }}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-300"
                      >
                        <Trash2 className="size-4" />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </section>

          <section>
            {!selectedPost ? (
              <div className="cinematic-surface rounded-[2rem] border border-white/8 bg-white/6 p-5 text-cream-50 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Quick publish</p>
                    <h2 className="mt-2 font-display text-3xl">Write the story, upload one image, publish.</h2>
                  </div>
                  <Button
                    type="button"
                    disabled={saving || !token || !quickBlog.file || quickBlog.title.trim().length < 8 || quickBlog.shortDescription.trim().length < 20}
                    onClick={async () => {
                      if (!token || !quickBlog.file) return
                      setSaving(true)
                      try {
                        const asset = await api.uploadMedia(token, {
                          file: quickBlog.file,
                          title: quickBlog.title,
                          altText: quickBlog.title,
                          description: quickBlog.shortDescription,
                          mediaType: 'image',
                          tags: ['journal'],
                        })
                        const content = quickBlog.content.trim() || quickBlog.shortDescription
                        const saved = await api.createBlog(token, {
                          title: quickBlog.title.trim(),
                          slug: quickBlog.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
                          short_description: quickBlog.shortDescription.trim(),
                          featured_image: {
                            title: asset.title,
                            media_type: 'image',
                            url: asset.secure_url,
                            public_id: asset.public_id,
                            caption: asset.description,
                            alt_text: asset.alt_text,
                            width: asset.width ?? null,
                            height: asset.height ?? null,
                            duration: null,
                          },
                          content_blocks: content.split(/\n{2,}/).map((text) => ({
                            id: crypto.randomUUID(),
                            type: 'paragraph',
                            text: text.trim(),
                            items: [],
                            alignment: 'center',
                          })),
                          tags: [],
                          categories: [],
                          seo: {
                            meta_title: quickBlog.title.trim(),
                            meta_description: quickBlog.shortDescription.trim().slice(0, 160),
                          },
                          reading_time_minutes: Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 180)),
                          status: 'published',
                          is_featured: false,
                        })
                        toast.success('Story published.')
                        window.localStorage.removeItem('drp-quick-blog-draft')
                        setQuickBlog({ title: '', shortDescription: '', content: '', file: null, preview: '' })
                        setSelectedPost(saved)
                        await load()
                      } catch {
                        toast.error('Could not publish story.')
                      } finally {
                        setSaving(false)
                      }
                    }}
                  >
                    <Send className="size-4" />
                    {saving ? 'Publishing...' : 'Publish now'}
                  </Button>
                </div>

                <div className="mt-5 grid gap-4">
                  <label
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={(event) => {
                      event.preventDefault()
                      const file = event.dataTransfer.files[0]
                      if (file?.type.startsWith('image/')) setQuickBlog((current) => ({ ...current, file }))
                    }}
                    className="flex min-h-[12rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.5rem] border border-dashed border-white/16 bg-black/18 px-5 text-center transition hover:border-gold-400/45 hover:bg-black/24"
                  >
                    {quickBlog.preview ? (
                      <img src={quickBlog.preview} alt="" className="h-52 w-full rounded-[1.15rem] object-cover" />
                    ) : (
                      <>
                        <UploadCloud className="size-8 text-gold-400" />
                        <p className="mt-3 text-sm text-cream-50/72">Drop a cover image here or tap to browse.</p>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.target.files?.[0]
                        if (file) setQuickBlog((current) => ({ ...current, file }))
                      }}
                    />
                  </label>
                  <Input value={quickBlog.title} onChange={(event) => setQuickBlog((current) => ({ ...current, title: event.target.value }))} placeholder="Story title" className="admin-field" />
                  <Textarea rows={3} value={quickBlog.shortDescription} onChange={(event) => setQuickBlog((current) => ({ ...current, shortDescription: event.target.value }))} placeholder="Short description" className="admin-field min-h-[7rem]" />
                  <Textarea rows={8} value={quickBlog.content} onChange={(event) => setQuickBlog((current) => ({ ...current, content: event.target.value }))} placeholder="Write the article. Use blank lines for paragraph breaks." className="admin-field min-h-[14rem]" />
                  <p className="text-xs text-cream-50/48">Autosaved on this device while you type.</p>
                </div>
              </div>
            ) : (
              <BlogComposer
                initialPost={selectedPost}
                busy={saving}
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
                    const saved = selectedPost ? await api.updateBlog(token, selectedPost.id, payload) : await api.createBlog(token, payload)
                    toast.success(selectedPost ? 'Story updated.' : 'Story created.')
                    setSelectedPost(saved)
                    await load()
                  } catch {
                    toast.error('Could not save the story. Check the backend response.')
                  } finally {
                    setSaving(false)
                  }
                }}
              />
            )}
          </section>
        </div>
      </div>
    </>
  )
}
