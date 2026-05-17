import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/types/siteConfig'
import type { WebsiteSettings } from '@/types/cms'

type SiteConfigState = {
  config: SiteConfig
  patch: (partial: Partial<SiteConfig>) => void
  reset: () => void
  updateHero: (hero: Partial<SiteConfig['heroHome']>) => void
  updateContact: (c: Partial<SiteConfig['contact']>) => void
  updateNewsletter: (n: Partial<SiteConfig['newsletter']>) => void
  applyWebsiteSettings: (settings: WebsiteSettings) => void
  setGallery: (images: SiteConfig['gallery']) => void
}

export const useSiteConfigStore = create(
  persist<SiteConfigState>(
    (set) => ({
      config: DEFAULT_SITE_CONFIG,
      patch: (partial) =>
        set((s) => ({
          config: { ...s.config, ...partial },
        })),
      reset: () => set({ config: DEFAULT_SITE_CONFIG }),
      updateHero: (hero) =>
        set((s) => ({
          config: {
            ...s.config,
            heroHome: { ...s.config.heroHome, ...hero },
          },
        })),
      updateContact: (c) =>
        set((s) => ({
          config: {
            ...s.config,
            contact: { ...s.config.contact, ...c },
          },
        })),
      updateNewsletter: (n) =>
        set((s) => ({
          config: {
            ...s.config,
            newsletter: { ...s.config.newsletter, ...n },
          },
        })),
      applyWebsiteSettings: (settings) =>
        set((s) => ({
          config: {
            ...s.config,
            heroHome: {
              ...s.config.heroHome,
              primaryCta: settings.hero_cta_links.primary_label || s.config.heroHome.primaryCta,
              primaryCtaUrl: settings.hero_cta_links.primary_url || s.config.heroHome.primaryCtaUrl,
              secondaryCta: settings.hero_cta_links.secondary_label || s.config.heroHome.secondaryCta,
              secondaryCtaUrl: settings.hero_cta_links.secondary_url || s.config.heroHome.secondaryCtaUrl,
            },
            footerContent: settings.footer_content || s.config.footerContent,
            socialLinks: {
              instagram: settings.social_links?.instagram || '',
              facebook: settings.social_links?.facebook || '',
              youtube: settings.social_links?.youtube || '',
              linkedin: settings.social_links?.linkedin || '',
              twitter: settings.social_links?.twitter || '',
              whatsapp: settings.social_links?.whatsapp || '',
            },
            contact: {
              ...s.config.contact,
              email: settings.email || s.config.contact.email,
              phoneDisplay: settings.contact_phone_display || s.config.contact.phoneDisplay,
              phoneTel: settings.contact_phone_tel || s.config.contact.phoneTel,
              whatsappE164: settings.whatsapp_number || s.config.contact.whatsappE164,
              addressLines: settings.farm_location ? settings.farm_location.split('\n').filter(Boolean) : s.config.contact.addressLines,
              mapEmbedUrl: settings.google_maps_embed_url || s.config.contact.mapEmbedUrl,
            },
          },
        })),
      setGallery: (images) =>
        set((s) => ({
          config: { ...s.config, gallery: images },
        })),
    }),
    { name: 'drp-site-config-v1' },
  ),
)
