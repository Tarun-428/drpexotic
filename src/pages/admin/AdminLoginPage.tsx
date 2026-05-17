import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { ArrowUpRight, Shield } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  email: z.string().email('Enter a valid admin email.'),
  password: z.string().min(1, 'Password is required.'),
})

type FormValues = z.infer<typeof schema>

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const token = useAuthStore((state) => state.token)
  const login = useAuthStore((state) => state.login)
  const [busy, setBusy] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: 'admin@drpexoticfarms.com', password: '' },
  })

  if (token) return <Navigate to="/admin" replace />

  const onSubmit = form.handleSubmit(async (values) => {
    setBusy(true)
    try {
      await login(values.email, values.password)
      toast.success('Welcome back.')
      navigate(from, { replace: true })
    } catch {
      toast.error('Sign-in failed. Check your credentials and API connection.')
    } finally {
      setBusy(false)
    }
  })

  return (
    <>
      <PageMeta title="Admin sign-in" description="Secure editorial access for DRP Exotic Farms." path="/admin/login" />
      <div className="min-h-dvh bg-[radial-gradient(circle_at_top,rgba(200,169,107,0.14),transparent_22%),linear-gradient(180deg,#071b15,#06120f)] px-4 py-12 text-cream-50">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_30rem] lg:items-center">
          <div className="hidden lg:block">
            <span className="section-label border-white/12 bg-white/8 text-cream-50/82">Editorial control room</span>
            <h1 className="mt-6 font-display text-[clamp(3rem,5vw,5.7rem)] leading-[0.92] tracking-[-0.04em]">
              Publish orchard stories and cinematic media with luxury-grade calm.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-50/72">
              A secure content system for premium gallery management, editorial publishing, and media operations across the DRP brand ecosystem.
            </p>
          </div>

          <div className="cinematic-surface rounded-[2.2rem] border border-white/8 bg-white/6 p-6 text-cream-50 shadow-[0_40px_120px_-70px_rgba(0,0,0,0.85)] sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-[1.3rem] bg-gold-500 text-forest-900">
                <Shield className="size-5" />
              </span>
              <div>
                <h1 className="font-display text-3xl">Admin access</h1>
                <p className="text-sm text-cream-50/60">JWT-protected cinematic CMS</p>
              </div>
            </div>

            <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-cream-50/74">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="border-white/12 bg-white/8 text-cream-50 placeholder:text-cream-50/35"
                  {...form.register('email')}
                />
                {form.formState.errors.email?.message ? <p className="text-xs text-red-300">{form.formState.errors.email.message}</p> : null}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-cream-50/74">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="border-white/12 bg-white/8 text-cream-50 placeholder:text-cream-50/35"
                  {...form.register('password')}
                />
                {form.formState.errors.password?.message ? (
                  <p className="text-xs text-red-300">{form.formState.errors.password.message}</p>
                ) : null}
              </div>

              <Button type="submit" disabled={busy} size="lg" className="mt-2 w-full">
                {busy ? 'Signing in…' : 'Enter the CMS'}
                {!busy ? <ArrowUpRight className="size-4" /> : null}
              </Button>
            </form>

            <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-black/18 p-4 text-sm leading-relaxed text-cream-50/62">
              Connect the FastAPI backend, MongoDB Atlas, and Cloudinary environment variables to enable secure publishing, media uploads, and live content delivery.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
