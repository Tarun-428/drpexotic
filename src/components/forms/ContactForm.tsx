import { useEffect, useMemo, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().min(8, 'Enter a reachable phone number.'),
  topic: z.enum(['produce', 'orchard', 'partnership', 'other']),
  message: z.string().min(20, 'Please share a bit more detail (at least 20 characters).').max(5000),
})

type FormValues = z.infer<typeof schema>

const topicOptions: Array<{ value: FormValues['topic']; label: string }> = [
  { value: 'produce', label: 'Produce sourcing & availability' },
  { value: 'orchard', label: 'Turnkey orchard programme' },
  { value: 'partnership', label: 'Partnership / B2B' },
  { value: 'other', label: 'Other' },
]

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-xs text-red-700">{message}</p>
}

export function ContactForm() {
  const triggerRef = useRef<HTMLButtonElement>(null)
  const [menuWidth, setMenuWidth] = useState<number | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: 'produce', name: '', email: '', phone: '', message: '' },
  })

  const topicValue = form.watch('topic')
  const selectedTopic = useMemo(
    () => topicOptions.find((option) => option.value === topicValue) ?? topicOptions[0],
    [topicValue],
  )

  useEffect(() => {
    const updateWidth = () => {
      if (triggerRef.current) {
        setMenuWidth(triggerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const handleTopicSelect = (value: FormValues['topic']) => {
    form.setValue('topic', value, { shouldDirty: true, shouldValidate: true })
  }

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...values,
          access_key: 'd667d290-d447-4409-855e-ade5344d101f',
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Thanks — your message is on its way.')
        form.reset({ name: '', email: '', phone: '', topic: 'produce', message: '' })
      } else {
        throw new Error(result.message || 'Submission failed')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Could not send right now. Please try WhatsApp or email directly.')
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="cinematic-surface grid gap-6 rounded-[2.2rem] p-6 sm:p-8"
    >
      <div>
        <p className="font-display text-3xl leading-none text-forest-900">Tell us what you are planning.</p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-forest-900/64">
          Share sourcing needs, orchard goals, or partnership ideas. We will respond with the right next step rather
          than a generic reply.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" placeholder="Your full name" {...form.register('name')} />
          <FieldError message={form.formState.errors.name?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...form.register('email')} />
          <FieldError message={form.formState.errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" autoComplete="tel" inputMode="tel" placeholder="+91" {...form.register('phone')} />
          <FieldError message={form.formState.errors.phone?.message} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="topic">Topic</Label>
          <div className="relative">
            <input type="hidden" {...form.register('topic')} />
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  ref={triggerRef}
                  id="topic"
                  type="button"
                  className="group flex h-14 w-full items-center justify-between rounded-[1.35rem] border border-gold-500/35 bg-white/75 px-4 text-left text-sm font-semibold text-forest-900 shadow-[0_20px_48px_-28px_rgba(11,61,46,0.55)] backdrop-blur transition-all hover:border-gold-500/55 hover:bg-white/92 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 data-[state=open]:border-gold-500/70 data-[state=open]:bg-white/95"
                  aria-haspopup="listbox"
                  aria-label="Topic"
                >
                  <span className="truncate text-forest-900/90">{selectedTopic.label}</span>
                  <span className="flex items-center gap-3 pl-4">
                    <span className="h-6 w-px bg-forest-900/10" aria-hidden />
                    <ChevronDown
                      className="size-4 text-forest-900/55 transition group-data-[state=open]:rotate-180"
                      aria-hidden
                    />
                  </span>
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="start"
                  sideOffset={8}
                  className="z-50 rounded-[1.35rem] border border-cream-200/80 bg-cream-50/95 p-2 shadow-[0_26px_70px_-36px_rgba(11,61,46,0.6)] backdrop-blur-xl"
                  style={{ width: menuWidth ? `${menuWidth}px` : undefined }}
                >
                  {topicOptions.map((option) => {
                    const isSelected = option.value === topicValue
                    return (
                      <DropdownMenu.Item
                        key={option.value}
                        onSelect={() => handleTopicSelect(option.value)}
                        className={`flex cursor-pointer select-none items-center justify-between rounded-[1rem] px-4 py-3 text-sm font-semibold outline-none transition ${
                          isSelected
                            ? 'bg-forest-900 text-cream-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]'
                            : 'text-forest-900/85 hover:bg-gold-500/12 hover:text-forest-900 data-[highlighted]:bg-gold-500/16'
                        }`}
                      >
                        <span>{option.label}</span>
                        {isSelected ? <Check className="size-4" aria-hidden /> : null}
                      </DropdownMenu.Item>
                    )
                  })}
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea
          id="message"
          rows={7}
          placeholder="Tell us about the estate, sourcing needs, timelines, or the kind of orchard guidance you are exploring."
          {...form.register('message')}
        />
        <FieldError message={form.formState.errors.message?.message} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md text-xs leading-relaxed text-forest-900/58">
          Enquiries are sent securely via Web3Forms to our team.
        </p>
        <Button type="submit" disabled={form.formState.isSubmitting} size="lg">
          {form.formState.isSubmitting ? 'Sending…' : 'Send your enquiry'}
        </Button>
      </div>
    </form>
  )
}
