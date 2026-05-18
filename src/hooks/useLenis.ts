import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null
let lenisRafId = 0

function stopLenisLoop() {
  if (lenisRafId) {
    cancelAnimationFrame(lenisRafId)
    lenisRafId = 0
  }
}

function startLenisLoop() {
  if (!lenisInstance || lenisRafId) return

  const onFrame = (time: number) => {
    lenisInstance?.raf(time)
    lenisRafId = requestAnimationFrame(onFrame)
  }

  lenisRafId = requestAnimationFrame(onFrame)
}

export function scrollPageToTop() {
  if (typeof window === 'undefined') return

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true, force: true })
  }

  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
}

export function scrollPageToHash(hash: string) {
  if (typeof window === 'undefined' || !hash) return

  const element = document.querySelector(hash)
  if (!(element instanceof HTMLElement)) return

  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset: -96, immediate: true, force: true })
    return
  }

  element.scrollIntoView({ block: 'start' })
}

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return

    lenisInstance?.destroy()
    stopLenisLoop()

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

    lenisInstance = lenis
    document.addEventListener('click', onAnchorClick)
    startLenisLoop()

    return () => {
      document.removeEventListener('click', onAnchorClick)
      stopLenisLoop()
      lenis.destroy()
      if (lenisInstance === lenis) {
        lenisInstance = null
      }
    }
  }, [enabled])
}
