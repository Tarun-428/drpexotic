import { useSiteConfigStore } from '@/store/siteConfigStore'

export function MapEmbed({ title = 'Farm location' }: { title?: string }) {
  const src = useSiteConfigStore((s) => s.config.contact.mapEmbedUrl)

  if (!src) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-[2rem] border border-dashed border-cream-300 bg-cream-50/60 p-6 text-sm text-forest-900/70">
        Configure a Google Maps embed URL in admin settings or <code className="font-mono">VITE_GOOGLE_MAPS_EMBED_URL</code>.
      </div>
    )
  }

  return (
    <iframe
      title={title}
      src={src}
      className="aspect-[16/10] w-full rounded-[2rem] border border-cream-300/80 bg-cream-50 shadow-inner shadow-black/5"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
