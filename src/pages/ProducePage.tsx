import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Sparkles, Waves } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { LOCAL_ASSETS } from '@/constants/assets'
import { type FruitVariety, FRUIT_VARIETIES } from '@/constants/fruits'

const produceStories = [
  { title: 'Origins shaped by observation', body: 'Light, slope, water, and patience before variety decisions.', image: LOCAL_ASSETS.orchardTeam },
  { title: 'Harvest paced for quality', body: 'Timing, handling, and visual consistency.', image: LOCAL_ASSETS.dragonFruitRows },
  { title: 'Residue-aware by design', body: 'Cleaner choices that protect flavour and trust.', image: LOCAL_ASSETS.dragonFruitCut },
] as const

const harvestJourney = [
  'Field observation and maturity checks',
  'Harvest windows aligned to quality',
  'Clean handling and calm grading logic',
  'Buyer-facing fruit stories with provenance built in',
] as const

const fruitPresentation: Record<FruitVariety['slug'], { profile: string; origin: string }> = {
  blueberry: {
    profile: 'Floral lift, vivid acidity, polished finish.',
    origin: 'Cool-climate blocks selected for precision harvest timing.',
  },
  avocado: {
    profile: 'Buttery texture, calm richness, clean finish.',
    origin: 'Canopy-led orchard planning shaped around slope and drainage.',
  },
  'dragon-fruit': {
    profile: 'Refreshing sweetness, jewel-toned flesh, crisp bite.',
    origin: 'Trellised rows managed for labour clarity and fruit protection.',
  },
  'kesar-mango': {
    profile: 'Deep perfume, saffron warmth, layered sweetness.',
    origin: 'Heritage-led orchard care with modern diagnostics in support.',
  },
  'red-diamond-guava': {
    profile: 'Aromatic pink centre, bright sugar, vivid colour.',
    origin: 'Colour-focused thinning and cleaner orchard timing where feasible.',
  },
  banana: {
    profile: 'Creamy body, mellow sweetness, familiar elegance.',
    origin: 'Rhythm-based soil and ratoon management for steady output.',
  },
}

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

function ProduceFlipCard({
  renderKey,
  index,
  name,
  image,
  tagline,
  description,
  notes,
  profile,
  origin,
  isFlipped,
  onToggle,
}: {
  renderKey: string
  index: number
  name: string
  image: string
  tagline: string
  description: string
  notes: string[]
  profile: string
  origin: string
  isFlipped: boolean
  onToggle: (key: string) => void
}) {
  return (
    <article data-card-key={renderKey} className="group h-[24.5rem] w-[16.75rem] shrink-0 [perspective:1400px] sm:h-[25.25rem] sm:w-[17.5rem] lg:w-[18rem] xl:w-[18.5rem]">
      <button
        type="button"
        className="relative block h-full w-full rounded-[1.7rem] text-left focus:outline-none"
        onClick={() => onToggle(renderKey)}
        onMouseLeave={() => {
          if (isFlipped) onToggle(renderKey)
        }}
        aria-label={`Reveal details for ${name}`}
      >
        <div
          className={`relative h-full w-full rounded-[1.7rem] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''} group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]`}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[1.7rem] border border-[#ddd3c4] bg-[#f8f3ea] shadow-[0_24px_60px_-38px_rgba(11,61,46,0.34)] [backface-visibility:hidden]">
            <div className="absolute inset-x-5 top-5 z-20 flex items-start justify-between gap-3">
              <span className="rounded-full border border-white/30 bg-white/16 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-cream-50 backdrop-blur">
                Signature fruit
              </span>
              <span className="rounded-full border border-white/20 bg-black/16 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream-50/76 backdrop-blur">
                Hover or tap
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/8 via-transparent to-[#071510]/78" />
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400/92">Premium selection</p>
              <h3 className="mt-2 font-display text-[1.7rem] leading-[0.94] text-cream-50 sm:text-[1.95rem]">{name}</h3>
              <p className="mt-2 line-clamp-1 max-w-[14rem] text-sm leading-relaxed text-cream-50/74">{tagline}</p>
            </div>
          </div>

          <div className="absolute inset-0 overflow-hidden rounded-[1.7rem] border border-[#d9cfbe] bg-[linear-gradient(180deg,rgba(253,250,244,0.98),rgba(244,236,222,0.98))] p-5 shadow-[0_26px_64px_-40px_rgba(11,61,46,0.38)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-6">
            <div className="flex h-full flex-col">
              <div>
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.28em] text-gold-600">Curated profile {index + 1}</p>
                <h3 className="mt-2 font-display text-[1.55rem] leading-[0.96] text-forest-900 sm:text-[1.8rem]">{name}</h3>
                <p className="mt-3 line-clamp-2 text-[0.95rem] leading-relaxed text-forest-900/72">{description}</p>
              </div>

              <div className="mt-4 grid gap-2 text-sm">
                <div className="rounded-[1rem] border border-[#e3d8c8] bg-white/70 px-3.5 py-2.5">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-forest-900/44">Tasting profile</p>
                  <p className="mt-1 line-clamp-2 leading-relaxed text-forest-900/74">{profile}</p>
                </div>
                <div className="rounded-[1rem] border border-[#e3d8c8] bg-white/70 px-3.5 py-2.5">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-forest-900/44">Origin note</p>
                  <p className="mt-1 line-clamp-2 leading-relaxed text-forest-900/74">{origin}</p>
                </div>
                <div className="rounded-[1rem] border border-[#e3d8c8] bg-white/70 px-3.5 py-2.5">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-forest-900/44">Field details</p>
                  <p className="mt-1 line-clamp-1 leading-relaxed text-forest-900/74">{notes[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
    </article>
  )
}

export default function ProducePage() {
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [isStoryCarouselPaused, setIsStoryCarouselPaused] = useState(false)
  const [activeCardKey, setActiveCardKey] = useState<string | null>(null)
  const resumeTimer = useRef<number | null>(null)
  const storyResumeTimer = useRef<number | null>(null)
  const collectionWindowRef = useRef<HTMLDivElement | null>(null)
  const marqueeItems = [...FRUIT_VARIETIES, ...FRUIT_VARIETIES]
  const storyItems = [...produceStories, ...produceStories]

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
      if (storyResumeTimer.current) window.clearTimeout(storyResumeTimer.current)
    }
  }, [])

  useEffect(() => {
    if (!activeCardKey || !collectionWindowRef.current) return

    let frameId = 0

    const monitorActiveCard = () => {
      const windowRect = collectionWindowRef.current?.getBoundingClientRect()
      const activeCard = collectionWindowRef.current?.querySelector<HTMLElement>(`[data-card-key="${activeCardKey}"]`)

      if (!windowRect || !activeCard) {
        setActiveCardKey(null)
        setIsCarouselPaused(false)
        return
      }

      const cardRect = activeCard.getBoundingClientRect()
      const safetyInset = 2
      const isFullyInside =
        cardRect.left >= windowRect.left + safetyInset &&
        cardRect.right <= windowRect.right - safetyInset &&
        cardRect.top >= windowRect.top &&
        cardRect.bottom <= windowRect.bottom

      if (!isFullyInside) {
        setActiveCardKey(null)
        setIsCarouselPaused(false)
        return
      }

      frameId = window.requestAnimationFrame(monitorActiveCard)
    }

    frameId = window.requestAnimationFrame(monitorActiveCard)

    return () => window.cancelAnimationFrame(frameId)
  }, [activeCardKey])

  const pauseCarousel = () => {
    setIsCarouselPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setIsCarouselPaused(false), 4200)
  }

  const resetCardAndResumeCarousel = () => {
    if (!activeCardKey) return
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    setActiveCardKey(null)
    setIsCarouselPaused(false)
  }

  const pauseStoryCarousel = () => {
    setIsStoryCarouselPaused(true)
    if (storyResumeTimer.current) window.clearTimeout(storyResumeTimer.current)
    storyResumeTimer.current = window.setTimeout(() => setIsStoryCarouselPaused(false), 3200)
  }

  const handleCardToggle = (key: string) => {
    setActiveCardKey((current) => {
      const next = current === key ? null : key
      setIsCarouselPaused(next !== null)
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
      return next
    })
  }

  return (
    <>
      <PageMeta
        title="Produce & varieties"
        description="Explore Drpexoticfarms™ signature fruits through a more compact produce experience spanning origin, seasonality, harvest rhythm, and premium orchard care."
        path="/produce"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#0d3226] text-cream-50">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(220,195,144,0.14),transparent_28%),radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(13,50,38,0.96),rgba(7,21,16,0.96))]" />
          <div className="section-shell page-hero-shell relative z-10">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,0.55fr)_minmax(18rem,0.45fr)] lg:items-center lg:gap-14">
              <div className="max-w-2xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                  <Leaf className="size-4 text-gold-400" />
                  Produce
                </span>
                <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(2.05rem,5vw,4.35rem)] leading-[0.95] tracking-[-0.04em] text-cream-50">
                  Fruit presented like a premium collection, not a commodity list.
                </h1>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream-50/76 sm:text-[0.98rem] lg:text-[1.05rem]">
                  Orchard origin, seasonality, premium fruit character, and faster comparison on mobile.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-cream-50/70 sm:text-[0.72rem]">
                  {['Curated varieties', 'Editorial presentation', 'Premium orchard care'].map((item) => (
                    <span key={item} className="rounded-full border border-white/12 bg-white/6 px-3.5 py-2 backdrop-blur">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <SectionReveal className="mx-auto w-full max-w-sm lg:mr-0 lg:max-w-md">
                <div className="group rounded-[1.55rem] border border-white/10 bg-white/[0.07] p-3 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.5)] backdrop-blur">
                  <div className="relative overflow-hidden rounded-[1.15rem]">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-white/8 via-transparent to-[#071510]/32" />
                    <img
                      src={LOCAL_ASSETS.dragonFruitCut}
                      alt="Cut dragon fruit in close detail"
                      className="aspect-[5/6] w-full object-cover object-center transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                      loading="eager"
                      decoding="async"
                    />
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-4 px-1 pb-1">
                    <div>
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-cream-50/54">Harvest mood</p>
                      <p className="mt-1.5 font-display text-[1.55rem] leading-none text-gold-400">Clean luxury</p>
                    </div>
                    <p className="max-w-[12rem] text-right text-xs leading-relaxed text-cream-50/66">
                      Produce for buyers, chefs, estates, and hospitality groups with a sharper quality brief.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        <section className="section-shell py-8 sm:py-10 lg:py-16">
          <SectionReveal className="mx-auto max-w-6xl overflow-hidden">
            <div
              className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,rgba(181,194,146,0.7),rgba(167,181,130,0.68))] px-4 py-5 shadow-[0_24px_58px_-42px_rgba(11,61,46,0.28)] sm:px-5 lg:px-6"
              onMouseEnter={() => setIsStoryCarouselPaused(true)}
              onMouseLeave={() => setIsStoryCarouselPaused(false)}
              onTouchStart={pauseStoryCarousel}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-[#b5c292] via-[#b5c292]/82 to-transparent sm:w-16" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-[#b5c292] via-[#b5c292]/82 to-transparent sm:w-16" />
              <div
                className={`flex w-max gap-4 ${isStoryCarouselPaused ? '[animation-play-state:paused]' : ''} [animation:journal-marquee-scroll_24s_linear_infinite] lg:gap-5`}
              >
                {storyItems.map((story, index) => (
                  <article key={`${story.title}-${index}`} className="w-[15rem] shrink-0 overflow-hidden rounded-[1.55rem] border border-[#ddd3c4] bg-white/88 shadow-[0_16px_30px_-24px_rgba(11,61,46,0.2)] sm:w-[16.5rem] lg:w-[19rem]">
                    <img src={story.image} alt={story.title} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                    <div className="p-4 lg:p-5">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-forest-900/48">0{(index % produceStories.length) + 1}</p>
                      <h2 className="mt-2 line-clamp-2 font-display text-[1.15rem] leading-[1] text-forest-900 lg:text-[1.65rem]">{story.title}</h2>
                      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-forest-900/68 lg:text-sm">{story.body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </SectionReveal>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <SectionReveal className="mx-auto max-w-3xl text-center">
            <span className="section-label">
              <Sparkles className="size-4 text-gold-600" />
              Signature collection
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,4.4vw,3.1rem)] leading-[0.98] text-forest-900">
              A one-row luxury showcase with refined motion and quicker product reading.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-forest-900/68 sm:text-base">
              Swipe past the collection like a premium catalog strip. Hover on desktop or tap on mobile to reveal the quieter detail layer.
            </p>
          </SectionReveal>

          <SectionReveal className="relative mx-auto mt-8 max-w-6xl overflow-hidden lg:left-1/2 lg:w-screen lg:max-w-none lg:-translate-x-1/2">
            <div
              className="group/collection relative overflow-hidden rounded-[2rem] border border-[#ddd3c4] bg-[linear-gradient(180deg,rgba(255,255,255,0.54),rgba(247,241,231,0.58))] py-5 shadow-[0_24px_58px_-42px_rgba(11,61,46,0.28)] backdrop-blur lg:rounded-none lg:border-x-0"
              ref={collectionWindowRef}
              onMouseEnter={() => {
                if (!activeCardKey) setIsCarouselPaused(true)
              }}
              onMouseLeave={() => {
                if (!activeCardKey) setIsCarouselPaused(false)
              }}
              onTouchStart={pauseCarousel}
              onTouchMove={resetCardAndResumeCarousel}
            >
              <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 rounded-l-[2rem] bg-gradient-to-r from-[#f6f0e4] via-[#f6f0e4]/92 to-transparent sm:w-10 lg:w-12 lg:rounded-none" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 rounded-r-[2rem] bg-gradient-to-l from-[#f6f0e4] via-[#f6f0e4]/92 to-transparent sm:w-10 lg:w-12 lg:rounded-none" />
              <div
                className={`flex w-max gap-4 px-0 ${isCarouselPaused ? '[animation-play-state:paused]' : ''} [animation:journal-marquee-scroll_34s_linear_infinite] group-hover/collection:[animation-play-state:paused] lg:gap-5`}
              >
                {marqueeItems.map((fruit, index) => {
                  const details = fruitPresentation[fruit.slug]
                  const renderKey = `${fruit.slug}-${index}`

                  return (
                    <ProduceFlipCard
                      key={renderKey}
                      renderKey={renderKey}
                      index={index % FRUIT_VARIETIES.length}
                      name={fruit.name}
                      image={fruit.image}
                      tagline={fruit.tagline}
                      description={fruit.description}
                      notes={fruit.notes}
                      profile={details.profile}
                      origin={details.origin}
                      isFlipped={activeCardKey === renderKey}
                      onToggle={handleCardToggle}
                    />
                  )
                })}
              </div>
            </div>
          </SectionReveal>
        </section>

        <section className="relative overflow-hidden bg-[#0b3d2e] py-8 text-cream-50 sm:py-10 lg:py-14">
          <div className="section-shell relative">
            <div className="mx-auto max-w-6xl">
              <SectionReveal className="mx-auto max-w-2xl text-center">
                <span className="section-label border-white/15 bg-white/8 text-cream-50/82">
                  <Waves className="size-4 text-gold-400" />
                  Harvest journey
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.6rem,5vw,2.7rem)] leading-[0.98]">
                  From orchard origin to premium presentation.
                </h2>
              </SectionReveal>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {harvestJourney.map((item, index) => (
                  <SectionReveal key={`${item}-${index}`} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 text-left shadow-[0_20px_44px_-34px_rgba(0,0,0,0.45)] backdrop-blur">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-gold-400">0{index + 1}</p>
                    <p className="mt-2 text-sm leading-relaxed text-cream-50/78">{item}</p>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell pb-18 pt-6 sm:pb-24 sm:pt-8 lg:pb-28">
          <SectionReveal className="rounded-[1.35rem] border border-[#ddd3c4] bg-white/82 p-4 lg:rounded-[2rem] lg:p-8">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-600">Coming next</p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.8rem)] leading-[0.96] text-forest-900">
              Packaged goods will stay inside the same premium ecosystem.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-forest-900/72 sm:text-base lg:text-lg">
              For availability, sourcing, and forward planning, start a conversation.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-900">
              Explore the orchard story through each category
              <ArrowRight className="size-4" />
            </div>
          </SectionReveal>
        </section>
      </div>
    </>
  )
}
