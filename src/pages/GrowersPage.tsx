import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Users2, MapPinned, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'

export default function GrowersPage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello — we would like to discuss orchard programme support.')

  return (
    <>
      <PageMeta
        title="Grower network & B2B"
        description="Drpexoticfarms™ supports 60+ growers across 105+ acres with turnkey orchard solutions—hands-on field leadership and practical market bridges."
        path="/growers"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Growers</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Programmes that travel without flattening context</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-forest-900/75">
            Whether you are diversifying an estate or coordinating a grower cluster, we bring field systems that respect
            local water, labour, and varietal behaviour—while keeping the commercial north star visible.
          </p>
        </header>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { title: '60+ growers', body: 'Hands-on programmes with shared learnings across geographies.', icon: Users2 },
            { title: '105+ acres', body: 'Cumulative orchard footprint influenced by our playbooks.', icon: MapPinned },
            { title: 'Turnkey DNA', body: 'From establishment to bearing—designed for compounding seasons.', icon: Sprout },
          ].map((c, idx) => {
            const Icon = c.icon
            return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl border border-cream-300/80 bg-cream-50/70 p-6"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-forest-900 text-gold-400">
                <Icon className="size-5" aria-hidden />
              </span>
              <h2 className="mt-4 font-display text-2xl text-forest-900">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-forest-900/75">{c.body}</p>
            </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-start justify-between gap-4 rounded-[2rem] border border-cream-300/80 bg-forest-900 p-8 text-cream-200 sm:flex-row sm:items-center"
        >
          <div>
            <p className="font-display text-2xl text-cream-50">Ready for a field conversation?</p>
            <p className="mt-2 max-w-xl text-sm text-cream-200/80">
              Share maps, water sources, and market intent—we will respond with a realistic programme outline.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="secondary">
              <Link to="/contact">Book a consult</Link>
            </Button>
            <Button asChild className="bg-gold-500 text-forest-900 hover:brightness-105">
              <a href={wa} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
