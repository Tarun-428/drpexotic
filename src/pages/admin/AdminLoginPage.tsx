import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { ArrowRight, Shield } from 'lucide-react'
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
      <div className="min-h-dvh bg-[#f6f8f3] px-4 py-10 text-zinc-950">
        <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-xl items-center justify-center">
          <div className="w-full rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-[0_28px_80px_-55px_rgba(0,0,0,0.25)] sm:p-8">
            <div className="flex justify-center">
              <span className="inline-flex size-12 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-700">
                <Shield className="size-5" aria-hidden />
              </span>
            </div>

            <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input id="email" type="email" autoComplete="email" className="admin-field" placeholder="" aria-label="Email" {...form.register('email')} />
                {form.formState.errors.email?.message ? <p className="text-xs text-red-500">{form.formState.errors.email.message}</p> : null}
                <div className="text-xs text-zinc-500">Use the admin email configured for this site.</div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input id="password" type="password" autoComplete="current-password" className="admin-field" placeholder="" aria-label="Password" {...form.register('password')} />
                {form.formState.errors.password?.message ? <p className="text-xs text-red-500">{form.formState.errors.password.message}</p> : null}
                <div className="text-xs text-zinc-500">Passwords are case-sensitive. If you changed the admin password, use the new value.</div>
              </div>

              <Button type="submit" disabled={busy} size="lg" className="mt-2 w-full rounded-2xl">
                {busy ? <span className="size-4 animate-pulse rounded-full border border-current border-r-transparent" aria-hidden /> : <ArrowRight className="size-4" aria-hidden />}
                <span className="sr-only">Sign in</span>
              </Button>
              <div className="mt-2 text-sm text-zinc-500">Tip: ensure the backend API is running if sign-in fails.</div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
