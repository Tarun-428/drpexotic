import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About the farm"
        description="Learn how Drpexoticfarms™ cultivates exotic and native fruits across 50 acres with sustainable, residue-aware practices—and how we support growers nationwide."
        path="/about"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">About</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Grounded science. Orchard poetry.</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-forest-900/75">
            Drpexoticfarms™ grows a diverse portfolio of exotic and native fruits across <strong>50 acres</strong> of
            fertile land. Our operating system blends modern agronomy with sustainable intensity—prioritising{' '}
            <strong>clean, residue-free, high-quality fruit</strong> for discerning buyers and communities who care
            about provenance.
          </p>
        </motion.header>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden rounded-[2rem] border border-cream-300/80 bg-cream-50/60 lg:col-span-5"
          >
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&q=80"
              alt="Hands in fertile soil during field assessment"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 text-forest-900/75 lg:col-span-7"
          >
            <p>
              Beyond our own estate, we have supported <strong>60+ growers across 105+ acres</strong> in developing
              successful orchards—pairing varietal realism with market timing so programmes do not collapse after year
              one.
            </p>
            <p>
              Our grower network benefits from shared learnings on nutrition diagnostics, canopy architecture, labour
              planning, and harvest sequencing—always adapted to local climate and water realities.
            </p>
            <p>
              The result is a brand story you can defend in a sales room: transparent practices, disciplined quality
              gates, and orchards designed to compound value season after season.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}
