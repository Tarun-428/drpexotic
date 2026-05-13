import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'
import { useSiteConfigStore } from '@/store/siteConfigStore'

export default function GalleryPage() {
  const images = useSiteConfigStore((s) => s.config.gallery)

  return (
    <>
      <PageMeta
        title="Gallery"
        description="Field moments, orchard architecture, and produce character from Drpexoticfarms™—updated as seasons evolve."
        path="/gallery"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Gallery</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Light, leaf, and labour rhythms</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-forest-900/75">
            Imagery is curated to reflect real operations—orchard corridors, canopy decisions, and fruit character at
            peak windows. Swap assets anytime via the admin panel.
          </p>
        </header>

        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((img, idx) => (
            <motion.figure
              key={img.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (idx % 6) * 0.03, ease: [0.22, 1, 0.36, 1] }}
              className="mb-4 break-inside-avoid overflow-hidden rounded-3xl border border-cream-300/80 bg-cream-50/60"
            >
              <img src={img.url} alt={img.alt} loading="lazy" decoding="async" className="w-full object-cover" />
              <figcaption className="px-4 py-3 text-xs text-forest-900/70">{img.alt}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </>
  )
}
