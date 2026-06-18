import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowDown, ArrowUp, ImagePlus, Trash2, UploadCloud, Video, Tag as TagIcon, X, Plus, Edit2, Check } from 'lucide-react'
import { AdminPanel } from '@/components/admin/AdminShell'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { GalleryItem, TaxonomyOption } from '@/types/cms'

function TagSelector({ 
  selectedTags, 
  availableTags, 
  onToggle, 
  onCreate 
}: { 
  selectedTags: string[], 
  availableTags: TaxonomyOption[], 
  onToggle: (tagName: string) => void,
  onCreate: (tagName: string) => void
}) {
  const [query, setQuery] = useState('')
  const filtered = availableTags.filter(t => t.name.toLowerCase().includes(query.toLowerCase()) && !selectedTags.includes(t.name))
  const showCreate = query.trim() !== '' && !availableTags.some(t => t.name.toLowerCase() === query.trim().toLowerCase())

  return (
    <div className="grid gap-2">
      <div className="flex flex-wrap gap-1.5 p-2 border rounded-xl bg-zinc-50/50 min-h-[2.5rem]">
        {selectedTags.length === 0 && <span className="text-zinc-400 text-xs italic p-1">No tags selected</span>}
        {selectedTags.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium border border-emerald-200">
            {tag}
            <button onClick={() => onToggle(tag)} className="hover:text-emerald-900"><X className="size-3" /></button>
          </span>
        ))}
      </div>
      <div className="relative group">
        <Input 
          value={query} 
          onChange={e => setQuery(e.target.value)} 
          placeholder="Search or add tags..." 
          className="admin-field pl-8"
        />
        <TagIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
        
        {query.trim() !== '' && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-xl shadow-xl max-h-48 overflow-y-auto p-1">
            {filtered.map(tag => (
              <button
                key={tag.id}
                onClick={() => {
                  onToggle(tag.name)
                  setQuery('')
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-zinc-50 rounded-lg flex items-center justify-between"
              >
                {tag.name}
                <Plus className="size-3 text-zinc-400" />
              </button>
            ))}
            {showCreate && (
              <button
                onClick={() => {
                  onCreate(query.trim())
                  setQuery('')
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-emerald-50 text-emerald-600 font-medium rounded-lg flex items-center justify-between"
              >
                Create "{query.trim()}"
                <Plus className="size-3" />
              </button>
            )}
            {filtered.length === 0 && !showCreate && (
              <div className="px-3 py-2 text-sm text-zinc-400 italic">No matches</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function AdminGalleryPage() {
  const token = useAuthStore((state) => state.token)
  const [items, setItems] = useState<GalleryItem[]>([])
  const [tags, setTags] = useState<TaxonomyOption[]>([])
  const [quickFile, setQuickFile] = useState<File | null>(null)
  const [quickPreview, setQuickPreview] = useState('')
  const [busy, setBusy] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // Tag Management State
  const [editingTagId, setEditingTagId] = useState<string | null>(null)
  const [editingTagName, setEditingTagName] = useState('')

  const load = async () => {
    if (!token) return
    const [galleryResponse, tagsResponse] = await Promise.all([
      api.listAdminGallery(token),
      api.listTags(token)
    ])
    setItems(galleryResponse.items)
    setTags(tagsResponse)
  }

  useEffect(() => {
    void load()
  }, [token])

  useEffect(() => {
    if (!quickFile) {
      setQuickPreview('')
      return
    }
    const url = URL.createObjectURL(quickFile)
    setQuickPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [quickFile])

  const selectFile = (file: File | undefined) => {
    if (!file) return
    setQuickFile(file)
    setTitle((current) => current || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '))
  }

  const handleCreateTag = async (name: string) => {
    if (!token) return
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const newTag = await api.createTag(token, { name, slug })
      setTags(curr => [...curr.filter(t => t.name.toLowerCase() !== name.toLowerCase()), newTag])
      if (!selectedTags.includes(newTag.name)) {
        setSelectedTags(curr => [...curr, newTag.name])
      }
    } catch {
      toast.error('Failed to create tag')
    }
  }

  const toggleTag = (tagName: string) => {
    setSelectedTags(curr => curr.includes(tagName) ? curr.filter(t => t !== tagName) : [...curr, tagName])
  }

  const handleUpdateTag = async (tagId: string) => {
    if (!token || !editingTagName.trim()) return
    try {
      const slug = editingTagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const updated = await api.updateTag(token, tagId, { name: editingTagName.trim(), slug })
      setTags(curr => curr.map(t => t.id === tagId ? updated : t))
      // Update tags in items too
      const oldTag = tags.find(t => t.id === tagId)
      if (oldTag) {
        setItems(curr => curr.map(item => ({
          ...item,
          tags: item.tags?.map(t => t === oldTag.name ? updated.name : t) || []
        })))
      }
      setEditingTagId(null)
      toast.success('Tag updated')
    } catch {
      toast.error('Failed to update tag')
    }
  }

  const handleDeleteTag = async (tagId: string) => {
    if (!token || !confirm('Are you sure you want to delete this tag? It will be removed from all images.')) return
    try {
      await api.deleteTag(token, tagId)
      const deletedTag = tags.find(t => t.id === tagId)
      setTags(curr => curr.filter(t => t.id !== tagId))
      if (deletedTag) {
        setItems(curr => curr.map(item => ({
          ...item,
          tags: item.tags?.filter(t => t !== deletedTag.name) || []
        })))
        setSelectedTags(curr => curr.filter(t => t !== deletedTag.name))
      }
      toast.success('Tag deleted')
    } catch {
      toast.error('Failed to delete tag')
    }
  }

  const moveItem = async (itemId: string, direction: -1 | 1) => {
    const index = items.findIndex((item) => item.id === itemId)
    const targetIndex = index + direction
    if (index < 0 || targetIndex < 0 || targetIndex >= items.length || !token) return
    const reordered = [...items]
    const [entry] = reordered.splice(index, 1)
    reordered.splice(targetIndex, 0, entry)
    setItems(reordered)
    await api.reorderGallery(token, reordered.map((item) => item.id))
  }

  return (
    <>
      <PageMeta title="Admin gallery" description="Gallery curation and ordering for DRP Exotic Farms." path="/admin/gallery" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex justify-end">
          <Button type="button" variant="ghost" size="icon" className="size-11 rounded-2xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950" onClick={() => void load()} aria-label="Refresh" title="Refresh">
            <svg aria-hidden viewBox="0 0 24 24" className="size-4 fill-none stroke-current stroke-[1.75]">
              <path d="M20 12a8 8 0 1 1-2.34-5.66" />
              <path d="M20 4v6h-6" />
            </svg>
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[24rem_minmax(0,1fr)]">
          <div className="grid gap-6">
            <AdminPanel className="p-5">
              <div className="grid gap-3">
                <div className="text-sm font-medium text-zinc-900">Add to gallery</div>
                <label
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault()
                    selectFile(event.dataTransfer.files[0])
                  }}
                  className="group flex min-h-[11rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.35rem] border border-dashed border-zinc-200 bg-white px-4 text-center transition hover:border-emerald-300 hover:bg-emerald-50/60"
                >
                  {quickPreview ? (
                    quickFile?.type.startsWith('video/') ? (
                      <video src={quickPreview} className="h-44 w-full rounded-[1rem] object-cover" muted playsInline preload="metadata" />
                    ) : (
                      <img src={quickPreview} alt="" className="h-44 w-full rounded-[1rem] object-cover" />
                    )
                  ) : (
                    <>
                      <UploadCloud className="size-8 text-emerald-600" />
                      <span className="sr-only">Upload</span>
                    </>
                  )}
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={(event) => selectFile(event.target.files?.[0])} />
                </label>

                <div className="text-xs text-zinc-500">Choose a file to upload; uploaded images are published directly to the gallery.</div>

                <div>
                  <label className="text-sm text-zinc-700">Title</label>
                  <Input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Title" className="admin-field" />
                </div>
                <div>
                  <label className="text-sm text-zinc-700">Description</label>
                  <Textarea rows={3} value={description} onChange={(event) => setDescription(event.target.value)} aria-label="Description" className="admin-field min-h-[7rem]" />
                </div>
                <div>
                  <label className="text-sm text-zinc-700 mb-1.5 block">Tags</label>
                  <TagSelector 
                    selectedTags={selectedTags} 
                    availableTags={tags} 
                    onToggle={toggleTag} 
                    onCreate={handleCreateTag} 
                  />
                </div>
                <Button
                  type="button"
                  disabled={!quickFile || !token || !title || busy}
                  onClick={async () => {
                    if (!quickFile || !token) return
                    setBusy(true)
                    try {
                      const uploaded = await api.uploadMedia(token, {
                        file: quickFile as File,
                        title,
                        altText: title,
                        description,
                        mediaType: quickFile?.type.startsWith('video/') ? 'video' : 'image',
                        tags: ['gallery', ...selectedTags],
                      })
                      const item = await api.createGalleryItem(token, {
                        title,
                        description,
                        media_type: uploaded.media_type,
                        media_url: uploaded.secure_url,
                        thumbnail_url: uploaded.secure_url,
                        public_id: uploaded.public_id,
                        sort_order: items.length,
                        is_published: true,
                        tags: selectedTags,
                      })
                      setItems((current) => [...current, item])
                      setQuickFile(null)
                      setTitle('')
                      setDescription('')
                      setSelectedTags([])
                      toast.success('Published to gallery.')
                    } catch {
                      toast.error('Could not add gallery item.')
                    } finally {
                      setBusy(false)
                    }
                  }}
                  aria-label="Publish"
                >
                  <ImagePlus className="size-4" />
                  <span className="sr-only">Publish</span>
                </Button>
              </div>
            </AdminPanel>

            <AdminPanel className="p-5">
              <div className="grid gap-3">
                <div className="text-sm font-medium text-zinc-900 flex items-center gap-2">
                  <TagIcon className="size-4 text-emerald-600" />
                  Manage Tags
                </div>
                <div className="text-xs text-zinc-500 mb-2">Edit or delete tags globally. Changes reflect on all images.</div>
                <div className="grid gap-2">
                  {tags.map(tag => (
                    <div key={tag.id} className="flex items-center gap-2 bg-zinc-50 border border-zinc-100 p-2 rounded-xl">
                      {editingTagId === tag.id ? (
                        <>
                          <Input 
                            value={editingTagName} 
                            onChange={e => setEditingTagName(e.target.value)} 
                            className="h-8 py-0 text-sm"
                            autoFocus
                          />
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            className="size-8 text-emerald-600 hover:bg-emerald-50"
                            onClick={() => handleUpdateTag(tag.id)}
                          >
                            <Check className="size-4" />
                          </Button>
                          <button onClick={() => setEditingTagId(null)}><X className="size-4 text-zinc-400" /></button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 text-sm font-medium text-zinc-700 px-1">{tag.name}</span>
                          <button 
                            onClick={() => {
                              setEditingTagId(tag.id)
                              setEditingTagName(tag.name)
                            }}
                            className="p-1.5 text-zinc-400 hover:text-zinc-600 transition-colors"
                          >
                            <Edit2 className="size-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteTag(tag.id)}
                            className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                  {tags.length === 0 && <div className="text-sm text-zinc-400 italic text-center py-4">No tags created yet</div>}
                </div>
              </div>
            </AdminPanel>
          </div>

          <AdminPanel className="p-5">
            <div className="grid gap-4">
              {items.length === 0 ? (
                <div className="grid min-h-40 place-items-center rounded-[1.6rem] border border-dashed border-zinc-200 bg-white">
                  <UploadCloud className="size-8 text-emerald-600" aria-hidden />
                </div>
              ) : (
                items.map((item, index) => (
                  <article key={item.id} className="grid gap-4 overflow-hidden rounded-[1.8rem] border border-zinc-200 bg-white p-4 text-zinc-950 lg:grid-cols-[14rem_minmax(0,1fr)_auto] lg:items-center">
                    <div className="overflow-hidden rounded-[1.5rem]">
                      {item.media_type === 'video' ? (
                        <video src={item.media_url} className="aspect-[4/3] w-full object-cover" muted playsInline preload="metadata" />
                      ) : (
                        <img src={item.media_url} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                      )}
                    </div>
                    <div className="grid gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="admin-pill" data-tone={item.is_published ? 'success' : 'muted'} aria-label={item.is_published ? 'Visible' : 'Hidden'}>
                          {item.is_published ? '●' : '○'}
                        </span>
                        <span className="admin-chip" aria-label={item.media_type}>
                          {item.media_type === 'video' ? <Video className="size-3" /> : <ImagePlus className="size-3" />}
                          <span className="sr-only">{item.media_type}</span>
                        </span>
                      </div>
                      <Input
                        value={item.title}
                        onChange={(event) => setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, title: event.target.value } : entry)))}
                        onBlur={async (event) => {
                          if (!token) return
                          await api.updateGalleryItem(token, item.id, { title: event.target.value })
                        }}
                        aria-label="Title"
                        className="admin-field"
                      />
                      <Textarea
                        rows={3}
                        value={item.description}
                        onChange={(event) => setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, description: event.target.value } : entry)))}
                        onBlur={async (event) => {
                          if (!token) return
                          await api.updateGalleryItem(token, item.id, { description: event.target.value })
                        }}
                        aria-label="Description"
                        className="admin-field min-h-[6rem]"
                      />
                      <div>
                        <label className="text-xs text-zinc-500 mb-1 block font-medium">Tags</label>
                        <TagSelector 
                          selectedTags={item.tags ?? []} 
                          availableTags={tags} 
                          onToggle={async (tagName) => {
                            if (!token) return
                            const newTags = item.tags?.includes(tagName) 
                              ? item.tags.filter(t => t !== tagName)
                              : [...(item.tags ?? []), tagName]
                            
                            setItems(curr => curr.map(entry => entry.id === item.id ? { ...entry, tags: newTags } : entry))
                            await api.updateGalleryItem(token, item.id, { tags: newTags })
                          }}
                          onCreate={async (tagName) => {
                            if (!token) return
                            try {
                              const slug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                              const newTag = await api.createTag(token, { name: tagName, slug })
                              setTags(curr => [...curr.filter(t => t.name.toLowerCase() !== tagName.toLowerCase()), newTag])
                              
                              const newTags = [...(item.tags ?? []), newTag.name]
                              setItems(curr => curr.map(entry => entry.id === item.id ? { ...entry, tags: newTags } : entry))
                              await api.updateGalleryItem(token, item.id, { tags: newTags })
                            } catch {
                              toast.error('Failed to create tag')
                            }
                          }}
                        />
                      </div>
                      <label className="flex items-center gap-3 text-sm text-zinc-500">
                        <input
                          type="checkbox"
                          className="admin-checkbox"
                          checked={item.is_published}
                          onChange={async (event) => {
                            if (!token) return
                            const value = event.target.checked
                            setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, is_published: value } : entry)))
                            await api.updateGalleryItem(token, item.id, { is_published: value })
                          }}
                        />
                        <span className="sr-only">Visible</span>
                      </label>
                    </div>
                    <div className="flex flex-row gap-2 lg:flex-col">
                      <Button type="button" variant="ghost" size="icon" className="border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950" disabled={index === 0} onClick={() => void moveItem(item.id, -1)} aria-label="Move up" title="Move up">
                        <ArrowUp className="size-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon" className="border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950" disabled={index === items.length - 1} onClick={() => void moveItem(item.id, 1)} aria-label="Move down" title="Move down">
                        <ArrowDown className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="border border-zinc-200 bg-white text-red-500 hover:bg-red-50 hover:text-red-600"
                        onClick={async () => {
                          if (!token) return
                          await api.deleteGalleryItem(token, item.id)
                          setItems((current) => current.filter((entry) => entry.id !== item.id))
                          toast.success('Gallery item deleted.')
                        }}
                        aria-label="Delete"
                        title="Delete"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </AdminPanel>
        </div>
      </div>
    </>
  )
}
