import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ExternalLink, Save } from 'lucide-react'
import { AdminPanel } from '@/components/admin/AdminShell'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import type { WebsiteSettings } from '@/types/cms'

const blankSettings: WebsiteSettings = {
  whatsapp_number: '',
  contact_phone_display: '',
  contact_phone_tel: '',
  email: '',
  farm_location: '',
  google_maps_embed_url: '',
  footer_content: '',
  social_links: { instagram: '', facebook: '', youtube: '', linkedin: '', twitter: '', whatsapp: '' },
  hero_cta_links: {
    primary_label: 'Explore our produce',
    primary_url: '/produce',
    secondary_label: 'Talk on WhatsApp',
    secondary_url: '',
  },
}

export default function AdminSettingsPage() {
  const token = useAuthStore((state) => state.token)
  const applyWebsiteSettings = useSiteConfigStore((state) => state.applyWebsiteSettings)
  const [settings, setSettings] = useState<WebsiteSettings>(blankSettings)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!token) return
    void api.getAdminSettings(token).then(setSettings).catch(() => undefined)
  }, [token])

  const save = async () => {
    if (!token) return
    setSaving(true)
    try {
      const saved = await api.updateAdminSettings(token, settings)
      setSettings(saved)
      applyWebsiteSettings(saved)
      toast.success('Website settings updated.')
    } catch {
      toast.error('Could not save settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <PageMeta title="Website settings" description="Contact, footer, social, and CTA settings for DRP Exotic Farms." path="/admin/settings" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex justify-end">
          <Button type="button" onClick={() => void save()} disabled={saving} size="icon" className="size-11 rounded-2xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950" aria-label="Save" title="Save">
            <Save className="size-4" />
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <AdminPanel className="p-5">
            <div className="mt-4 grid gap-3">
              <div className="text-sm text-zinc-600">Contact information shown on the site (phone, WhatsApp, email).</div>
              <Input value={settings.whatsapp_number} onChange={(event) => setSettings((s) => ({ ...s, whatsapp_number: event.target.value }))} aria-label="WhatsApp number" className="admin-field" />
              <Input value={settings.contact_phone_display} onChange={(event) => setSettings((s) => ({ ...s, contact_phone_display: event.target.value }))} aria-label="Display phone" className="admin-field" />
              <Input value={settings.contact_phone_tel} onChange={(event) => setSettings((s) => ({ ...s, contact_phone_tel: event.target.value }))} aria-label="Phone link" className="admin-field" />
              <Input value={settings.email} onChange={(event) => setSettings((s) => ({ ...s, email: event.target.value }))} aria-label="Email" className="admin-field" />
            </div>
          </AdminPanel>

          <AdminPanel className="p-5">
            <div className="mt-4 grid gap-3">
              <div className="text-sm text-zinc-600">Location and map embed — paste full Google Maps embed URL for correct rendering.</div>
              <Textarea rows={4} value={settings.farm_location} onChange={(event) => setSettings((s) => ({ ...s, farm_location: event.target.value }))} aria-label="Location" className="admin-field min-h-[7rem]" />
              <Input value={settings.google_maps_embed_url} onChange={(event) => setSettings((s) => ({ ...s, google_maps_embed_url: event.target.value }))} aria-label="Maps URL" className="admin-field" />
            </div>
          </AdminPanel>

          <AdminPanel className="p-5">
            <div className="mt-4 grid gap-3">
              <div className="text-sm text-zinc-600">Social links should be full URLs (https://...). These will be shown in the site footer and header areas.</div>
              <div className="grid gap-3">
                {(['instagram', 'facebook', 'youtube', 'linkedin', 'twitter', 'whatsapp'] as const).map((key) => {
                  const label = key === 'twitter' ? 'Twitter/X URL' : `${key[0].toUpperCase()}${key.slice(1)} URL`
                  return (
                    <div key={key}>
                      <label className="text-sm text-zinc-700">{label}</label>
                      <Input
                        value={settings.social_links?.[key] ?? ''}
                        onChange={(event) => setSettings((s) => ({ ...s, social_links: { ...s.social_links, [key]: event.target.value } }))}
                        placeholder="https://"
                        aria-label={label}
                        className="admin-field"
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          </AdminPanel>

          <AdminPanel className="p-5">
            <div className="mt-4 grid gap-3">
              <div className="text-sm text-zinc-600">Footer content and CTA labels. CTA labels and URLs appear on the homepage hero section.</div>
              <label className="text-sm text-zinc-700">Footer content</label>
              <Textarea rows={4} value={settings.footer_content} onChange={(event) => setSettings((s) => ({ ...s, footer_content: event.target.value }))} aria-label="Footer" className="admin-field min-h-[7rem]" />
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-zinc-700">Primary CTA label</label>
                  <Input value={settings.hero_cta_links.primary_label} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s.hero_cta_links, primary_label: event.target.value } }))} aria-label="Primary label" className="admin-field" />
                </div>
                <div>
                  <label className="text-sm text-zinc-700">Primary CTA URL</label>
                  <Input value={settings.hero_cta_links.primary_url} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s.hero_cta_links, primary_url: event.target.value } }))} aria-label="Primary URL" className="admin-field" />
                </div>
                <div>
                  <label className="text-sm text-zinc-700">Secondary CTA label</label>
                  <Input value={settings.hero_cta_links.secondary_label} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s.hero_cta_links, secondary_label: event.target.value } }))} aria-label="Secondary label" className="admin-field" />
                </div>
                <div>
                  <label className="text-sm text-zinc-700">Secondary CTA URL</label>
                  <Input value={settings.hero_cta_links.secondary_url} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s, hero_cta_links, secondary_url: event.target.value } }))} aria-label="Secondary URL" className="admin-field" />
                </div>
              </div>
            </div>
          </AdminPanel>
        </div>

        <div className="mt-5 flex justify-end">
          <Button asChild type="button" variant="ghost" size="icon" className="size-11 rounded-2xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950">
            <a href="/" target="_blank" rel="noreferrer" aria-label="Preview site" title="Preview site">
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
