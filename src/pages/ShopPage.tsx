import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'

export default function ShopPage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello — I would like updates when packaged goods go live.')

  return (
    <>
      <PageMeta
        title="Shop (coming soon)"
        description="Packaged Drpexoticfarms™ products are planned for online sales. Join the list or reach out for availability conversations today."
        path="/shop"
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cream-300/80 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 p-10 text-cream-200 shadow-2xl sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 size-96 rounded-full bg-moss-500/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-2xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">Phase 2</p>
            <h1 className="mt-3 font-display text-4xl text-cream-50 sm:text-5xl">Online store — in cultivation</h1>
            <p className="mt-4 text-pretty text-base leading-relaxed text-cream-200/85">
              Per programme scope, packaged goods are <strong>planned but not yet sold online</strong>. This page exists
              so URLs, SEO, and merchandising stories can mature without breaking future catalogue launches.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="bg-gold-500 text-forest-900 hover:brightness-105">
                <a href={wa} target="_blank" rel="noreferrer">
                  WhatsApp for availability
                </a>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/contact">Talk to the team</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
