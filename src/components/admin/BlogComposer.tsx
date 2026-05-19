import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, UploadCloud } from 'lucide-react'
import { AdminPanel, AdminSectionHeading } from '@/components/admin/AdminShell'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { BlogContentBlock, BlogMediaReference, BlogPost, MediaAsset, TaxonomyOption } from '@/types/cms'

type BlogComposerProps = {
  initialPost: BlogPost
  busy?: boolean
  categories: TaxonomyOption[]
  tags: TaxonomyOption[]
  onUploadImage: (file: File, details: { title: string; description: string }) => Promise<MediaAsset>
  onCreateCategory: (name: string) => Promise<void>
  onCreateTag: (name: string) => Promise<void>
  onSubmit: (payload: Record<string, unknown>) => Promise<void>
}

type JournalDraft = {
  title: string
  shortDescription: string
  description: string
  slug: string
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  tags: string[]
  categories: string[]
  status: 'draft' | 'published'
  isFeatured: boolean
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

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value]
}

export function BlogComposer({
  initialPost,
  busy = false,
  categories,
  tags,
  onUploadImage,
  onCreateCategory,
  onCreateTag,
  onSubmit,
}: BlogComposerProps) {
  const [submitting, setSubmitting] = useState(false)
  const [newCategory, setNewCategory] = useState('')
  const [newTag, setNewTag] = useState('')
  const [draft, setDraft] = useState<JournalDraft>(() => ({
    title: initialPost.title,
    shortDescription: initialPost.short_description,
    description: blocksToDescription(initialPost.content_blocks),
    slug: initialPost.slug,
    metaTitle: initialPost.seo?.meta_title || initialPost.title,
    metaDescription: initialPost.seo?.meta_description || initialPost.short_description,
    canonicalUrl: initialPost.seo?.canonical_url || '',
    tags: initialPost.tags,
    categories: initialPost.categories,
    status: initialPost.status,
    isFeatured: initialPost.is_featured,
    imageFile: null,
    imagePreview: initialPost.featured_image.url,
  }))

  useEffect(() => {
    setDraft({
      title: initialPost.title,
      shortDescription: initialPost.short_description,
      description: blocksToDescription(initialPost.content_blocks),
      slug: initialPost.slug,
      metaTitle: initialPost.seo?.meta_title || initialPost.title,
      metaDescription: initialPost.seo?.meta_description || initialPost.short_description,
      canonicalUrl: initialPost.seo?.canonical_url || '',
      tags: initialPost.tags,
      categories: initialPost.categories,
      status: initialPost.status,
      isFeatured: initialPost.is_featured,
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
    const slug = slugify(draft.slug || title)
    const metaTitle = draft.metaTitle.trim() || title
    const metaDescription = draft.metaDescription.trim() || shortDescription

    setSubmitting(true)
    try {
      const uploadedImage = draft.imageFile
        ? await onUploadImage(draft.imageFile, { title, description: shortDescription })
        : null
      if (!uploadedImage && !initialPost.featured_image.url) {
        toast.error('Add a featured image before saving this story.')
        return
      }
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
        slug,
        short_description: shortDescription,
        featured_image: featuredImage,
        content_blocks: descriptionToBlocks(description),
        tags: draft.tags,
        categories: draft.categories,
        seo: {
          meta_title: metaTitle,
          meta_description: metaDescription.slice(0, 160),
          canonical_url: draft.canonicalUrl.trim() || null,
        },
        reading_time_minutes: estimateReadingTime(description),
        status: draft.status,
        is_featured: draft.isFeatured,
      })
    } catch {
      toast.error('Could not update journal.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AdminPanel className="mx-auto max-w-5xl rounded-[2rem] p-5 sm:p-7">
      <AdminSectionHeading
        eyebrow="Editorial composer"
        title="Edit journal story"
        description="Control presentation, taxonomy, publishing state, and SEO from the same workflow the public journal depends on."
        actions={
          <Button type="button" onClick={() => void handleSubmit()} disabled={busy || submitting || !canSubmit}>
            {busy || submitting ? 'Updating...' : 'Update Journal'}
          </Button>
        }
      />

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
        <div className="grid gap-5">
          <label className="grid gap-2">
            <span className="admin-label">Title</span>
            <Input
              value={draft.title}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  title: event.target.value,
                  slug: current.slug === slugify(current.title) ? slugify(event.target.value) : current.slug,
                  metaTitle: current.metaTitle === current.title ? event.target.value : current.metaTitle,
                }))
              }
              placeholder="Journal title"
              className="admin-field"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="admin-label">Slug</span>
              <Input value={draft.slug} onChange={(event) => setDraft((current) => ({ ...current, slug: slugify(event.target.value) }))} placeholder="journal-slug" className="admin-field" />
            </label>
            <label className="grid gap-2">
              <span className="admin-label">Publish state</span>
              <select
                value={draft.status}
                onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value as 'draft' | 'published' }))}
                className="admin-select"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>
          </div>

          <label
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              updateImage(event.dataTransfer.files[0])
            }}
            className="grid cursor-pointer gap-3"
          >
            <span className="admin-label">Featured image</span>
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
            <span className="admin-label">Short description</span>
            <Textarea
              rows={4}
              value={draft.shortDescription}
              onChange={(event) =>
                setDraft((current) => ({
                  ...current,
                  shortDescription: event.target.value,
                  metaDescription: current.metaDescription === current.shortDescription ? event.target.value : current.metaDescription,
                }))
              }
              placeholder="Brief summary for journal cards"
              className="admin-field min-h-[8rem]"
            />
          </label>

          <label className="grid gap-2">
            <span className="admin-label">Full description</span>
            <Textarea
              rows={12}
              value={draft.description}
              onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))}
              placeholder="Write the journal content. Use blank lines for paragraphs."
              className="admin-field min-h-[18rem]"
            />
          </label>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[1.6rem] border border-white/8 bg-black/18 p-4">
            <p className="admin-label">Visibility</p>
            <label className="mt-4 flex items-center gap-3 text-sm text-cream-50/74">
              <input
                type="checkbox"
                checked={draft.isFeatured}
                className="admin-checkbox"
                onChange={(event) => setDraft((current) => ({ ...current, isFeatured: event.target.checked }))}
              />
              Feature this story in the journal spotlight
            </label>
            <p className="mt-3 text-sm text-cream-50/54">Featured stories have higher priority in the public journal experience.</p>
          </div>

          <div className="rounded-[1.6rem] border border-white/8 bg-black/18 p-4">
            <p className="admin-label">Categories</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="admin-chip"
                  data-active={draft.categories.includes(option.name)}
                  onClick={() => setDraft((current) => ({ ...current, categories: toggleValue(current.categories, option.name).slice(0, 6) }))}
                >
                  {option.name}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Add category" className="admin-field" />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="border-white/12 bg-white/8 text-cream-50 hover:bg-white/12"
                onClick={async () => {
                  const value = newCategory.trim()
                  if (!value) return
                  await onCreateCategory(value)
                  setDraft((current) => ({ ...current, categories: toggleValue(current.categories, value).slice(0, 6) }))
                  setNewCategory('')
                }}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/8 bg-black/18 p-4">
            <p className="admin-label">Tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className="admin-chip"
                  data-active={draft.tags.includes(option.name)}
                  onClick={() => setDraft((current) => ({ ...current, tags: toggleValue(current.tags, option.name).slice(0, 12) }))}
                >
                  {option.name}
                </button>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input value={newTag} onChange={(event) => setNewTag(event.target.value)} placeholder="Add tag" className="admin-field" />
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="border-white/12 bg-white/8 text-cream-50 hover:bg-white/12"
                onClick={async () => {
                  const value = newTag.trim()
                  if (!value) return
                  await onCreateTag(value)
                  setDraft((current) => ({ ...current, tags: toggleValue(current.tags, value).slice(0, 12) }))
                  setNewTag('')
                }}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-[1.6rem] border border-white/8 bg-black/18 p-4">
            <p className="admin-label">SEO</p>
            <div className="mt-4 grid gap-3">
              <Input value={draft.metaTitle} onChange={(event) => setDraft((current) => ({ ...current, metaTitle: event.target.value }))} placeholder="Meta title" className="admin-field" />
              <Textarea
                rows={4}
                value={draft.metaDescription}
                onChange={(event) => setDraft((current) => ({ ...current, metaDescription: event.target.value }))}
                placeholder="Meta description"
                className="admin-field min-h-[7rem]"
              />
              <Input
                value={draft.canonicalUrl}
                onChange={(event) => setDraft((current) => ({ ...current, canonicalUrl: event.target.value }))}
                placeholder="Canonical URL, optional"
                className="admin-field"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminPanel>
  )
}
