import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircleMore, Phone, Sparkles } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { MapEmbed } from '@/components/maps/MapEmbed'
import { ContactForm } from '@/components/forms/ContactForm'
import { Button } from '@/components/ui/button'
import { CLIENT_ASSETS } from '@/constants/assets'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

export default function ContactPage() {
  const contact = useSiteConfigStore((s) => s.config.contact)
  const wa = buildWhatsAppUrl(contact.whatsappE164, 'Hello DRP Exotic Farms, I would like to get in touch.')

  return (
    <>
      <PageMeta
        title="Contact Us | DRP Exotic Farms"
        description="Reach out to DRP Exotic Farms for orchard development support, premium produce sourcing, or partnership inquiries."
        path="/contact"
      />

      {/* HERO SECTION - Unified treatment */}
      <section className="bg-primary pt-32 pb-20 text-neutral relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={CLIENT_ASSETS.consultation} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral gap-2">
              <MessageCircleMore className="size-4 text-accent" />
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-6xl font-display leading-tight mt-6 mb-6">
              We are here to <span className="text-accent">help you.</span>
            </h1>
            <p className="text-lg text-neutral/80 leading-relaxed">
              Have questions about exotic fruit farming or sourcing? Our team is ready to discuss how we can work together.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          {/* Contact Form */}
          <motion.div {...fadeIn}>
            <ContactForm />
          </motion.div>

          {/* Contact Details */}
          <div className="space-y-8">
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="premium-card !bg-secondary/30 border-none">
              <span className="section-label bg-white/50 border-primary/5 mb-6">
                <Sparkles className="size-4 text-accent" />
                Direct Channels
              </span>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary rounded-full flex items-center justify-center text-accent shrink-0">
                    <Mail className="size-5" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-widest text-primary/40 mb-1">Email</p>
                    <a href={`mailto:${contact.email}`} className="text-base font-bold text-primary hover:text-accent transition-colors break-all">
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary rounded-full flex items-center justify-center text-accent shrink-0">
                    <Phone className="size-5" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-widest text-primary/40 mb-1">Phone</p>
                    <a href={`tel:${contact.phoneTel}`} className="text-base font-bold text-primary hover:text-accent transition-colors">
                      {contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 bg-primary rounded-full flex items-center justify-center text-accent shrink-0">
                    <MapPin className="size-5" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-widest text-primary/40 mb-1">Location</p>
                    <ul className="text-sm font-medium text-primary/70 leading-relaxed">
                      {contact.addressLines.map((line, idx) => (
                        <li key={idx}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild size="lg" className="btn-primary flex-1 sm:flex-none">
                  <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
                </Button>
                <Button asChild size="lg" variant="secondary" className="btn-secondary flex-1 sm:flex-none">
                  <a href={`mailto:${contact.email}`}>Send Email</a>
                </Button>
              </div>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-primary/5 aspect-video sm:aspect-auto sm:h-[300px]">
                <MapEmbed title="DRP Exotic Farms Location" />
              </div>
              <div className="premium-card !bg-primary text-neutral p-8">
                <h3 className="text-2xl font-display mb-4 text-accent">Farm Visits</h3>
                <p className="text-sm text-neutral/70 leading-relaxed">
                  Visits are by appointment only. Please contact us in advance so we can prepare to host you and tailor the conversation to your specific agricultural interests.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
