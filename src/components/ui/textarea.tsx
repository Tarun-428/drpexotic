import * as React from 'react'
import { cn } from '@/lib/utils'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[150px] w-full rounded-[1.2rem] border border-white/30 bg-white/70 px-4 py-3 text-sm text-forest-900 shadow-[0_14px_36px_-24px_rgba(11,61,46,0.45)] backdrop-blur transition-all placeholder:text-forest-900/34 focus-visible:border-gold-500/45 focus-visible:bg-white/88 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/65 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'
