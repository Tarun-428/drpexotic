import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PremiumSplash } from './PremiumSplash'
import { preloadCriticalAssets, warmPublicRoutes } from '@/routes/routePreloaders'

type SplashScreenHostProps = {
  children: ReactNode
}

export function SplashScreenHost({ children }: SplashScreenHostProps) {
  const [splashComplete, setSplashComplete] = useState(false)
  const [handoffStarted, setHandoffStarted] = useState(false)

  useEffect(() => {
    void warmPublicRoutes()
    void preloadCriticalAssets()

    if (typeof document !== 'undefined' && 'fonts' in document) {
      void document.fonts.ready.catch(() => undefined)
    }
  }, [])

  const beginHandoff = useCallback(() => {
    setHandoffStarted(true)
  }, [])

  const dismissSplash = useCallback(() => {
    setSplashComplete(true)
  }, [])

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-neutral">
      <motion.div
        aria-hidden={!handoffStarted}
        inert={!splashComplete}
        animate={
          handoffStarted
            ? { opacity: 1 }
            : { opacity: 0 }
        }
        initial={false}
        style={{ pointerEvents: splashComplete ? 'auto' : 'none', willChange: 'opacity' }}
        transition={{ duration: handoffStarted ? 0.48 : 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {!splashComplete ? <PremiumSplash onHandoffStart={beginHandoff} setIntroComplete={dismissSplash} /> : null}
    </div>
  )
}
