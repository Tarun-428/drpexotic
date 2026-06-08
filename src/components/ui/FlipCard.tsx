import React, { useEffect, useId, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface FlipCardProps {
  children: [React.ReactNode, React.ReactNode]
  className?: string
  innerClassName?: string
  frontClassName?: string
  backClassName?: string
}

export function FlipCard({
  children,
  className,
  innerClassName,
  frontClassName,
  backClassName,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardId = useId()

  const toggleCard = () => {
    window.dispatchEvent(new CustomEvent('drp-flip-card-open', { detail: cardId }))
    setIsFlipped((current) => !current)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    toggleCard()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsFlipped(false)
      }
    }

    const handleOtherCardOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== cardId) {
        setIsFlipped(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('drp-flip-card-open', handleOtherCardOpen)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('drp-flip-card-open', handleOtherCardOpen)
    }
  }, [cardId])

  return (
    <div 
      ref={cardRef}
      className={cn('flip-card-inner group cursor-pointer select-none active:scale-[0.98]', className)}
      onClick={toggleCard}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
    >
      <div 
        className={cn(
          'flip-card', 
          isFlipped ? 'is-flipped' : '',
          'lg:group-hover:[transform:rotateY(180deg)]',
          innerClassName
        )}
      >
        <div className={cn('flip-card-front', frontClassName)}>
          {children[0]}
          {/* Subtle visual cue for mobile */}
          <div className="tap-indicator">
            <svg className="size-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
            </svg>
          </div>
        </div>
        <div className={cn('flip-card-back', backClassName)}>
          {children[1]}
        </div>
      </div>
    </div>
  )
}
