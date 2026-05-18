import { useState, type CSSProperties, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Cpu,
  Droplets,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Warehouse,
} from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { MobileAutoCarousel } from '@/components/ui/MobileAutoCarousel'
import { LOCAL_ASSETS } from '@/constants/assets'

const introStats = [
  { value: 50, suffix: '+', label: 'acres cultivated' },
  { value: 60, suffix: '+', label: 'grower relationships' },
  { value: 105, suffix: '+', label: 'acres guided' },
] as const

const journeyMilestones = [
  {
    year: '2019',
    title: 'Where the vision took root',
    body: 'DRP began with a small but clear ambition: grow premium produce through disciplined orchard systems and a more thoughtful farm model.',
  },
  {
    year: '2020',
    title: 'Field learning became structure',
    body: 'Early farming decisions, crop observations, and seasonal lessons were translated into more repeatable operating discipline.',
  },
  {
    year: '2021',
    title: 'Grower relationships expanded',
    body: 'The business started connecting farm experience with broader support for growers, planning, and quality-oriented produce thinking.',
  },
  {
    year: '2022',
    title: 'Systems became sharper',
    body: 'Attention moved deeper into cleaner handling, orchard rhythm, and operational clarity that could support long-term trust.',
  },
  {
    year: '2023',
    title: 'Brand and farm aligned',
    body: 'The premium identity matured around real field work, making the story easier to understand without disconnecting from agriculture.',
  },
  {
    year: '2024',
    title: 'Built for the next phase',
    body: 'Today the direction is broader: stronger produce presentation, smarter support systems, and a more complete farm ecosystem.',
  },
] as const

const operationsHighlights = [
  {
    title: 'Smart planning and crop rhythm',
    label: 'Annual crop planning',
    body: 'Each season is planned with yield, quality, and market timing in mind so the farm can operate with more consistency instead of guesswork.',
    icon: Cpu,
    image: LOCAL_ASSETS.orchardNight,
  },
  {
    title: 'Localized farm intelligence',
    label: 'Weather and observation',
    body: 'On-ground monitoring helps guide irrigation, timing, and crop decisions with more precision across changing farm conditions.',
    icon: MapPin,
    image: LOCAL_ASSETS.dragonFruitHalves,
  },
  {
    title: 'Water-aware fertigation logic',
    label: 'Efficient input systems',
    body: 'Centralized input thinking helps improve nutrient delivery, reduce waste, and support cleaner long-term orchard performance.',
    icon: Droplets,
    image: LOCAL_ASSETS.dragonFruitRows,
  },
  {
    title: 'Freshness through movement',
    label: 'Supply and dispatch',
    body: 'Handling, packing, and movement are designed to preserve quality from field to destination with less friction in the chain.',
    icon: Truck,
    image: LOCAL_ASSETS.guava,
  },
  {
    title: 'Post-harvest control',
    label: 'Warehouse discipline',
    body: 'A structured post-harvest flow helps the farm maintain speed, traceability, and product confidence as operations grow.',
    icon: Warehouse,
    image: LOCAL_ASSETS.avocado,
  },
  {
    title: 'Sustainability with credibility',
    label: 'Long-horizon farming',
    body: 'The aim is not only yield. The system is built to support orchard longevity, cleaner decisions, and more stable agricultural value.',
    icon: ShieldCheck,
    image: LOCAL_ASSETS.dragonFruitCut,
  },
] as const

const leadershipCards = [
  {
    id: 'founder',
    role: 'Founder',
    name: 'Founder Name',
    subtitle: 'Vision and orchard direction',
    image: LOCAL_ASSETS.orchardTeam,
    imagePosition: '36% center',
    summary: 'Leads the farm vision, crop direction, and long-term orchard thinking behind the business.',
    story:
      'This profile can later hold the founder story, qualifications, and the bigger reason behind building a more disciplined premium farming business.',
  },
  {
    id: 'co-founder',
    role: 'Co-founder',
    name: 'Co-founder Name',
    subtitle: 'Execution and growth systems',
    image: LOCAL_ASSETS.orchardTeam,
    imagePosition: '64% center',
    summary: 'Drives execution, systems, and the daily coordination that turns the vision into reliable operations.',
    story:
      'This profile can later hold the co-founder story, operating strengths, and how the farm scales quality, partnerships, and market execution.',
  },
] as const

const affiliationBarItems = [
  'Partner Group',
  'Advisory Network',
  'Financial Institution',
  'Sector Body',
  'Growth Platform',
  'Strategic Ally',
] as const

const partnershipBarItems = [
  'Technology Partner',
  'Distribution Partner',
  'Research Partner',
  'Logistics Partner',
  'Input Partner',
  'Retail Partner',
] as const

const storePresence = ['Coming Soon'] as const

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

function FloatingTagBar({
  items,
  speedClassName,
}: {
  items: readonly string[]
  speedClassName: string
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.2rem] border border-white/12 bg-white/8 px-3 py-3 sm:px-4\">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0d3226] via-[#0d3226]/94 to-transparent sm:w-12\" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0d3226] via-[#0d3226]/94 to-transparent sm:w-12\" />
      <div className="relative w-full overflow-hidden\">
        <div className={`flex w-max items-center gap-2 pl-4 pr-5 sm:gap-2.5 sm:pl-5 sm:pr-7 ${speedClassName}`}>
          {[...items, ...items].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="shrink-0 rounded-full border border-white/12 bg-white/8 px-2.5 py-1.5 text-[0.68rem] font-medium text-cream-50/76 sm:px-3.5 sm:text-[0.84rem]\"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LeadershipFlipCard({
  role,
  name,
  subtitle,
  image,
  imagePosition,
  story,
  isFlipped,
  onToggle,
}: {
  role: string
  name: string
  subtitle: string
  image: string
  imagePosition: CSSProperties['objectPosition']
  story: string
  isFlipped: boolean
  onToggle: () => void
}) {
  return (
    <article className="group mx-auto h-[23rem] w-full max-w-[18rem] [perspective:1400px] sm:h-[24rem] sm:max-w-[18.75rem] lg:h-[25rem]">
      <button
        type="button"
        className="relative block h-full w-full rounded-[1.8rem] text-left focus:outline-none"
        onClick={onToggle}
        aria-label={`Reveal ${role.toLowerCase()} card`}
      >
        <div
          className={`relative h-full w-full rounded-[1.8rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          } group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[1.8rem] border border-[#d7d4ca] bg-[#f7f1e7] shadow-[0_28px_62px_-40px_rgba(11,61,46,0.22)] [backface-visibility:hidden]">
            <img
              src={image}
              alt={role}
              className="h-full w-full object-cover"
              style={{ objectPosition: imagePosition }}
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#081712]/84 via-[#081712]/10 to-transparent" />
            <div className="absolute inset-x-4 top-4">
              <span className="rounded-full border border-white/18 bg-white/12 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream-50 backdrop-blur">
                {role}
              </span>
            </div>
            <div className="absolute inset-x-4 bottom-5 text-center">
              <p className="text-[0.98rem] font-extrabold uppercase tracking-[0.04em] text-[#9ad122] sm:text-[1.05rem]">{name}</p>
              <p className="mt-1 text-[0.95rem] font-medium leading-tight text-white/92 sm:text-[1.02rem]">{subtitle}</p>
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden rounded-[1.8rem] border border-[#d9cfbe] bg-[linear-gradient(180deg,rgba(253,250,244,0.98),rgba(244,236,222,0.98))] shadow-[0_28px_62px_-40px_rgba(11,61,46,0.22)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="absolute inset-x-4 top-4">
              <span className="rounded-full border border-[#d8d0c3] bg-white/80 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-forest-900/70 backdrop-blur">
                Vision
              </span>
            </div>
            <div className="flex h-full flex-col justify-end px-5 pb-6 pt-16 text-center sm:px-6">
              <p className="text-[0.98rem] font-extrabold uppercase tracking-[0.04em] text-[#7ea800] sm:text-[1.05rem]">{name}</p>
              <p className="mt-1 text-[0.95rem] font-medium leading-tight text-forest-900/84 sm:text-[1.02rem]">{subtitle}</p>
              <p className="mt-4 text-[0.82rem] leading-[1.75] text-forest-900/72 sm:text-[0.88rem]">{story}</p>
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}

function OperationSpotlightCard({
  id,
  title,
  label,
  body,
  image,
  Icon,
  isActive,
  onToggle,
}: {
  id: string
  title: string
  label: string
  body: string
  image: string
  Icon: typeof Cpu
  isActive: boolean
  onToggle: (id: string) => void
}) {
  return (
    <article className="group h-full">
      <button
        type="button"
        className="relative block h-full w-full overflow-hidden rounded-[1.45rem] border border-[#ddd2c1] bg-white/82 text-left shadow-[0_20px_48px_-42px_rgba(11,61,46,0.22)] focus:outline-none"
        onClick={() => onToggle(id)}
        aria-label={`Reveal ${title}`}
      >
        <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081712]/88 via-[#081712]/24 to-transparent" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/14 bg-white/14 text-cream-50 backdrop-blur">
            <Icon className="size-4" />
          </span>
          <span className="rounded-full border border-white/16 bg-black/16 px-2.5 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-cream-50/78 backdrop-blur">
            Hover or tap
          </span>
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 p-4 transition duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isActive ? 'translate-y-0' : 'translate-y-[3.2rem] group-hover:translate-y-0'
          }`}
        >
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-gold-400">{label}</p>
          <h3 className="mt-2 font-display text-[1.15rem] leading-[1] text-cream-50 sm:text-[1.22rem]">{title}</h3>
          <p className="mt-3 max-w-[16rem] text-[0.78rem] leading-relaxed text-cream-50/78 sm:text-[0.82rem]">{body}</p>
        </div>
      </button>
    </article>
  )
}

export default function AboutPage() {
  const [activeLeaderCard, setActiveLeaderCard] = useState<string | null>(null)
  const [activeOperationCard, setActiveOperationCard] = useState<string | null>(null)

  return (
    <>
      <PageMeta
        title="About DRP Exotic Farms"
        description="Explore DRP Exotic Farms through a clearer About page covering the journey, operations, people, and ecosystem in a premium farm-first presentation."
        path="/about"
      />

      <div className="relative overflow-hidden">

        {/* ── HERO — matches produce hero: bg-[#0d3226] with same radial overlay ── */}
        <section className="relative isolate overflow-hidden bg-[#0d3226] text-cream-50">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,195,144,0.14),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(13,50,38,0.96),rgba(7,21,16,0.96))]" />
          <div className="section-shell relative z-10 py-14 sm:py-18 lg:py-24">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.88fr)] lg:items-center lg:gap-12">
              <SectionReveal className="max-w-3xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                  <Leaf className="size-4 text-gold-400" />
                  About DRP
                </span>
                <h1 className="mt-4 font-display text-[clamp(2rem,5.4vw,4.35rem)] leading-[0.95] tracking-[-0.04em] text-cream-50">
                  A modern farm story shaped by produce, systems, people, and long-horizon trust.
                </h1>
                <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-cream-50/76 sm:text-[0.96rem] lg:text-[1rem]">
                  This page is designed as a stronger brand-style introduction. For now it uses structured dummy content
                  that you can later replace with your final company journey, operations, leadership, and ecosystem data.
                </p>
                <div className="mt-5 grid gap-2 text-[0.84rem] leading-relaxed text-cream-50/76 sm:text-[0.9rem]">
                  {[
                    'Started from a focused agricultural vision.',
                    'Built around practical systems rather than decorative branding.',
                    'Designed to show users the full concept in a cleaner, easier way.',
                  ].map((point) => (
                    <div key={point} className="flex items-start gap-3 rounded-[1rem] border border-white/12 bg-white/8 px-4 py-3">
                      <span className="mt-1 size-2 rounded-full bg-gold-400" />
                      <p>{point}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>

              <SectionReveal className="rounded-[1.8rem] border border-white/10 bg-white/[0.07] p-3 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.5)] backdrop-blur sm:p-4 lg:rounded-[2rem]">
                <img
                  src={LOCAL_ASSETS.dragonFruitRows}
                  alt="Dragon fruit rows in the DRP orchard"
                  className="aspect-[16/12] w-full rounded-[1.25rem] object-cover lg:rounded-[1.5rem]"
                  loading="eager"
                  decoding="async"
                />
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {introStats.map((item) => (
                    <div key={item.label} className="rounded-[1rem] border border-white/12 bg-white/8 px-3 py-3">
                      <p className="font-display text-[1.35rem] leading-none text-cream-50 sm:text-[1.65rem]">
                        <AnimatedNumber value={item.value} suffix={item.suffix} duration={1.1} />
                      </p>
                      <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-cream-50/54 sm:text-[0.62rem]">{item.label}</p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* ── JOURNEY ── */}
        <section className="section-shell relative z-10 py-6 sm:py-8 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <SectionReveal className="max-w-3xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <Sparkles className="size-4 text-gold-400" />
                Our Journey
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,4.2vw,2.65rem)] leading-[0.99] text-cream-50">
                Started as a small dream, now shaped into a larger farm movement.
              </h2>
              <p className="mt-3 max-w-3xl text-[0.88rem] leading-relaxed text-cream-50/76 sm:text-[0.95rem]">
                This section mirrors the kind of journey storytelling you shared, but translated into our quieter DRP
                visual system.
              </p>
            </SectionReveal>

            <div className="responsive-card-row mt-6 gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
              {journeyMilestones.map((item) => (
                <SectionReveal key={item.year} className="rounded-[1.25rem] border border-white/12 bg-white/8 p-4 sm:p-5">
                  <p className="text-[1.2rem] font-display leading-none text-gold-400">{item.year}</p>
                  <h3 className="mt-3 font-display text-[1.12rem] leading-[1.02] text-cream-50 sm:text-[1.2rem]">{item.title}</h3>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-cream-50/76 sm:text-[0.88rem]">{item.body}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPERATIONS ── */}
        <section className="section-shell relative z-10 py-8 sm:py-10 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <SectionReveal className="max-w-3xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <Building2 className="size-4 text-gold-400" />
                Operations
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,4.1vw,2.6rem)] leading-[0.99] text-cream-50">
                Smart farming systems presented in a cleaner, easier-to-read layout.
              </h2>
              <p className="mt-3 max-w-3xl text-[0.88rem] leading-relaxed text-cream-50/76 sm:text-[0.95rem]">
                These cards can later be replaced with your exact operational copy, maps, ERP details, or process
                modules. Right now they give you the right visual and structural direction.
              </p>
            </SectionReveal>

            <MobileAutoCarousel
              className="mt-6 h-[18.5rem]"
              slideClassName="h-full"
              ariaLabel="Operations carousel"
              intervalMs={2800}
              slideOffsetPercent={92}
            >
              {operationsHighlights.map((item) => {
                const Icon = item.icon
                const cardId = item.title

                return (
                  <div key={item.title} className="h-full">
                    <OperationSpotlightCard
                      id={cardId}
                      title={item.title}
                      label={item.label}
                      body={item.body}
                      image={item.image}
                      Icon={Icon}
                      isActive={activeOperationCard === cardId}
                      onToggle={(id) => setActiveOperationCard((current) => (current === id ? null : id))}
                    />
                  </div>
                )
              })}
            </MobileAutoCarousel>

            <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3">
              {operationsHighlights.map((item) => {
                const Icon = item.icon
                const cardId = item.title

                return (
                  <SectionReveal key={item.title} className="h-[21rem]">
                    <OperationSpotlightCard
                      id={cardId}
                      title={item.title}
                      label={item.label}
                      body={item.body}
                      image={item.image}
                      Icon={Icon}
                      isActive={activeOperationCard === cardId}
                      onToggle={(id) => setActiveOperationCard((current) => (current === id ? null : id))}
                    />
                  </SectionReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP — matches produce harvest journey section: bg-[#0b3d2e] dark forest ── */}
        <section className="section-shell relative z-10 py-8 sm:py-10 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <SectionReveal className="mx-auto max-w-3xl text-center">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <Users className="size-4 text-gold-400" />
                The Force Driving DRP
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,4.2vw,2.7rem)] leading-[0.99] text-cream-50">
                Founder and co-founder profiles aligned as the visual center of the page.
              </h2>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-cream-50/76 sm:text-[0.95rem]\">
                These cards use placeholder names and stories for now, but the layout is ready for your final founder
                content and better portrait photos later.
              </p>
            </SectionReveal>

            <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2 md:gap-5">
              {leadershipCards.map((card) => (
                <SectionReveal key={card.id}>
                  <LeadershipFlipCard
                    role={card.role}
                    name={card.name}
                    subtitle={card.subtitle}
                    image={card.image}
                    imagePosition={card.imagePosition}
                    story={card.story}
                    isFlipped={activeLeaderCard === card.id}
                    onToggle={() => setActiveLeaderCard((current) => (current === card.id ? null : card.id))}
                  />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM — matches produce "coming next" section: light cream bg ── */}
        <section className="section-shell relative z-10 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-14">
          <div className="mx-auto grid w-full max-w-[54rem] gap-4">
            <SectionReveal className="w-full overflow-hidden rounded-[1.7rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_54px_-42px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7\">
              <h2 className="font-display text-[1.45rem] leading-none text-cream-50 sm:text-[1.7rem]\">Our Affiliations</h2>
              <p className="mt-3 max-w-3xl text-[0.84rem] leading-relaxed text-cream-50/76 sm:text-[0.92rem]\">
                This floating bar is reserved for advisory, financial, institutional, or ecosystem relationships.
              </p>
              <div className="mt-5">
                <FloatingTagBar items={affiliationBarItems} speedClassName="[animation:journal-marquee-scroll_24s_linear_infinite]" />
              </div>
            </SectionReveal>

            <SectionReveal className="w-full overflow-hidden rounded-[1.7rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_54px_-42px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7\">
              <h2 className="font-display text-[1.45rem] leading-none text-cream-50 sm:text-[1.7rem]\">Our Partnerships</h2>
              <p className="mt-3 max-w-3xl text-[0.84rem] leading-relaxed text-cream-50/76 sm:text-[0.92rem]\">
                This second floating bar can later hold technology, logistics, research, retail, or distribution partners.
              </p>
              <div className="mt-5">
                <FloatingTagBar items={partnershipBarItems} speedClassName="[animation:journal-marquee-scroll_28s_linear_infinite_reverse]" />
              </div>
            </SectionReveal>

            <SectionReveal className="w-full overflow-hidden rounded-[1.7rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_54px_-42px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7\">
              <h2 className="font-display text-[1.45rem] leading-none text-cream-50 sm:text-[1.7rem]\">Find Us In Stores</h2>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3\">
                {storePresence.map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-[0.74rem] font-medium text-cream-50/76 sm:px-3.5 sm:py-2 sm:text-[0.88rem]\"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>
      </div>
    </>
  )
}