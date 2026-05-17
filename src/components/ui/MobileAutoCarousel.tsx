import { Children, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type MobileAutoCarouselProps = {
  children: ReactNode
  className?: string
  slideClassName?: string
  intervalMs?: number
  slideOffsetPercent?: number
  transitionDuration?: number
  inactiveScale?: number
  inactiveOpacity?: number
  ariaLabel?: string
  pauseOnTouch?: boolean
}

function wrapIndex(index: number, length: number) {
  return ((index % length) + length) % length
}

export function MobileAutoCarousel({
  children,
  className,
  slideClassName,
  intervalMs = 3200,
  slideOffsetPercent = 86,
  transitionDuration = 0.72,
  inactiveScale = 0.92,
  inactiveOpacity = 0.48,
  ariaLabel = 'Auto sliding carousel',
  pauseOnTouch = true,
}: MobileAutoCarouselProps) {
  const slides = useMemo(() => Children.toArray(children), [children])
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const resumeTimer = useRef<number | null>(null)

  useEffect(() => {
    if (paused || slides.length <= 1) return
    const timer = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1, slides.length))
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [intervalMs, paused, slides.length])

  useEffect(() => {
    return () => {
      if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    }
  }, [])

  const pauseTemporarily = () => {
    if (!pauseOnTouch) return
    setPaused(true)
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => setPaused(false), 3800)
  }

  if (slides.length === 0) return null

  return (
    <div
      className={cn('premium-mobile-carousel lg:hidden', className)}
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={pauseTemporarily}
    >
      {slides.map((slide, index) => {
        const rawOffset = index - active
        const offset =
          rawOffset > slides.length / 2
            ? rawOffset - slides.length
            : rawOffset < -slides.length / 2
              ? rawOffset + slides.length
              : rawOffset
        const isActive = offset === 0

        return (
          <motion.div
            key={index}
            className={cn('premium-mobile-carousel__slide', slideClassName)}
            animate={{
              x: `${offset * slideOffsetPercent}%`,
              scale: isActive ? 1 : inactiveScale,
              opacity: Math.abs(offset) > 1 ? 0 : isActive ? 1 : inactiveOpacity,
              zIndex: isActive ? 3 : 2 - Math.abs(offset),
            }}
            transition={{ duration: transitionDuration, ease: [0.22, 1, 0.36, 1] }}
            drag={isActive ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragStart={pauseTemporarily}
            onDragEnd={(_, info) => {
              pauseTemporarily()
              if (info.offset.x < -48) setActive((current) => wrapIndex(current + 1, slides.length))
              if (info.offset.x > 48) setActive((current) => wrapIndex(current - 1, slides.length))
            }}
            style={{ willChange: 'transform, opacity' }}
          >
            {slide}
          </motion.div>
        )
      })}
    </div>
  )
}
