import { useEffect, useMemo, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedNumberProps = {
  value: number
  start?: number
  duration?: number
  decimals?: number
  padLength?: number
  prefix?: string
  suffix?: string
  className?: string
  play?: boolean
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function formatNumber(value: number, decimals: number, padLength?: number) {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  if (!padLength) return rounded
  const [intPart, decimalPart] = rounded.split('.')
  const padded = intPart.padStart(padLength, '0')
  return decimalPart ? `${padded}.${decimalPart}` : padded
}

export function AnimatedNumber({
  value,
  start = 0,
  duration = 1.6,
  decimals = 0,
  padLength,
  prefix = '',
  suffix = '',
  className,
  play,
}: AnimatedNumberProps) {
  const prefersReducedMotion = useReducedMotion()
  const hasPlayedRef = useRef(false)
  const lastValueRef = useRef(value)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 })
  const shouldPlay = play ?? inView
  const [display, setDisplay] = useState(() => formatNumber(start, decimals, padLength))

  const formattedStart = useMemo(() => formatNumber(start, decimals, padLength), [start, decimals, padLength])
  const formattedEnd = useMemo(() => formatNumber(value, decimals, padLength), [value, decimals, padLength])

  useEffect(() => {
    if (value !== lastValueRef.current) {
      hasPlayedRef.current = false
      lastValueRef.current = value
    }
  }, [value])

  useEffect(() => {
    if (!shouldPlay) {
      setDisplay(formattedStart)
      return
    }

    if (prefersReducedMotion) {
      setDisplay(formattedEnd)
      return
    }

    if (hasPlayedRef.current) {
      return
    }

    hasPlayedRef.current = true
    const startTime = performance.now()
    const stepFloorDurationMs = decimals === 0 ? Math.abs(value - start) * 16 : 0
    const durationMs = Math.max(duration, 0.2) * 1000
    const easedDurationMs = Math.max(durationMs, stepFloorDurationMs)
    let raf = 0

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / easedDurationMs, 1)
      const eased = easeOutCubic(progress)
      const current = start + (value - start) * eased
      const nextValue = decimals > 0 ? Number(current.toFixed(decimals)) : Math.floor(current)
      setDisplay(formatNumber(nextValue, decimals, padLength))

      if (progress < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(formattedEnd)
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
    }
  }, [shouldPlay, start, value, duration, decimals, padLength, formattedStart, formattedEnd, prefersReducedMotion])

  return (
    <span ref={play === undefined ? ref : undefined} className={cn('font-numeric tabular-nums', className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
