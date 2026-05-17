import { useSiteConfigStore } from '@/store/siteConfigStore'

export function MapEmbed({ title = 'Farm location' }: { title?: string }) {
  const src = useSiteConfigStore((s) => s.config.contact.mapEmbedUrl)

  if (!src) {
    return (
      <div className="cinematic-surface flex aspect-[16/10] w-full items-center justify-center rounded-[1.8rem] p-5 text-sm leading-relaxed text-forest-900/70 sm:rounded-[2rem] sm:p-6">
        Configure a Google Maps embed URL in admin settings or <code className="font-mono">VITE_GOOGLE_MAPS_EMBED_URL</code>.
      </div>
    )
  }

  return (
    <iframe
      title={title}
      src={src}
      className="aspect-[16/10] w-full rounded-[1.8rem] border border-white/25 bg-cream-50 shadow-[0_24px_60px_-32px_rgba(11,61,46,0.35)] sm:rounded-[2rem]"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  )
}
