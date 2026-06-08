import { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { VisitPrompt } from '@/components/layout/VisitPrompt'
import { scrollPageToHash, scrollPageToTop, useLenis } from '@/hooks/useLenis'
import { api } from '@/lib/api'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { useEffect } from 'react'

export function PublicLayout() {
  const location = useLocation()
  const applyWebsiteSettings = useSiteConfigStore((state) => state.applyWebsiteSettings)
  useLenis(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.history.scrollRestoration = 'manual'

    if (location.hash) {
      const frameId = window.requestAnimationFrame(() => scrollPageToHash(location.hash))
      return () => window.cancelAnimationFrame(frameId)
    }

    scrollPageToTop()
    const frameId = window.requestAnimationFrame(scrollPageToTop)
    const timeoutId = window.setTimeout(scrollPageToTop, 60)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.clearTimeout(timeoutId)
    }
  }, [location.pathname, location.hash])

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
    <div className="min-h-screen bg-neutral">
      <Navbar />
      <main className="relative">
        <Suspense
          fallback={
            <div className="flex min-h-[40vh] items-center justify-center bg-transparent px-4">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            </div>
          }
        >
          <Outlet key={location.pathname} />
        </Suspense>
      </main>
      <Footer />
      <VisitPrompt />
      <CookieConsent />
    </div>
  )
}
