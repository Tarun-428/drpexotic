import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Leaf, LineChart, ShieldCheck, Sprout, Tractor, Trees } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { LOCAL_ASSETS } from '@/constants/assets'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'

const serviceCards = [
  {
    title: 'Turnkey orchard programmes',
    what: 'End-to-end orchard planning and guidance.',
    who: 'For new estates and diversification projects.',
    outcome: 'A more coherent orchard start.',
    icon: Sprout,
    image: LOCAL_ASSETS.orchardTeam,
  },
  {
    title: 'Grower system support',
    what: 'Field discipline and practical process guidance.',
    who: 'For growers improving consistency or orchard maturity.',
    outcome: 'Stronger operating rhythm.',
    icon: Tractor,
    image: LOCAL_ASSETS.orchardNight,
  },
  {
    title: 'Market-facing quality',
    what: 'Harvest thinking and premium produce positioning.',
    who: 'For produce businesses needing stronger buyer trust.',
    outcome: 'Clearer market confidence.',
    icon: LineChart,
    image: LOCAL_ASSETS.dragonFruitRows,
  },
] as const

const processSteps = [
  { title: 'Service overview', body: 'Clarify orchard stage, crop direction, site conditions, and goals.' },
  { title: 'Field assessment', body: 'Review land, water, slope, layout potential, and crop fit.' },
  { title: 'Programme design', body: 'Structure establishment, care systems, labour flow, and quality discipline.' },
  { title: 'Execution support', body: 'Guide planting, nutrition, canopy work, and key operational decisions.' },
  { title: 'Benefits review', body: 'Track cleaner systems, steadier produce quality, and stronger orchard control.' },
  { title: 'Results', body: 'Build an orchard or produce system that is easier to manage and position.' },
] as const

const trustIndicators = [
  '50+ acres of company cultivation experience',
  '60+ grower relationships contributing to field learning',
  '105+ acres influenced by orchard support and systems thinking',
  'Residue-aware quality posture designed to support premium credibility',
] as const

function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function ServicesPage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello DRP Exotic Farms, I would like to discuss orchard services and programme options.',
  )

  return (
    <>
      <PageMeta
        title="Orchard services and programmes"
        description="Explore DRP Exotic Farms services through a clearer structure covering orchard planning, grower support, process, benefits, outcomes, and premium quality systems."
        path="/services"
      />

      <div className="relative overflow-hidden">
        <section className="section-shell py-8 sm:py-10 lg:py-14">
          <SectionReveal className="mb-8 max-w-4xl">
            <span className="section-label">
              <Leaf className="size-4 text-gold-600" />
              Services
            </span>
            <h1 className="mt-3 font-display text-[clamp(2rem,7vw,4.8rem)] leading-[0.94] tracking-[-0.04em] text-forest-900">
              Orchard services that explain what they do, who they help, and what they improve.
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-forest-900/72 sm:text-base lg:text-lg">
              DRP's services cover orchard planning, field programme support, and quality systems designed to make orchards more structured and produce more market-ready.
            </p>
          </SectionReveal>

          <div className="grid gap-4 lg:grid-cols-3">
            {serviceCards.map((service) => {
              const Icon = service.icon
              return (
                <SectionReveal
                  key={service.title}
                  className="group overflow-hidden rounded-[1.75rem] border border-[#ddd3c3] bg-[#f8f2e8] shadow-[0_22px_46px_-38px_rgba(11,61,46,0.24)] transition-all duration-300 hover:shadow-[0_28px_56px_-32px_rgba(11,61,46,0.32)]"
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-900/92 via-forest-900/42 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-3 sm:p-4 lg:p-5">
                    <span className="inline-flex size-9 sm:size-10 lg:size-11 items-center justify-center rounded-full bg-[#e7ecdf] text-forest-900">
                      <Icon className="size-4 sm:size-4.5 lg:size-5" />
                    </span>
                    <h2 className="mt-3 sm:mt-4 font-display text-[clamp(1.15rem,4vw,1.7rem)] leading-[1.1] text-forest-900">{service.title}</h2>
                    <div className="mt-3 sm:mt-4 grid gap-2.5 sm:gap-3 text-xs sm:text-sm leading-relaxed">
                      <p className="text-forest-900/72">
                        <span className="font-semibold text-forest-900">What it is:</span> {service.what}
                      </p>
                      <p className="text-forest-900/72">
                        <span className="font-semibold text-forest-900">Who it helps:</span> {service.who}
                      </p>
                      <p className="text-forest-900/72">
                        <span className="font-semibold text-forest-900">Outcome:</span> {service.outcome}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              )
            })}
          </div>

          <div className="mt-6 sm:mt-8 rounded-[1.35rem] border border-[#ddd3c3] bg-white/84 p-3 sm:p-4 lg:rounded-[1.8rem] lg:p-6">
            <p className="text-[0.58rem] sm:text-[0.65rem] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-forest-900/56">Who these services help</p>
            <div className="mt-2.5 sm:mt-3 grid gap-2 sm:gap-2.5 lg:grid-cols-2">
              {[
                'Estate owners planning a new orchard',
                'Existing growers improving orchard structure',
                'Investor-led farms needing a guided operating model',
                'Produce businesses linking field quality to premium positioning',
              ].map((item) => (
                <div key={item} className="rounded-[1rem] border border-[#ddd3c3] bg-[#fdfaf4] px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs leading-relaxed text-forest-900/72 sm:text-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <SectionReveal>
              <span className="section-label">
                <Trees className="size-4 text-gold-600" />
                Service architecture
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.3rem)] leading-[0.96] text-forest-900">
                A clearer process from first conversation to orchard results.
              </h2>
            </SectionReveal>

            <div className="floating-timeline lg:hidden">
              {processSteps.map((step, index) => (
                <SectionReveal key={step.title} className="rounded-[1.2rem] border border-[#ddd3c3] bg-white/84 p-3 sm:p-4">
                  <p className="text-[0.58rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-forest-900/48">0{index + 1}</p>
                  <h3 className="mt-2 font-display text-[clamp(1rem,3vw,1.12rem)] leading-[1.1] text-forest-900">{step.title}</h3>
                  <p className="mt-2 text-xs sm:text-xs leading-relaxed text-forest-900/68">{step.body}</p>
                </SectionReveal>
              ))}
            </div>

            <div className="hidden gap-4 lg:grid lg:grid-cols-2">
              {processSteps.map((step, index) => (
                <SectionReveal key={step.title} className="rounded-[1.35rem] lg:rounded-[1.55rem] border border-[#ddd3c3] bg-white/84 p-4 lg:p-5">
                  <div className="flex items-start gap-3 lg:gap-4">
                    <span className="inline-flex size-9 lg:size-10 shrink-0 items-center justify-center rounded-full bg-forest-900 text-gold-400">
                      <CheckCircle2 className="size-4 lg:size-5" />
                    </span>
                    <div>
                      <p className="text-[0.62rem] lg:text-[0.68rem] font-semibold uppercase tracking-[0.2em] lg:tracking-[0.22em] text-forest-900/48">Step 0{index + 1}</p>
                      <h3 className="mt-2 font-display text-[clamp(1.25rem,3vw,1.45rem)] leading-[1] text-forest-900">{step.title}</h3>
                      <p className="mt-2 lg:mt-3 text-xs sm:text-sm leading-relaxed text-forest-900/68">{step.body}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0f3b2f] py-6 sm:py-8 lg:py-16 text-cream-50">
          <div className="section-shell">
            <SectionReveal className="max-w-3xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <ShieldCheck className="size-4 text-gold-400" />
                Trust indicators
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,6vw,3.5rem)] leading-[0.96]">
                Practical proof that supports the service story.
              </h2>
            </SectionReveal>

            <div className="compact-snap-row mt-3 sm:mt-4 lg:hidden">
              {trustIndicators.map((item) => (
                <SectionReveal key={item} className="rounded-[1.2rem] border border-white/10 bg-white/6 p-3 sm:p-4 backdrop-blur">
                  <p className="text-xs sm:text-xs leading-relaxed text-cream-50/74">{item}</p>
                </SectionReveal>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 hidden gap-3 sm:gap-4 lg:grid lg:grid-cols-4">
              {trustIndicators.map((item) => (
                <SectionReveal key={item} className="rounded-[1.35rem] lg:rounded-[1.55rem] border border-white/10 bg-white/6 p-4 lg:p-5 backdrop-blur">
                  <p className="text-xs sm:text-sm leading-relaxed text-cream-50/74">{item}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pb-16 sm:pb-24 pt-5 sm:pt-8 lg:pb-28">
          <SectionReveal className="rounded-[1.35rem] sm:rounded-[1.5rem] lg:rounded-[2rem] bg-[linear-gradient(135deg,#0b3d2e,#174836)] px-3 sm:px-6 py-4 sm:py-6 lg:px-10 lg:py-8 text-cream-50">
            <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-3xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82 text-[0.65rem] sm:text-[0.75rem]">Discuss orchard programmes</span>
                <h2 className="mt-2 sm:mt-3 font-display text-[clamp(1.6rem,6vw,4rem)] leading-[0.96]">
                  If you have a site, a crop direction, or a quality challenge, DRP can help structure the next step.
                </h2>
                <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm lg:text-base leading-relaxed text-cream-50/74">
                  The service conversation can begin with land planning, orchard improvement, or produce quality goals.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/contact" className="inline-flex items-center gap-2 text-xs sm:text-sm">
                    Discuss orchard programmes
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full border-white/18 bg-white/10 text-cream-50 hover:bg-white/16 sm:w-auto text-xs sm:text-sm"
                >
                  <a href={wa} target="_blank" rel="noreferrer">
                    Talk on WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </SectionReveal>
        </section>
      </div>
    </>
  )
}
