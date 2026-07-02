import { useEffect, useMemo, useRef, useState } from 'react'
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

type GallerySection = {
  tag: string
  items: GalleryItem[]
}

type LightboxState = {
  items: GalleryItem[]
  index: number
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryItem[]>(FALLBACK_GALLERY_ITEMS)
  const [activeTag, setActiveTag] = useState<string>('')
  const [lightboxState, setLightboxState] = useState<LightboxState | null>(null)
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})
  const portalTarget = typeof document !== 'undefined' ? document.body : null

  const tags = useMemo(() => {
    const dynamicTags = new Set(images.flatMap((img) => img.tags || []))
    return Array.from(dynamicTags).sort()
  }, [images])

  const gallerySections = useMemo<GallerySection[]>(() => {
    return tags
      .map((tag) => ({
        tag,
        items: images.filter((img) => img.tags?.includes(tag)),
      }))
      .filter((section) => section.items.length > 0)
  }, [images, tags])

  const untaggedImages = useMemo(
    () => images.filter((img) => !img.tags || img.tags.length === 0),
    [images]
  )

  const activeImage = lightboxState ? lightboxState.items[lightboxState.index] ?? null : null
  const safeActiveIndex = lightboxState?.index ?? 0
  const activeLightboxItems = lightboxState?.items ?? []

  useEffect(() => {
    let active = true
    void api
      .listPublicGallery(1, 100)
      .then((response) => {
        if (active && response.items.length > 0) setImages(response.items)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (lightboxState === null) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxState])

  useEffect(() => {
    if (gallerySections.length === 0) return

    setActiveTag((currentTag) =>
      currentTag && gallerySections.some((section) => section.tag === currentTag)
        ? currentTag
        : gallerySections[0].tag
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)

        const topEntry = visibleEntries[0]
        const sectionTag = topEntry?.target instanceof HTMLElement ? topEntry.target.dataset.tag : undefined

        if (sectionTag) {
          setActiveTag(sectionTag)
        }
      },
      {
        threshold: [0.2, 0.35, 0.5],
        rootMargin: '-18% 0px -58% 0px',
      }
    )

    const observedSections = gallerySections
      .map((section) => sectionRefs.current[section.tag])
      .filter((element): element is HTMLElement => Boolean(element))

    observedSections.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [gallerySections])

  useEffect(() => {
    if (activeTag || gallerySections.length === 0) return
    setActiveTag(gallerySections[0].tag)
  }, [activeTag, gallerySections])

  const handleTagJump = (tag: string) => {
    setActiveTag(tag)
    sectionRefs.current[tag]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleOpenLightbox = (items: GalleryItem[], index: number) => {
    setLightboxState({ items, index })
  }

  return (
    <>
      <PageMeta
        title="Gallery | DRP Exotic Farms"
        description="Explore our orchards through a visual journey of premium exotic fruit cultivation."
        path="/gallery"
      />

      {/* HERO */}
      <section className="bg-primary pt-32 pb-12 text-neutral relative overflow-hidden text-center">
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

      {/* TAG NAV */}
      <section className="bg-neutral pt-6 pb-4">
        <div className="section-shell py-0">
          <div className="sticky top-20 z-20 rounded-2xl border border-primary/5 bg-neutral/90 px-3 py-3 shadow-sm backdrop-blur-md">
            <div className="flex gap-2 overflow-x-auto whitespace-nowrap pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagJump(tag)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    activeTag === tag
                      ? 'bg-primary text-neutral shadow-md'
                      : 'bg-primary/5 text-primary/70 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  {tag}
                </button>
              ))}
              {untaggedImages.length > 0 && (
                <span className="shrink-0 rounded-full border border-dashed border-primary/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary/40">
                  Featured {untaggedImages.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TAG SECTIONS */}
      <section className="bg-neutral pb-20 pt-2">
        <div className="section-shell space-y-16 pt-0">
          {gallerySections.map((section, sectionIndex) => (
            <div
              key={section.tag}
              ref={(node) => {
                sectionRefs.current[section.tag] = node
              }}
              data-tag={section.tag}
              className="scroll-mt-28"
            >
              <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
                <div>
                  <h2 className="mt-3 font-display text-2xl text-primary sm:text-4xl">{section.tag}</h2>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/45 sm:text-sm">
                  {String(section.items.length).padStart(2, '0')} items
                </p>
              </div>

              <AnimatePresence mode="popLayout">
                <motion.div
                  key={section.tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="masonry-grid columns-2 md:columns-3 lg:columns-4"
                >
                  {section.items.map((img, idx) => (
                    <div key={`${section.tag}-${img.id}`} className="masonry-item mb-4 sm:mb-6">
                      <button
                        type="button"
                        className={`group relative block w-full overflow-hidden rounded-xl border border-primary/5 bg-secondary/10 text-left shadow-sm transition-all hover:shadow-lg active:scale-[0.98] sm:rounded-2xl ${masonryShapes[(sectionIndex + idx) % masonryShapes.length]}`}
                        onClick={() => handleOpenLightbox(section.items, idx)}
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
                        <div className="tap-indicator bottom-4 right-4">
                          <Expand className="size-3 text-accent" />
                        </div>
                      </button>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}

          {untaggedImages.length > 0 && (
            <div className="scroll-mt-28">
              <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
                <div>
                  <h2 className="mt-3 font-display text-2xl text-primary sm:text-4xl">Untagged images</h2>
                </div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/45 sm:text-sm">
                  {String(untaggedImages.length).padStart(2, '0')} items
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="masonry-grid columns-2 md:columns-3 lg:columns-4"
              >
                {untaggedImages.map((img, idx) => (
                  <div key={`untagged-${img.id}`} className="masonry-item mb-4 sm:mb-6">
                    <button
                      type="button"
                      className={`group relative block w-full overflow-hidden rounded-xl border border-primary/5 bg-secondary/10 text-left shadow-sm transition-all hover:shadow-lg active:scale-[0.98] sm:rounded-2xl ${masonryShapes[idx % masonryShapes.length]}`}
                      onClick={() => handleOpenLightbox(untaggedImages, idx)}
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
                      <div className="tap-indicator bottom-4 right-4">
                        <Expand className="size-3 text-accent" />
                      </div>
                    </button>
                  </div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {portalTarget && activeImage && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-10"
            onClick={() => setLightboxState(null)}
          >
            <button
              className="absolute top-6 right-6 sm:top-8 sm:right-8 text-neutral/50 hover:text-neutral transition-colors"
              onClick={() => setLightboxState(null)}
            >
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
                  onClick={() =>
                    setLightboxState({
                      items: activeLightboxItems,
                      index: (safeActiveIndex - 1 + activeLightboxItems.length) % activeLightboxItems.length,
                    })
                  }
                >
                  <ArrowLeft className="text-neutral size-5 sm:size-6" />
                </button>
                <button
                  className="pointer-events-auto size-10 sm:size-12 rounded-full bg-neutral/10 hover:bg-neutral/20 flex items-center justify-center transition-colors"
                  onClick={() =>
                    setLightboxState({
                      items: activeLightboxItems,
                      index: (safeActiveIndex + 1) % activeLightboxItems.length,
                    })
                  }
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
