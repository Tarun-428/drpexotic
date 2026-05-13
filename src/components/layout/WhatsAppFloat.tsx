import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'

export function WhatsAppFloat() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const href = buildWhatsAppUrl(
    whatsapp,
    'Hello Drpexoticfarms — I would like to discuss produce or orchard services.',
  )

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.35 }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-xl shadow-emerald-900/25 ring-2 ring-white/30 sm:bottom-8 sm:right-8"
    >
      <MessageCircle className="size-7" />
    </motion.a>
  )
}
