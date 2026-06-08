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
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { LOCAL_ASSETS } from '@/constants/assets'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { HomeNewsTicker } from '@/components/blog/HomeNewsTicker'

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
  { name: 'Avocado', image: LOCAL_ASSETS.avocado, desc: 'High-demand premium fruit with strong commercial potential.' },
  { name: 'Dragon Fruit', image: LOCAL_ASSETS.dragonFruitCut, desc: 'Highly profitable crop with low maintenance and high yields.' },
  { name: 'Mango', image: LOCAL_ASSETS.orchardTeam, desc: 'Specialized exotic mango varieties for domestic and export markets.' },
  { name: 'Guava', image: LOCAL_ASSETS.guava, desc: 'Premium Thai varieties known for size, taste, and market value.' },
]

const whyDRP = [
  { icon: ShieldCheck, title: 'End-to-End Guidance', desc: 'Support at every stage, from land assessment to final market linkage.' },
  { icon: Star, title: 'Expert Crop Planning', desc: 'Scientific approach to selecting and planning the most profitable crops.' },
  { icon: Sprout, title: 'Quality Material', desc: 'Providing high-yield, disease-resistant planting material.' },
  { icon: TrendingUp, title: 'Market Linkage', desc: 'Deep network of premium buyers ensuring consistent demand.' },
  { icon: Briefcase, title: 'Proven Experience', desc: 'Years of hands-on expertise in building successful commercial orchards.' },
  { icon: Users, title: 'Long-Term Partnership', desc: 'We grow with you, providing ongoing guidance as your farm matures.' },
]

const stats = [
  { value: 105, suffix: '+', label: 'Acres Managed' },
  { value: 60, suffix: '+', label: 'Farmers Guided' },
  { value: 50, suffix: '+', label: 'Orchards Developed' },
  { value: 5, suffix: '+', label: 'States Served' },
]

const galleryImages = [
  LOCAL_ASSETS.orchardTeam,
  LOCAL_ASSETS.dragonFruitRows,
  LOCAL_ASSETS.avocado,
  LOCAL_ASSETS.dragonFruitHalves,
  LOCAL_ASSETS.guava,
  LOCAL_ASSETS.orchardNight,
]

export default function HomePage() {
  const [activeCropIndex, setActiveCropIndex] = useState<number | null>(null)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello DRP Exotic Farms, I am interested in building an orchard.')

  return (
    <>
      <PageMeta
        title="DRP Exotic Farms | Profitable Exotic Fruit Orchard Consultancy"
        description="We help farmers, investors, and landowners build profitable exotic fruit orchards from plantation to market."
        path="/"
      />

      {/* SECTION 1 - HERO - Unified treatment with subtle bg */}
      <section className="relative min-h-[85svh] flex items-center justify-center overflow-hidden bg-primary pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={LOCAL_ASSETS.orchardNight}
            alt=""
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-transparent to-primary/90" />
        </div>

        <div className="section-shell relative z-10 text-center">
          <motion.div {...fadeIn}>
            <span className="section-label bg-accent/20 border-accent/30 text-accent mb-4">
              Agricultural Consultancy
            </span>
            <h1 className="text-neutral text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] tracking-tight mb-6">
              Build Your Profitable <br />
              <span className="text-accent font-display">Exotic Fruit Orchard</span>
            </h1>
            <p className="text-neutral/70 text-sm sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              DRP Exotic Farms helps farmers, investors, and landowners build profitable orchards from plantation to market through scientific guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary w-full sm:w-auto">
                <Link to="/services">Start Your Orchard</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary w-full sm:w-auto">
                <a href={wa} target="_blank" rel="noreferrer">Book Consultation</a>
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
              <img
                src={LOCAL_ASSETS.orchardTeam}
                alt="Who We Are"
                className="rounded-3xl shadow-xl w-full aspect-[4/3] object-cover sm:max-w-md mx-auto"
              />
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <span className="section-label">Who We Are</span>
              <h2 className="section-title">Pioneering Exotic Fruit Farming in India</h2>
              <p className="section-description">
                DRP Exotic Farms is a specialized consultancy firm dedicated to transforming land into high-yield commercial orchards. We guide farmers, investors, and landowners through every step of the exotic fruit farming journey.
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
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105 ${
                      activeCropIndex === idx ? 'scale-105' : ''
                    }`} 
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
        </div>
      </section>

      {/* SECTION 4 - OUR PROCESS - Optimized for Mobile (2x3) */}
      <section className="bg-neutral relative overflow-hidden">
        <div className="section-shell">
          <div className="text-center mb-12 sm:mb-16">
            <span className="section-label">The Journey</span>
            <h2 className="section-title">Plantation to Market</h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Connecting Line for Desktop */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-0.5 bg-primary/5 z-0">
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-harvest-gold origin-left"
              />
            </div>

            {/* Grid: 2 columns on mobile, 6 on desktop */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 sm:gap-8 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={step.title}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="size-14 sm:size-16 bg-primary rounded-full flex items-center justify-center text-accent mb-4 shadow-lg border-2 border-white relative">
                    <step.icon className="size-6 sm:size-8" />
                    <div className="absolute -top-2 -right-2 size-6 bg-harvest-gold rounded-full flex items-center justify-center text-primary text-[0.6rem] font-bold">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-primary mb-1">{step.title}</h3>
                  <p className="text-[0.6rem] text-primary/50 max-w-[120px] hidden sm:block">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - WHY DRP */}
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

      {/* SECTION 6 - VISION & MISSION - Split Story Layout (Option 1) */}
      <section className="bg-neutral overflow-hidden">
        <div className="section-shell py-0">
          {/* Vision */}
          <div className="grid lg:grid-cols-2 min-h-[400px] bg-primary text-neutral rounded-[2.5rem] overflow-hidden mb-8">
            <div className="relative overflow-hidden">
              <img src={LOCAL_ASSETS.orchardNight} alt="Vision" className="absolute inset-0 w-full h-full object-cover opacity-40" />
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
                To provide end-to-end consultancy, premium planting material, and market linkage support, ensuring every orchard project becomes a thriving commercial success.
              </p>
            </div>
            <div className="relative overflow-hidden order-1 lg:order-2">
              <img src={LOCAL_ASSETS.dragonFruitRows} alt="Mission" className="absolute inset-0 w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-l from-secondary via-transparent to-transparent hidden lg:block" />
              <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-16">
                <Target className="size-20 sm:size-32 text-primary/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - ROTATING MARQUEE */}
      <section className="bg-neutral py-10 sm:py-16 overflow-hidden border-y border-primary/5">
        <div className="flex gap-3 sm:gap-4 animate-marquee whitespace-nowrap">
          {[...galleryImages, ...galleryImages].map((img, idx) => (
            <Link
              key={idx}
              to="/gallery"
              aria-label="Open full gallery"
              className="group w-[220px] sm:w-[350px] aspect-video shrink-0 rounded-2xl overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
            >
              <img src={img} alt="Orchard" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 group-active:scale-105" />
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 8 - STATS & TRUST BLOCK */}
      <section className="bg-secondary/10">
        <div className="section-shell">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 sm:gap-12 items-center">
            <motion.div {...fadeIn} className="relative rounded-3xl overflow-hidden group">
              <img 
                src={LOCAL_ASSETS.dragonFruitRows} 
                alt="Orchard Success" 
                className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-primary/40 flex items-center justify-center p-6 sm:p-8 text-center">
                <div className="max-w-sm">
                  <Star className="size-8 sm:size-10 text-harvest-gold mx-auto mb-4 fill-harvest-gold" />
                  <h3 className="text-xl sm:text-2xl font-display text-neutral mb-4">Results Driven Consultancy</h3>
                  <p className="text-neutral/80 text-xs sm:text-sm mb-6">Proven expertise in building sustainable and high-ROI orchards across India.</p>
                  <Button asChild variant="secondary" size="sm">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  {...fadeIn}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-primary/5 shadow-sm text-center"
                >
                  <div className="text-2xl sm:text-4xl font-bold text-harvest-orange mb-1">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[0.5rem] sm:text-[0.6rem] uppercase tracking-[0.2em] text-primary/40 font-bold">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9 - PARTNERS STRIP */}
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

      {/* SECTION 10 - CTA */}
      <section className="bg-primary text-neutral text-center">
        <div className="section-shell py-12 sm:py-16">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display mb-4">Ready to Build Your Orchard?</h2>
            <p className="text-xs sm:text-sm text-neutral/60 mb-8 max-w-md mx-auto">
              Join the community of successful exotic fruit farmers. Book your expert consultation today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary">
                <a href={wa} target="_blank" rel="noreferrer">Book Consultation</a>
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
