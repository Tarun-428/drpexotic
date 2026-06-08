import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'border border-accent/45 bg-primary text-neutral shadow-[0_12px_28px_-16px_rgba(23,72,54,0.9),inset_0_1px_0_rgba(255,255,255,0.14)] hover:border-accent/75 hover:bg-primary/95 hover:scale-[1.02] hover:shadow-[0_18px_36px_-18px_rgba(23,72,54,0.95)]',
        secondary:
          'border border-primary/25 bg-neutral text-primary shadow-[0_10px_24px_-18px_rgba(23,72,54,0.8),inset_0_1px_0_rgba(255,255,255,0.7)] hover:border-accent/70 hover:bg-secondary hover:scale-[1.02] hover:shadow-[0_16px_32px_-20px_rgba(23,72,54,0.85)]',
        ghost: 'border border-transparent text-primary hover:border-primary/15 hover:bg-secondary/60 hover:shadow-sm',
        danger: 'border border-red-900/20 bg-red-700 text-white shadow-[0_12px_28px_-18px_rgba(185,28,28,0.9)] hover:bg-red-800',
      },
      size: {
        default: 'h-11 px-8',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-14 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = 'Button'

export { buttonVariants }
