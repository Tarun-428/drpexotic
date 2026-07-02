import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Sprout,
  Truck,
  TrendingUp,
  Eye,
  Target,
  Users,
  CheckCircle2,
  Globe,
  Star,
  Search,
  Layout,
  ClipboardCheck,
  ShieldCheck,
  Briefcase,
} from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'

import { CLIENT_ASSETS } from '@/constants/assets'
import { HomeNewsTicker } from '@/components/blog/HomeNewsTicker'
import OrchardArcGallery from '@/components/home/OrchardArcGallery'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const processSteps = [
  { icon: Search, title: 'Consultation', desc: 'Defining vision and project goals.' },
  { icon: Layout, title: 'Planning', desc: 'Scientific layout and crop selection.' },
  { icon: Sprout, title: 'Plantation', desc: 'Premium material and setup.' },
  { icon: ClipboardCheck, title: 'Management', desc: 'Ongoing technical support.' },
  { icon: Truck, title: 'Harvest', desc: 'Quality-focused techniques.' },
  { icon: TrendingUp, title: 'Market', desc: 'Connecting to premium buyers.' },
]

const coreCrops = [
  { name: 'Avocado', image: CLIENT_ASSETS.avocadoCluster, desc: 'High-demand premium fruit with strong commercial potential.' },
  { name: 'Dragon Fruit', image: CLIENT_ASSETS.dragonFruitSingle, desc: 'Highly profitable crop with low maintenance and high yields.', objectPosition: '50% 32%' },
  { name: 'Mango', image: CLIENT_ASSETS.mangoCluster, desc: 'Specialized exotic mango varieties for domestic and export markets.' },
  { name: 'Guava', image: CLIENT_ASSETS.guavaNew, desc: 'Premium Thai varieties known for size, taste, and market value.', objectPosition: '50% 34%' },
]

const whyDRP = [
  { icon: ShieldCheck, title: 'End-to-End Guidance', desc: 'Support at every stage, from land assessment to final market linkage.' },
  { icon: Star, title: 'Expert Crop Planning', desc: 'Scientific approach to selecting and planning the most profitable crops.' },
  { icon: Sprout, title: 'Quality Material', desc: 'Providing high-yield, disease-resistant planting material.' },
  { icon: TrendingUp, title: 'Market Linkage', desc: 'Deep network of premium buyers ensuring consistent demand.' },
  { icon: Briefcase, title: 'Proven Experience', desc: 'Years of hands-on expertise in building successful commercial orchards.' },
  { icon: Users, title: 'Long-Term Partnership', desc: 'We grow with you, providing ongoing guidance as your farm matures.' },
]



export default function HomePage() {
  const [activeCropIndex, setActiveCropIndex] = useState<number | null>(null)

  return (
    <>
      <PageMeta
        title="DRP Exotic Farms | Cultivating Nourishment"
        description="We guide what we grow — we’re growers beside you. We help farmers, investors, and landowners build profitable exotic fruit orchards."
        path="/"
      />

      {/* SECTION 1 - HERO - Unified treatment with subtle bg */}
      <section className="relative min-h-[85svh] flex items-center justify-center overflow-hidden bg-primary pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={CLIENT_ASSETS.orchardOverview}
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/90" />
        </div>

        <div className="section-shell relative z-10 text-center">
          <motion.div {...fadeIn}>
            <span className="section-label bg-accent/20 border-accent/30 text-accent mb-4">
              From Growers, For Growers
            </span>
            <h1 className="text-neutral text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] tracking-tight mb-6">
              Let's Build Your <br />
              <span className="text-accent font-display">Profitable Orchard</span>
            </h1>
            <p className="text-accent text-lg sm:text-2xl font-display mb-8 italic opacity-90 max-w-3xl mx-auto leading-tight">
              "We're growers first, dedicated to helping you build, grow, and sell to the market."
            </p>
            <p className="text-neutral/70 text-sm sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              We help farmers and landowners every step of the way—from planting the right exotic fruits to managing the orchard and connecting your harvest with premium buyers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary w-full sm:w-auto">
                <Link to="/produce">Start Your Orchard</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary w-full sm:w-auto">
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BLOG TICKER */}
      <HomeNewsTicker />

      {/* SECTION 2 - ABOUT US */}
      <section className="bg-neutral">
        <div className="section-shell">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <div className="rounded-3xl shadow-xl overflow-hidden group sm:max-w-md mx-auto">
                <img
                  src={CLIENT_ASSETS.foundersJoint}
                  alt="DRP Founders"
                  className="w-full aspect-square object-cover scale-110 translate-x-1 origin-center transition-transform duration-500 group-hover:scale-125"
                />
              </div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Pioneering Exotic Fruit Farming in India</h2>
              <p className="section-description">
                DRP Exotic Farms is a specialized farming partnership dedicated to transforming land into high-yield commercial orchards. We guide farmers, investors, and landowners through every step of the exotic fruit farming journey.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Expertise in High-Value Crops (Dragon Fruit, Avocado, Guava)',
                  'End-to-End Orchard Development & Management',
                  'Scientific Approach to Soil & Crop Nutrition',
                  'Strong Market Linkage & Distribution Network'
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3 text-primary text-sm font-medium">
                    <CheckCircle2 className="size-4 text-accent" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 - SPECIALIZED CROPS */}
      <section className="bg-secondary/30">
        <div className="section-shell">
          <div className="text-center mb-12">
            <span className="section-label">Core Specialization</span>
            <h2 className="section-title">Focused on High-Value Crops</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {coreCrops.map((crop, idx) => (
              <motion.div
                key={crop.name}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl active:scale-[0.98] transition-all"
              >
                <button
                  type="button"
                  aria-pressed={activeCropIndex === idx}
                  aria-label={`Preview ${crop.name}`}
                  className="block h-full w-full cursor-pointer text-left"
                  onClick={() => setActiveCropIndex((current) => (current === idx ? null : idx))}
                >
                  <img 
                    src={crop.image} 
                    alt={crop.name} 
                    className={`w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 group-active:scale-105 ${
                      activeCropIndex === idx ? 'scale-105' : ''
                    }`}
                    style={{ objectPosition: crop.objectPosition ?? '50% 50%' }}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <h3 className="text-lg sm:text-xl font-display text-neutral mb-1">{crop.name}</h3>
                    <p className={`text-[0.6rem] text-neutral/70 line-clamp-2 opacity-0 transition-opacity group-hover:opacity-100 ${
                      activeCropIndex === idx ? 'opacity-100' : ''
                    }`}>
                      {crop.desc}
                    </p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="btn-primary">
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 4 - PREMIUM ORCHARD ARC GALLERY */}
      <OrchardArcGallery />

      {/* SECTION 5 - OUR PROCESS - Enhanced Mobile Experience */}
      <section className="bg-neutral relative overflow-hidden">
        <div className="section-shell">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">The Journey</span>
            <h2 className="section-title">Plantation to Market</h2>
          </div>

          {/* Desktop: Horizontal with line; Mobile: Vertical cards */}
          <div className="hidden lg:block relative max-w-5xl mx-auto">
            {/* Connecting Line for Desktop */}
            <div className="absolute top-10 left-0 right-0 h-0.5 bg-primary/5 z-0">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-harvest-gold origin-left"
              />
            </div>
            <div className="grid grid-cols-6 gap-8 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={step.title}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="size-16 bg-primary rounded-full flex items-center justify-center text-accent mb-4 shadow-lg border-2 border-white relative">
                    <step.icon className="size-8" />
                    <div className="absolute -top-2 -right-2 size-6 bg-harvest-gold rounded-full flex items-center justify-center text-primary text-[0.6rem] font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-xs text-primary/50">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Timeline */}
          <div className="lg:hidden relative px-4">
            <div className="absolute left-11 top-0 bottom-0 w-1 bg-gradient-to-b from-harvest-gold via-harvest-gold to-harvest-gold/20"></div>
            <div className="space-y-8">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={step.title}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-24 pt-2"
                >
                  <div className="absolute left-8 top-4 size-16 bg-primary rounded-full flex items-center justify-center text-accent shadow-lg border-4 border-neutral -translate-x-1/2 z-10">
                    <step.icon className="size-7" />
                    <div className="absolute -top-2 -right-2 size-7 bg-harvest-gold rounded-full flex items-center justify-center text-primary text-[0.7rem] font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm border border-primary/5 hover:shadow-lg transition-all mt-6">
                    <h3 className="text-sm font-bold text-primary mb-2">{step.title}</h3>
                    <p className="text-xs text-primary/60 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - WHY DRP */}
      <section className="bg-secondary/20">
        <div className="section-shell">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">Why Choose Us</span>
            <h2 className="section-title">The DRP Advantage</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {whyDRP.map((item, idx) => (
              <motion.div
                key={item.title}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="premium-card !bg-white border-none shadow-sm hover:shadow-lg active:scale-[0.98] transition-all h-full min-h-[10.25rem] sm:min-h-0 !p-3 sm:!p-6"
              >
                <div className="size-9 sm:size-10 bg-primary rounded-lg flex items-center justify-center text-accent mb-3 sm:mb-6">
                  <item.icon className="size-4 sm:size-6" />
                </div>
                <h3 className="text-sm sm:text-lg font-bold text-primary mb-1.5 sm:mb-3 leading-tight">{item.title}</h3>
                <p className="text-[0.62rem] sm:text-xs text-primary/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 - VISION & MISSION - Split Story Layout (Option 1) */}
      <section className="bg-neutral overflow-hidden">
        <div className="section-shell py-0">
          {/* Vision */}
          <div className="grid lg:grid-cols-2 min-h-[400px] bg-primary text-neutral rounded-[2.5rem] overflow-hidden mb-8">
            <div className="relative overflow-hidden">
              <img src={CLIENT_ASSETS.orchardSunrise} alt="Vision" className="absolute inset-0 w-full h-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 flex items-center justify-center lg:justify-start lg:pl-16">
                <Eye className="size-20 sm:size-32 text-accent/20" />
              </div>
            </div>
            <div className="p-8 sm:p-16 flex flex-col justify-center bg-primary relative z-10">
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4">The Future</span>
              <h3 className="text-3xl sm:text-5xl font-display mb-6">Our Vision</h3>
              <p className="text-lg text-neutral/70 leading-relaxed max-w-md">
                To be the leading catalyst in India's agricultural transformation, creating sustainable, high-yield exotic fruit ecosystems that empower farming communities.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="grid lg:grid-cols-2 min-h-[400px] bg-secondary text-primary rounded-[2.5rem] overflow-hidden">
             <div className="p-8 sm:p-16 flex flex-col justify-center order-2 lg:order-1">
              <span className="text-accent font-bold uppercase tracking-[0.2em] text-xs mb-4">The Work</span>
              <h3 className="text-3xl sm:text-5xl font-display mb-6">Our Mission</h3>
              <p className="text-lg text-primary/70 leading-relaxed max-w-md">
                To provide end-to-end grower guidance, premium planting material, and market linkage support, ensuring every orchard project becomes a thriving commercial success.
              </p>
            </div>
            <div className="relative overflow-hidden order-1 lg:order-2">
              <img src={CLIENT_ASSETS.protectedCultivation} alt="Mission" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-l from-secondary via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-16">
                <Target className="size-20 sm:size-32 text-primary/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - PARTNERS STRIP */}
      <section className="bg-neutral border-y border-primary/5">
        <div className="section-shell py-8 sm:py-10">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-16 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
             {[
                { label: 'Associated Growers', icon: Users },
                { label: 'Industry Network', icon: Globe },
                { label: 'Market Linkage', icon: TrendingUp },
                { label: 'Ecosystem Partners', icon: CheckCircle2 },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 sm:gap-3">
                  <p.icon className="size-4 sm:size-5 text-primary" />
                  <span className="text-[0.6rem] sm:text-[0.7rem] font-bold uppercase tracking-widest text-primary">{p.label}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 - CTA */}
      <section className="bg-primary text-neutral text-center">
        <div className="section-shell py-12 sm:py-16">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display mb-4">Ready to Build Your Orchard?</h2>
            <p className="text-xs sm:text-sm text-neutral/60 mb-8 max-w-md mx-auto">
              Join the community of successful exotic fruit farmers. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/about">About Us</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
