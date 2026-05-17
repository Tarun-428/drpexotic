import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Expand, X } from 'lucide-react'
import type { BlogContentBlock } from '@/types/cms'

export function BlogContentRenderer({ blocks }: { blocks: BlogContentBlock[] }) {
  const [activeMedia, setActiveMedia] = useState<BlogContentBlock | null>(null)

  return (
    <>
      <div className="grid gap-6">
        {blocks.map((block) => {
        if (block.type === 'heading') {
          const HeadingTag = block.level === 3 ? 'h3' : block.level === 4 ? 'h4' : 'h2'
          return (
            <HeadingTag key={block.id} className="font-display text-[clamp(1.7rem,3vw,2.8rem)] leading-[0.98] text-forest-900">
              {block.text}
            </HeadingTag>
          )
        }

        if (block.type === 'quote') {
          return (
            <blockquote key={block.id} className="rounded-[1.8rem] border border-gold-500/16 bg-white/55 px-6 py-6 font-display text-[clamp(1.6rem,2.5vw,2.4rem)] leading-[1.05] text-forest-900/90 shadow-[0_24px_80px_-48px_rgba(11,61,46,0.35)]">
              “{block.text}”
            </blockquote>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={block.id} className="grid gap-3">
              {block.items.map((item, index) => (
                <li key={`${item}-${index}`} className="rounded-[1.3rem] bg-white/58 px-4 py-3 text-base leading-relaxed text-forest-900/76">
                  {item}
                </li>
              ))}
            </ul>
          )
        }

        if ((block.type === 'image' || block.type === 'video') && block.media) {
          return (
            <figure key={block.id} className={`${block.alignment === 'wide' ? 'lg:-mx-6' : block.alignment === 'left' ? 'max-w-2xl' : ''}`}>
              <button
                type="button"
                onClick={() => setActiveMedia(block)}
                className="group relative block w-full overflow-hidden rounded-[1.45rem] bg-[#091a14] text-left shadow-[0_24px_80px_-54px_rgba(11,61,46,0.42)]"
              >
                {block.type === 'image' ? (
                  <img
                    src={block.media.url}
                    alt={block.media.alt_text || block.media.title}
                    className="max-h-[26rem] w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <video
                    src={block.media.url}
                    playsInline
                    preload="metadata"
                    className="max-h-[24rem] w-full bg-[#091a14] object-cover"
                  />
                )}
                <span className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full border border-white/18 bg-black/28 text-cream-50 backdrop-blur transition group-hover:bg-black/42">
                  <Expand className="size-4" />
                </span>
              </button>
              {(block.media.caption || block.media.title) && (
                <figcaption className="px-2 pt-2 text-sm leading-relaxed text-forest-900/58">
                  {block.media.caption || block.media.title}
                </figcaption>
              )}
            </figure>
          )
        }

        return (
          <p key={block.id} className="text-[1.02rem] leading-[1.95] text-forest-900/76 sm:text-[1.08rem]">
            {block.text}
          </p>
        )
        })}
      </div>

      {activeMedia?.media && typeof document !== 'undefined'
        ? createPortal(
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06140f]/88 px-3 py-5" role="dialog" aria-modal="true" onClick={() => setActiveMedia(null)}>
              <div className="relative w-full max-w-5xl overflow-hidden rounded-[1.5rem] bg-[#091a14]" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  onClick={() => setActiveMedia(null)}
                  className="absolute right-3 top-3 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/16 bg-black/38 text-cream-50 backdrop-blur"
                  aria-label="Close media preview"
                >
                  <X className="size-4" />
                </button>
                {activeMedia.type === 'image' ? (
                  <img src={activeMedia.media.url} alt={activeMedia.media.alt_text || activeMedia.media.title} className="max-h-[82vh] w-full object-contain" />
                ) : (
                  <video src={activeMedia.media.url} controls playsInline preload="metadata" className="max-h-[82vh] w-full object-contain" />
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
