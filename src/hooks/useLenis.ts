import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.9,
      lerp: 0.1,
      duration: 0.9,
      // `smoothTouch` was removed/renamed in newer Lenis types — omit to satisfy TS
      touchMultiplier: 1,
    })

    const onAnchorClick = (event: Event) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return

      const hash = link.getAttribute('href')
      if (!hash || hash === '#') return

      const element = document.querySelector(hash)
      if (!element) return

      event.preventDefault()
      lenis.scrollTo(element as HTMLElement, { offset: -96, duration: 1.2 })
    }

    document.addEventListener('click', onAnchorClick)

    let raf = 0
    const onFrame = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(onFrame)
    }
    raf = requestAnimationFrame(onFrame)

    return () => {
      document.removeEventListener('click', onAnchorClick)
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled])
}
