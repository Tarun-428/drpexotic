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
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-neutral/96 p-4 text-primary shadow-2xl shadow-primary/12 backdrop-blur-xl sm:left-6 sm:right-6 sm:p-5"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-9 items-center justify-center rounded-xl bg-primary text-accent">
          <Cookie className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-primary">Cookies &amp; privacy</p>
          <p className="mt-1 text-sm leading-relaxed text-primary/75">
            We use functional cookies required for forms and maps, and optional analytics if enabled by your team.
            Declining optional cookies keeps the experience minimal. See the{' '}
            <Link className="font-semibold text-primary underline underline-offset-4 hover:text-accent" to="/privacy">
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
          className="rounded-full p-2 text-primary/50 transition hover:bg-secondary hover:text-primary"
          aria-label="Dismiss"
          onClick={() => setConsent('declined')}
        >
          <X className="size-4" />
        </button>
      </div>
    </motion.div>
  )
}
