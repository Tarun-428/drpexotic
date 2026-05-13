import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { ArrowRight, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'

gsap.registerPlugin(useGSAP)

export function HomeHero() {
  const root = useRef<HTMLDivElement>(null)
  const hero = useSiteConfigStore((s) => s.config.heroHome)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello Drpexoticfarms — I would like to discuss produce or orchard services.',
  )

  useGSAP(
    () => {
      gsap.fromTo(
        root.current?.querySelectorAll('.hero-line') ?? [],
        { y: 34, opacity: 0, rotateX: -10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.85, stagger: 0.08, ease: 'power3.out' },
      )
      gsap.fromTo(
        root.current?.querySelectorAll('.hero-fade') ?? [],
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.75, delay: 0.15, stagger: 0.06, ease: 'power2.out' },
      )
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-gold-500/15 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[520px] w-[520px] rounded-full bg-moss-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(197,160,89,0.18),transparent_45%),radial-gradient(circle_at_80%_30%,rgba(61,92,63,0.16),transparent_40%)]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-7">
          <p className="hero-line inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-cream-50/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">
            <Leaf className="size-4 text-gold-600" aria-hidden />
            {hero.kicker}
          </p>
          <h1 className="hero-line mt-5 max-w-2xl font-display text-4xl leading-[1.05] text-forest-900 sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>
          <p className="hero-line mt-5 max-w-xl text-pretty text-base leading-relaxed text-forest-900/75 sm:text-lg">
            {hero.subtitle}
          </p>

          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="rounded-full shadow-glow">
              <Link to="/produce" className="inline-flex items-center gap-2">
                {hero.primaryCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg" className="rounded-full">
              <a href={wa} target="_blank" rel="noreferrer">
                {hero.secondaryCta}
              </a>
            </Button>
          </div>

          <dl className="hero-fade mt-10 grid max-w-xl grid-cols-3 gap-4 text-sm">
            <div className="rounded-2xl border border-cream-300/80 bg-cream-50/60 p-4 backdrop-blur">
              <dt className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">Estate</dt>
              <dd className="mt-1 font-display text-2xl text-forest-900">50 acres</dd>
            </div>
            <div className="rounded-2xl border border-cream-300/80 bg-cream-50/60 p-4 backdrop-blur">
              <dt className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">Growers</dt>
              <dd className="mt-1 font-display text-2xl text-forest-900">60+</dd>
            </div>
            <div className="rounded-2xl border border-cream-300/80 bg-cream-50/60 p-4 backdrop-blur">
              <dt className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">Supported acres</dt>
              <dd className="mt-1 font-display text-2xl text-forest-900">105+</dd>
            </div>
          </dl>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2.25rem] bg-gradient-to-br from-gold-500/25 via-cream-200 to-moss-500/15 blur-2xl"
            animate={{ rotate: [0, 2, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <Tilt
            glareEnable
            glareMaxOpacity={0.22}
            glareColor="#ffffff"
            glarePosition="all"
            tiltMaxAngleX={8}
            tiltMaxAngleY={8}
            className="rounded-[2rem] border border-cream-300/80 bg-cream-50/60 p-3 shadow-2xl shadow-black/10 backdrop-blur"
          >
            <div className="overflow-hidden rounded-[1.6rem] ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80"
                width={900}
                height={1100}
                alt="Rolling orchard rows at sunrise"
                loading="eager"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 px-2 pb-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">Field rhythm</p>
                <p className="text-sm font-semibold text-forest-900">Clean fruit · long orchards</p>
              </div>
              <span className="rounded-full bg-forest-900 px-3 py-1 text-xs font-semibold text-gold-400">
                Residue-aware
              </span>
            </div>
          </Tilt>
        </div>
      </div>
    </section>
  )
}
