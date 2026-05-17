import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { ArrowDown, ArrowUp, ImagePlus, Trash2, UploadCloud } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { GalleryItem, MediaAsset } from '@/types/cms'

export default function AdminGalleryPage() {
  const token = useAuthStore((state) => state.token)
  const [items, setItems] = useState<GalleryItem[]>([])
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([])
  const [selectedAssetId, setSelectedAssetId] = useState('')
  const [quickFile, setQuickFile] = useState<File | null>(null)
  const [quickPreview, setQuickPreview] = useState('')
  const [busy, setBusy] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const selectedAsset = useMemo(() => mediaAssets.find((asset) => asset.id === selectedAssetId), [mediaAssets, selectedAssetId])

  const load = async () => {
    if (!token) return
    const [galleryResponse, mediaResponse] = await Promise.all([api.listAdminGallery(token), api.listMedia(token)])
    setItems(galleryResponse.items)
    setMediaAssets(mediaResponse.items)
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

  const selectFile = (file?: File) => {
    if (!file) return
    setQuickFile(file)
    setSelectedAssetId('')
    setTitle((current) => current || file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '))
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
        <div className="grid gap-6 xl:grid-cols-[24rem_minmax(0,1fr)]">
          <section className="cinematic-surface rounded-[2rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Quick publish</p>
            <h1 className="mt-3 font-display text-3xl">Upload, title, publish. That is the whole flow.</h1>

            <div className="mt-5 grid gap-3">
              <label
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault()
                  selectFile(event.dataTransfer.files[0])
                }}
                className="group flex min-h-[11rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[1.35rem] border border-dashed border-white/18 bg-black/18 px-4 text-center transition hover:border-gold-400/45 hover:bg-black/24"
              >
                {quickPreview ? (
                  quickFile?.type.startsWith('video/') ? (
                    <video src={quickPreview} className="h-44 w-full rounded-[1rem] object-cover" muted playsInline preload="metadata" />
                  ) : (
                    <img src={quickPreview} alt="" className="h-44 w-full rounded-[1rem] object-cover" />
                  )
                ) : (
                  <>
                    <UploadCloud className="size-8 text-gold-400" />
                    <p className="mt-3 text-sm text-cream-50/72">Drop media here or tap to browse</p>
                    <p className="mt-1 text-xs text-cream-50/42">Images and videos publish instantly after upload.</p>
                  </>
                )}
                <input type="file" accept="image/*,video/*" className="hidden" onChange={(event) => selectFile(event.target.files?.[0])} />
              </label>

              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream-50/42">
                <span className="h-px flex-1 bg-white/10" />
                or choose existing
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <select value={selectedAssetId} onChange={(event) => { setSelectedAssetId(event.target.value); setQuickFile(null) }} className="admin-select">
                <option value="">Choose from media center</option>
                {mediaAssets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.title}
                  </option>
                ))}
              </select>
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Gallery title" className="admin-field" />
              <Textarea rows={3} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Short description" className="admin-field min-h-[7rem]" />
              <Button
                type="button"
                disabled={(!selectedAsset && !quickFile) || !token || !title || busy}
                onClick={async () => {
                  if ((!selectedAsset && !quickFile) || !token) return
                  setBusy(true)
                  try {
                    const asset =
                      selectedAsset ??
                      (await api.uploadMedia(token, {
                        file: quickFile as File,
                        title,
                        altText: title,
                        description,
                        mediaType: quickFile?.type.startsWith('video/') ? 'video' : 'image',
                        tags: ['gallery'],
                      }))
                    const item = await api.createGalleryItem(token, {
                      title,
                      description,
                      media_type: asset.media_type,
                      media_url: asset.secure_url,
                      thumbnail_url: asset.secure_url,
                      public_id: asset.public_id,
                      sort_order: items.length,
                      is_published: true,
                    })
                    setItems((current) => [...current, item])
                    if (!selectedAsset) setMediaAssets((current) => [asset, ...current])
                    setSelectedAssetId('')
                    setQuickFile(null)
                    setTitle('')
                    setDescription('')
                    toast.success('Published to gallery.')
                  } catch {
                    toast.error('Could not add gallery item.')
                  } finally {
                    setBusy(false)
                  }
                }}
              >
                <ImagePlus className="size-4" />
                {busy ? 'Publishing...' : 'Publish now'}
              </Button>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Live order</p>
                <h2 className="mt-2 font-display text-3xl text-cream-50">Published gallery sequence</h2>
              </div>
              <Button type="button" variant="secondary" className="border-white/12 bg-white/8 text-cream-50 hover:bg-white/12" onClick={() => void load()}>
                Refresh
              </Button>
            </div>
            <div className="grid gap-4">
              {items.map((item, index) => (
                <article key={item.id} className="cinematic-surface grid gap-4 overflow-hidden rounded-[1.8rem] border border-white/8 bg-white/6 p-4 text-cream-50 lg:grid-cols-[14rem_minmax(0,1fr)_auto] lg:items-center">
                  <div className="overflow-hidden rounded-[1.5rem]">
                    {item.media_type === 'video' ? (
                      <video src={item.media_url} className="aspect-[4/3] w-full object-cover" muted playsInline preload="metadata" />
                    ) : (
                      <img src={item.media_url} alt={item.title} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Input
                      value={item.title}
                      onChange={(event) =>
                        setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, title: event.target.value } : entry)))
                      }
                      onBlur={async (event) => {
                        if (!token) return
                        await api.updateGalleryItem(token, item.id, { title: event.target.value })
                      }}
                      className="admin-field"
                    />
                    <Textarea
                      rows={3}
                      value={item.description}
                      onChange={(event) =>
                        setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, description: event.target.value } : entry)))
                      }
                      onBlur={async (event) => {
                        if (!token) return
                        await api.updateGalleryItem(token, item.id, { description: event.target.value })
                      }}
                      className="admin-field min-h-[6rem]"
                    />
                    <label className="flex items-center gap-3 text-sm text-cream-50/70">
                      <input
                        type="checkbox"
                        checked={item.is_published}
                        onChange={async (event) => {
                          if (!token) return
                          const value = event.target.checked
                          setItems((current) => current.map((entry) => (entry.id === item.id ? { ...entry, is_published: value } : entry)))
                          await api.updateGalleryItem(token, item.id, { is_published: value })
                        }}
                      />
                      Visible on public gallery
                    </label>
                  </div>
                  <div className="flex flex-row gap-2 lg:flex-col">
                    <Button type="button" variant="secondary" size="icon" className="border-white/12 bg-white/8 text-cream-50 hover:bg-white/12" disabled={index === 0} onClick={() => void moveItem(item.id, -1)}>
                      <ArrowUp className="size-4" />
                    </Button>
                    <Button type="button" variant="secondary" size="icon" className="border-white/12 bg-white/8 text-cream-50 hover:bg-white/12" disabled={index === items.length - 1} onClick={() => void moveItem(item.id, 1)}>
                      <ArrowDown className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-300 hover:bg-red-500/10 hover:text-red-200"
                      onClick={async () => {
                        if (!token) return
                        await api.deleteGalleryItem(token, item.id)
                        setItems((current) => current.filter((entry) => entry.id !== item.id))
                        toast.success('Gallery item deleted.')
                      }}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
