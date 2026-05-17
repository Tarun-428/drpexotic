import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPinned, Sprout, Users2 } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { LOCAL_ASSETS } from '@/constants/assets'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'

type Pillar = {
  title: string
  body: string
  icon: typeof Users2
  value?: number
  suffix?: string
}

const pillars: Pillar[] = [
  {
    value: 60,
    suffix: '+',
    title: 'growers',
    body: 'Hands-on programmes and practical field rhythms shared across multiple estates.',
    icon: Users2,
  },
  {
    value: 105,
    suffix: '+',
    title: 'acres',
    body: 'A cumulative footprint shaped by DRP orchard support logic.',
    icon: MapPinned,
  },
  {
    title: 'Turnkey DNA',
    body: 'From establishment to bearing, the operating model is designed to compound rather than collapse.',
    icon: Sprout,
  },
]

export default function GrowersPage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello — we would like to discuss orchard programme support.')

  return (
    <>
      <PageMeta
        title="Grower network & B2B"
        description="Explore the DRP Exotic Farms grower network through a more compact B2B experience spanning multi-estate support and orchard programmes."
        path="/growers"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#113126] text-cream-50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(8,24,18,0.24), rgba(8,24,18,0.82)), url(${LOCAL_ASSETS.orchardTeam})`,
            }}
          />
          <div className="section-shell relative z-10 py-16 sm:py-20 lg:py-28">
            <div className="max-w-4xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <Users2 className="size-4 text-gold-400" />
                Grower network
              </span>
              <h1 className="mt-4 font-display text-[clamp(2.1rem,7vw,5.2rem)] leading-[0.94] tracking-[-0.04em] text-cream-50">
                Programmes that scale through people, not by flattening the land.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream-50/76 sm:text-base lg:text-lg">
                The DRP grower network is built around field realism, stronger shared systems, and compact business
                clarity.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-8 sm:py-10 lg:py-16">
          <div className="compact-snap-row md:hidden">
            {pillars.map((pillar) => {
              const Icon = pillar.icon
              return (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.2rem] border border-[#ddd3c4] bg-white/82 p-4 shadow-[0_16px_30px_-24px_rgba(11,61,46,0.18)]"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-forest-900 text-gold-400">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <h2 className="mt-3 font-display text-[1.2rem] leading-[1] text-forest-900">
                    {pillar.value !== undefined ? (
                      <span className="inline-flex items-baseline gap-2">
                        <AnimatedNumber value={pillar.value} suffix={pillar.suffix} className="text-[1.2rem] text-forest-900" />
                        <span>{pillar.title}</span>
                      </span>
                    ) : (
                      pillar.title
                    )}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-forest-900/68">{pillar.body}</p>
                </motion.article>
              )
            })}
          </div>

          <div className="hidden gap-4 md:grid md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <motion.article
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.8rem] border border-[#ddd3c4] bg-white/82 p-6 shadow-[0_18px_34px_-24px_rgba(11,61,46,0.18)]"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-forest-900 text-gold-400">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h2 className="mt-4 font-display text-3xl leading-[0.96] text-forest-900">
                    {pillar.value !== undefined ? (
                      <span className="inline-flex items-baseline gap-2">
                        <AnimatedNumber value={pillar.value} suffix={pillar.suffix} className="text-3xl text-forest-900" />
                        <span>{pillar.title}</span>
                      </span>
                    ) : (
                      pillar.title
                    )}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-forest-900/68">{pillar.body}</p>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section className="section-shell pb-18 pt-6 sm:pb-24 sm:pt-8 lg:pb-28">
          <div className="relative overflow-hidden rounded-[1.5rem] bg-[#0b3d2e] p-4 text-cream-50 sm:p-6 lg:rounded-[2.4rem] lg:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,169,107,0.16),transparent_20%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.08),transparent_24%)]" />
            <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div>
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82">Field conversation</span>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,6vw,4rem)] leading-[0.96]">
                  Share the estate, the water reality, and the market ambition. DRP will respond with a grounded next step.
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream-50/74 sm:text-base lg:text-lg">
                  Grower support works best when the first exchange is honest and contextual.
                </p>
              </div>
              <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col">
                <Button asChild variant="secondary" className="border-white/16 bg-white/8 text-cream-50 hover:bg-white/14">
                  <Link to="/contact">Book a consult</Link>
                </Button>
                <Button asChild>
                  <a href={wa} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
