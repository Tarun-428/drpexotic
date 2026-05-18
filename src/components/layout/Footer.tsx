import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import type { SiteConfig } from '@/types/siteConfig'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import BrandLogo from '../../../img/logo.svg'

const socialPlatforms: Array<{ key: keyof SiteConfig['socialLinks']; label: string; Icon: IconType }> = [
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
  { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'twitter', label: 'Twitter/X', Icon: FaXTwitter },
  { key: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp },
]

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Produce', to: '/produce' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
]

export function Footer() {
  const brandName = useSiteConfigStore((s) => s.config.brandName)
  const socialLinks = useSiteConfigStore((s) => s.config.socialLinks)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)

  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello Drpexoticfarms — I would like to enquire about the farm experience and produce.',
  )

  const visibleSocials = socialPlatforms.flatMap(({ key, label, Icon }) => {
    const url = socialLinks?.[key]?.trim()
    return url ? [{ key, label, Icon, url }] : []
  })

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-forest-900 text-cream-200">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(200,169,107,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 80% at 90% 50%, rgba(90,143,99,0.09) 0%, transparent 60%)',
        }}
      />

      <div className="section-shell relative z-10 px-5 py-8 sm:px-6">

        {/* ── Single row: brand | nav | socials | cta ── */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Brand */}
          <div className="brand-lockup shrink-0">
            <span className="brand-lockup__mark rounded-full bg-white p-1.5">
              <img
                src={BrandLogo}
                alt={`${brandName} logo`}
                className="brand-lockup__mark-logo"
                decoding="async"
              />
            </span>
            <div className="brand-lockup__text">
              <span className="brand-lockup__name text-cream-50">
                {brandName}
                <sup>TM</sup>
              </span>
              <span className="brand-lockup__tagline text-cream-200/40">
                Cinematic Orchard Estate
              </span>
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-[0.76rem] text-cream-200/52 transition-colors duration-150 hover:text-cream-50"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Socials + CTA */}
          <div className="flex items-center gap-2.5 shrink-0">
            {visibleSocials.map(({ key, label, Icon, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-8 items-center justify-center rounded-full border border-cream-200/12 bg-white/5 text-cream-200/55 transition-all duration-200 hover:border-gold-400/38 hover:bg-gold-400/10 hover:text-gold-300"
              >
                <Icon className="size-3.5" aria-hidden />
              </a>
            ))}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex h-8 items-center gap-1.5 rounded-full border border-gold-500/35 bg-gold-400/10 px-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-gold-300 transition-all duration-200 hover:bg-gold-400/18 hover:text-gold-200"
            >
              Chat
              <ArrowUpRight className="size-3" />
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-6 flex flex-col gap-1.5 border-t border-white/8 pt-5 text-[0.68rem] text-cream-200/36 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Drpexoticfarms™. All rights reserved.</p>
          <p>Packaged online sales are planned. Subscribers will hear first.</p>
        </div>
      </div>
    </footer>
  )
}
