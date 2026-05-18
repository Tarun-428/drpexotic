import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { useLenis } from '@/hooks/useLenis'
import { LOCAL_ASSETS } from '@/constants/assets'
import { api } from '@/lib/api'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { useEffect } from 'react'

export function PublicLayout() {
  const location = useLocation()
  const applyWebsiteSettings = useSiteConfigStore((state) => state.applyWebsiteSettings)
  useLenis(true)

  useEffect(() => {
    let active = true
    void api
      .getPublicSettings()
      .then((settings) => {
        if (active) applyWebsiteSettings(settings)
      })
      .catch(() => undefined)
    return () => {
      active = false
    }
  }, [applyWebsiteSettings])

  return (
    <div className="page-shell min-h-dvh bg-cream-100">
      <div className="site-field-fill" aria-hidden="true">
        <img
          src={LOCAL_ASSETS.dragonFruitRows}
          alt=""
          className="site-field-fill__image site-field-fill__image--left"
          loading="lazy"
          decoding="async"
        />
        <img
          src={LOCAL_ASSETS.guava}
          alt=""
          className="site-field-fill__image site-field-fill__image--right"
          loading="lazy"
          decoding="async"
        />
        <img
          src={LOCAL_ASSETS.avocado}
          alt=""
          className="site-field-fill__image site-field-fill__image--bottom"
          loading="lazy"
          decoding="async"
        />
      </div>
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative z-[1]"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <CookieConsent />
    </div>
  )
}
