import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 0.9,
    })
    let raf = 0
    const onFrame = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(onFrame)
    }
    raf = requestAnimationFrame(onFrame)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [enabled])
}
