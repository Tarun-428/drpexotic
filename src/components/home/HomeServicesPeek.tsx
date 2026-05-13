import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sprout, Tractor, LineChart } from 'lucide-react'

const items = [
  {
    title: 'Turnkey orchard programmes',
    body: 'Soil readiness, varietal choice, irrigation architecture, and a realistic ramp to commercial bearing.',
    icon: Sprout,
  },
  {
    title: 'Grower network acceleration',
    body: 'Hands-on support across 60+ farms—protocols that travel well without flattening local context.',
    icon: Tractor,
  },
  {
    title: 'Market-facing quality systems',
    body: 'Residue-aware posture with grading discipline—so your brand story matches what buyers unpack.',
    icon: LineChart,
  },
] as const

export function HomeServicesPeek() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] border border-cream-300/80 bg-gradient-to-br from-cream-50/80 via-cream-200/40 to-cream-50/70 p-8 shadow-inner shadow-black/5 sm:p-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Services</p>
            <h2 className="mt-2 font-display text-3xl text-forest-900 sm:text-4xl">Orchards engineered to succeed over time</h2>
            <p className="mt-3 text-forest-900/75">
              Not just installation—ongoing rhythms for nutrition, canopy, labour peaks, and harvest windows aligned to
              your markets.
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center justify-center rounded-full border border-forest-900/15 bg-forest-900 px-5 py-2 text-sm font-semibold text-cream-50 transition hover:bg-forest-800"
          >
            View services
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((it, idx) => {
            const Icon = it.icon
            return (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-cream-300/70 bg-cream-50/70 p-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-forest-900 text-gold-400">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-xl text-forest-900">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-900/75">{it.body}</p>
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
