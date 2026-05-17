import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Logo from '../../../img/logo.svg'

type WelcomeSplashProps = {
  readyToExit: boolean
  onAnimationReady: () => void
  onComplete: () => void
}

const logoEase = [0.16, 1, 0.3, 1] as const

export function WelcomeSplash({ readyToExit, onAnimationReady, onComplete }: WelcomeSplashProps) {
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const readyTimer = window.setTimeout(onAnimationReady, prefersReducedMotion ? 120 : 1450)

    return () => window.clearTimeout(readyTimer)
  }, [onAnimationReady, prefersReducedMotion])

  return (
    <motion.div
      className="fixed inset-0 z-[120] grid place-items-center overflow-hidden bg-[#f7f4ec] px-6"
      initial={{ opacity: 1 }}
      animate={readyToExit ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0.18 : 0.55, ease: logoEase }}
      onAnimationComplete={() => {
        if (readyToExit) onComplete()
      }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute h-[min(48vw,22rem)] w-[min(48vw,22rem)] rounded-full bg-[radial-gradient(circle,rgba(200,169,107,0.22)_0%,rgba(247,244,236,0)_68%)] blur-2xl"
        initial={{ opacity: 0, scale: 0.86 }}
        animate={
          prefersReducedMotion
            ? { opacity: 0.34, scale: 1 }
            : { opacity: [0, 0.42, 0.3], scale: [0.86, 1.06, 1.02] }
        }
        transition={{ duration: 2.4, ease: logoEase }}
      />

      <motion.img
        src={Logo}
        alt="DRP Exotic Farms"
        className="relative z-10 h-auto w-[min(64vw,17rem)] max-w-[17rem] select-none sm:w-[min(42vw,20rem)] sm:max-w-[20rem] lg:w-[min(28vw,22rem)] lg:max-w-[22rem]"
        draggable={false}
        decoding="async"
        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9, y: 10 }}
        animate={
          prefersReducedMotion
            ? { opacity: 1, scale: 1, y: 0 }
            : {
                opacity: 1,
                scale: [0.9, 1.012, 1],
                y: [10, -2, 0],
              }
        }
        transition={{
          duration: 1.55,
          ease: logoEase,
        }}
        style={{
          filter: 'drop-shadow(0 22px 48px rgb(83 105 70 / 0.16))',
          transformOrigin: '50% 50%',
          willChange: 'transform, opacity',
        }}
      />
    </motion.div>
  )
}
