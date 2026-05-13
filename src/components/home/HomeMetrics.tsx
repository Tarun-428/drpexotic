import * as CountUpModule from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { animated, useSpring } from '@react-spring/web'
import { motion } from 'framer-motion'

const CountUp = (CountUpModule as any)?.default?.default ?? (CountUpModule as any)?.default ?? CountUpModule

function MetricCard({
  label,
  value,
  suffix = '',
  decimals = 0,
}: {
  label: string
  value: number
  suffix?: string
  decimals?: number
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })
  const spring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 18,
    config: { tension: 220, friction: 24 },
  })

  return (
    <div ref={ref}>
      <animated.div
        style={spring}
        className="relative overflow-hidden rounded-3xl border border-cream-300/80 bg-cream-50/60 p-6 shadow-inner shadow-black/5"
      >
        <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-gold-500/10 blur-2xl" />
        <p className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">{label}</p>
        <p className="mt-2 font-display text-4xl text-forest-900 sm:text-5xl">
          {inView ? <CountUp end={value} duration={2.1} decimals={decimals} preserveValue suffix={suffix} /> : '0'}
        </p>
      </animated.div>
    </div>
  )
}

export function HomeMetrics() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-3xl text-forest-900 sm:text-4xl"
          >
            Proof you can feel in the field
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-pretty text-forest-900/75"
          >
            Scale, grower trust, and a residue-aware posture—communicated clearly for retail partners, hospitality
            buyers, and orchard investors.
          </motion.p>
        </div>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <MetricCard label="Company orchards" value={50} suffix=" ac" />
        <MetricCard label="Growers partnered" value={60} suffix="+" />
        <MetricCard label="Acres guided" value={105} suffix="+" />
      </div>
    </section>
  )
}
