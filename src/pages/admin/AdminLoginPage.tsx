import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuthStore } from '@/store/authStore'

const schema = z.object({
  password: z.string().min(1, 'Password is required.'),
})

type FormValues = z.infer<typeof schema>

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const session = useAuthStore((s) => s.session)
  const login = useAuthStore((s) => s.login)

  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: '' },
  })

  const [busy, setBusy] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  const onSubmit = form.handleSubmit(async (values) => {
    setBusy(true)
    try {
      const ok = login(values.password)
      if (!ok) {
        toast.error('Incorrect password.')
        return
      }
      toast.success('Signed in')
      navigate(from, { replace: true })
    } finally {
      setBusy(false)
    }
  })

  return (
    <>
      <PageMeta title="Admin sign-in" description="Password-protected content management for Drpexoticfarms™." path="/admin/login" />
      <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-16">
        <div className="rounded-[2rem] border border-cream-300/80 bg-cream-50/80 p-8 shadow-sm">
          <h1 className="font-display text-3xl text-forest-900">Admin access</h1>
          <p className="mt-2 text-sm text-forest-900/70">
            This area edits public copy, contact details, map embed, and gallery ordering—stored in-browser for demo
            deployments until a CMS API is connected.
          </p>

          <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" {...form.register('password')} />
              {form.formState.errors.password?.message ? (
                <p className="text-xs text-red-700">{form.formState.errors.password.message}</p>
              ) : null}
            </div>
            <Button type="submit" disabled={busy}>
              {busy ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
