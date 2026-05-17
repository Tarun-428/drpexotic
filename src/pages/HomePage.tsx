import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Leaf,
  LineChart,
  MessageCircleMore,
  Sprout,
  Trees,
} from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { HomeNewsTicker } from '@/components/blog/HomeNewsTicker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { LOCAL_ASSETS } from '@/constants/assets'
import { FALLBACK_GALLERY_ITEMS } from '@/constants/fallbackContent'
import { FRUIT_VARIETIES } from '@/constants/fruits'
import { api } from '@/lib/api'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import type { GalleryItem } from '@/types/cms'
import { buildWhatsAppUrl } from '@/utils/whatsapp'

const overviewPillars = [
  {
    id: 'produce',
    title: 'Premium produce',
    body: 'Exotic fruit positioned for quality-conscious buyers, hospitality, and modern retail conversations.',
  },
  {
    id: 'programmes',
    title: 'Orchard programmes',
    body: 'Turnkey planning and seasonal guidance that help orchards mature with structure instead of guesswork.',
  },
  {
    id: 'growers',
    title: 'Grower systems',
    body: 'Field knowledge shaped across partner farms, then translated into practical operating discipline.',
  },
  {
    id: 'residue',
    title: 'Residue-aware farming',
    body: 'Cleaner protocols, measured decisions, and credibility that supports long-term premium trust.',
  },
] as const

const whoWeAreStats = [
  { value: 50, suffix: '+', label: 'company acres' },
  { value: 60, suffix: '+', label: 'grower links' },
  { value: 105, suffix: '+', label: 'guided acres' },
] as const

const serviceHighlights = [
  {
    title: 'Orchard planning',
    body: 'Structure before plantation begins.',
    result: 'Clearer start',
    to: '/services',
    image: LOCAL_ASSETS.orchardTeam,
  },
  {
    title: 'Field programmes',
    body: 'Seasonal care, canopy rhythm, and cleaner discipline.',
    result: 'Steadier quality',
    to: '/services',
    image: LOCAL_ASSETS.orchardNight,
  },
  {
    title: 'Market quality',
    body: 'Harvest logic and produce positioning tied to orchard reality.',
    result: 'Buyer confidence',
    to: '/produce',
    image: LOCAL_ASSETS.dragonFruitRows,
  },
] as const

const differentiators = [
  {
    title: 'Business clarity',
    body: 'Users can quickly understand what DRP grows, offers, and why it matters.',
  },
  {
    title: 'Premium through restraint',
    body: 'The experience feels quieter because information leads and visuals support.',
  },
  {
    title: 'Orchard identity',
    body: 'The brand feels agricultural and intelligent instead of like a generic cinematic template.',
  },
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

const GALLERY_ARC_SLOTS = 17
const GALLERY_ARC_BASE_RADIUS = 40
const GALLERY_ARC_RADIUS_CAP = 42
const GALLERY_ARC_RADIUS_FLOOR = 35

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value))
}

export default function HomePage() {
  const hero = useSiteConfigStore((s) => s.config.heroHome)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const [gallery, setGallery] = useState<GalleryItem[]>(FALLBACK_GALLERY_ITEMS)
  const galleryArcCardsRef = useRef<Array<HTMLDivElement | null>>([])
  const galleryArcRadiusRef = useRef(GALLERY_ARC_BASE_RADIUS)
  const galleryArcProgressRef = useRef(0)
  const galleryArcRafRef = useRef<number | null>(null)
  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello DRP Exotic Farms, I would like to discuss produce, orchard programmes, or a farm visit.',
  )

  useEffect(() => {
    let active = true
    void api
      .listPublicGallery(1, 17)
      .then((response) => {
        if (active && response.items.length > 0) setGallery(response.items)
      })
      .catch(() => undefined)

    return () => {
      active = false
    }
  }, [])

  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end start'],
  })
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const galleryPreviewItems = gallery.slice(0, 17)
  const galleryArcItems = useMemo(() => {
    const arcSourceItems = galleryPreviewItems.length > 0 ? galleryPreviewItems : FALLBACK_GALLERY_ITEMS

    return Array.from({ length: GALLERY_ARC_SLOTS }, (_, index) => ({
      image: arcSourceItems[index % arcSourceItems.length],
    }))
  }, [galleryPreviewItems])

  const applyGalleryArcLayout = (progress: number) => {
    const cards = galleryArcCardsRef.current
    const total = cards.length
    if (!total) return

    const radius = galleryArcRadiusRef.current

    cards.forEach((card, index) => {
      if (!card) return

      const shiftedIndex = index - progress * total
      const normalizedIndex = ((shiftedIndex % total) + total) % total
      const normalizedProgress = normalizedIndex / Math.max(total - 1, 1)
      const angleDeg = 180 - normalizedProgress * 180
      const angleRad = (angleDeg * Math.PI) / 180
      const focus = clamp01(1 - Math.abs(normalizedProgress - 0.5) * 2)
      const prominence = Math.pow(focus, 1.7)
      const x = 50 + radius * Math.cos(angleRad)
      const y = 100 - radius * Math.sin(angleRad)
      const tilt = -(angleDeg - 90) * (1 - prominence * 0.88)
      const scale = 0.82 + prominence * 0.42

      card.style.left = `${x}%`
      card.style.top = `${y}%`
      card.style.transform = `translate(-50%, -50%) rotate(${tilt}deg) scale(${scale})`
      card.style.zIndex = `${Math.round(100 + prominence * 1200)}`
      card.style.opacity = `${0.7 + prominence * 0.3}`
      card.style.filter = `saturate(${0.9 + prominence * 0.16}) brightness(${0.92 + prominence * 0.09})`
      card.style.width = prominence > 0.56 ? 'clamp(4.8rem, 7.4vw, 6.4rem)' : 'clamp(2.85rem, 4.8vw, 4rem)'
      card.style.height = prominence > 0.56 ? 'clamp(6.3rem, 9.6vw, 8.6rem)' : 'clamp(4rem, 6.5vw, 5.7rem)'
      card.dataset.focus = `${focus}`
    })
  }

  useEffect(() => {
    galleryArcProgressRef.current = 0
    applyGalleryArcLayout(0)

    const updateRadius = () => {
      galleryArcRadiusRef.current = Math.max(
        GALLERY_ARC_RADIUS_FLOOR,
        Math.min(GALLERY_ARC_RADIUS_CAP, window.innerWidth * 0.19),
      )
      applyGalleryArcLayout(galleryArcProgressRef.current)
    }

    const animate = () => {
      galleryArcProgressRef.current = (galleryArcProgressRef.current + 0.00045) % 1
      applyGalleryArcLayout(galleryArcProgressRef.current)
      galleryArcRafRef.current = window.requestAnimationFrame(animate)
    }

    updateRadius()
    animate()
    window.addEventListener('resize', updateRadius)

    return () => {
      if (galleryArcRafRef.current !== null) {
        window.cancelAnimationFrame(galleryArcRafRef.current)
      }
      window.removeEventListener('resize', updateRadius)
    }
  }, [galleryArcItems.length])

  return (
    <>
      <PageMeta
        title="Premium produce, orchard systems, and grower-backed farming"
        description="DRP Exotic Farms is a premium orchard business focused on exotic produce, orchard programmes, residue-aware systems, and grower-backed agricultural discipline."
        path="/"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-[#102c22] text-cream-50 lg:min-h-[108svh]">
          <motion.div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center"
            style={{
              y: heroImageY,
              backgroundImage: `linear-gradient(180deg, rgba(7,26,20,0.28), rgba(7,26,20,0.84)), url(${LOCAL_ASSETS.orchardNight})`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(248,227,176,0.16),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(90,143,99,0.16),transparent_22%),linear-gradient(180deg,transparent_0%,rgba(7,18,13,0.14)_38%,rgba(7,18,13,0.72)_100%)]" />

          <div className="section-shell relative z-10 w-full pb-8 pt-24 sm:pb-12 sm:pt-28 lg:pb-20 lg:pt-36">
            <div className="grid items-end gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-10">
              <div className="max-w-4xl">
                <div className="section-label border-white/14 bg-white/8 text-cream-50/82">
                  <Leaf className="size-4 text-gold-400" />
                  {hero.kicker}
                </div>
                <h1 className="mt-5 max-w-5xl font-display text-[clamp(2.35rem,8vw,6.8rem)] leading-[0.92] tracking-[-0.04em] text-cream-50">
                  {hero.title || 'Exotic fruit, grown with discipline and orchards built to last.'}
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream-50/78 sm:text-base lg:text-xl">
                  {hero.subtitle ||
                    'DRP Exotic Farms grows premium produce, designs orchard programmes, and supports grower systems with residue-aware field discipline.'}
                </p>
                <p className="mt-3 max-w-2xl text-[0.92rem] leading-relaxed text-cream-50/66 sm:text-sm">
                  Premium produce, modern farming, orchard-first systems, and clearer next steps for buyers and growers.
                </p>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <Button asChild size="lg" className="w-fit">
                    <Link to={hero.primaryCtaUrl || '/produce'} className="inline-flex items-center gap-2">
                      {hero.primaryCta || 'Explore produce'}
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="secondary"
                    className="w-fit border-white/18 bg-white/10 text-cream-50 hover:bg-white/16"
                  >
                    <a href={hero.secondaryCtaUrl || wa} target="_blank" rel="noreferrer">
                      {hero.secondaryCta || 'Talk on WhatsApp'}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="cinematic-surface rounded-[1.4rem] p-3.5 text-cream-50 sm:rounded-[1.8rem] sm:p-5">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-400">What DRP does</p>
                <div className="mt-3 grid gap-2.5">
                  {[
                    'Grows premium exotic produce.',
                    'Designs orchard programmes.',
                    'Supports growers with practical systems.',
                    'Builds market confidence through field discipline.',
                  ].map((item) => (
                    <div key={item} className="rounded-[1rem] border border-white/10 bg-black/18 px-3 py-2.5">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold-400/18 text-gold-400">
                          <Check className="size-3" />
                        </span>
                        <p className="text-xs leading-relaxed text-cream-50/78 sm:text-sm">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-3 lg:mt-10 lg:gap-4">
              {[
                { value: 50, suffix: '+', label: 'premium acres' },
                { value: 60, suffix: '+', label: 'grower links' },
                { text: 'Residue-aware', label: 'quality posture' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.1rem] border border-white/10 bg-white/7 px-3.5 py-3 backdrop-blur sm:px-4"
                >
                  {item.value !== undefined ? (
                    <p className="text-2xl text-gold-400">
                      <AnimatedNumber value={item.value} suffix={item.suffix} duration={1.2} />
                    </p>
                  ) : (
                    <p className="font-display text-2xl text-gold-400">{item.text}</p>
                  )}
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-cream-50/62">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-8 sm:py-10 lg:py-16">
          <div className="rounded-[1.5rem] border border-[#d9cfbf] bg-[#f5efe4] p-4 shadow-[0_22px_40px_-32px_rgba(11,61,46,0.22)] sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <span className="section-label">
                  <Sprout className="size-4 text-gold-600" />
                  Business overview
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.5rem)] leading-[0.96] text-forest-900">
                  A premium farm ecosystem with clearer business pillars.
                </h2>
              </div>
              <Link to="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-forest-900">
                Understand DRP
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-4 lg:hidden">
              <Accordion type="single" collapsible className="grid gap-2.5">
                {overviewPillars.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="rounded-[1.2rem] border-[#e3d8c8] bg-white/82 px-4">
                    <AccordionTrigger className="py-3.5 text-[0.98rem] font-semibold">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3.5 text-xs leading-relaxed text-forest-900/68">
                      {item.body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-4">
              {overviewPillars.map((item) => (
                <div key={item.title} className="rounded-[1.4rem] border border-[#e3d8c8] bg-white/72 p-4">
                  <h3 className="font-display text-[1.45rem] leading-[1] text-forest-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest-900/68">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HomeNewsTicker />

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <SectionReveal className="overflow-hidden rounded-[1.45rem] shadow-[0_24px_46px_-36px_rgba(11,61,46,0.28)] lg:rounded-[2rem]">
              <img
                src={LOCAL_ASSETS.orchardTeam}
                alt="DRP Exotic Farms team standing in the orchard"
                className="aspect-[16/11] w-full object-cover lg:aspect-[5/4]"
                loading="lazy"
                decoding="async"
              />
            </SectionReveal>

            <SectionReveal className="rounded-[1.45rem] border border-[#ddd2c1] bg-[#f8f3ea] p-4 sm:p-5 lg:rounded-[2rem] lg:p-7">
              <span className="section-label">
                <Trees className="size-4 text-gold-600" />
                Who we are
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.4rem)] leading-[0.96] text-forest-900">
                DRP combines orchard calm, modern farming logic, and premium produce.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-forest-900/72 sm:text-base">
                Estate-grown produce, orchard planning, and grower-backed learning come together in one clearer system.
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
                {whoWeAreStats.map((item) => (
                  <div key={item.label} className="rounded-[1rem] border border-[#e3d8c8] bg-white/80 p-3">
                    <p className="text-xl text-forest-900">
                      <AnimatedNumber value={item.value} suffix={item.suffix} duration={1.1} />
                    </p>
                    <p className="mt-1 text-[0.62rem] uppercase tracking-[0.16em] text-forest-900/50">{item.label}</p>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <SectionReveal>
              <span className="section-label">
                <Leaf className="size-4 text-gold-600" />
                Signature produce
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.4rem)] leading-[0.96] text-forest-900">
                Faster produce understanding with smaller comparison cards.
              </h2>
            </SectionReveal>
            <Link to="/produce" className="inline-flex items-center gap-2 text-sm font-semibold text-forest-900">
              Explore all produce
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="compact-snap-row mt-4 lg:hidden">
            {FRUIT_VARIETIES.slice(0, 4).map((fruit) => (
              <article key={fruit.slug} className="overflow-hidden rounded-[1.25rem] border border-[#e0d6c7] bg-white/84 shadow-[0_16px_28px_-22px_rgba(11,61,46,0.2)]">
                <img src={fruit.image} alt={fruit.name} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                <div className="grid gap-2.5 p-3.5">
                  <h3 className="font-display text-[1.35rem] leading-none text-forest-900">{fruit.name}</h3>
                  <p className="line-clamp-2 text-xs leading-relaxed text-forest-900/66">{fruit.description}</p>
                  <div className="rounded-[0.9rem] bg-[#eef1e7] px-3 py-2 text-[0.64rem] uppercase tracking-[0.14em] text-forest-900/62">
                    {fruit.tagline}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-4">
            {FRUIT_VARIETIES.slice(0, 4).map((fruit) => (
              <SectionReveal key={fruit.slug} className="overflow-hidden rounded-[1.7rem] border border-[#e0d6c7] bg-white/84 shadow-[0_20px_42px_-34px_rgba(11,61,46,0.22)]">
                <img src={fruit.image} alt={fruit.name} className="aspect-[4/3] w-full object-cover" loading="lazy" decoding="async" />
                <div className="grid gap-3 p-5">
                  <h3 className="font-display text-[1.8rem] leading-none text-forest-900">{fruit.name}</h3>
                  <p className="text-sm leading-relaxed text-forest-900/66">{fruit.description}</p>
                  <div className="rounded-[1rem] bg-[#eef1e7] px-3 py-2 text-xs uppercase tracking-[0.16em] text-forest-900/62">
                    {fruit.tagline}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <SectionReveal>
              <span className="section-label">
                <LineChart className="size-4 text-gold-600" />
                Orchard services
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.4rem)] leading-[0.96] text-forest-900">
                A floating service stack for faster mobile scanning.
              </h2>
            </SectionReveal>

            <div className="compact-snap-row lg:hidden">
              {serviceHighlights.map((item) => (
                <SectionReveal
                  key={item.title}
                  className="overflow-hidden rounded-[1.25rem] border border-[#ddd3c3] bg-[#f8f2e9] shadow-[0_16px_28px_-22px_rgba(11,61,46,0.2)]"
                >
                  <img src={item.image} alt={item.title} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                  <div className="p-3.5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display text-[1.2rem] leading-none text-forest-900">{item.title}</h3>
                      <span className="rounded-full bg-[#e7ecdf] px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-forest-900/66">
                        {item.result}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-forest-900/68">{item.body}</p>
                    <Link to={item.to} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-forest-900">
                      Learn more
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </SectionReveal>
              ))}
            </div>

            <div className="hidden gap-4 lg:grid lg:grid-cols-3">
              {serviceHighlights.map((item) => (
                <SectionReveal
                  key={item.title}
                  className="overflow-hidden rounded-[1.7rem] border border-[#ddd3c3] bg-[#f8f2e9] shadow-[0_22px_44px_-36px_rgba(11,61,46,0.22)]"
                >
                  <img src={item.image} alt={item.title} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                  <div className="p-5">
                    <h3 className="font-display text-[1.6rem] leading-[1] text-forest-900">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-forest-900/68">{item.body}</p>
                    <p className="mt-4 text-xs uppercase tracking-[0.16em] text-forest-900/50">{item.result}</p>
                    <Link to={item.to} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-900">
                      Learn more
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Gallery section — gravity-led rotating arc ─── */}
        <section className="section-shell py-6 sm:py-8 lg:py-16">
          {/*
            Two-column layout: text left, gravity-led arc right.
            Cards stay within a smaller semicircle, cycle endlessly, and the
            centered card remains straighter and visually stronger than the edges.
          */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <SectionReveal>
              <span className="section-label">
                <Trees className="size-4 text-gold-600" />
                Orchard gallery
              </span>
           </SectionReveal>
          </div>
          <SectionReveal className="mt-4 overflow-hidden rounded-[1.45rem] border border-[#ddd3c3] bg-[#f7f1e7] shadow-[0_18px_34px_-26px_rgba(11,61,46,0.18)] lg:mt-6 lg:rounded-[2rem]">
            <div className="grid lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)] lg:items-stretch">

              {/* Left — text panel */}
              <div className="p-5 sm:p-6 lg:p-8">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-forest-900/48">Interactive preview</p>
                <h3 className="mt-2 font-display text-[1.55rem] leading-[0.98] text-forest-900 sm:text-[1.85rem] lg:text-[2.5rem]">
                  Explore the orchard through smaller moving frames.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-900/68">
                  Tap any image to move into the full gallery. The preview stays compact so the homepage keeps its pace.
                </p>
                <Link
                  to="/gallery"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-900"
                >
                  Open full gallery
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              {/* Right — compact arc viewport with a smaller radius and a straighter center card. */}
              <div className="relative overflow-hidden pt-[30px]" style={{ height: '100%', minHeight: 'clamp(300px, 100%, 600px)' }}>
                <div className="pointer-events-none absolute inset-x-8 top-[10px] h-[1px] bg-[linear-gradient(90deg,transparent,rgba(11,61,46,0.08),transparent)]" />
                {/* Forest-green text floats in centre of the visible arc */}
                

                <div className="absolute inset-0">
                  {galleryArcItems.map((item, index) => {
                    return (
                      <div
                        key={`arc-${index}`}
                        className="absolute"
                        ref={(el) => {
                          galleryArcCardsRef.current[index] = el
                        }}
                        style={{
                          left: '50%',
                          top: '100%',
                          width: 'clamp(2.7rem, 4.5vw, 3.8rem)',
                          height: 'clamp(3.8rem, 6.1vw, 5.3rem)',
                          transform: 'translate(-50%, -50%)',
                          transformOrigin: 'center bottom',
                          willChange: 'transform, left, top',
                        }}
                      >
                        <Link to="/gallery" aria-label={`Open gallery — ${item.image.title}`} className="block h-full w-full">
                          <div
                            className="h-full w-full overflow-hidden rounded-[0.82rem] border border-white/92 bg-[#fbfaf7] shadow-[0_10px_24px_-16px_rgba(4,24,17,0.45)] ring-1 ring-black/5 transition-[box-shadow,ring-color,border-color] duration-200"
                          >
                            {item.image.media_type === 'video' ? (
                              <video src={item.image.media_url} className="h-full w-full object-cover" muted playsInline preload="metadata" />
                            ) : (
                              <img src={item.image.media_url} alt={item.image.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                            )}
                          </div>
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </SectionReveal>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]">
            <SectionReveal>
              <span className="section-label">
                <Leaf className="size-4 text-gold-600" />
                Why DRP feels different
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.6vw,3.3rem)] leading-[0.96] text-forest-900">
                A calmer brand because the business logic is clearer.
              </h2>
            </SectionReveal>
            <div className="grid gap-3 lg:grid-cols-3">
              {differentiators.map((item) => (
                <SectionReveal key={item.title} className="rounded-[1.2rem] border border-[#ddd3c3] bg-white/82 p-4 lg:rounded-[1.6rem] lg:p-5">
                  <h3 className="font-display text-[1.18rem] leading-[1] text-forest-900 lg:text-[1.45rem]">{item.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-forest-900/68 lg:mt-3 lg:text-sm">{item.body}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pb-18 pt-6 sm:pb-24 sm:pt-8 lg:pb-28">
          <SectionReveal className="rounded-[1.5rem] bg-[linear-gradient(135deg,#0b3d2e,#174836)] px-4 py-5 text-cream-50 sm:px-6 sm:py-6 lg:rounded-[2rem] lg:px-10 lg:py-8">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="max-w-3xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                  <MessageCircleMore className="size-4 text-gold-400" />
                  Next step
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,6vw,4rem)] leading-[0.96]">
                  Plan a visit, discuss orchard programmes, or start with produce.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream-50/74 sm:text-base">
                  Premium produce, orchard systems, and farm conversations begin here.
                </p>
              </div>
              <div className="flex flex-col gap-2.5">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Plan a visit
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full border-white/18 bg-white/10 text-cream-50 hover:bg-white/16 sm:w-auto"
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