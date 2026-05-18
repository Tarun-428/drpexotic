import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircleMore, Phone, Sparkles } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { MapEmbed } from '@/components/maps/MapEmbed'
import { ContactForm } from '@/components/forms/ContactForm'
import { Button } from '@/components/ui/button'
import { LOCAL_ASSETS } from '@/constants/assets'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'

export default function ContactPage() {
  const contact = useSiteConfigStore((s) => s.config.contact)
  const wa = buildWhatsAppUrl(contact.whatsappE164, 'Hello Drpexoticfarms — I would like to get in touch.')

  return (
    <>
      <PageMeta
        title="Contact & location"
        description="Reach DRP Exotic Farms for produce sourcing, orchard programmes, and partnerships through a premium contact experience."
        path="/contact"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#0f2f24] text-cream-50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(8,24,18,0.22), rgba(8,24,18,0.84)), url(${LOCAL_ASSETS.orchardTeam})`,
            }}
          />
          <div className="section-shell relative z-10 py-18 sm:py-24 lg:py-28">
            <div className="max-w-4xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <MessageCircleMore className="size-4 text-gold-400" />
                Contact
              </span>
              <h1 className="editorial-title mt-6 max-w-5xl text-cream-50">
                We are here to help you.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-50/74 sm:text-lg lg:mt-6 lg:text-xl">
                Let's discuss how we can work together.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-14 sm:py-18 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <ContactForm />
            </motion.div>

            <div className="responsive-stack-grid gap-5 lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="cinematic-surface rounded-[2rem] p-6"
              >
                <span className="section-label">
                  <Sparkles className="size-4 text-gold-600" />
                  Direct lines
                </span>
                <div className="mt-6 grid gap-4">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-forest-900 text-gold-400">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-forest-900/48">Email</p>
                      <a className="mt-2 block break-words text-base font-semibold text-forest-900 hover:underline" href={`mailto:${contact.email}`}>
                        {contact.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-forest-900 text-gold-400">
                      <Phone className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-forest-900/48">Phone</p>
                      <a className="mt-2 block text-base font-semibold text-forest-900 hover:underline" href={`tel:${contact.phoneTel}`}>
                        {contact.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="inline-flex size-11 items-center justify-center rounded-full bg-forest-900 text-gold-400">
                      <MapPin className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-forest-900/48">Address</p>
                      <ul className="mt-2 space-y-1 text-sm leading-relaxed text-forest-900/70">
                        {contact.addressLines.map((line, index) => (
                          <li key={`${line}-${index}`}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <a href={wa} target="_blank" rel="noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="secondary">
                    <a href={`mailto:${contact.email}`}>Email us</a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5"
              >
                <MapEmbed title="DRP Exotic Farms location map" />
                <div className="cinematic-surface rounded-[1.8rem] p-5">
                  <p className="font-display text-3xl leading-none text-forest-900">Visit feeling</p>
                  <p className="mt-3 text-sm leading-relaxed text-forest-900/70">
                    Visits should feel immersive and intentional. Share context before arriving so the farm can tailor
                    the conversation to your sourcing, orchard, or partnership interest.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
