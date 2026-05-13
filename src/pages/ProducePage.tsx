import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { FRUIT_VARIETIES } from '@/constants/fruits'

export default function ProducePage() {
  return (
    <>
      <PageMeta
        title="Produce & varieties"
        description="Explore Drpexoticfarms™ signature fruits: blueberry, avocado, dragon fruit, Kesar mango, Red Diamond guava, and banana—grown with residue-aware discipline."
        path="/produce"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Produce</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Fruit with a point of view</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-forest-900/75">
            Each variety is stewarded with modern nutrition intelligence, sustainable intensity, and grading realism—so
            what you promise in a pitch deck survives the packing line.
          </p>
        </header>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {FRUIT_VARIETIES.map((f, idx) => (
            <motion.article
              key={f.slug}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: (idx % 2) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-[2rem] border border-cream-300/80 bg-cream-50/60 shadow-sm"
            >
              <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.18} className="h-full">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={f.image} alt={f.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="font-display text-3xl text-cream-50">{f.name}</h2>
                    <p className="mt-1 text-sm text-cream-200/85">{f.tagline}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-relaxed text-forest-900/75">{f.description}</p>
                  <ul className="mt-4 space-y-2 text-sm text-forest-900/70">
                    {f.notes.map((n) => (
                      <li key={n}>• {n}</li>
                    ))}
                  </ul>
                </div>
              </Tilt>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 rounded-[2rem] border border-gold-500/30 bg-gradient-to-br from-cream-50/80 to-cream-200/50 p-8"
        >
          <h3 className="font-display text-2xl text-forest-900">Packaged goods — coming online</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-forest-900/75">
            We are planning packaged product sales. Until checkout goes live, use WhatsApp or the contact form for
            availability conversations and forward contracts.
          </p>
        </motion.div>
      </div>
    </>
  )
}
