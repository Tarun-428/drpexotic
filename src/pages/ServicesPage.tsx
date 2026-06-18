import { motion } from 'framer-motion'
import {
  Target,
  Users,
  BarChart3,
  ArrowRight,
} from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { CLIENT_ASSETS } from '@/constants/assets'
import { FlipCard } from '@/components/ui/FlipCard'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const services = [
  { step: '01', title: 'Orchard Planning', image: CLIENT_ASSETS.protectedCultivation, desc: 'Defining your vision, layout, and commercial goals for a successful orchard project.' },
  { step: '02', title: 'Planting Material', image: CLIENT_ASSETS.plantingMaterial, desc: 'Supplying premium, high-yield exotic fruit saplings and genetically superior varieties.' },
  { step: '03', title: 'Farm Development', image: CLIENT_ASSETS.orchardSunrise, desc: 'End-to-end setup including precision irrigation, fencing, and scientific land preparation.' },
  { step: '04', title: 'Orchard Management', image: CLIENT_ASSETS.avocadoTree, desc: 'Ongoing step-by-step guidance on nutrition, pest control, and scientific farming protocols.' },
  { step: '05', title: 'Harvest Support', image: CLIENT_ASSETS.mangoHarvest, desc: 'Optimizing harvest techniques and post-harvest handling to maintain premium fruit quality.' },
  { step: '06', title: 'Market Linkage', image: CLIENT_ASSETS.marketDisplay, desc: 'Connecting your successful harvest to premium retail networks and high-value buyer channels.' },
]

export default function ServicesPage() {
  return (
    <>
      <PageMeta
        title="Our Services | Complete Grower Guidance"
        description="From orchard planning to market linkage, DRP Exotic Farms provides end-to-end support for building profitable exotic fruit orchards."
        path="/services"
      />

      {/* HERO */}
      <section className="bg-primary pt-32 pb-20 text-neutral text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={CLIENT_ASSETS.protectedCultivation} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">Grower Support</span>
            <h1 className="text-4xl sm:text-6xl font-display leading-tight mt-6 mb-6">
              WE HELP <span className="text-accent">YOU WITH</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed">
              We provide 360-degree Grower Guidance to establish and manage highly profitable commercial exotic fruit orchards.
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
                <div className="relative h-full w-full overflow-hidden group">
                  <img 
                    src={s.image} 
                    alt={s.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
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
                We bridge the gap between agricultural ambition and commercial success through scientific discipline and practical grower support.
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
                <Link to="/produce">Our Produce</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary">
                <Link to="/contact">Start Your Orchard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
