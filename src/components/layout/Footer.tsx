import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import type { SiteConfig } from '@/types/siteConfig'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { Button } from '@/components/ui/button'
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
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

export function Footer() {
  const brandName = useSiteConfigStore((s) => s.config.brandName)
  const socialLinks = useSiteConfigStore((s) => s.config.socialLinks)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)

  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello DRP Exotic Farms, I am interested in your agricultural consultancy services.',
  )

  const visibleSocials = socialPlatforms.flatMap(({ key, label, Icon }) => {
    const url = socialLinks?.[key]?.trim()
    return url ? [{ key, label, Icon, url }] : []
  })

  return (
    <footer className="border-t-4 border-accent/55 bg-primary text-neutral shadow-[inset_0_18px_0_rgba(253,250,244,0.06)] py-16 sm:py-24">
      <div className="section-shell">
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-8" aria-label="DRP Exotic Farms home">
              <div className="h-12 w-12 bg-neutral rounded-xl flex items-center justify-center overflow-hidden">
                <img src={BrandLogo} alt="DRP Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold leading-none">
                  {brandName}
                  <sup>TM</sup>
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold mt-1 text-neutral/50">
                  Agricultural Consultancy
                </span>
              </div>
            </Link>
            <p className="text-neutral/70 max-w-sm mb-8 leading-relaxed">
              Pioneering sustainable and profitable exotic fruit farming in India through expert consultancy, scientific management, and market support.
            </p>
            <div className="flex items-center gap-4">
              {visibleSocials.map(({ key, label, Icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-neutral/50 hover:text-accent transition-colors"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-accent">Quick Links</h4>
              <nav className="grid gap-4">
                {navLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-neutral/70 hover:text-neutral transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-accent">Get Started</h4>
              <p className="text-neutral/70 mb-6 text-sm">
                Ready to build your profitable orchard? Book a consultation today.
              </p>
              <Button asChild size="sm" className="w-full sm:w-auto">
                <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                  Book Consultation
                  <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral/40">
          <p>© {new Date().getFullYear()} {brandName}™. All rights reserved.</p>
          <nav className="flex items-center gap-6">
            {legalLinks.map(({ label, to }) => (
              <Link key={to} to={to} className="hover:text-neutral transition-colors">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
