import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ExternalLink, Save } from 'lucide-react'
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
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="section-label border-white/10 bg-white/8 text-cream-50/82">Website settings</span>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,4vw,4rem)] leading-[0.94] text-cream-50">
              Update public contact details without touching code.
            </h1>
          </div>
          <Button type="button" onClick={() => void save()} disabled={saving}>
            <Save className="size-4" />
            {saving ? 'Saving...' : 'Save settings'}
          </Button>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <section className="cinematic-surface rounded-[1.8rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Direct contact</p>
            <div className="mt-4 grid gap-3">
              <Input value={settings.whatsapp_number} onChange={(event) => setSettings((s) => ({ ...s, whatsapp_number: event.target.value }))} placeholder="WhatsApp number, e.g. 919876543210" className="admin-field" />
              <Input value={settings.contact_phone_display} onChange={(event) => setSettings((s) => ({ ...s, contact_phone_display: event.target.value }))} placeholder="Display phone number" className="admin-field" />
              <Input value={settings.contact_phone_tel} onChange={(event) => setSettings((s) => ({ ...s, contact_phone_tel: event.target.value }))} placeholder="Phone link, e.g. +919876543210" className="admin-field" />
              <Input value={settings.email} onChange={(event) => setSettings((s) => ({ ...s, email: event.target.value }))} placeholder="Email address" className="admin-field" />
            </div>
          </section>

          <section className="cinematic-surface rounded-[1.8rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Location</p>
            <div className="mt-4 grid gap-3">
              <Textarea rows={4} value={settings.farm_location} onChange={(event) => setSettings((s) => ({ ...s, farm_location: event.target.value }))} placeholder="Farm address / location notes" className="admin-field min-h-[7rem]" />
              <Input value={settings.google_maps_embed_url} onChange={(event) => setSettings((s) => ({ ...s, google_maps_embed_url: event.target.value }))} placeholder="Google Maps embed URL" className="admin-field" />
            </div>
          </section>

          <section className="cinematic-surface rounded-[1.8rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Social links</p>
            <div className="mt-4 grid gap-3">
              {(['instagram', 'facebook', 'youtube', 'linkedin', 'twitter', 'whatsapp'] as const).map((key) => (
                <Input
                  key={key}
                  value={settings.social_links?.[key] ?? ''}
                  onChange={(event) => setSettings((s) => ({ ...s, social_links: { ...s.social_links, [key]: event.target.value } }))}
                  placeholder={`${key === 'twitter' ? 'Twitter/X' : `${key[0].toUpperCase()}${key.slice(1)}`} URL`}
                  className="admin-field"
                />
              ))}
            </div>
          </section>

          <section className="cinematic-surface rounded-[1.8rem] border border-white/8 bg-white/6 p-5 text-cream-50">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold-400">Footer and CTAs</p>
            <div className="mt-4 grid gap-3">
              <Textarea rows={4} value={settings.footer_content} onChange={(event) => setSettings((s) => ({ ...s, footer_content: event.target.value }))} placeholder="Footer brand content" className="admin-field min-h-[7rem]" />
              <div className="grid gap-3 sm:grid-cols-2">
                <Input value={settings.hero_cta_links.primary_label} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s.hero_cta_links, primary_label: event.target.value } }))} placeholder="Primary CTA label" className="admin-field" />
                <Input value={settings.hero_cta_links.primary_url} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s.hero_cta_links, primary_url: event.target.value } }))} placeholder="Primary CTA URL" className="admin-field" />
                <Input value={settings.hero_cta_links.secondary_label} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s.hero_cta_links, secondary_label: event.target.value } }))} placeholder="Secondary CTA label" className="admin-field" />
                <Input value={settings.hero_cta_links.secondary_url} onChange={(event) => setSettings((s) => ({ ...s, hero_cta_links: { ...s.hero_cta_links, secondary_url: event.target.value } }))} placeholder="Secondary CTA URL" className="admin-field" />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[1.5rem] border border-white/8 bg-white/6 px-5 py-4 text-sm text-cream-50/72">
          <span>Saved changes are used by public pages as soon as they load.</span>
          <Button asChild type="button" variant="secondary" size="sm" className="border-white/12 bg-white/8 text-cream-50 hover:bg-white/12">
            <a href="/" target="_blank" rel="noreferrer">
              Preview site
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      </div>
    </>
  )
}
