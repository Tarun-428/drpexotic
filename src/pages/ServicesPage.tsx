import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const phases = [
  {
    title: 'Discovery & land readiness',
    body: 'Soil maps, water security, wind corridors, and varietal shortlists aligned to your commercial intent.',
  },
  {
    title: 'Orchard architecture',
    body: 'Row geometry, irrigation topology, support systems, and labour-friendly layouts for peak-week throughput.',
  },
  {
    title: 'Establishment & nutrition',
    body: 'Rooting protocols, staged fertigation, and monitoring checkpoints tuned to residue-aware commitments.',
  },
  {
    title: 'Bearings, harvest, and market bridge',
    body: 'Grading literacy, pack-out planning, and buyer narratives that match what the field actually delivers.',
  },
] as const

export default function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Turnkey orchard services"
        description="End-to-end orchard programmes from soil readiness to harvest discipline—supporting growers with practical, market-aware field systems."
        path="/services"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Services</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Turnkey orchards that keep maturing</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-forest-900/75">
            We focus on farms that <strong>grow and succeed over time</strong>—not ribbon-cuttings. Programmes combine
            hands-on field leadership with a grower network playbook refined across{' '}
            <strong>60+ farms and 105+ acres</strong>.
          </p>
        </header>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-7">
            {phases.map((p, idx) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl border border-cream-300/80 bg-cream-50/70 p-6"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 size-5 text-gold-600" aria-hidden />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">
                      Phase {idx + 1}
                    </p>
                    <h2 className="mt-1 font-display text-2xl text-forest-900">{p.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-forest-900/75">{p.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="sticky top-24 overflow-hidden rounded-[2rem] border border-cream-300/80 bg-forest-900 p-8 text-cream-200 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">Engagement models</p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-cream-200/85">
                <li>• Advisory sprints for existing orchards seeking yield or quality recovery.</li>
                <li>• Full turnkey builds for new diversification blocks and investor-led estates.</li>
                <li>• Grower-group programmes with shared logistics and grading literacy.</li>
              </ul>
              <p className="mt-6 text-xs text-cream-200/60">
                Commercial terms are scoped per geography, crop cycle, and depth of embedded support.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </>
  )
}
