import { motion } from 'framer-motion'
import {
  Target,
  Users,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { Link } from 'react-router-dom'
import { LOCAL_ASSETS } from '@/constants/assets'
import { FlipCard } from '@/components/ui/FlipCard'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const services = [
  { step: '01', title: 'Consultation', image: LOCAL_ASSETS.orchardTeam, desc: 'Defining your vision, budget, and commercial goals for the orchard project.' },
  { step: '02', title: 'Land Assessment', image: LOCAL_ASSETS.dragonFruitRows, desc: 'Detailed scientific analysis of soil, water, and climatic suitability for exotic crops.' },
  { step: '03', title: 'Crop Selection', image: LOCAL_ASSETS.avocado, desc: 'Identifying high-yield, premium exotic varieties tailored to your specific land conditions.' },
  { step: '04', title: 'Orchard Development', image: LOCAL_ASSETS.dragonFruitHalves, desc: 'Precision layout planning, system establishment, and premium planting material supply.' },
  { step: '05', title: 'Farm Management', image: LOCAL_ASSETS.guava, desc: 'Step-by-step guidance on nutrition, irrigation, and scientific crop management protocols.' },
  { step: '06', title: 'Market Linkage', image: LOCAL_ASSETS.dragonFruitCut, desc: 'Connecting your harvest to high-value retail networks and premium buyer channels.' },
]

export default function ServicesPage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello DRP Exotic Farms, I am interested in your orchard consultancy services.')

  return (
    <>
      <PageMeta
        title="Our Services | Complete Orchard Consultancy"
        description="From land assessment to market linkage, DRP Exotic Farms provides end-to-end consultancy for building profitable exotic fruit orchards."
        path="/services"
      />

      {/* HERO */}
      <section className="bg-primary pt-32 pb-20 text-neutral text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={LOCAL_ASSETS.dragonFruitWhole} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">Our Expertise</span>
            <h1 className="text-4xl sm:text-6xl font-display leading-tight mt-6 mb-6">
              Complete <span className="text-accent">Orchard Journey</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed">
              We provide 360-degree consultancy to establish and manage highly profitable commercial exotic fruit orchards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SERVICE FLIP CARDS */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((s) => (
              <FlipCard key={s.title} className="h-[320px]">
                <div className="relative h-full w-full">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex flex-col justify-end p-6 text-left">
                    <span className="text-accent font-bold text-[0.65rem] uppercase tracking-[0.2em] mb-2">{s.step}</span>
                    <h3 className="text-xl sm:text-2xl font-display text-neutral">{s.title}</h3>
                  </div>
                </div>
                <div className="bg-secondary flex flex-col items-center justify-center p-8 border border-primary/5 h-full">
                  <h3 className="text-xl font-display text-primary mb-4">{s.title}</h3>
                  <p className="text-primary/70 text-xs sm:text-sm leading-relaxed text-center">{s.desc}</p>
                  <div className="mt-6 size-10 bg-primary rounded-full flex items-center justify-center text-accent">
                    <ArrowRight className="size-5" />
                  </div>
                </div>
              </FlipCard>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR & BENEFITS */}
      <section className="bg-secondary/20">
        <div className="section-shell">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="section-title">Why Partner with Us?</h2>
              <p className="section-description">
                We bridge the gap between agricultural ambition and commercial success through scientific discipline and market expertise.
              </p>
              <div className="mt-8 space-y-6">
                {[
                  { icon: Target, title: 'ROI Focused', desc: 'Maximizing returns through scientific yield optimization.' },
                  { icon: Users, title: 'End-to-End Support', desc: 'From soil testing to selling your final harvest.' },
                  { icon: BarChart3, title: 'Risk Mitigation', desc: 'Proven protocols that minimize crop failure.' },
                ].map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-accent shrink-0">
                      <b.icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">{b.title}</h4>
                      <p className="text-[0.65rem] text-primary/60">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-primary p-8 sm:p-12 rounded-[2rem] text-neutral shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-display mb-6 text-accent">Who Is This For?</h3>
              <ul className="space-y-4">
                {['Progressive Farmers', 'Landowners with Idle Land', 'Institutional Investors', 'Agri-Entrepreneurs'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-semibold border-b border-neutral/10 pb-3 last:border-0">
                    <div className="size-1.5 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="btn-secondary w-full mt-8">
                <a href={wa} target="_blank" rel="noreferrer">Get Expert Advice</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-neutral text-center">
        <div className="section-shell py-16">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display mb-6">Start Your Success Story</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary">
                <a href={wa} target="_blank" rel="noreferrer">Book Consultation</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary">
                <Link to="/contact">Talk to an Expert</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
