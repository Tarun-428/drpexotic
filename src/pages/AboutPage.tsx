import { useState, useCallback, useRef, type CSSProperties, type ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
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

// ─── Data ────────────────────────────────────────────────────────────────────

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
    id: 'planning',
    title: 'Smart planning and crop rhythm',
    label: 'Annual crop planning',
    body: 'Each season is planned with yield, quality, and market timing in mind so the farm can operate with more consistency instead of guesswork.',
    icon: Cpu,
    image: LOCAL_ASSETS.orchardNight,
  },
  {
    id: 'observation',
    title: 'Localized farm intelligence',
    label: 'Weather and observation',
    body: 'On-ground monitoring helps guide irrigation, timing, and crop decisions with more precision across changing farm conditions.',
    icon: MapPin,
    image: LOCAL_ASSETS.dragonFruitHalves,
  },
  {
    id: 'fertigation',
    title: 'Water-aware fertigation logic',
    label: 'Efficient input systems',
    body: 'Centralized input thinking helps improve nutrient delivery, reduce waste, and support cleaner long-term orchard performance.',
    icon: Droplets,
    image: LOCAL_ASSETS.dragonFruitRows,
  },
  {
    id: 'dispatch',
    title: 'Freshness through movement',
    label: 'Supply and dispatch',
    body: 'Handling, packing, and movement are designed to preserve quality from field to destination with less friction in the chain.',
    icon: Truck,
    image: LOCAL_ASSETS.guava,
  },
  {
    id: 'warehouse',
    title: 'Post-harvest control',
    label: 'Warehouse discipline',
    body: 'A structured post-harvest flow helps the farm maintain speed, traceability, and product confidence as operations grow.',
    icon: Warehouse,
    image: LOCAL_ASSETS.avocado,
  },
  {
    id: 'sustainability',
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
    imagePosition: '36% center' as CSSProperties['objectPosition'],
    story:
      'This profile can later hold the founder story, qualifications, and the bigger reason behind building a more disciplined premium farming business.',
  },
  {
    id: 'co-founder',
    role: 'Co-founder',
    name: 'Co-founder Name',
    subtitle: 'Execution and growth systems',
    image: LOCAL_ASSETS.orchardTeam,
    imagePosition: '64% center' as CSSProperties['objectPosition'],
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

// ─── Shared animation variants ────────────────────────────────────────────────

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

// ─── SectionReveal ────────────────────────────────────────────────────────────

function SectionReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  )
}

function useMobileFloat() {
  // We use matchMedia to decide once on mount. SSR-safe.
  if (typeof window === 'undefined') return false
  return window.matchMedia('(max-width: 767px)').matches
}

function useTouchInteraction() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: none), (pointer: coarse)').matches
}

// Floating card wrapper that self-manages
function FloatingCard({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const prefersReduced = useReducedMotion()
  const isMobile = useMobileFloat()

  return (
    <motion.div
      className={className}
      style={{ willChange: isMobile && !prefersReduced ? 'transform' : 'auto' }}
      animate={
        isMobile && !prefersReduced
          ? {
              y: [-3, 3, -3],
              transition: {
                duration: 3.8 + delay * 0.35,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop' as const,
                delay,
              },
            }
          : {}
      }
    >
      {children}
    </motion.div>
  )
}

// ─── FloatingTagBar ───────────────────────────────────────────────────────────

function FloatingTagBar({
  items,
  animationClassName,
}: {
  items: readonly string[]
  animationClassName: string
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.2rem] border border-white/12 bg-white/8 px-3 py-3 sm:px-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0d3226] via-[#0d3226]/94 to-transparent sm:w-12" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0d3226] via-[#0d3226]/94 to-transparent sm:w-12" />
      <div
        className={`flex w-max items-center gap-2 pl-4 pr-5 sm:gap-2.5 sm:pl-5 sm:pr-7 ${animationClassName}`}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="shrink-0 rounded-full border border-white/16 bg-white/10 px-2.5 py-1.5 text-[0.68rem] font-medium text-cream-50/90 sm:px-3.5 sm:text-[0.84rem]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── OperationCard ────────────────────────────────────────────────────────────
// Shows overlay text (body) on hover (desktop) or tap (mobile).

function OperationCard({
  title,
  label,
  body,
  icon: Icon,
  image,
}: (typeof operationsHighlights)[number]) {
  const [tapped, setTapped] = useState(false)
  const tapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTap = useCallback(() => {
    // Toggle on mobile tap; auto-dismiss after 3 s
    setTapped((prev) => {
      if (!prev) {
        tapTimerRef.current && clearTimeout(tapTimerRef.current)
        tapTimerRef.current = setTimeout(() => setTapped(false), 3000)
      }
      return !prev
    })
  }, [])

  return (
    <SectionReveal
      className="overflow-hidden rounded-[1.45rem] border border-[#ddd2c1] bg-white/82 text-left shadow-[0_20px_48px_-42px_rgba(11,61,46,0.22)]"
    >
      {/* Image area with overlay */}
        <div
          className="group relative cursor-pointer select-none"
          onClick={handleTap}
        // Prevent scroll hijack on mobile — passive touch
        onTouchStart={() => {}} // intentional no-op to register passive listener
      >
        <img
          src={image}
          alt={title}
          className="aspect-[4/3] w-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Base gradient always shown */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#081712]/88 via-[#081712]/24 to-transparent" />

        {/* Icon + label badge */}
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-white/16 text-cream-50 backdrop-blur">
            <Icon className="size-4" />
          </span>
          <span className="rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-cream-50/90 backdrop-blur">
            {label}
          </span>
        </div>

        {/* Title always visible at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="font-display text-[1.15rem] leading-[1] text-white sm:text-[1.22rem]">
            {title}
          </h3>
        </div>

        {/* Body overlay — appears on hover (desktop) or tap (mobile) */}
        {/* Uses group-hover for desktop, data-tapped for mobile */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex flex-col justify-end p-4"
          initial={false}
          animate={{
            opacity: tapped ? 1 : 0,
            y: tapped ? 0 : 8,
          }}
          // On desktop we rely on CSS group-hover via a separate overlay approach below
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          {/* Mobile tap overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#081712]/95 via-[#081712]/80 to-[#081712]/50" />
          <p className="relative z-10 max-w-[16rem] text-[0.82rem] leading-relaxed text-white sm:text-[0.88rem]">
            {body}
          </p>
        </motion.div>

        {/* Desktop hover overlay — pure CSS, zero JS */}
        <div className="pointer-events-none absolute inset-0 hidden flex-col justify-end p-4 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 md:flex">
          <div className="absolute inset-0 bg-gradient-to-t from-[#081712]/95 via-[#081712]/80 to-[#081712]/50" />
          <p className="relative z-10 max-w-[16rem] text-[0.82rem] leading-relaxed text-white sm:text-[0.88rem]">
            {body}
          </p>
        </div>
      </div>
    </SectionReveal>
  )
}

// ─── LeadershipFlipCard ───────────────────────────────────────────────────────
// 3-D flip card: front = image, back = bio text.

function LeadershipFlipCard({
  role,
  name,
  subtitle,
  image,
  imagePosition,
  story,
}: {
  role: string
  name: string
  subtitle: string
  image: string
  imagePosition: CSSProperties['objectPosition']
  story: string
}) {
  const [flipped, setFlipped] = useState(false)
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()
  const isTouchInteraction = useTouchInteraction()

  const toggle = useCallback(() => setFlipped((f) => !f), [])
  const isFlipped = isTouchInteraction ? flipped : hovered || flipped

  // For reduced motion: just swap content without 3-D rotation
  if (prefersReduced) {
    return (
      <article className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/8 shadow-[0_24px_58px_-40px_rgba(0,0,0,0.26)]">
        <button type="button" className="block w-full text-left" onClick={toggle}>
          {!flipped ? (
            <>
              <div className="relative">
                <img
                  src={image}
                  alt={role}
                  className="aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: imagePosition }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081712]/84 via-[#081712]/16 to-transparent" />
                <div className="absolute inset-x-4 top-4">
                  <span className="rounded-full border border-white/20 bg-white/14 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream-50 backdrop-blur">
                    {role}
                  </span>
                </div>
                <div className="absolute inset-x-4 bottom-5 text-center">
                  <p className="text-[0.98rem] font-extrabold uppercase tracking-[0.04em] text-[#9ad122] sm:text-[1.05rem]">{name}</p>
                  <p className="mt-1 text-[0.95rem] font-medium leading-tight text-white sm:text-[1.02rem]">{subtitle}</p>
                </div>
              </div>
              <div className="border-t border-white/10 px-5 py-4 sm:px-6">
                <span className="inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                  Tap to read story
                </span>
              </div>
            </>
          ) : (
            <div className="flex min-h-[420px] flex-col justify-between p-6 sm:p-7">
              <div>
                <span className="rounded-full border border-white/20 bg-white/14 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream-50 backdrop-blur">
                  {role}
                </span>
                <p className="mt-4 text-[1rem] font-extrabold uppercase tracking-[0.04em] text-[#9ad122] sm:text-[1.08rem]">{name}</p>
                <p className="mt-1 text-[0.9rem] font-medium text-cream-50/90">{subtitle}</p>
                <p className="mt-5 text-[0.85rem] leading-[1.78] text-cream-50/80 sm:text-[0.9rem]">{story}</p>
              </div>
              <span className="mt-6 inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                Tap to flip back
              </span>
            </div>
          )}
        </button>
      </article>
    )
  }

  return (
    <article
      className="relative"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => {
        if (!isTouchInteraction) setHovered(true)
      }}
      onMouseLeave={() => {
        if (!isTouchInteraction) setHovered(false)
      }}
    >
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          position: 'relative',
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ── FRONT ── */}
        <div
          className="overflow-hidden rounded-[1.8rem] border border-white/12 bg-white/8 shadow-[0_24px_58px_-40px_rgba(0,0,0,0.26)]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <button type="button" className="block w-full text-left" onClick={toggle}>
            <div className="relative">
              <img
                src={image}
                alt={role}
                className="aspect-[4/5] w-full object-cover"
                style={{ objectPosition: imagePosition }}
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081712]/84 via-[#081712]/16 to-transparent" />
              <div className="absolute inset-x-4 top-4">
                <span className="rounded-full border border-white/20 bg-white/14 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream-50 backdrop-blur">
                  {role}
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-5 text-center">
                <p className="text-[0.98rem] font-extrabold uppercase tracking-[0.04em] text-[#9ad122] sm:text-[1.05rem]">{name}</p>
                <p className="mt-1 text-[0.95rem] font-medium leading-tight text-white sm:text-[1.02rem]">{subtitle}</p>
              </div>
            </div>
            <div className="border-t border-white/10 px-5 py-4 sm:px-6">
              <span className="inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
                Hover or tap to read story
              </span>
            </div>
          </button>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[1.8rem] border border-white/16 bg-[#0d3226] shadow-[0_24px_58px_-40px_rgba(0,0,0,0.4)]"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <button
            type="button"
            className="flex h-full w-full flex-col justify-between p-6 text-left sm:p-7"
            onClick={toggle}
          >
            <div>
              <span className="rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-cream-50 backdrop-blur">
                {role}
              </span>
              <p className="mt-5 text-[1rem] font-extrabold uppercase tracking-[0.04em] text-[#9ad122] sm:text-[1.08rem]">{name}</p>
              <p className="mt-1.5 text-[0.92rem] font-medium leading-tight text-cream-50/90">{subtitle}</p>
              <p className="mt-5 text-[0.84rem] leading-[1.8] text-cream-50/82 sm:text-[0.9rem]">{story}</p>
            </div>
            <span className="mt-6 inline-flex text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold-400">
              Hover away or tap to flip back
            </span>
          </button>
        </div>
      </motion.div>
    </article>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About DRP Exotic Farms"
        description="Explore DRP Exotic Farms through a clearer About page covering the journey, operations, people, and ecosystem in a premium farm-first presentation."
        path="/about"
      />

      <div className="relative overflow-hidden">
        {/* ── HERO ── */}
        <section className="relative isolate overflow-hidden bg-[#0d3226] text-cream-50">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,195,144,0.14),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(13,50,38,0.96),rgba(7,21,16,0.96))]" />
          <div className="section-shell page-hero-shell relative z-10">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(20rem,0.88fr)] lg:items-center lg:gap-12">
              <SectionReveal className="max-w-3xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/90">
                  <Leaf className="size-4 text-gold-400" />
                  About DRP
                </span>
                <h1 className="mt-4 font-display text-[clamp(2rem,5.4vw,4.35rem)] leading-[0.95] tracking-[-0.04em] text-cream-50">
                  A modern farm story shaped by produce, systems, people, and long-horizon trust.
                </h1>
                <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-cream-50/82 sm:text-[0.96rem] lg:text-[1rem]">
                  This page is designed as a stronger brand-style introduction. For now it uses structured dummy content that you can later replace with your final company journey, operations, leadership, and ecosystem data.
                </p>
                <div className="mt-5 grid gap-2 text-[0.84rem] leading-relaxed text-cream-50/84 sm:text-[0.9rem]">
                  {[
                    'Started from a focused agricultural vision.',
                    'Built around practical systems rather than decorative branding.',
                    'Designed to show users the full concept in a cleaner, easier way.',
                  ].map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-[1rem] border border-white/14 bg-white/8 px-4 py-3"
                    >
                      <span className="mt-1 size-2 shrink-0 rounded-full bg-gold-400" />
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
                    <div
                      key={item.label}
                      className="rounded-[1rem] border border-white/14 bg-white/10 px-3 py-3"
                    >
                      <p className="font-display text-[1.35rem] leading-none text-cream-50 sm:text-[1.65rem]">
                        <AnimatedNumber value={item.value} suffix={item.suffix} duration={1.1} />
                      </p>
                      <p className="mt-1.5 text-[0.58rem] uppercase tracking-[0.18em] text-cream-50/70 sm:text-[0.62rem]">
                        {item.label}
                      </p>
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
              <span className="section-label border-white/14 bg-white/8 text-cream-50/90">
                <Sparkles className="size-4 text-gold-400" />
                Our Journey
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,4.2vw,2.65rem)] leading-[0.99] text-cream-50">
                Started as a small dream, now shaped into a larger farm movement.
              </h2>
              <p className="mt-3 max-w-3xl text-[0.88rem] leading-relaxed text-cream-50/82 sm:text-[0.95rem]">
                This section mirrors the kind of journey storytelling you shared, but translated into our quieter DRP visual system.
              </p>
            </SectionReveal>

            <MobileAutoCarousel
              className="mt-6 h-[16rem] md:hidden"
              slideClassName="h-full"
              ariaLabel="Journey milestones carousel"
              intervalMs={2600}
              slideOffsetPercent={94}
            >
              {journeyMilestones.map((item) => (
                <div key={item.year} className="h-full rounded-[1.25rem] border border-white/12 bg-white/8 p-4">
                  <p className="text-[1.2rem] font-display leading-none text-gold-400">{item.year}</p>
                  <h3 className="mt-3 font-display text-[1.12rem] leading-[1.02] text-cream-50">{item.title}</h3>
                  <p className="mt-3 text-[0.82rem] leading-relaxed text-cream-50/84">{item.body}</p>
                </div>
              ))}
            </MobileAutoCarousel>

            <div className="mt-6 hidden gap-3 md:grid md:grid-cols-2 xl:grid-cols-3">
              {journeyMilestones.map((item, i) => (
                <SectionReveal key={item.year}>
                  <FloatingCard
                    delay={i * 0.15}
                    className="h-full rounded-[1.25rem] border border-white/12 bg-white/8 p-4 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.11] sm:p-5"
                  >
                    <p className="text-[1.2rem] font-display leading-none text-gold-400">{item.year}</p>
                    <h3 className="mt-3 font-display text-[1.12rem] leading-[1.02] text-cream-50 sm:text-[1.2rem]">{item.title}</h3>
                    <p className="mt-3 text-[0.82rem] leading-relaxed text-cream-50/82 sm:text-[0.88rem]">{item.body}</p>
                  </FloatingCard>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── OPERATIONS ── */}
        <section className="section-shell relative z-10 py-8 sm:py-10 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <SectionReveal className="max-w-3xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/90">
                <Building2 className="size-4 text-gold-400" />
                Operations
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,4.1vw,2.6rem)] leading-[0.99] text-cream-50">
                Smart farming systems presented in a cleaner, easier-to-read layout.
              </h2>
              <p className="mt-3 max-w-3xl text-[0.88rem] leading-relaxed text-cream-50/82 sm:text-[0.95rem]">
                These cards can later be replaced with your exact operational copy, maps, ERP details, or process modules. Right now they give you the right visual and structural direction.
              </p>
            </SectionReveal>

            <MobileAutoCarousel
              className="mt-6 h-[18.5rem] md:hidden"
              slideClassName="h-full"
              ariaLabel="Operations carousel"
              intervalMs={2800}
              slideOffsetPercent={92}
            >
              {operationsHighlights.map((item) => (
                <div key={item.id} className="h-full">
                  <OperationCard {...item} />
                </div>
              ))}
            </MobileAutoCarousel>

            <div className="mt-6 hidden gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
              {operationsHighlights.map((item, i) => (
                <FloatingCard key={item.id} delay={i * 0.12}>
                  <OperationCard {...item} />
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEADERSHIP ── */}
        <section className="section-shell relative z-10 py-8 sm:py-10 lg:py-14">
          <div className="mx-auto max-w-6xl">
            <SectionReveal className="mx-auto max-w-3xl text-center">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/90">
                <Users className="size-4 text-gold-400" />
                The Force Driving DRP
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,4.2vw,2.7rem)] leading-[0.99] text-cream-50">
                Founder and co-founder profiles aligned as the visual center of the page.
              </h2>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-cream-50/82 sm:text-[0.95rem]">
                These cards use placeholder names and stories for now, but the layout is ready for your final founder content and better portrait photos later.
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
                  />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM ── */}
        <section className="section-shell relative z-10 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-14">
          <div className="mx-auto grid w-full max-w-[54rem] gap-4">
            <SectionReveal className="w-full overflow-hidden rounded-[1.7rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_54px_-42px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7">
              <h2 className="font-display text-[1.45rem] leading-none text-cream-50 sm:text-[1.7rem]">Our Affiliations</h2>
              <p className="mt-3 max-w-3xl text-[0.84rem] leading-relaxed text-cream-50/82 sm:text-[0.92rem]">
                This floating bar is reserved for advisory, financial, institutional, or ecosystem relationships.
              </p>
              <div className="mt-5">
                <FloatingTagBar items={affiliationBarItems} animationClassName="[animation:journal-marquee-scroll_24s_linear_infinite]" />
              </div>
            </SectionReveal>

            <SectionReveal className="w-full overflow-hidden rounded-[1.7rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_54px_-42px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7">
              <h2 className="font-display text-[1.45rem] leading-none text-cream-50 sm:text-[1.7rem]">Our Partnerships</h2>
              <p className="mt-3 max-w-3xl text-[0.84rem] leading-relaxed text-cream-50/82 sm:text-[0.92rem]">
                This second floating bar can later hold technology, logistics, research, retail, or distribution partners.
              </p>
              <div className="mt-5">
                <FloatingTagBar items={partnershipBarItems} animationClassName="[animation:journal-marquee-scroll_28s_linear_infinite_reverse]" />
              </div>
            </SectionReveal>

            <SectionReveal className="w-full overflow-hidden rounded-[1.7rem] border border-white/12 bg-white/8 p-5 shadow-[0_24px_54px_-42px_rgba(0,0,0,0.2)] sm:p-6 lg:p-7">
              <h2 className="font-display text-[1.45rem] leading-none text-cream-50 sm:text-[1.7rem]">Find Us In Stores</h2>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3">
                <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-[0.74rem] font-medium text-cream-50/82 sm:px-3.5 sm:py-2 sm:text-[0.88rem]">
                  Coming Soon
                </span>
              </div>
            </SectionReveal>
          </div>
        </section>
      </div>
    </>
  )
}
