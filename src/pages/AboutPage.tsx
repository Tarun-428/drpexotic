import { motion } from 'framer-motion'
import { PageMeta } from '@/components/seo/PageMeta'
import { CLIENT_ASSETS } from '@/constants/assets'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { CheckCircle2, Award, Briefcase, Zap, History, Target, TrendingUp, Heart, Users } from 'lucide-react'
import { FlipCard } from '@/components/ui/FlipCard'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const milestones = [
  { year: '2011', title: 'Foundation', desc: 'The journey began with a single vision to modernize Indian agriculture.' },
  { year: '2013', title: 'First Orchard', desc: 'Successfully developed our first commercial dragon fruit orchard project.' },
  { year: '2016', title: 'Exotic Expansion', desc: 'Diversified into multiple exotic varieties including Avocado and Guava.' },
  { year: '2018', title: 'Farmer Network', desc: 'Launched our grower support program to help farmers scale successfully.' },
  { year: '2022', title: 'Large Scale Projects', desc: 'Managing 100+ acres of scientific orchard projects across the region.' },
  { year: '2026', title: 'DRP Today', desc: 'A leading name in exotic farming, empowering the next generation of growers.' },
]


const visionaries = [
  {
    name: 'Dinesh Patidar',
    role: 'Regional Advisor',
    intro: 'Experienced farmer and advisor who understands traditional farming challenges.',
    image: CLIENT_ASSETS.founder,
    description:
      'With 35 years of farming experience and 11 years of horticulture specialization, Dinesh Patidar has helped many farmers establish fruit-based farming operations. Beyond cultivation, he has guided farmers in marketing and sales, helping strengthen their economic resilience.',
    icons: [<Zap key="zap" className="size-5 text-accent" />, <Award key="award" className="size-5 text-accent" />]
  },
  {
    name: 'Udit Dinesh Patidar',
    role: 'Head of Marketing',
    intro: 'Leads brand, marketing, and market development for DRP.',
    image: CLIENT_ASSETS.cofounder,
    description:
      'Udit Dinesh Patidar leads marketing and sales at DRP Exotic Farms. With a strategic, innovation-driven vision, he plays a key role in growing the brand. By combining modern business practices with progressive agriculture, he has helped position DRP as a recognized name in the premium exotic produce segment.',
    icons: [<Briefcase key="briefcase" className="size-5 text-accent" />, <Target key="target" className="size-5 text-accent" />]
  },
  {
    name: 'DRP Field Team',
    role: 'Grower Guidance',
    intro: 'Hands-on field support for every stage of orchard development.',
    image: CLIENT_ASSETS.consultationRoom,
    description: 'The DRP field team connects planning, plantation, crop observation, and market readiness so growers receive practical support on the ground.',
    icons: [<Users key="users" className="size-5 text-accent" />, <TrendingUp key="trending" className="size-5 text-accent" />]
  }
]

export default function AboutPage() {
  return (
    <>
      <PageMeta
        title="About Us | DRP Exotic Farms"
        description="Learn about the visionaries and the journey behind DRP Exotic Farms, pioneering sustainable exotic fruit farming for modern growers."
        path="/about"
      />

      {/* 1. HERO INTRODUCTION */}
      <section className="bg-primary pt-32 pb-20 text-neutral relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={CLIENT_ASSETS.orchardOverview} alt="" className="w-full h-full object-cover opacity-15" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">About DRP</span>
            <h1 className="text-4xl sm:text-6xl font-display leading-tight mt-6 mb-6">
              Growers <span className="text-accent">First, Always</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed">
              We work the land, we study the crop, and we stay close to every orchard we build. Our approach is rooted in practical farming, disciplined care, and long-term harvest success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ROOTED IN THE FIELD */}
      <section className="bg-secondary/20">
        <div className="section-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Growers Who Stay Close to the Crop</h2>
              <p className="section-description">
                DRP Exotic Farms is built by people who understand orchard rhythms, plant stress, canopy balance, and harvest timing. We don’t just design farm plans; we remain involved through planting, care, and crop readiness.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {['Hands-on Field Visits', 'Crop Rhythm Awareness', 'Canopy & Nutrition Care', 'Harvest Readiness'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-primary text-sm font-semibold">
                    <CheckCircle2 className="size-4 text-accent" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex justify-center">
              <div className="rounded-2xl shadow-lg overflow-hidden group">
                <img 
                  src={CLIENT_ASSETS.aboutPage} 
                  alt="Scientific Farming" 
                  className="max-w-full lg:max-w-md aspect-square object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR STORY (Visual Storytelling) */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">The DRP Story</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {[
              { icon: History, title: 'How We Started', text: 'Born from a passion to introduce premium exotic varieties to local landscapes.' },
              { icon: Target, title: 'Why Exotic Farming', text: 'Identifying high-demand, high-margin crops that offer sustainable long-term returns.' },
              { icon: TrendingUp, title: 'Our Growth', text: 'From a single plot to managing sprawling commercial orchards across multiple states.' },
              { icon: Heart, title: 'Our Values', text: 'Committed to transparency, scientific integrity, and the success of our grower community.' },
            ].map((item, idx) => (
              <motion.div key={item.title} {...fadeIn} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center text-center p-4 sm:p-6 bg-secondary/10 rounded-2xl border border-primary/5">
                <div className="size-10 sm:size-12 bg-primary rounded-full flex items-center justify-center text-accent mb-3 sm:mb-4">
                  <item.icon className="size-5 sm:size-6" />
                </div>
                <h3 className="text-xs sm:text-lg font-display text-primary mb-1.5 sm:mb-2 leading-tight">{item.title}</h3>
                <p className="text-[0.6rem] sm:text-xs text-primary/70 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR VISIONARIES */}
      <section className="bg-secondary/30">
        <div className="section-shell">
          <div className="text-center mb-12">
            <span className="section-label">Leadership</span>
            <h2 className="section-title">Our Visionaries</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {visionaries.map((v) => (
              <FlipCard key={v.name} className="h-[450px]">
                {/* Front Side */}
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                    <h3 className="text-2xl font-display text-neutral leading-tight">{v.name}</h3>
                    <p className="text-accent font-bold uppercase tracking-widest text-[0.7rem] mt-1 mb-2">{v.role}</p>
                    <p className="text-neutral/80 text-xs leading-relaxed">{v.intro}</p>
                  </div>
                </div>
                {/* Back Side */}
                <div className="bg-primary p-8 flex flex-col items-center justify-center text-center h-full rounded-2xl">
                  <h3 className="text-2xl font-display text-accent mb-4">{v.name}</h3>
                  <p className="text-neutral/80 text-sm leading-relaxed mb-6">
                    {v.description}
                  </p>
                  <div className="flex gap-4">
                    {v.icons}
                  </div>
                </div>
              </FlipCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MILESTONES */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-label">Timeline</span>
              <h2 className="section-title">Milestones of Excellence</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((m, idx) => (
                <motion.div key={m.year} {...fadeIn} transition={{ delay: idx * 0.1 }} className="premium-card !bg-secondary/30 border-none p-8 flex flex-col items-center text-center">
                  <div className="text-4xl font-display text-accent font-bold mb-3">{m.year}</div>
                  <h3 className="font-bold text-primary mb-2 text-lg">{m.title}</h3>
                  <p className="text-xs text-primary/60 leading-relaxed">{m.desc}</p>
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
                <Link to="/services">Our Services</Link>
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
