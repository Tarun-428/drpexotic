import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FRUIT_VARIETIES } from '@/constants/fruits'

export function HomeProducePeek() {
  const picks = FRUIT_VARIETIES.slice(0, 3)

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Produce</p>
          <h2 className="mt-2 font-display text-3xl text-forest-900 sm:text-4xl">Signature varieties</h2>
          <p className="mt-3 max-w-xl text-forest-900/75">
            Blueberry, avocado, dragon fruit, Kesar mango, Red Diamond guava, and banana—each managed with modern
            nutrition intelligence and sustainable intensity.
          </p>
        </div>
        <Link
          to="/produce"
          className="inline-flex items-center justify-center rounded-full bg-forest-900 px-5 py-2 text-sm font-semibold text-gold-200 transition hover:bg-forest-800"
        >
          View all varieties
        </Link>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {picks.map((f, idx) => (
          <motion.div
            key={f.slug}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group overflow-hidden rounded-3xl border border-cream-300/80 bg-cream-50/60 shadow-sm"
          >
            <div className="relative aspect-[16/11] overflow-hidden">
              <img
                src={f.image}
                alt={f.name}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-900/55 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 font-display text-2xl text-cream-50">{f.name}</p>
            </div>
            <div className="p-5">
              <p className="text-sm text-forest-900/75">{f.tagline}</p>
              <Link className="mt-3 inline-flex text-sm font-semibold text-gold-700 hover:text-gold-600" to="/produce">
                Explore variety →
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
