import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { WelcomeSplash } from './WelcomeSplash'

const MIN_SPLASH_DURATION_MS = 3200
const FINAL_LOGO_HOLD_MS = 1000

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = src
  })
}

async function preloadWebsiteExperience() {
  await Promise.allSettled([preloadImage('/branding/drp-exotic-logo.png')])
}

type SplashScreenHostProps = {
  children: ReactNode
}

export function SplashScreenHost({ children }: SplashScreenHostProps) {
  const finalLogoHoldTimerRef = useRef<number | null>(null)
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false)
  const [finalLogoHeld, setFinalLogoHeld] = useState(false)
  const [splashComplete, setSplashComplete] = useState(false)

  const dismissSplash = useCallback(() => {
    setSplashComplete(true)
  }, [])

  const handleAnimationReady = useCallback(() => {
    if (finalLogoHoldTimerRef.current) {
      window.clearTimeout(finalLogoHoldTimerRef.current)
    }

    finalLogoHoldTimerRef.current = window.setTimeout(() => {
      setFinalLogoHeld(true)
    }, FINAL_LOGO_HOLD_MS)
  }, [])

  useEffect(() => {
    let isCancelled = false
    let minimumTimer: number
    const minDuration = new Promise((resolve) => {
      minimumTimer = window.setTimeout(resolve, MIN_SPLASH_DURATION_MS)
    })

    void Promise.all([preloadWebsiteExperience(), minDuration]).then(() => {
      if (!isCancelled) {
        setMinimumTimeElapsed(true)
      }
    })

    return () => {
      isCancelled = true
      window.clearTimeout(minimumTimer)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (finalLogoHoldTimerRef.current) {
        window.clearTimeout(finalLogoHoldTimerRef.current)
      }
    }
  }, [])

  const readyToExit = minimumTimeElapsed && finalLogoHeld

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-cream-200">
      <motion.div
        aria-hidden={!splashComplete}
        inert={!splashComplete}
        animate={
          splashComplete
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 0.985, filter: 'blur(10px)' }
        }
        initial={false}
        style={{ pointerEvents: splashComplete ? 'auto' : 'none' }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>

      {!splashComplete ? (
        <WelcomeSplash
          readyToExit={readyToExit}
          onAnimationReady={handleAnimationReady}
          onComplete={dismissSplash}
        />
      ) : null}
    </div>
  )
}
