import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'
import { MapEmbed } from '@/components/maps/MapEmbed'
import { ContactForm } from '@/components/forms/ContactForm'
import { Button } from '@/components/ui/button'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'

export default function ContactPage() {
  const contact = useSiteConfigStore((s) => s.config.contact)
  const wa = buildWhatsAppUrl(contact.whatsappE164, 'Hello Drpexoticfarms — I would like to get in touch.')

  return (
    <>
      <PageMeta
        title="Contact & location"
        description="Reach Drpexoticfarms™ for produce enquiries, turnkey orchard programmes, and partnerships—via contact form, WhatsApp, phone, or email."
        path="/contact"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">Contact</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Let’s plan the next season deliberately</h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-forest-900/75">
            Use the form for structured enquiries, WhatsApp for quick field questions, or visit the map once your exact
            pin is configured in admin settings.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">Direct lines</p>
              <div className="mt-3 space-y-2 text-sm text-forest-900/80">
                <p>
                  <span className="font-semibold text-forest-900">Email:</span>{' '}
                  <a className="underline-offset-4 hover:underline" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-forest-900">Phone:</span>{' '}
                  <a className="underline-offset-4 hover:underline" href={`tel:${contact.phoneTel}`}>
                    {contact.phoneDisplay}
                  </a>
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild className="bg-emerald-600 text-white hover:bg-emerald-700">
                  <a href={wa} target="_blank" rel="noreferrer">
                    WhatsApp
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={`mailto:${contact.email}`}>Email us</a>
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-forest-900/55">Address</p>
              <ul className="mt-2 space-y-1 text-sm text-forest-900/75">
                {contact.addressLines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>

            <MapEmbed title="Drpexoticfarms location map" />
          </aside>
        </div>
      </div>
    </>
  )
}
