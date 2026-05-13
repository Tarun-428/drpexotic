import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCookieConsentStore } from '@/store/cookieConsentStore'

export function CookieConsent() {
  const consent = useCookieConsentStore((s) => s.consent)
  const setConsent = useCookieConsentStore((s) => s.setConsent)

  if (consent !== 'unknown') return null

  return (
    <motion.div
      role="dialog"
      aria-label="Cookie preferences"
      initial={{ y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-cream-300 bg-cream-50/95 p-4 shadow-2xl shadow-black/10 backdrop-blur sm:left-6 sm:right-6 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 items-center justify-center rounded-xl bg-forest-900 text-gold-400">
          <Cookie className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-forest-900">Cookies &amp; privacy</p>
          <p className="mt-1 text-sm leading-relaxed text-forest-900/75">
            We use functional cookies required for forms and maps, and optional analytics if enabled by your team.
            Declining optional cookies keeps the experience minimal. See the{' '}
            <Link className="font-semibold text-gold-600 underline-offset-4 hover:underline" to="/privacy">
              privacy policy
            </Link>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button type="button" onClick={() => setConsent('accepted')}>
              Accept
            </Button>
            <Button type="button" variant="secondary" onClick={() => setConsent('declined')}>
              Decline optional
            </Button>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full p-2 text-forest-900/50 transition hover:bg-cream-300/60 hover:text-forest-900"
          aria-label="Dismiss"
          onClick={() => setConsent('declined')}
        >
          <X className="size-4" />
        </button>
      </div>
    </motion.div>
  )
}
