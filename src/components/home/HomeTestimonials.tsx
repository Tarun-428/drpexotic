import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

const slides = [
  {
    quote:
      'Their turnkey thinking doesn’t stop at planting—it carries through nutrition cycles, labour planning, and realistic market windows.',
    name: 'Orchard programme lead',
    role: 'Multi-site grower group · Western India',
  },
  {
    quote:
      'Buyers notice the cleanliness of the fruit and the consistency of sizing. The story on the website finally matches what we see on the grading line.',
    name: 'Procurement partner',
    role: 'Premium retail channel',
  },
  {
    quote:
      'We wanted residue-aware protocols without sacrificing yield discipline. The team translated that into an orchard layout we could actually run.',
    name: 'Estate owner',
    role: 'Exotic fruit diversification project',
  },
] as const

export function HomeTestimonials() {
  return (
    <section className="border-y border-cream-300/70 bg-cream-100/60 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Testimonials</p>
            <h2 className="mt-2 font-display text-3xl text-forest-900 sm:text-4xl">Trusted where stakes are high</h2>
            <p className="mt-3 text-forest-900/75">
              Voices shaped for anonymity—real programme patterns from retail, estates, and grower collectives.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-full border border-gold-500/40 bg-cream-50 px-5 py-2 text-sm font-semibold text-forest-900 transition hover:border-gold-500 hover:bg-cream-50/90"
          >
            Request references
          </Link>
        </motion.div>

        <div className="mt-10">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              900: { slidesPerView: 2 },
            }}
            autoplay={{ delay: 5200, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            className="!pb-10"
          >
            {slides.map((s) => (
              <SwiperSlide key={s.name}>
                <motion.figure
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-3xl border border-cream-300/80 bg-cream-50/70 p-7 shadow-sm"
                >
                  <blockquote className="text-pretty text-lg leading-relaxed text-forest-900/85">“{s.quote}”</blockquote>
                  <figcaption className="mt-6 text-sm">
                    <p className="font-semibold text-forest-900">{s.name}</p>
                    <p className="text-forest-900/60">{s.role}</p>
                  </figcaption>
                </motion.figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
