import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { UploadCloud } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { BlogContentBlock, BlogMediaReference, BlogPost, MediaAsset } from '@/types/cms'

type BlogComposerProps = {
  initialPost: BlogPost
  busy?: boolean
  onUploadImage: (file: File, details: { title: string; description: string }) => Promise<MediaAsset>
  onSubmit: (payload: Record<string, unknown>) => Promise<void>
}

type JournalDraft = {
  title: string
  shortDescription: string
  description: string
  imageFile: File | null
  imagePreview: string
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function blocksToDescription(blocks: BlogContentBlock[]) {
  return blocks
    .map((block) => {
      if (block.type === 'list') return block.items.join('\n')
      return block.text ?? ''
    })
    .map((text) => text.trim())
    .filter(Boolean)
    .join('\n\n')
}

function descriptionToBlocks(description: string): BlogContentBlock[] {
  const paragraphs = description
    .split(/\n{2,}/)
    .map((text) => text.trim())
    .filter(Boolean)

  return (paragraphs.length > 0 ? paragraphs : ['']).map((text) => ({
    id: crypto.randomUUID(),
    type: 'paragraph' as const,
    text,
    items: [],
    alignment: 'center' as const,
  }))
}

function assetToMediaReference(asset: MediaAsset, fallbackTitle: string): BlogMediaReference {
  return {
    title: asset.title || fallbackTitle,
    media_type: 'image',
    url: asset.secure_url || asset.url,
    public_id: asset.public_id,
    caption: asset.description,
    alt_text: asset.alt_text,
    width: asset.width ?? null,
    height: asset.height ?? null,
    duration: null,
  }
}

function estimateReadingTime(description: string) {
  const words = description.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 180))
}

export function BlogComposer({ initialPost, busy = false, onUploadImage, onSubmit }: BlogComposerProps) {
  const [submitting, setSubmitting] = useState(false)
  const [draft, setDraft] = useState<JournalDraft>(() => ({
    title: initialPost.title,
    shortDescription: initialPost.short_description,
    description: blocksToDescription(initialPost.content_blocks),
    imageFile: null,
    imagePreview: initialPost.featured_image.url,
  }))

  useEffect(() => {
    setDraft({
      title: initialPost.title,
      shortDescription: initialPost.short_description,
      description: blocksToDescription(initialPost.content_blocks),
      imageFile: null,
      imagePreview: initialPost.featured_image.url,
    })
  }, [initialPost])

  useEffect(() => {
    if (!draft.imageFile) return
    const url = URL.createObjectURL(draft.imageFile)
    setDraft((current) => ({ ...current, imagePreview: url }))
    return () => URL.revokeObjectURL(url)
  }, [draft.imageFile])

  const canSubmit = useMemo(
    () => draft.title.trim().length > 0 && draft.shortDescription.trim().length > 0 && draft.description.trim().length > 0,
    [draft.description, draft.shortDescription, draft.title],
  )

  const updateImage = (file: File | undefined) => {
    if (file?.type.startsWith('image/')) setDraft((current) => ({ ...current, imageFile: file }))
  }

  const handleSubmit = async () => {
    if (!canSubmit || busy || submitting) return

    const title = draft.title.trim()
    const shortDescription = draft.shortDescription.trim()
    const description = draft.description.trim()

    setSubmitting(true)
    try {
      const uploadedImage = draft.imageFile
        ? await onUploadImage(draft.imageFile, { title, description: shortDescription })
        : null
      const featuredImage = uploadedImage
        ? assetToMediaReference(uploadedImage, title)
        : {
            ...initialPost.featured_image,
            title: initialPost.featured_image.title || title,
            alt_text: initialPost.featured_image.alt_text || title,
            caption: initialPost.featured_image.caption || shortDescription,
          }

      await onSubmit({
        title,
        slug: initialPost.slug || slugify(title),
        short_description: shortDescription,
        featured_image: featuredImage,
        content_blocks: descriptionToBlocks(description),
        tags: initialPost.tags,
        categories: initialPost.categories,
        seo: {
          meta_title: initialPost.seo?.meta_title || title,
          meta_description: shortDescription.slice(0, 160),
          canonical_url: initialPost.seo?.canonical_url ?? null,
        },
        reading_time_minutes: estimateReadingTime(description),
        status: initialPost.status,
        is_featured: initialPost.is_featured,
      })
    } catch {
      toast.error('Could not update journal.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[2rem] border border-white/8 bg-white/6 p-5 text-cream-50 shadow-[0_24px_80px_-52px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Editorial composer</p>
          <h2 className="mt-2 font-display text-3xl">Edit journal</h2>
        </div>
        <Button type="button" onClick={() => void handleSubmit()} disabled={busy || submitting || !canSubmit}>
          {busy || submitting ? 'Updating...' : 'Update Journal'}
        </Button>
      </div>

      <div className="mt-7 grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-cream-50/78">Title</span>
          <Input
            value={draft.title}
            onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))}
            placeholder="Journal title"
            className="admin-field"
          />
        </label>

        <label
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            updateImage(event.dataTransfer.files[0])
          }}
          className="grid cursor-pointer gap-3"
        >
          <span className="text-sm font-semibold text-cream-50/78">Image</span>
          <div className="overflow-hidden rounded-[1.5rem] border border-dashed border-white/16 bg-black/18 p-3 transition hover:border-gold-400/45 hover:bg-black/24">
            {draft.imagePreview ? (
              <img src={draft.imagePreview} alt="" className="h-64 w-full rounded-[1.15rem] object-cover" />
            ) : (
              <div className="grid min-h-[14rem] place-items-center text-center">
                <div>
                  <UploadCloud className="mx-auto size-8 text-gold-400" />
                  <p className="mt-3 text-sm text-cream-50/72">Upload a journal image.</p>
                </div>
              </div>
            )}
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={(event) => updateImage(event.target.files?.[0])} />
          <span className="text-xs text-cream-50/46">Tap the image area to replace the current image.</span>
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-cream-50/78">Short description</span>
          <Textarea
            rows={4}
            value={draft.shortDescription}
            onChange={(event) => setDraft((current) => ({ ...current, shortDescription: event.target.value }))}
            placeholder="Brief summary for journal cards"
            className="admin-field min-h-[8rem]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-cream-50/78">Full description</span>
          <Textarea
            rows={12}
            value={draft.description}
            onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
            placeholder="Write the journal content. Use blank lines for paragraphs."
            className="admin-field min-h-[18rem]"
          />
        </label>

        <Button type="button" className="mt-1 w-full sm:w-fit" onClick={() => void handleSubmit()} disabled={busy || submitting || !canSubmit}>
          {busy || submitting ? 'Updating...' : 'Update Journal'}
        </Button>
      </div>
    </div>
  )
}
