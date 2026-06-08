import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Star, Info, ArrowRight } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { LOCAL_ASSETS } from '@/constants/assets'
import { FRUIT_VARIETIES } from '@/constants/fruits'
import { Button } from '@/components/ui/button'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { Link } from 'react-router-dom'
import { FlipCard } from '@/components/ui/FlipCard'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const qualityStandards = [
  { icon: ShieldCheck, title: 'Residue-Aware', desc: 'Minimal chemical usage for healthier produce.' },
  { icon: Star, title: 'Premium Grade', desc: 'Rigorous selection for size, color, and taste.' },
  { icon: Truck, title: 'Direct Supply', desc: 'Harvested and dispatched within 48 hours.' },
]

export default function ProducePage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello DRP Exotic Farms, I am interested in sourcing your premium produce.')

  return (
    <>
      <PageMeta
        title="Premium Produce | DRP Exotic Farms"
        description="Discover our range of premium, residue-aware exotic fruits grown with care and delivered with freshness."
        path="/produce"
      />

      {/* HERO */}
      <section className="bg-primary pt-32 pb-20 text-neutral text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={LOCAL_ASSETS.dragonFruitHalves} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">Our Harvest</span>
            <h1 className="text-4xl sm:text-6xl font-display leading-tight mt-6 mb-6">
              Exotic Produce, <br />
              <span className="text-accent">Grown with Discipline.</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed">
              We specialize in high-demand, high-quality exotic fruits result of scientific orchard management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUALITY STANDARDS */}
      <section className="bg-secondary/30 py-8 border-y border-primary/5">
        <div className="section-shell">
          <div className="grid md:grid-cols-3 gap-8">
            {qualityStandards.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div className="size-10 bg-primary rounded-full flex items-center justify-center text-accent shrink-0">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-primary text-sm sm:text-base">{item.title}</h3>
                  <p className="text-primary/60 text-xs sm:text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCE GRID - Optimized Flip Cards */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">Signature Collection</span>
            <h2 className="section-title">Our Premium Varieties</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {FRUIT_VARIETIES.map((fruit) => (
              <FlipCard key={fruit.slug} className="h-[380px]">
                <div className="bg-white border border-primary/5 shadow-sm h-full w-full overflow-hidden">
                  <img src={fruit.image} alt={fruit.name} className="w-full h-[240px] object-cover" />
                  <div className="p-6 text-left">
                    <h3 className="text-xl sm:text-2xl font-display text-primary">{fruit.name}</h3>
                    <p className="text-primary/50 text-[0.65rem] sm:text-xs mt-2 italic">"{fruit.tagline}"</p>
                  </div>
                </div>
                <div className="bg-primary p-8 flex flex-col items-center justify-center text-center border border-primary/5 h-full">
                  <h3 className="text-xl sm:text-2xl font-display text-accent mb-4">{fruit.name}</h3>
                  <p className="text-neutral/80 text-[0.65rem] sm:text-sm leading-relaxed mb-6">{fruit.description}</p>
                  <div className="space-y-2">
                    {fruit.notes.map((note) => (
                      <div key={note} className="flex items-center gap-2 text-[0.6rem] sm:text-[0.65rem] font-bold text-accent uppercase tracking-wider">
                        <Info className="size-3" />
                        {note}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 size-10 bg-white/10 rounded-full flex items-center justify-center text-accent">
                    <ArrowRight className="size-5" />
                  </div>
                </div>
              </FlipCard>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPLY & LOGISTICS */}
      <section className="bg-secondary/20">
        <div className="section-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <span className="section-label">Logistics</span>
              <h2 className="section-title">Freshness Delivered</h2>
              <p className="section-description">
                Our integrated supply chain ensures that premium produce reaches retailers and hospitality partners across the country with maximum freshness.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
                <div className="p-4 sm:p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
                  <div className="text-2xl sm:text-4xl font-display text-primary font-bold">100%</div>
                  <div className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-primary/50 mt-1 font-bold">Traceable Produce</div>
                </div>
                <div className="p-4 sm:p-6 bg-white rounded-2xl border border-primary/5 shadow-sm">
                  <div className="text-2xl sm:text-4xl font-display text-primary font-bold">48 Hrs</div>
                  <div className="text-[0.55rem] sm:text-[0.6rem] uppercase tracking-widest text-primary/50 mt-1 font-bold">Harvest to Dispatch</div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex justify-center">
              <img src={LOCAL_ASSETS.dragonFruitHalves} alt="Fresh Harvest" className="rounded-3xl shadow-xl max-w-full lg:max-w-md aspect-square object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-neutral text-center">
        <div className="section-shell py-16">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display mb-6">Source Premium Exotic Fruits</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary">
                <a href={wa} target="_blank" rel="noreferrer">Inquire Sourcing</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary">
                <Link to="/contact">Get Pricing</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
