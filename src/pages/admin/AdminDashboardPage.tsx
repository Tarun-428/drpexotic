import { useEffect, useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { DEFAULT_SITE_CONFIG, type GalleryImage } from '@/types/siteConfig'
import { useSiteConfigStore } from '@/store/siteConfigStore'

const gallerySchema = z.array(
  z.object({
    id: z.string().min(1),
    url: z.string().min(1),
    alt: z.string().min(1),
  }),
)

const tabTrigger =
  'rounded-full px-4 py-2 text-sm font-semibold text-forest-900/70 transition data-[state=active]:bg-forest-900 data-[state=active]:text-cream-50 hover:text-forest-900'

export default function AdminDashboardPage() {
  const config = useSiteConfigStore((s) => s.config)
  const updateHero = useSiteConfigStore((s) => s.updateHero)
  const updateContact = useSiteConfigStore((s) => s.updateContact)
  const updateNewsletter = useSiteConfigStore((s) => s.updateNewsletter)
  const setGallery = useSiteConfigStore((s) => s.setGallery)
  const reset = useSiteConfigStore((s) => s.reset)

  const [galleryText, setGalleryText] = useState(() => JSON.stringify(config.gallery, null, 2))
  const [addressDraft, setAddressDraft] = useState(() => config.contact.addressLines.join('\n'))

  useEffect(() => {
    setGalleryText(JSON.stringify(config.gallery, null, 2))
  }, [config.gallery])

  useEffect(() => {
    setAddressDraft(config.contact.addressLines.join('\n'))
  }, [config.contact.addressLines])

  return (
    <>
      <PageMeta title="Admin" description="Manage public website content for Drpexoticfarms™." path="/admin" />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl text-forest-900">Content &amp; settings</h1>
            <p className="mt-2 text-sm text-forest-900/70">
              Updates persist locally in this browser (demo CMS). Connect API endpoints in production.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Reset to defaults
            </Button>
          </div>
        </div>

        <Tabs.Root defaultValue="hero" className="mt-8">
          <Tabs.List className="flex flex-wrap gap-2 border-b border-cream-300/80 pb-3">
            <Tabs.Trigger className={tabTrigger} value="hero">
              Hero
            </Tabs.Trigger>
            <Tabs.Trigger className={tabTrigger} value="contact">
              Contact &amp; map
            </Tabs.Trigger>
            <Tabs.Trigger className={tabTrigger} value="newsletter">
              Newsletter
            </Tabs.Trigger>
            <Tabs.Trigger className={tabTrigger} value="gallery">
              Gallery JSON
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="hero" className="mt-6 rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="kicker">Kicker</Label>
                <Input id="kicker" value={config.heroHome.kicker} onChange={(e) => updateHero({ kicker: e.target.value })} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="title">Title</Label>
                <Textarea id="title" rows={3} value={config.heroHome.title} onChange={(e) => updateHero({ title: e.target.value })} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Textarea
                  id="subtitle"
                  rows={5}
                  value={config.heroHome.subtitle}
                  onChange={(e) => updateHero({ subtitle: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cta1">Primary CTA label</Label>
                <Input
                  id="cta1"
                  value={config.heroHome.primaryCta}
                  onChange={(e) => updateHero({ primaryCta: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cta2">Secondary CTA label</Label>
                <Input
                  id="cta2"
                  value={config.heroHome.secondaryCta}
                  onChange={(e) => updateHero({ secondaryCta: e.target.value })}
                />
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="contact" className="mt-6 rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="email">Public email</Label>
                <Input id="email" value={config.contact.email} onChange={(e) => updateContact({ email: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">WhatsApp (digits, country code)</Label>
                <Input
                  id="whatsapp"
                  inputMode="numeric"
                  value={config.contact.whatsappE164}
                  onChange={(e) => updateContact({ whatsappE164: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneDisplay">Phone (display)</Label>
                <Input
                  id="phoneDisplay"
                  value={config.contact.phoneDisplay}
                  onChange={(e) => updateContact({ phoneDisplay: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phoneTel">Phone (tel: href)</Label>
                <Input id="phoneTel" value={config.contact.phoneTel} onChange={(e) => updateContact({ phoneTel: e.target.value })} />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="address">Address lines (one per line)</Label>
                <Textarea
                  id="address"
                  rows={4}
                  value={addressDraft}
                  onChange={(e) => setAddressDraft(e.target.value)}
                  onBlur={() =>
                    updateContact({
                      addressLines: addressDraft
                        .split('\n')
                        .map((l) => l.trim())
                        .filter(Boolean),
                    })
                  }
                />
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="map">Google Maps embed URL (iframe src)</Label>
                <Textarea
                  id="map"
                  rows={4}
                  value={config.contact.mapEmbedUrl}
                  onChange={(e) => updateContact({ mapEmbedUrl: e.target.value })}
                />
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="newsletter" className="mt-6 rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nh">Heading</Label>
                <Input
                  id="nh"
                  value={config.newsletter.heading}
                  onChange={(e) => updateNewsletter({ heading: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nd">Description</Label>
                <Textarea
                  id="nd"
                  rows={4}
                  value={config.newsletter.description}
                  onChange={(e) => updateNewsletter({ description: e.target.value })}
                />
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="gallery" className="mt-6 rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-6">
            <div className="grid gap-3">
              <p className="text-sm text-forest-900/70">
                Provide a JSON array of objects: <code className="font-mono text-xs">{`{ id, url, alt }`}</code>. Keep{' '}
                {DEFAULT_SITE_CONFIG.gallery.length} items for best layout, but the UI will accept any valid list.
              </p>
              <Textarea rows={14} value={galleryText} onChange={(e) => setGalleryText(e.target.value)} className="font-mono text-xs" />
              <Button
                type="button"
                onClick={() => {
                  try {
                    const parsed = JSON.parse(galleryText) as unknown
                    const imgs = gallerySchema.parse(parsed) as GalleryImage[]
                    setGallery(imgs)
                    toast.success('Gallery saved')
                  } catch {
                    toast.error('Invalid JSON or schema')
                  }
                }}
              >
                Save gallery
              </Button>
            </div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </>
  )
}
