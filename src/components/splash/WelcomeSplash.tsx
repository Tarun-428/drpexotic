import { useEffect, useRef, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { DrpExoticLogoSvg } from '@/components/splash/DrpExoticLogoSvg'

gsap.registerPlugin(useGSAP)

const PARTICLES = [
  { left: '12%', top: '18%', size: 4, delay: 0.1, duration: 7.2 },
  { left: '19%', top: '62%', size: 3, delay: 0.6, duration: 8.4 },
  { left: '26%', top: '42%', size: 5, delay: 1.1, duration: 7.8 },
  { left: '35%', top: '24%', size: 2, delay: 0.2, duration: 6.9 },
  { left: '43%', top: '68%', size: 4, delay: 0.9, duration: 8.1 },
  { left: '51%', top: '16%', size: 3, delay: 1.4, duration: 7.5 },
  { left: '57%', top: '54%', size: 4, delay: 0.4, duration: 8.8 },
  { left: '64%', top: '34%', size: 2, delay: 1.2, duration: 7.1 },
  { left: '72%', top: '72%', size: 5, delay: 0.7, duration: 8.6 },
  { left: '79%', top: '20%', size: 3, delay: 1.6, duration: 6.8 },
  { left: '84%', top: '48%', size: 4, delay: 0.3, duration: 7.7 },
  { left: '89%', top: '64%', size: 2, delay: 1.3, duration: 8.3 },
]

type WelcomeSplashProps = {
  readyToExit: boolean
  onAnimationReady: () => void
  onComplete: () => void
}

export function WelcomeSplash({ readyToExit, onAnimationReady, onComplete }: WelcomeSplashProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoStageRef = useRef<HTMLDivElement>(null)
  const introReadyRef = useRef(false)
  const readyToExitRef = useRef(readyToExit)
  const exitStartedRef = useRef(false)
  const exitTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const onCompleteRef = useRef(onComplete)
  const onAnimationReadyRef = useRef(onAnimationReady)
  const prefersReducedMotion = useReducedMotion()

  // Keep callback refs in sync
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    onAnimationReadyRef.current = onAnimationReady
  }, [onAnimationReady])

  // ✅ Centralised exit starter — safe to call from anywhere
  const startExit = useCallback(() => {
    if (exitStartedRef.current) return
    exitStartedRef.current = true

    const tl = exitTimelineRef.current
    if (tl) {
      tl.play(0)
    } else {
      // Timeline not ready (edge case) — skip straight to onComplete
      onCompleteRef.current?.()
    }
  }, [])

  useGSAP(
    () => {
      if (!overlayRef.current) return

      const q = gsap.utils.selector(rootRef)
      const drawPaths = q<SVGPathElement>('.draw-path')

      // ✅ Reset state flags on every GSAP run so re-runs don't leave stale state
      introReadyRef.current = false
      exitStartedRef.current = false
      exitTimelineRef.current = null   // ← clear first; reassign below

      drawPaths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 0.9 })
      })

      gsap.set(q('.logo-hero-glow'), { opacity: 0 })
      gsap.set(q('.logo-stage, .light-sweep, .logo-sunlight'), { opacity: 0 })
      gsap.set(q('.logo-hero, .logo-branch, .logo-leaf-top, .logo-leaf-bottom, .logo-leaf-right, .logo-tm'), { opacity: 0 })
      gsap.set(q('.logo-tm'), { scale: 0.5, transformOrigin: '50% 50%' })
      gsap.set(q('.logo-branch, .logo-leaf-top, .logo-leaf-bottom, .logo-leaf-right'), { y: 10, scale: 0.98, transformOrigin: '50% 50%' })
      gsap.set(q('.drp-letter'), { opacity: 0, y: 28, scaleX: 0.84, scaleY: 1.18, transformOrigin: '50% 88%' })
      gsap.set(q('.logo-exotic'), { opacity: 1 })
      gsap.set(q('.logo-farms'), { opacity: 0, y: 20, scale: 0.96, transformOrigin: '50% 50%' })
      gsap.set(q('.ambient-glow, .fog-panel, .noise-layer, .particle-layer'), { opacity: 0 })
      gsap.set(q('.exotic-reveal-mask'), { attr: { y: 847, height: 0 } })
      gsap.set(q('.farms-reveal-mask'), { attr: { y: 909, height: 0 } })

      // ✅ Build exit timeline and store in ref immediately
      exitTimelineRef.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: 'power2.out' },
          onComplete: () => {
            onCompleteRef.current?.()
          },
        })
        .to(q('.logo-stage'), { scale: 2.8, y: -12, filter: 'blur(1px)', duration: 0.6, ease: 'power3.inOut' }, 0)
        .to(q('.portal-ring'), { opacity: 1, scale: 1.45, duration: 0.32, ease: 'sine.out' }, 0.04)
        .to(q('.ambient-glow, .fog-panel, .noise-layer, .particle-layer'), { opacity: 0, duration: 0.4 }, 0)
        .to(q('.logo-stage'), { scale: 5.4, duration: 0.7, ease: 'power2.inOut' }, 0.3)
        .to(overlayRef.current, { opacity: 0, duration: 0.5 }, 0.3)
        .to(q('.vignette-layer'), { opacity: 0.4, duration: 0.6 }, 0.3)
        .to(q('.logo-stage'), { scale: 6.8, filter: 'brightness(1.3) blur(2px)', duration: 0.5, ease: 'power2.in' }, 1.0)
        .to(q('.vignette-layer'), { opacity: 0.7, duration: 0.5 }, 1.0)
        .to(q('.logo-stage'), { scale: 7.2, filter: 'brightness(1.8) blur(4px)', duration: 0.4 }, 1.5)
        .to(q('.vignette-layer'), { opacity: 1, backgroundColor: 'rgba(255,255,255,0.95)', duration: 0.4 }, 1.5)

      if (prefersReducedMotion) {
        gsap.set(
          q('.logo-hero, .logo-branch, .logo-leaf-top, .logo-leaf-bottom, .logo-leaf-right, .logo-tm, .drp-letter, .logo-farms, .final-pulse'),
          { clearProps: 'all' },
        )
        gsap.set(q('.exotic-reveal-mask'), { attr: { y: 544, height: 303 } })
        gsap.set(q('.farms-reveal-mask'), { attr: { y: 810, height: 99 } })
        introReadyRef.current = true
        onAnimationReadyRef.current?.()
        // ✅ If already flagged to exit, use the centralised helper
        if (readyToExitRef.current) {
          startExit()
        }
        return
      }

      const timeline = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          introReadyRef.current = true
          onAnimationReadyRef.current?.()
          // ✅ Use centralised helper; it guards against double-calls
          if (readyToExitRef.current) {
            startExit()
          }
        },
      })

      timeline
        .to(q('.ambient-glow'), { opacity: 1, duration: 0.7 }, 0)
        .to(q('.fog-panel'), { opacity: 0.46, duration: 1, stagger: 0.1 }, 0.06)
        .to(q('.noise-layer, .particle-layer, .logo-stage'), { opacity: 1, duration: 0.55 }, 0.14)
        .fromTo(q('.light-sweep'), { opacity: 0, xPercent: -110, rotate: -10 }, { opacity: 0.55, xPercent: 115, duration: 1, ease: 'power2.inOut' }, 0.18)
        .fromTo(q('.logo-hero'), { opacity: 0, y: 66, scaleX: 1.04, scaleY: 0.76, transformOrigin: '50% 82%' }, { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: 0.66, ease: 'back.out(1.24)' }, 0.44)
        .to(q('.logo-hero-glow'), { opacity: 0.4, duration: 0.56 }, 0.48)
        .to(q('.logo-sunlight'), { opacity: 0.92, duration: 0.7 }, 0.72)
        .to(drawPaths, { strokeDashoffset: 0, duration: 0.82, stagger: 0.08, ease: 'power2.inOut' }, 0.82)
        .to(q('.logo-branch, .logo-leaf-top, .logo-leaf-bottom, .logo-leaf-right'), { opacity: 1, y: 0, scale: 1, duration: 0.52, stagger: 0.09, ease: 'power2.out' }, 1.04)
        .to(q('.drp-letter'), { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: 0.52, stagger: 0.1, ease: 'back.out(1.18)' }, 1.56)
        .to(q('.exotic-reveal-mask'), { attr: { y: 544, height: 303 }, duration: 0.62, ease: 'power3.out' }, 2.06)
        .to(q('.farms-reveal-mask'), { attr: { y: 810, height: 99 }, duration: 0.38, ease: 'power3.out' }, 2.54)
        .to(q('.logo-farms'), { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.46)' }, 2.54)
        .to(q('.logo-tm'), { opacity: 1, scale: 1, duration: 0.28, ease: 'back.out(1.72)' }, 2.62)
        .to(q('.logo-stage'), { y: -4, scale: 1.012, duration: 0.82, ease: 'sine.inOut' }, 2.88)
        .to(q('.logo-stage'), { y: 0, scale: 1.02, duration: 0.82, ease: 'sine.inOut' }, 3.7)
        .to(q('.final-pulse'), { opacity: 0.62, scale: 1.05, duration: 0.28, ease: 'sine.out' }, 3.16)
        .to(q('.final-pulse'), { opacity: 0.16, scale: 1.16, duration: 0.34, ease: 'sine.inOut' }, 3.54)
    },
    // ✅ Add startExit to deps so the closure captures the stable ref
    { scope: rootRef, dependencies: [prefersReducedMotion, startExit] },
  )

  useEffect(() => {
    readyToExitRef.current = readyToExit

    if (readyToExit && introReadyRef.current) {
      // ✅ Use centralised helper instead of calling exitTimelineRef directly
      startExit()

      // Safety fallback — exit timeline is ~1.9s, 2.5s gives ample buffer
      const safetyTimer = window.setTimeout(() => {
        onCompleteRef.current?.()
      }, 2500)

      return () => window.clearTimeout(safetyTimer)
    }
  }, [readyToExit, startExit])

  return (
    <motion.div
      ref={overlayRef}
      initial={{ opacity: 1 }}
      className="welcome-shell fixed inset-0 z-[120] overflow-hidden bg-[#f7f4ec]"
    >
      <div ref={rootRef} className="relative flex h-full w-full items-center justify-center overflow-hidden px-4 sm:px-6">
        <div className="ambient-glow absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(173,212,141,0.18),transparent_25%),radial-gradient(circle_at_8%_20%,rgba(255,248,220,0.85),transparent_24%),radial-gradient(circle_at_92%_24%,rgba(254,244,199,0.55),transparent_22%),linear-gradient(180deg,#fcfbf7_0%,#f7f4ec_44%,#f3f0e6_100%)]" />
        <div className="fog-panel absolute inset-x-[-10%] top-[7%] h-[28%] rounded-full bg-[radial-gradient(circle,rgba(200,222,176,0.22),transparent_72%)] blur-3xl" />
        <div className="fog-panel absolute inset-x-[-6%] bottom-[6%] h-[24%] rounded-full bg-[radial-gradient(circle,rgba(152,186,129,0.16),transparent_74%)] blur-3xl" />
        <div className="absolute inset-y-0 left-0 w-[18%] bg-[radial-gradient(circle_at_left,rgba(255,242,188,0.45),transparent_72%)]" />
        <div className="absolute inset-y-0 right-0 w-[18%] bg-[radial-gradient(circle_at_right,rgba(255,242,188,0.42),transparent_72%)]" />
        <div className="light-sweep absolute left-[-20%] top-[18%] h-[42%] w-[34%] rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,249,225,0.02)_18%,rgba(255,238,172,0.28)_52%,rgba(255,249,225,0.02)_82%,transparent_100%)] blur-2xl will-change-transform" />
        <div className="noise-layer welcome-splash-noise absolute inset-0 mix-blend-soft-light opacity-20" />
        <div className="particle-layer absolute inset-0">
          {PARTICLES.map((particle, index) => (
            <motion.span
              key={`${particle.left}-${particle.top}`}
              className="absolute rounded-full bg-[#b9d6a8]/26 blur-[1px]"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                boxShadow: '0 0 10px rgba(233, 221, 171, 0.26)',
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
              animate={{ y: [0, -14, 10, 0], x: [0, index % 2 === 0 ? 9 : -7, 0], opacity: [0.18, 0.74, 0.24], scale: [1, 1.28, 0.92] }}
              transition={{ duration: particle.duration, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut', delay: particle.delay }}
            />
          ))}
        </div>

        <div className="vignette-layer absolute inset-0 opacity-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

        <motion.div
          ref={logoStageRef}
          className="logo-stage relative mx-auto flex aspect-square w-[min(74vw,18rem)] max-w-[18rem] items-center justify-center sm:w-[min(60vw,19.5rem)] sm:max-w-[19.5rem] lg:w-[min(34vw,22rem)] lg:max-w-[22rem]"
          initial={{ scale: 0.992 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: '36.8% 44.8%' }}
        >
          <div className="absolute inset-[12%] rounded-full bg-[#fff3bf]/28 blur-3xl" />
          <div className="portal-ring pointer-events-none absolute left-[30.8%] top-[29.8%] h-[12.5%] w-[12.5%] scale-75 rounded-full border border-[#fff5cf]/0 bg-[radial-gradient(circle,rgba(255,247,210,0.75)_0%,rgba(255,240,173,0.26)_40%,rgba(255,240,173,0)_72%)] opacity-0 blur-[1px]" />
          <div className="relative w-full will-change-transform drop-shadow-[0_18px_40px_rgba(85,101,68,0.16)]">
            <DrpExoticLogoSvg />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}