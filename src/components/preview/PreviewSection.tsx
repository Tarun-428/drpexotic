import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export type PreviewItem = {
  eyebrow: string
  title: string
  body: string
  to: string
  image: string
}

export function PreviewSection({
  eyebrow = 'Continue the estate',
  title = 'Move through the orchard story without losing the mood.',
  items,
}: {
  eyebrow?: string
  title?: string
  items: readonly PreviewItem[]
}) {
  if (items.length === 0) return null

  return (
    <section className="section-shell py-8 sm:py-10 lg:py-20">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] lg:items-end">
        <div>
          <span className="section-label border-white/14 bg-white/8 text-cream-50/82">{eyebrow}</span>
          <h2 className="mt-4 max-w-2xl font-display text-[clamp(1.7rem,3vw,3.9rem)] leading-[0.96] text-cream-50">
            {title}
          </h2>
        </div>
        <div className="compact-snap-row lg:grid lg:grid-cols-3 lg:gap-5">
          {items.map((item, index) => (
            <motion.article
              key={item.to}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative min-h-[11rem] overflow-hidden rounded-[1.25rem] border border-white/10 bg-black/24 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.6)] lg:min-h-[19rem] lg:rounded-[1.7rem] lg:shadow-[0_24px_80px_-50px_rgba(0,0,0,0.78)] ${
                index === 1 ? 'lg:translate-y-8' : ''
              }`}
            >
              <Link to={item.to} className="block h-full min-h-[11rem] lg:min-h-[19rem]">
                <img
                  src={item.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/22 to-black/8" />
                <div className="absolute inset-x-3 bottom-3 text-cream-50 lg:inset-x-4 lg:bottom-4">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-400">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-1.5 font-display text-[1.15rem] leading-none lg:mt-2 lg:text-[1.65rem]">{item.title}</h3>
                  <p className="mt-1 line-clamp-2 text-[0.78rem] leading-relaxed text-cream-50/72 lg:mt-2 lg:text-sm">{item.body}</p>
                  <span className="mt-2 inline-flex items-center gap-2 text-[0.78rem] font-semibold text-cream-50 lg:mt-4 lg:text-sm">
                    Enter
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
