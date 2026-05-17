import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import logoMarkupRaw from '../../../new_logo.svg?raw'

type IntroAnimationProps = {
  onHandoffStart: () => void
  setIntroComplete: (value: boolean) => void
}

const INTRO_GROUPS = [
  'letters-drp',
  'letters-exotic',
  'letters-farms',
  'farmers-body',
  'olive-branch',
  'leaves',
  'tm-symbol',
] as const

const cleanSvgMarkup = (markup: string) =>
  markup
    .replace(/<\?xml[\s\S]*?\?>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(
      /<svg\b/,
      '<svg class="intro-animation__vector" preserveAspectRatio="xMidYMid meet" shape-rendering="geometricPrecision"',
    )
    .replace(/<g([^>]*?)inkscape:label="([^"]+)"([^>]*)>/g, '<g$1inkscape:label="$2" data-logo-group="$2"$3>')

const baseLogoMarkup = cleanSvgMarkup(logoMarkupRaw)

export function IntroAnimation({ onHandoffStart, setIntroComplete }: IntroAnimationProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const auraRef = useRef<HTMLDivElement | null>(null)
  const auraSecondaryRef = useRef<HTMLDivElement | null>(null)
  const logoWrapRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)

  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isCompactViewport =
    typeof window !== 'undefined' &&
    (window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(pointer: coarse)').matches)

  useEffect(() => {
    const root = rootRef.current
    const aura = auraRef.current
    const auraSecondary = auraSecondaryRef.current
    const logoWrap = logoWrapRef.current
    const logo = logoRef.current

    if (!root || !aura || !auraSecondary || !logoWrap || !logo) {
      return
    }

    const selectGroup = (label: (typeof INTRO_GROUPS)[number]) =>
      logo.querySelector<SVGGElement>(`g[data-logo-group="${label}"]`)

    const farmersBody = selectGroup('farmers-body')
    const oliveBranch = selectGroup('olive-branch')
    const leaves = selectGroup('leaves')
    const lettersDrp = selectGroup('letters-drp')
    const lettersExotic = selectGroup('letters-exotic')
    const lettersFarms = selectGroup('letters-farms')
    const tmSymbol = selectGroup('tm-symbol')

    if (!farmersBody || !oliveBranch || !leaves || !lettersDrp || !lettersExotic || !lettersFarms || !tmSymbol) {
      window.setTimeout(() => setIntroComplete(true), 1200)
      return
    }

    if (prefersReducedMotion) {
      onHandoffStart()
      gsap.set([farmersBody, oliveBranch, leaves, lettersDrp, lettersExotic, lettersFarms, tmSymbol, logoWrap], {
        clearProps: 'all',
      })
      gsap.set(root, { opacity: 1 })
      const reducedTimer = window.setTimeout(() => setIntroComplete(true), 380)
      return () => window.clearTimeout(reducedTimer)
    }

    const context = gsap.context(() => {
      const target = document.querySelector<HTMLElement>('[data-intro-logo-target]')
      const logoBounds = logoWrap.getBoundingClientRect()
      const targetBounds = target?.getBoundingClientRect()
      const handoffScale = targetBounds ? targetBounds.width / logoBounds.width : isCompactViewport ? 0.22 : 0.18
      const handoffX = targetBounds
        ? targetBounds.left + targetBounds.width / 2 - (logoBounds.left + logoBounds.width / 2)
        : -window.innerWidth * 0.28
      const handoffY = targetBounds
        ? targetBounds.top + targetBounds.height / 2 - (logoBounds.top + logoBounds.height / 2)
        : -window.innerHeight * 0.32

      gsap.set(root, {
        opacity: 1,
        willChange: 'opacity, transform',
      })

      gsap.set([aura, auraSecondary], {
        scale: 0.9,
        opacity: 0,
        force3D: true,
        willChange: 'transform, opacity',
      })

      gsap.set(logoWrap, {
        x: 0,
        y: 18,
        scale: 0.972,
        opacity: 1,
        force3D: true,
        willChange: 'transform, opacity',
      })

      gsap.set([farmersBody, oliveBranch, leaves, lettersDrp, lettersExotic, lettersFarms, tmSymbol], {
        transformOrigin: '50% 50%',
        force3D: true,
        willChange: 'transform, opacity',
      })

      gsap.set(farmersBody, {
        y: 42,
        scale: 0.92,
        opacity: 0,
        rotation: -1.8,
      })

      gsap.set(oliveBranch, {
        y: 18,
        scale: 0.9,
        opacity: 0,
        rotation: -5,
      })

      gsap.set(leaves, {
        y: 16,
        scale: 0.72,
        opacity: 0,
        rotation: -8,
      })

      gsap.set(lettersDrp, {
        x: -16,
        y: 20,
        scale: 0.965,
        opacity: 0,
        rotation: -1.2,
      })

      gsap.set(lettersExotic, {
        y: 22,
        scale: 0.985,
        opacity: 0,
      })

      gsap.set([lettersFarms, tmSymbol], {
        y: 14,
        scale: 0.992,
        opacity: 0,
      })

      const timeline = gsap.timeline({
        defaults: {
          ease: 'power3.out',
          force3D: true,
        },
      })

      timeline
        .to(aura, {
          scale: 1,
          opacity: isCompactViewport ? 0.76 : 0.95,
          duration: isCompactViewport ? 0.82 : 1.15,
          ease: 'sine.out',
        })
        .to(
          auraSecondary,
          {
            scale: 1,
            opacity: isCompactViewport ? 0.42 : 0.72,
            duration: isCompactViewport ? 0.92 : 1.35,
            ease: 'power2.out',
          },
          '<+0.08',
        )
        .to(
          farmersBody,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: isCompactViewport ? 0.72 : 1.06,
            ease: 'power4.out',
          },
          '<+0.06',
        )
        .to(
          oliveBranch,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: 0.6,
            duration: isCompactViewport ? 0.64 : 0.94,
            ease: 'power3.out',
          },
          '-=0.42',
        )
        .to(
          leaves,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: isCompactViewport ? 0.62 : 1.08,
            ease: isCompactViewport ? 'power3.out' : 'elastic.out(1, 0.72)',
          },
          '-=0.7',
        )
        .to(
          lettersDrp,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: isCompactViewport ? 0.62 : 0.86,
            ease: 'power4.out',
          },
          '-=0.5',
        )
        .to(
          lettersExotic,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: isCompactViewport ? 0.54 : 0.74,
            ease: 'power3.out',
          },
          '-=0.34',
        )
        .to(
          lettersFarms,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: isCompactViewport ? 0.48 : 0.62,
            ease: 'power2.out',
          },
          '-=0.2',
        )
        .to(
          tmSymbol,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: isCompactViewport ? 0.42 : 0.56,
            ease: 'power2.out',
          },
          '<+0.04',
        )
        .to(
          logoWrap,
          {
            y: 0,
            scale: 1,
            duration: isCompactViewport ? 0.62 : 0.88,
            ease: 'sine.inOut',
          },
          '-=0.74',
        )
        .addLabel('settled', '+=0.08')
        .to(
          logoWrap,
          {
            y: isCompactViewport ? -2 : -4,
            scale: isCompactViewport ? 1.003 : 1.008,
            duration: isCompactViewport ? 0.32 : 0.78,
            ease: 'sine.inOut',
          },
          'settled',
        )
        .call(() => onHandoffStart(), undefined, isCompactViewport ? 'settled+=0.01' : 'settled+=0.04')
        .to(
          [aura, auraSecondary],
          {
            opacity: 0.08,
            scale: 0.97,
            duration: isCompactViewport ? 0.28 : 0.5,
            ease: 'sine.out',
          },
          'settled+=0.08',
        )
        .to(
          logoWrap,
          {
            x: handoffX,
            y: handoffY,
            scale: handoffScale,
            duration: isCompactViewport ? 0.54 : 0.96,
            ease: isCompactViewport ? 'expo.inOut' : 'power3.inOut',
          },
          isCompactViewport ? 'settled+=0.03' : 'settled+=0.08',
        )
        .to(
          logoWrap,
          {
            opacity: 0.12,
            duration: isCompactViewport ? 0.14 : 0.24,
            ease: 'sine.out',
          },
          isCompactViewport ? 'settled+=0.46' : 'settled+=0.8',
        )
        .to(
          root,
          {
            opacity: 0,
            duration: isCompactViewport ? 0.18 : 0.36,
            ease: 'power3.inOut',
          },
          isCompactViewport ? 'settled+=0.48' : 'settled+=0.82',
        )
        .call(() => setIntroComplete(true), undefined, isCompactViewport ? 'settled+=0.7' : 'settled+=1.14')
    }, root)

    return () => context.revert()
  }, [isCompactViewport, onHandoffStart, prefersReducedMotion, setIntroComplete])

  return (
    <div ref={rootRef} className="intro-animation" aria-live="polite">
      <div ref={auraRef} className="intro-animation__glow" aria-hidden="true" />
      <div ref={auraSecondaryRef} className="intro-animation__glow intro-animation__glow--secondary" aria-hidden="true" />

      <div ref={logoWrapRef} className="intro-animation__logo-shell">
        <div ref={logoRef} className="intro-animation__logo" dangerouslySetInnerHTML={{ __html: baseLogoMarkup }} />
      </div>
    </div>
  )
}
