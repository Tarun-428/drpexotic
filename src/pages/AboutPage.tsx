import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, BadgeCheck, Leaf, ShieldCheck, Sprout, Trees, Users } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { LOCAL_ASSETS } from '@/constants/assets'

const storyPoints = [
  'The journey started with orchard-first thinking rather than decorative branding.',
  'Residue-aware farming became part of the trust model, not a side note.',
  'Planning, produce, and grower guidance evolved into one integrated business system.',
] as const

const values = [
  { title: 'Orchard-first thinking', body: 'Decisions begin with land, crop fit, and season rhythm.', icon: Trees },
  { title: 'Long-term soil care', body: 'Healthy orchards need patience, water logic, and balanced nutrition.', icon: Sprout },
  { title: 'Premium discipline', body: 'Fruit quality is protected through structured care and harvest handling.', icon: BadgeCheck },
  { title: 'Market credibility', body: 'Field systems and premium communication must align.', icon: ShieldCheck },
  { title: 'Grower-backed systems', body: 'Knowledge is strengthened by repeated field reality.', icon: Users },
] as const

const comparisonRows = [
  { conventional: 'Reactive season-to-season decisions', drp: 'Longer-horizon orchard planning' },
  { conventional: 'Commodity movement first', drp: 'Premium positioning with provenance and quality discipline' },
  { conventional: 'Short-term yield pressure', drp: 'Repeatable structure that protects orchard longevity' },
  { conventional: 'Generic produce story', drp: 'Clearer market communication backed by field systems' },
] as const

const nextPages = [
  { title: 'Produce', body: 'See how the philosophy becomes fruit categories.', to: '/produce', image: LOCAL_ASSETS.dragonFruitHalves },
  { title: 'Services', body: 'Explore orchard programmes and support models.', to: '/services', image: LOCAL_ASSETS.orchardNight },
  { title: 'Journal', body: 'Read compact field notes and orchard thinking.', to: '/journal', image: LOCAL_ASSETS.dragonFruitRows },
  { title: 'Contact', body: 'Start a direct produce or orchard conversation.', to: '/contact', image: LOCAL_ASSETS.orchardTeam },
] as const

const introStats = [
  { value: 50, suffix: '+', label: 'acres cultivated' },
  { value: 60, suffix: '+', label: 'grower relationships' },
  { value: 105, suffix: '+', label: 'acres guided' },
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

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About DRP Exotic Farms"
        description="Learn who DRP Exotic Farms is, what the orchard model stands for, why residue-aware systems matter, and how the brand differs from generic produce businesses."
        path="/about"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#123026] text-cream-50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(8,25,18,0.28), rgba(8,25,18,0.84)), url(${LOCAL_ASSETS.orchardTeam})`,
            }}
          />
          <div className="section-shell relative z-10 py-16 sm:py-20 lg:py-28">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:items-end">
              <SectionReveal className="max-w-4xl">
                <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                  <Leaf className="size-4 text-gold-400" />
                  About DRP
                </span>
                <h1 className="mt-4 font-display text-[clamp(2.1rem,7vw,5.3rem)] leading-[0.94] tracking-[-0.04em] text-cream-50">
                  A premium orchard business built around produce, systems, and trust.
                </h1>
                <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cream-50/76 sm:text-base lg:text-lg">
                  DRP Exotic Farms combines premium fruit cultivation, orchard programme design, residue-aware field
                  discipline, and grower-backed agricultural thinking.
                </p>
              </SectionReveal>

              <SectionReveal className="rounded-[1.4rem] border border-white/10 bg-white/8 p-3.5 backdrop-blur sm:p-4 lg:rounded-[1.8rem] lg:p-5">
                <img
                  src={LOCAL_ASSETS.dragonFruitRows}
                  alt="Dragon fruit rows in the DRP orchard"
                  className="aspect-[16/10] w-full rounded-[1rem] object-cover lg:rounded-[1.3rem]"
                  loading="eager"
                  decoding="async"
                />
                <div className="mt-3 grid grid-cols-3 gap-2.5">
                  {introStats.map((item) => (
                    <div key={item.label}>
                      <p className="text-xl text-gold-400 sm:text-2xl">
                        <AnimatedNumber value={item.value} suffix={item.suffix} duration={1.1} />
                      </p>
                      <p className="mt-1 text-[0.58rem] uppercase tracking-[0.14em] text-cream-50/58 sm:text-[0.62rem]">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        <section className="section-shell py-8 sm:py-10 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
            <SectionReveal>
              <span className="section-label">
                <Sprout className="size-4 text-gold-600" />
                Clear introduction
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.3rem)] leading-[0.96] text-forest-900">
                What DRP Exotic Farms is
              </h2>
            </SectionReveal>
            <SectionReveal className="rounded-[1.35rem] border border-[#ddd2c1] bg-[#f7f1e7] p-4 sm:p-5 lg:rounded-[1.8rem] lg:p-7">
              <p className="text-sm leading-relaxed text-forest-900/74 sm:text-base lg:text-lg">
                DRP is a modern agricultural business that combines premium produce cultivation with orchard planning,
                grower systems, and a residue-aware quality mindset.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-forest-900/74 sm:text-base lg:text-lg">
                The premium identity reflects actual orchard discipline rather than replacing it.
              </p>
            </SectionReveal>
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <SectionReveal>
            <span className="section-label">
              <Trees className="size-4 text-gold-600" />
              Brand story
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.3rem)] leading-[0.96] text-forest-900">
              The orchard journey behind the brand.
            </h2>
          </SectionReveal>

          <div className="compact-snap-row mt-4 lg:hidden">
            {storyPoints.map((item, index) => (
              <SectionReveal key={item} className="rounded-[1.2rem] border border-[#ddd3c4] bg-white/80 p-4">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-forest-900/46">0{index + 1}</p>
                <p className="mt-2 text-xs leading-relaxed text-forest-900/68">{item}</p>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-3">
            {storyPoints.map((item) => (
              <SectionReveal key={item} className="rounded-[1.6rem] border border-[#ddd3c4] bg-white/80 p-5">
                <p className="text-sm leading-relaxed text-forest-900/68">{item}</p>
              </SectionReveal>
            ))}
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <SectionReveal>
              <span className="section-label">
                <BadgeCheck className="size-4 text-gold-600" />
                Core values
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.3rem)] leading-[0.96] text-forest-900">
                Principles that shape field and brand decisions.
              </h2>
            </SectionReveal>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {values.map((item) => {
                const Icon = item.icon
                return (
                  <SectionReveal key={item.title} className="rounded-[1.2rem] border border-[#ddd3c4] bg-[#f8f3ea] p-4 lg:rounded-[1.6rem] lg:p-5">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-[#e7ecdf] text-forest-900">
                      <Icon className="size-4.5" />
                    </span>
                    <h3 className="mt-3 font-display text-[1.1rem] leading-[1] text-forest-900 lg:text-[1.4rem]">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-forest-900/68 lg:mt-3 lg:text-sm">{item.body}</p>
                  </SectionReveal>
                )
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#0f3b2f] py-8 text-cream-50 sm:py-10 lg:py-16">
          <div className="section-shell">
            <SectionReveal className="max-w-3xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <ShieldCheck className="size-4 text-gold-400" />
                Farm philosophy
              </span>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-[0.96]">
                Practical philosophy, not abstract positioning.
              </h2>
            </SectionReveal>
            <div className="compact-snap-row mt-4 lg:hidden">
              {[
                'Quality systems must survive real field conditions.',
                'Agritech matters only when it improves timing and decisions on the ground.',
                'Sustainability means balancing yield ambition with orchard longevity.',
                'Harvest discipline is part of brand trust, not just operations.',
              ].map((item) => (
                <SectionReveal key={item} className="rounded-[1.2rem] border border-white/10 bg-white/6 p-4 backdrop-blur">
                  <p className="text-xs leading-relaxed text-cream-50/74">{item}</p>
                </SectionReveal>
              ))}
            </div>
            <div className="mt-6 hidden gap-4 lg:grid lg:grid-cols-2">
              {[
                'Quality systems must survive real field conditions.',
                'Agritech matters only when it improves timing and decisions on the ground.',
                'Sustainability means balancing yield ambition with orchard longevity.',
                'Harvest discipline is part of brand trust, not just operations.',
              ].map((item) => (
                <SectionReveal key={item} className="rounded-[1.55rem] border border-white/10 bg-white/6 p-5 backdrop-blur">
                  <p className="text-sm leading-relaxed text-cream-50/74 sm:text-base">{item}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center">
            <SectionReveal className="overflow-hidden rounded-[1.35rem] shadow-[0_24px_46px_-36px_rgba(11,61,46,0.28)] lg:rounded-[2rem]">
              <img src={LOCAL_ASSETS.orchardTeam} alt="DRP team in the orchard" className="aspect-[16/10] w-full object-cover lg:aspect-[4/3]" loading="lazy" decoding="async" />
            </SectionReveal>
            <div className="grid gap-3">
              <SectionReveal>
                <span className="section-label">
                  <Users className="size-4 text-gold-600" />
                  Team and founders
                </span>
                <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.3rem)] leading-[0.96] text-forest-900">
                  Human credibility matters as much as visual polish.
                </h2>
              </SectionReveal>
              {[
                'The people behind DRP work from orchard logic first: land suitability, crop planning, care cycles, and market expectations.',
                'The team translates agricultural work into a cleaner business proposition so partners can understand the value quickly.',
              ].map((item) => (
                <SectionReveal key={item} className="rounded-[1.2rem] border border-[#ddd3c4] bg-white/82 p-4 lg:rounded-[1.6rem] lg:p-5">
                  <p className="text-xs leading-relaxed text-forest-900/68 lg:text-sm">{item}</p>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-6 sm:py-8 lg:py-16">
          <SectionReveal>
            <span className="section-label">
              <Leaf className="size-4 text-gold-600" />
              Why DRP is different
            </span>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,5.8vw,3.4rem)] leading-[0.96] text-forest-900">
              A direct comparison between generic farming logic and the DRP approach.
            </h2>
          </SectionReveal>

          <div className="mt-4 overflow-hidden rounded-[1.3rem] border border-[#ddd1c0] bg-white/88 lg:mt-6 lg:rounded-[1.9rem]">
            <div className="grid border-b border-[#e8dece] bg-[#f5efe4] text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-forest-900/58 lg:grid-cols-2 lg:text-sm lg:tracking-[0.18em]">
              <div className="px-4 py-3 lg:px-5 lg:py-4">Conventional</div>
              <div className="border-t border-[#e8dece] px-4 py-3 lg:border-l lg:border-t-0 lg:px-5 lg:py-4">DRP</div>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.conventional} className="grid lg:grid-cols-2">
                <div className="border-b border-[#eee4d4] px-4 py-3 text-xs leading-relaxed text-forest-900/66 lg:px-5 lg:py-4 lg:text-sm">
                  {row.conventional}
                </div>
                <div className="border-b border-[#eee4d4] bg-[#fbf8f2] px-4 py-3 text-xs leading-relaxed text-forest-900 lg:px-5 lg:py-4 lg:text-sm">
                  {row.drp}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-shell pb-18 pt-6 sm:pb-24 sm:pt-8 lg:pb-28">
          <div className="compact-snap-row lg:hidden">
            {nextPages.map((item) => (
              <SectionReveal key={item.to} className="overflow-hidden rounded-[1.2rem] border border-[#ddd3c4] bg-white/84">
                <img src={item.image} alt={item.title} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-4">
                  <h3 className="font-display text-[1.2rem] leading-none text-forest-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-forest-900/68">{item.body}</p>
                  <Link to={item.to} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-forest-900">
                    Open page
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {nextPages.map((item) => (
              <SectionReveal key={item.to} className="overflow-hidden rounded-[1.65rem] border border-[#ddd3c4] bg-white/84">
                <img src={item.image} alt={item.title} className="aspect-[16/10] w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-5">
                  <h3 className="font-display text-[1.5rem] leading-none text-forest-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-forest-900/68">{item.body}</p>
                  <Link to={item.to} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest-900">
                    Open page
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </SectionReveal>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
