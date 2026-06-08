import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MessageCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'

const promptStorageKey = 'drp-visit-prompt-dismissed'

export function VisitPrompt() {
  const [isVisible, setIsVisible] = useState(false)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello DRP Exotic Farms, I would like to plan a farm visit or discuss a consultation.',
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.sessionStorage.getItem(promptStorageKey) === 'true') return

    const timeoutId = window.setTimeout(() => setIsVisible(true), 1800)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const dismiss = () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(promptStorageKey, 'true')
    }
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.aside
          role="dialog"
          aria-label="Plan a farm visit"
          initial={{ opacity: 0, x: 42, y: 18, scale: 0.88, rotate: 0.8 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, x: 28, y: 12, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.8 }}
          className="fixed bottom-20 right-3 z-40 w-[min(18.5rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-accent/45 bg-neutral/88 p-3 text-primary shadow-[0_24px_70px_-38px_rgba(23,72,54,0.72)] backdrop-blur-xl sm:bottom-28 sm:right-6 sm:w-[21rem] sm:p-4"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.22, duration: 0.55, ease: 'easeOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-accent/18 blur-2xl"
            animate={{ opacity: [0.28, 0.55, 0.28], scale: [0.9, 1.08, 0.9] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <button
            type="button"
            aria-label="Close visit prompt"
            onClick={dismiss}
            className="absolute right-2.5 top-2.5 rounded-full p-1.5 text-primary/45 transition hover:bg-secondary hover:text-primary active:scale-[0.96] sm:right-3 sm:top-3"
          >
            <X className="size-4" />
          </button>

          <div className="relative flex gap-2.5 pr-7 sm:gap-3 sm:pr-8">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-accent shadow-[0_14px_34px_-20px_rgba(23,72,54,0.85)] sm:size-11 sm:rounded-2xl">
              <CalendarDays className="size-4 sm:size-5" />
            </span>
            <div>
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-accent sm:text-[0.68rem]">
                Plan a visit
              </p>
              <h2 className="mt-0.5 font-display text-lg leading-tight text-primary sm:mt-1 sm:text-xl">
                Want to see the orchard in person?
              </h2>
            </div>
          </div>

          <p className="relative mt-2 text-xs leading-relaxed text-primary/70 sm:mt-3 sm:text-sm">
            Book a quick visit or talk to our team about consultancy, produce, and orchard planning.
          </p>

          <div className="relative mt-3 flex gap-2 sm:mt-4">
            <Button asChild size="sm" className="h-9 flex-1 px-3">
              <a href={wa} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild variant="secondary" size="sm" className="h-9 flex-1 px-3">
              <Link to="/contact" onClick={dismiss}>
                Contact
              </Link>
            </Button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  )
}
