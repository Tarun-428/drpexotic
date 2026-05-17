import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import type { MediaAsset } from '@/types/cms'

export default function AdminMediaPage() {
  const token = useAuthStore((state) => state.token)
  const [assets, setAssets] = useState<MediaAsset[]>([])

  const loadAssets = useCallback(async () => {
    if (!token) return
    const response = await api.listMedia(token)
    setAssets(response.items)
  }, [token])

  useEffect(() => {
    if (!token) return
    let active = true
    void api.listMedia(token).then((response) => {
      if (active) setAssets(response.items)
    })
    return () => {
      active = false
    }
  }, [token])

  return (
    <>
      <PageMeta title="Admin media center" description="Cloudinary media management for DRP Exotic Farms." path="/admin/media" />
      <div className="mx-auto max-w-7xl">
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Library</p>
              <h2 className="mt-2 font-display text-3xl text-cream-50">Reusable image and video assets</h2>
            </div>
            <Button type="button" variant="secondary" className="border-white/12 bg-white/8 text-cream-50 hover:bg-white/12" onClick={() => void loadAssets()}>
              Refresh
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {assets.map((asset) => (
              <article key={asset.id} className="cinematic-surface overflow-hidden rounded-[1.8rem] border border-white/8 bg-white/6 text-cream-50">
                <div className="overflow-hidden">
                  {asset.media_type === 'video' ? (
                    <video src={asset.secure_url} className="aspect-[4/3] w-full object-cover" muted playsInline preload="metadata" />
                  ) : (
                    <img src={asset.secure_url} alt={asset.alt_text || asset.title} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                  )}
                </div>
                <div className="grid gap-3 p-4">
                  <div>
                    <p className="font-display text-2xl leading-none">{asset.title}</p>
                    <p className="mt-2 text-sm text-cream-50/64">{asset.description}</p>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-400">{asset.media_type}</p>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!token) return
                        try {
                          await api.deleteMedia(token, asset.id)
                          setAssets((current) => current.filter((item) => item.id !== asset.id))
                          toast.success('Media removed.')
                        } catch {
                          toast.error('Could not delete asset.')
                        }
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-300"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
