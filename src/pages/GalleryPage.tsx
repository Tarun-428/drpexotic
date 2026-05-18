import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Expand, Images, Sparkles, X } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { FALLBACK_GALLERY_ITEMS } from '@/constants/fallbackContent'
import { api } from '@/lib/api'
import { LOCAL_ASSETS } from '@/constants/assets'
import type { GalleryItem } from '@/types/cms'

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>(FALLBACK_GALLERY_ITEMS)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const portalTarget = typeof document !== 'undefined' ? document.body : null

  const activeImage = activeIndex !== null ? images[activeIndex] : null
  const safeActiveIndex = activeIndex ?? 0
  const editorialCaptions = useMemo(
    () => [
      'Canopy, light, and patience working together.',
      'Soil texture and field detail shaping the season.',
      'Fruit character framed like a premium collection.',
      'Operational rhythm with a softer visual language.',
      'Freshness translated into mood, not just information.',
      'The orchard seen as a living editorial landscape.',
    ],
    [],
  )

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
    const { body, documentElement } = document
    const scrollY = window.scrollY
    const previous = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
      bodyTouchAction: body.style.touchAction,
      htmlOverflow: documentElement.style.overflow,
    }

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.paddingRight = scrollbarWidth > 0 ? `${scrollbarWidth}px` : previous.bodyPaddingRight
    body.style.touchAction = 'none'
    documentElement.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previous.bodyOverflow
      body.style.position = previous.bodyPosition
      body.style.top = previous.bodyTop
      body.style.left = previous.bodyLeft
      body.style.right = previous.bodyRight
      body.style.width = previous.bodyWidth
      body.style.paddingRight = previous.bodyPaddingRight
      body.style.touchAction = previous.bodyTouchAction
      documentElement.style.overflow = previous.htmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [activeIndex])

  useEffect(() => {
    if (activeIndex === null) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null)
        return
      }
      if (event.key === 'ArrowRight') {
        setActiveIndex((current) => (current === null ? current : (current + 1) % images.length))
      }
      if (event.key === 'ArrowLeft') {
        setActiveIndex((current) => (current === null ? current : (current - 1 + images.length) % images.length))
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIndex, images.length])

  return (
    <>
      <PageMeta
        title="Gallery"
        description="A compact editorial gallery of orchard photography, premium produce detail, and field moments from DRP Exotic Farms."
        path="/gallery"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#113127] text-cream-50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(8,25,18,0.28), rgba(8,25,18,0.82)), url(${LOCAL_ASSETS.orchardNight})`,
            }}
          />
          <div className="section-shell page-hero-shell relative z-10">
            <div className="max-w-4xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <Images className="size-4 text-gold-400" />
                Gallery
              </span>
              <h1 className="mt-4 font-display text-[clamp(2.1rem,7vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-cream-50">
                A compact visual journal built from orchard light, field texture, and produce detail.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream-50/76 sm:text-base lg:text-lg">
                Documentary, natural, editorial, and lighter to browse on mobile.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-8 sm:py-10 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-end lg:gap-8">
            <div>
              <span className="section-label">
                <Sparkles className="size-4 text-gold-600" />
                Visual storytelling
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.4rem)] leading-[0.96] text-forest-900">
                Smaller frames with better rhythm.
              </h2>
            </div>
            <div className="rounded-[1.25rem] border border-[#ddd3c4] bg-white/82 p-4 shadow-[0_16px_30px_-24px_rgba(11,61,46,0.18)] lg:rounded-[1.75rem] lg:p-6">
              <p className="text-xs leading-relaxed text-forest-900/72 sm:text-sm lg:text-base">
                The imagery supports brand proof: orchard geometry, produce character, soil texture, and real farm
                atmosphere without dominating the page.
              </p>
            </div>
          </div>

          <div className="mobile-tight-masonry mt-5 md:mt-6 lg:mt-8 lg:columns-3 lg:gap-5">
            {images.map((img, idx) => (
              <motion.button
                key={img.id}
                type="button"
                initial={{ opacity: 0, y: 16, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.16 }}
                transition={{ duration: 0.55, delay: (idx % 6) * 0.03, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActiveIndex(idx)}
                className="group relative block w-full overflow-hidden rounded-[1rem] text-left shadow-[0_14px_26px_-18px_rgba(11,61,46,0.24)] will-change-transform sm:rounded-[1.2rem] lg:rounded-[1.8rem]"
              >
                <div className="overflow-hidden rounded-[1rem] sm:rounded-[1.2rem] lg:rounded-[1.8rem]">
                  {img.media_type === 'video' ? (
                    <video
                      src={img.media_url}
                      className={`${idx % 5 === 0 ? 'aspect-[4/5]' : idx % 3 === 0 ? 'aspect-square' : 'aspect-[4/3]'} w-full object-cover`}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <img
                      src={img.media_url}
                      alt={img.title}
                      loading="lazy"
                      decoding="async"
                      className={`${idx % 5 === 0 ? 'aspect-[4/5]' : idx % 3 === 0 ? 'aspect-square' : 'aspect-[4/3]'} w-full object-cover transition duration-500 group-hover:scale-[1.03]`}
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/44 via-transparent to-transparent opacity-80" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 sm:p-3.5 lg:p-5">
                  <div className="max-w-[80%]">
                    <p className="font-display text-[1rem] leading-none text-cream-50 sm:text-[1.15rem] lg:text-2xl">{img.title}</p>
                  </div>
                  <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/18 bg-white/8 text-cream-50 backdrop-blur sm:size-9 lg:size-11">
                    <Expand className="size-3.5 lg:size-4" aria-hidden />
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {portalTarget
          ? createPortal(
              <AnimatePresence>
                {activeImage ? (
                  <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#06140f]/88"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActiveIndex(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Gallery image preview"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="relative mx-auto flex w-full max-w-[min(94vw,72rem)] max-h-[84vh] flex-col overflow-hidden rounded-[1.2rem] bg-[#0d241c] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.75)] sm:rounded-[2rem]"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveIndex(null)}
                        className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full border border-white/16 bg-black/38 text-cream-50 backdrop-blur transition hover:bg-black/52 sm:right-4 sm:top-4 sm:size-10"
                        aria-label="Close image preview"
                      >
                        <X className="size-4" />
                      </button>

                      <div className="flex min-h-0 items-center justify-center bg-[#0b1c15] px-2 py-2 sm:px-3">
                        {activeImage.media_type === 'video' ? (
                          <video src={activeImage.media_url} controls playsInline preload="metadata" className="h-auto max-h-[58vh] w-full object-contain sm:max-h-[72vh]" />
                        ) : (
                          <img src={activeImage.media_url} alt={activeImage.title} className="h-auto max-h-[58vh] w-full object-contain sm:max-h-[72vh]" loading="eager" decoding="async" />
                        )}
                      </div>
                      <div className="flex flex-col gap-3 bg-gradient-to-t from-black/72 via-black/24 to-transparent p-4 text-cream-50 sm:flex-row sm:items-end sm:justify-between sm:p-6">
                        <div className="max-w-2xl">
                          <p className="font-display text-[1.35rem] leading-none sm:text-3xl">{activeImage.title}</p>
                          <p className="mt-2 text-xs leading-relaxed text-cream-50/76 sm:mt-3 sm:text-sm">
                            {activeImage.description || editorialCaptions[safeActiveIndex % editorialCaptions.length]}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            type="button"
                            onClick={() => setActiveIndex((safeActiveIndex - 1 + images.length) % images.length)}
                            className="inline-flex size-9 items-center justify-center rounded-full border border-white/16 bg-white/8 backdrop-blur transition hover:bg-white/14 sm:size-11"
                            aria-label="Previous image"
                          >
                            <ArrowLeft className="size-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveIndex((safeActiveIndex + 1) % images.length)}
                            className="inline-flex size-9 items-center justify-center rounded-full border border-white/16 bg-white/8 backdrop-blur transition hover:bg-white/14 sm:size-11"
                            aria-label="Next image"
                          >
                            <ArrowRight className="size-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : null}
              </AnimatePresence>,
              portalTarget,
            )
          : null}
      </div>
    </>
  )
}
