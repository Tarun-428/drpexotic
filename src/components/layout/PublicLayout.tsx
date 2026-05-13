import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { useLenis } from '@/hooks/useLenis'

export function PublicLayout() {
  const location = useLocation()
  useLenis(true)

  return (
    <div className="min-h-dvh bg-cream-200">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CookieConsent />
      <WhatsAppFloat />
    </div>
  )
}
