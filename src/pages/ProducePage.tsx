import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Leaf, Sparkles, SunMedium, Waves } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { PreviewSection } from '@/components/preview/PreviewSection'
import { LOCAL_ASSETS } from '@/constants/assets'
import { FRUIT_VARIETIES } from '@/constants/fruits'

const produceStories = [
  { title: 'Origins shaped by observation', body: 'Light, slope, water, and patience before variety decisions.', image: LOCAL_ASSETS.orchardTeam },
  { title: 'Harvest paced for quality', body: 'Timing, handling, and visual consistency.', image: LOCAL_ASSETS.dragonFruitRows },
  { title: 'Residue-aware by design', body: 'Cleaner choices that protect flavour and trust.', image: LOCAL_ASSETS.dragonFruitCut },
] as const

const seasonalWindows = [
  ['Blueberry', 'Cool-climate precision and high-value timing'],
  ['Avocado', 'Long-horizon canopy maturity and shelf appeal'],
  ['Dragon fruit', 'Structured flushes with labour-aware harvest pathways'],
  ['Kesar mango', 'Heritage flavour with orchard discipline'],
  ['Red Diamond guava', 'Colour-forward harvest shaped for shelf presence'],
  ['Banana', 'Rhythm farming with soil health in view'],
] as const

const pagePreviews = [
  { eyebrow: 'Services', title: 'Build orchard systems', body: 'Translate product ambition into field architecture.', to: '/services', image: LOCAL_ASSETS.orchardTeam },
  { eyebrow: 'Journal', title: 'Read harvest notes', body: 'Follow the editorial layer behind each season.', to: '/journal', image: LOCAL_ASSETS.orchardNight },
  { eyebrow: 'Gallery', title: 'See the farm textures', body: 'Move into a quieter visual estate tour.', to: '/gallery', image: LOCAL_ASSETS.dragonFruitRows },
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

export default function ProducePage() {
  return (
    <>
      <PageMeta
        title="Produce & varieties"
        description="Explore Drpexoticfarms™ signature fruits through a more compact produce experience spanning origin, seasonality, harvest rhythm, and premium orchard care."
        path="/produce"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#0d3226] text-cream-50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(7,21,16,0.24), rgba(7,21,16,0.84)), url(${LOCAL_ASSETS.dragonFruitHalves})`,
            }}
          />
          <div className="section-shell relative z-10 py-16 sm:py-20 lg:py-24">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-end lg:gap-10">
              <div className="max-w-4xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                  <Leaf className="size-4 text-gold-400" />
                  Produce
                </span>
                <h1 className="mt-4 font-display text-[clamp(2.1rem,7vw,5.6rem)] leading-[0.94] tracking-[-0.04em] text-cream-50">
                  Fruit presented like a premium collection, not a commodity list.
                </h1>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream-50/76 sm:text-base lg:text-lg">
                  Orchard origin, seasonality, premium fruit character, and faster comparison on mobile.
                </p>
              </div>

              <SectionReveal className="rounded-[1.35rem] border border-white/10 bg-white/8 p-3.5 backdrop-blur lg:rounded-[1.75rem] lg:p-4">
                <img src={LOCAL_ASSETS.dragonFruitCut} alt="Cut dragon fruit in close detail" className="aspect-[16/10] w-full rounded-[1rem] object-cover lg:aspect-[4/5] lg:rounded-[1.3rem]" loading="eager" decoding="async" />
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream-50/56">Harvest mood</p>
                    <p className="mt-1.5 font-display text-2xl text-gold-400 sm:text-3xl">Clean</p>
                    <p className="text-xs text-cream-50/66 sm:text-sm">Bright fruit, careful handling, premium intent.</p>
                  </div>
                  <div className="rounded-[1rem] bg-black/18 p-3">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream-50/56">Narrative</p>
                    <p className="mt-1.5 text-xs leading-relaxed text-cream-50/74 sm:text-sm">
                      Produce for buyers, chefs, estates, and hospitality groups looking for stronger quality identity.
                    </p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        <section className="section-shell py-8 sm:py-10 lg:py-16">
          <div className="compact-snap-row lg:hidden">
            {produceStories.map((story, index) => (
              <SectionReveal key={story.title} className="overflow-hidden rounded-[1.2rem] border border-[#ddd3c4] bg-white/82 shadow-[0_16px_30px_-24px_rgba(11,61,46,0.2)]">
                <img src={story.image} alt={story.title} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-4">
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-forest-900/48">0{index + 1}</p>
                  <h2 className="mt-2 font-display text-[1.2rem] leading-[1] text-forest-900">{story.title}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-forest-900/68">{story.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="hidden gap-4 lg:grid lg:grid-cols-3">
            {produceStories.map((story, index) => (
              <SectionReveal key={story.title} className="overflow-hidden rounded-[2rem] border border-[#ddd3c4] bg-white/82">
                <img src={story.image} alt={story.title} className="h-64 w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-forest-900/48">0{index + 1}</p>
                  <h2 className="mt-4 font-display text-3xl leading-[0.96] text-forest-900">{story.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-forest-900/68">{story.body}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <SectionReveal>
            <span className="section-label">
              <Sparkles className="size-4 text-gold-600" />
              Signature collection
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.4rem)] leading-[0.96] text-forest-900">
              Compact product cards with faster crop understanding.
            </h2>
          </SectionReveal>

          <div className="compact-snap-row mt-4 lg:hidden">
            {FRUIT_VARIETIES.map((fruit) => (
              <article key={fruit.slug} className="overflow-hidden rounded-[1.25rem] border border-[#ddd3c4] bg-[#f8f3ea] shadow-[0_16px_30px_-24px_rgba(11,61,46,0.2)]">
                <img src={fruit.image} alt={fruit.name} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                <div className="grid gap-2.5 p-4">
                  <h3 className="font-display text-[1.25rem] leading-none text-forest-900">{fruit.name}</h3>
                  <p className="text-[0.72rem] leading-relaxed text-forest-900/58">{fruit.tagline}</p>
                  <p className="line-clamp-2 text-xs leading-relaxed text-forest-900/68">{fruit.description}</p>
                  <div className="grid gap-2">
                    {fruit.notes.slice(0, 2).map((note, index) => (
                      <div key={`${note}-${index}`} className="rounded-[0.9rem] bg-white/72 px-3 py-2 text-[0.72rem] leading-relaxed text-forest-900/66">
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 hidden space-y-12 lg:block">
            {FRUIT_VARIETIES.map((fruit, index) => (
              <div key={fruit.slug} className={`grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-14 ${index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <SectionReveal className="overflow-hidden rounded-[2rem]">
                  <img src={fruit.image} alt={fruit.name} className="aspect-[4/5] w-full object-cover sm:aspect-[16/10] lg:aspect-[4/5]" loading="lazy" decoding="async" />
                </SectionReveal>
                <SectionReveal className="max-w-xl">
                  <span className="section-label">{index % 2 === 0 ? 'Farm origin' : 'Harvest character'}</span>
                  <h3 className="mt-5 font-display text-[clamp(2rem,3.5vw,3.9rem)] leading-[0.96] tracking-[-0.03em] text-forest-900">
                    {fruit.name}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-forest-900/72">{fruit.description}</p>
                  <ul className="mt-5 grid gap-3">
                    {fruit.notes.map((note, noteIndex) => (
                      <li key={`${note}-${noteIndex}`} className="rounded-[1.2rem] border border-[#ddd3c4] bg-white/80 px-4 py-3 text-sm leading-relaxed text-forest-900/72">
                        {note}
                      </li>
                    ))}
                  </ul>
                </SectionReveal>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <SectionReveal>
              <span className="section-label">
                <SunMedium className="size-4 text-gold-600" />
                Seasonal availability
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.4rem)] leading-[0.96] text-forest-900">
                A premium produce calendar should feel paced, not crowded.
              </h2>
            </SectionReveal>

            <div className="grid gap-3 sm:grid-cols-2 lg:gap-4">
              {seasonalWindows.map(([name, note]) => (
                <SectionReveal key={name} className="rounded-[1.2rem] border border-[#ddd3c4] bg-white/82 p-4 lg:rounded-[1.5rem] lg:p-5">
                  <p className="font-display text-[1.2rem] leading-none text-forest-900 lg:text-3xl">{name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-forest-900/66 lg:mt-3 lg:text-sm">{note}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0b3d2e] py-8 text-cream-50 sm:py-10 lg:py-16">
          <div className="section-shell relative">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
              <SectionReveal>
                <span className="section-label border-white/15 bg-white/8 text-cream-50/82">
                  <Waves className="size-4 text-gold-400" />
                  Harvest journey
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[0.96]">
                  From orchard origin to premium presentation.
                </h2>
              </SectionReveal>

              <div className="floating-timeline lg:hidden">
                {[
                  'Field observation and maturity checks',
                  'Harvest windows aligned to quality',
                  'Clean handling and calm grading logic',
                  'Buyer-facing fruit stories with provenance built in',
                ].map((item, index) => (
                  <SectionReveal key={`${item}-${index}`} className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 backdrop-blur">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-gold-400">0{index + 1}</p>
                    <p className="mt-2 text-xs leading-relaxed text-cream-50/78">{item}</p>
                  </SectionReveal>
                ))}
              </div>

              <div className="hidden gap-4 lg:grid">
                {[
                  'Field observation and maturity checks',
                  'Harvest windows aligned to quality',
                  'Clean handling and calm grading logic',
                  'Buyer-facing fruit stories with provenance built in',
                ].map((item, index) => (
                  <SectionReveal key={`${item}-${index}`} className="rounded-[1.65rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold-400">0{index + 1}</p>
                    <p className="mt-3 text-base leading-relaxed text-cream-50/78">{item}</p>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PreviewSection eyebrow="Next paths" title="Let the produce story lead into systems, field notes, and visual atmosphere." items={pagePreviews} />

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
