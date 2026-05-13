import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_SITE_CONFIG, type SiteConfig } from '@/types/siteConfig'

type SiteConfigState = {
  config: SiteConfig
  patch: (partial: Partial<SiteConfig>) => void
  reset: () => void
  updateHero: (hero: Partial<SiteConfig['heroHome']>) => void
  updateContact: (c: Partial<SiteConfig['contact']>) => void
  updateNewsletter: (n: Partial<SiteConfig['newsletter']>) => void
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
      setGallery: (images) =>
        set((s) => ({
          config: { ...s.config, gallery: images },
        })),
    }),
    { name: 'drp-site-config-v1' },
  ),
)
