import { LOCAL_GALLERY_IMAGES } from '@/constants/assets'

export type GalleryImage = {
  id: string
  url: string
  alt: string
}

export type SiteConfig = {
  brandName: string
  heroHome: {
    title: string
    subtitle: string
    kicker: string
    primaryCta: string
    primaryCtaUrl: string
    secondaryCta: string
    secondaryCtaUrl: string
  }
  footerContent: string
  socialLinks: {
    instagram: string
    facebook: string
    youtube: string
    linkedin: string
    twitter: string
    whatsapp: string
  }
  contact: {
    email: string
    phoneDisplay: string
    phoneTel: string
    whatsappE164: string
    addressLines: string[]
    mapEmbedUrl: string
  }
  newsletter: {
    heading: string
    description: string
  }
  gallery: GalleryImage[]
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: 'Drpexoticfarms™',
  heroHome: {
    kicker: 'Residue-aware · orchard-first · grower-backed',
    title: 'Exotic fruit, grown with discipline—and orchards built to last.',
    subtitle:
      'Fifty acres of clean, high-quality produce. Sixty-plus growers across one hundred five acres supported with turnkey orchard solutions that prioritise long-term success.',
    primaryCta: 'Explore our produce',
    primaryCtaUrl: '/produce',
    secondaryCta: 'Talk on WhatsApp',
    secondaryCtaUrl: '',
  },
  footerContent:
    'DRP Exotic Farms blends estate-grown produce, grower partnerships, and long-horizon orchard programmes into one continuous experience.',
  socialLinks: {
    instagram: '',
    facebook: '',
    youtube: '',
    linkedin: '',
    twitter: '',
    whatsapp: '',
  },
  contact: {
    email: 'hello@drpexoticfarms.example',
    phoneDisplay: '+91 — configure in admin',
    phoneTel: '+910000000000',
    whatsappE164: import.meta.env.VITE_WHATSAPP_PHONE ?? '919876543210',
    addressLines: ['India — update precise farm / office address in admin settings.'],
    mapEmbedUrl:
      import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL ??
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.0!2d75.8577!3d22.7196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b0e1eaf%3A0xc3a449dae441bcdf!2sIndore!5e0!3m2!1sen!2sin!4v1',
  },
  newsletter: {
    heading: 'Harvest notes & orchard insights',
    description:
      'Occasional updates on seasonality, orchard practices, and when packaged goods go live—double opt-in where your provider requires it.',
  },
  gallery: [...LOCAL_GALLERY_IMAGES],
}
