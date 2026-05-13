import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useSiteConfigStore } from '@/store/siteConfigStore'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().min(8, 'Enter a reachable phone number.'),
  topic: z.enum(['produce', 'orchard', 'partnership', 'other']),
  message: z.string().min(20, 'Please share a bit more detail (at least 20 characters).').max(5000),
})

type FormValues = z.infer<typeof schema>

function buildMailto(values: FormValues, toEmail: string) {
  const subject = encodeURIComponent(`Website enquiry · ${values.topic}`)
  const body = encodeURIComponent(
    `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nTopic: ${values.topic}\n\n${values.message}`,
  )
  return `mailto:${toEmail}?subject=${subject}&body=${body}`
}

export function ContactForm() {
  const toEmail = useSiteConfigStore((s) => s.config.contact.email)
  const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT as string | undefined

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: 'produce', name: '', email: '', phone: '', message: '' },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        if (!res.ok) throw new Error('bad status')
        toast.success('Thanks — your message is on its way.')
        form.reset({ name: '', email: '', phone: '', topic: 'produce', message: '' })
        return
      }

      toast.success('Opening your email app with a pre-filled message…')
      window.setTimeout(() => {
        window.location.href = buildMailto(values, toEmail)
      }, 250)
    } catch {
      toast.error('Could not send right now. Please try WhatsApp or email directly.')
    }
  })

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-6 sm:p-8">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" {...form.register('name')} />
          {form.formState.errors.name?.message ? (
            <p className="text-xs text-red-700">{form.formState.errors.name.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" {...form.register('email')} />
          {form.formState.errors.email?.message ? (
            <p className="text-xs text-red-700">{form.formState.errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" autoComplete="tel" inputMode="tel" {...form.register('phone')} />
          {form.formState.errors.phone?.message ? (
            <p className="text-xs text-red-700">{form.formState.errors.phone.message}</p>
          ) : null}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="topic">Topic</Label>
          <select
            id="topic"
            className="h-11 w-full rounded-xl border border-cream-300 bg-cream-50/80 px-3 text-sm text-forest-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            {...form.register('topic')}
          >
            <option value="produce">Produce &amp; availability</option>
            <option value="orchard">Turnkey orchard programme</option>
            <option value="partnership">Partnership / B2B</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">How can we help?</Label>
        <Textarea id="message" rows={6} {...form.register('message')} />
        {form.formState.errors.message?.message ? (
          <p className="text-xs text-red-700">{form.formState.errors.message.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-forest-900/60">
          {endpoint
            ? 'This form posts to your configured endpoint.'
            : 'No endpoint configured — we will open your email app with a pre-filled message.'}
        </p>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
