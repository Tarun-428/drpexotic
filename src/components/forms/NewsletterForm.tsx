import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email: z.string().email('Enter a valid email.'),
  consent: z.boolean().refine((v) => v === true, {
    message: 'Please confirm you agree to receive updates.',
  }),
})

type FormValues = z.infer<typeof schema>

export function NewsletterForm() {
  const endpoint = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', consent: false },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: values.email, consent: values.consent }),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        await new Promise((r) => setTimeout(r, 450))
      }
      toast.success('Thanks — check your inbox to confirm (double opt-in).')
      form.reset({ email: '', consent: false })
    } catch {
      toast.error('Could not subscribe right now. Please try again later.')
    }
  })

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="newsletter-email">Email</Label>
        <Input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...form.register('email')}
        />
        {form.formState.errors.email?.message ? (
          <p className="text-xs text-red-700">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-forest-900/72">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-gold-500/45 accent-[rgb(200,169,107)]"
            {...form.register('consent')}
          />
          <span>
            I agree to receive occasional updates about produce, orchard programmes, and future online sales. I can
            unsubscribe at any time.
          </span>
        </label>
        {form.formState.errors.consent?.message ? (
          <p className="text-xs text-red-700">{form.formState.errors.consent.message}</p>
        ) : null}
      </div>

      <Button type="submit" disabled={form.formState.isSubmitting} className="w-full sm:w-fit">
        {form.formState.isSubmitting ? 'Submitting…' : 'Join the seasonal list'}
      </Button>
    </form>
  )
}
