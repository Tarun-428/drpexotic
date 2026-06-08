import { motion } from 'framer-motion'
import { PageMeta } from '@/components/seo/PageMeta'
import { LOCAL_ASSETS } from '@/constants/assets'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { CheckCircle2, Award, Briefcase, Zap, Users } from 'lucide-react'
import { FlipCard } from '@/components/ui/FlipCard'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const milestones = [
  { year: '2019', title: 'Founding', desc: 'Started with a vision to modernize exotic farming.' },
  { year: '2021', title: 'Expansion', desc: 'Developed multiple commercial orchards across states.' },
  { year: '2024', title: 'Scale', desc: 'Managing 100+ acres with scientific protocols.' },
]

const team = [
  { name: 'Sunil Mehra', role: 'Operations Head', image: LOCAL_ASSETS.dragonFruitRows },
  { name: 'Anita Rao', role: 'Crop Specialist', image: LOCAL_ASSETS.avocado },
  { name: 'Rajesh Kumar', role: 'Logistics Lead', image: LOCAL_ASSETS.dragonFruitCut },
]

export default function AboutPage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello DRP Exotic Farms, I would like to know more about your journey.')

  return (
    <>
      <PageMeta
        title="About Us | DRP Exotic Farms"
        description="Learn about the visionaries and the journey behind DRP Exotic Farms, pioneering sustainable exotic fruit farming."
        path="/about"
      />

      {/* 1. HERO INTRODUCTION */}
      <section className="bg-primary pt-32 pb-20 text-neutral relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={LOCAL_ASSETS.orchardNight} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">Our Story</span>
            <h1 className="text-4xl sm:text-6xl font-display leading-tight mt-6 mb-6">
              Pioneering <span className="text-accent">Exotic Farming</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed">
              DRP Exotic Farms transforms traditional land into high-yield sustainable exotic fruit orchards through scientific guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FOUNDER & CO-FOUNDER - Optimized Flip Cards */}
      <section className="bg-secondary/30">
        <div className="section-shell">
          <div className="text-center mb-12">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">The Visionaries</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {/* Founder */}
            <FlipCard className="h-[280px] sm:h-[400px]">
              <div className="bg-white shadow-sm border border-primary/5 p-3 sm:p-6 flex flex-col items-center justify-center h-full">
                <div className="size-24 sm:size-44 rounded-full overflow-hidden mb-4 sm:mb-6 border-4 border-accent/20">
                  <img src={LOCAL_ASSETS.orchardTeam} alt="Founder" className="w-full h-full object-cover" style={{ objectPosition: '36% center' }} />
                </div>
                <h3 className="text-base sm:text-2xl font-display text-primary text-center leading-tight">Dharmesh Patel</h3>
                <p className="text-accent font-bold uppercase tracking-widest text-[0.7rem] mt-2">Founder</p>
              </div>
              <div className="bg-primary p-4 sm:p-10 flex flex-col items-center justify-center text-center h-full">
                <h3 className="text-lg sm:text-2xl font-display text-accent mb-3 sm:mb-4">Dharmesh Patel</h3>
                <p className="text-neutral/80 text-[0.68rem] sm:text-sm leading-relaxed">
                  With deep roots in agriculture and a vision for innovation, Dharmesh leads the strategic direction and orchard development at DRP Exotic Farms.
                </p>
                <div className="mt-4 sm:mt-8 flex gap-4">
                  <Zap className="size-5 sm:size-6 text-accent" />
                  <Award className="size-5 sm:size-6 text-accent" />
                </div>
              </div>
            </FlipCard>

            {/* Co-Founder */}
            <FlipCard className="h-[280px] sm:h-[400px]">
              <div className="bg-white shadow-sm border border-primary/5 p-3 sm:p-6 flex flex-col items-center justify-center h-full">
                <div className="size-24 sm:size-44 rounded-full overflow-hidden mb-4 sm:mb-6 border-4 border-accent/20">
                  <img src={LOCAL_ASSETS.orchardTeam} alt="Co-Founder" className="w-full h-full object-cover" style={{ objectPosition: '64% center' }} />
                </div>
                <h3 className="text-base sm:text-2xl font-display text-primary text-center leading-tight">Team DRP</h3>
                <p className="text-accent font-bold uppercase tracking-widest text-[0.7rem] mt-2">Core Leadership</p>
              </div>
              <div className="bg-primary p-4 sm:p-10 flex flex-col items-center justify-center text-center h-full">
                <h3 className="text-lg sm:text-2xl font-display text-accent mb-3 sm:mb-4">The DRP Team</h3>
                <p className="text-neutral/80 text-[0.68rem] sm:text-sm leading-relaxed">
                  Our core team brings together expertise in farm operations, supply chain, and market linkage to ensure every orchard succeeds.
                </p>
                <div className="mt-4 sm:mt-8 flex gap-4">
                  <Briefcase className="size-5 sm:size-6 text-accent" />
                  <Users className="size-5 sm:size-6 text-accent" />
                </div>
              </div>
            </FlipCard>
          </div>
        </div>
      </section>

      {/* 3. OUR TEAM */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="text-center mb-16">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Dedicated Experts</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
            {team.map((member, idx) => (
              <motion.div key={member.name} {...fadeIn} transition={{ delay: idx * 0.1 }} className="text-center group">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-sm active:scale-[0.98] transition-all duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OPERATIONS */}
      <section className="bg-secondary/20">
        <div className="section-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <span className="section-label">Operations</span>
              <h2 className="section-title">Scientific Precision</h2>
              <p className="section-description">
                Our farm operations use data-driven insights to manage irrigation, nutrition, and pest control, ensuring maximum efficiency.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {['Drip Irrigation', 'Organic Protocols', 'Soil Monitoring', 'Quality Control'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <CheckCircle2 className="size-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex justify-center">
              <img src={LOCAL_ASSETS.dragonFruitRows} alt="Operations" className="rounded-2xl shadow-lg max-w-full lg:max-w-md aspect-video object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. MILESTONES */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">Milestones</span>
              <h2 className="section-title">The DRP Journey</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {milestones.map((m, idx) => (
                <motion.div key={m.year} {...fadeIn} transition={{ delay: idx * 0.1 }} className="premium-card !bg-secondary/30 border-none text-center">
                  <div className="text-3xl font-display text-accent font-bold mb-2">{m.year}</div>
                  <h3 className="font-bold text-primary mb-1">{m.title}</h3>
                  <p className="text-[0.65rem] text-primary/60">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="bg-primary text-neutral text-center">
        <div className="section-shell">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-display mb-6">Join the Exotic Revolution</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary">
                <a href={wa} target="_blank" rel="noreferrer">Get in Touch</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary">
                <Link to="/contact">Visit Our Farms</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
