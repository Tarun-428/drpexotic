import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { FALLBACK_GALLERY_ITEMS } from '@/constants/fallbackContent'
import { api } from '@/lib/api'
import type { GalleryItem } from '@/types/cms'
import { LOCAL_ASSETS } from '@/constants/assets'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const masonryShapes = [
  'aspect-[4/5]',
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[4/5]',
  'aspect-[5/4]',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-square',
] as const

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>(FALLBACK_GALLERY_ITEMS)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const portalTarget = typeof document !== 'undefined' ? document.body : null

  const activeImage = activeIndex !== null ? images[activeIndex] : null
  const safeActiveIndex = activeIndex ?? 0

  useEffect(() => {
    let active = true
    void api
      .listPublicGallery(1, 60)
      .then((response) => {
        if (active && response.items.length > 0) setImages(response.items)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeIndex])

  return (
    <>
      <PageMeta
        title="Gallery | DRP Exotic Farms"
        description="Explore our orchards through a visual journey of premium exotic fruit cultivation."
        path="/gallery"
      />

      {/* HERO */}
      <section className="bg-primary pt-32 pb-20 text-neutral relative overflow-hidden text-center">
         <div className="absolute inset-0 z-0">
          <img src={LOCAL_ASSETS.orchardNight} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">Visual Journal</span>
            <h1 className="text-4xl sm:text-7xl font-display leading-tight mt-6 mb-8">
              The Orchard in <span className="text-accent">Frames</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed">
              A curated masonry collection capturing the beauty and discipline of exotic fruit farming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MASONRY GALLERY */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="masonry-grid columns-2 md:columns-3 lg:columns-4">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                {...fadeIn}
                transition={{ delay: (idx % 6) * 0.05 }}
                className="masonry-item"
              >
                <button
                  type="button"
                  className={`group relative block w-full overflow-hidden rounded-xl border border-primary/5 bg-secondary/10 text-left shadow-sm transition-all hover:shadow-lg active:scale-[0.98] sm:rounded-2xl ${masonryShapes[idx % masonryShapes.length]}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Open ${img.title} in gallery viewer`}
                >
                {img.media_type === 'video' ? (
                  <video
                    src={img.media_url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={img.media_url}
                    alt={img.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-6">
                  <div className="flex justify-between items-end w-full">
                    <h3 className="text-neutral font-display text-sm sm:text-lg leading-tight">{img.title}</h3>
                    <Expand className="text-accent size-4" />
                  </div>
                </div>
                {/* Mobile Tap Cue */}
                <div className="tap-indicator bottom-4 right-4">
                  <Expand className="size-3 text-accent" />
                </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {portalTarget && activeImage && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-10"
            onClick={() => setActiveIndex(null)}
          >
            <button className="absolute top-6 right-6 sm:top-8 sm:right-8 text-neutral/50 hover:text-neutral transition-colors">
              <X className="size-8" />
            </button>

            <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-2xl">
                {activeImage.media_type === 'video' ? (
                  <video src={activeImage.media_url} controls className="max-w-full max-h-full" />
                ) : (
                  <img src={activeImage.media_url} alt={activeImage.title} className="max-w-full max-h-full object-contain" />
                )}
              </div>
              <div className="mt-8 text-center text-neutral px-4">
                <h2 className="text-2xl sm:text-3xl font-display mb-2">{activeImage.title}</h2>
                <p className="text-neutral/60 text-sm sm:text-base max-w-2xl mx-auto">{activeImage.description}</p>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 pointer-events-none">
                <button
                  className="pointer-events-auto size-10 sm:size-12 rounded-full bg-neutral/10 hover:bg-neutral/20 flex items-center justify-center transition-colors"
                  onClick={() => setActiveIndex((safeActiveIndex - 1 + images.length) % images.length)}
                >
                  <ArrowLeft className="text-neutral size-5 sm:size-6" />
                </button>
                <button
                  className="pointer-events-auto size-10 sm:size-12 rounded-full bg-neutral/10 hover:bg-neutral/20 flex items-center justify-center transition-colors"
                  onClick={() => setActiveIndex((safeActiveIndex + 1) % images.length)}
                >
                  <ArrowRight className="text-neutral size-5 sm:size-6" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>,
        portalTarget
      )}
    </>
  )
}
