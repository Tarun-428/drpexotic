import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import type { SiteConfig } from '@/types/siteConfig'
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
  { label: 'FAQ', to: '/faq' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
]

export function Footer() {
  const brandName = useSiteConfigStore((s) => s.config.brandName)
  const socialLinks = useSiteConfigStore((s) => s.config.socialLinks)

  const visibleSocials = socialPlatforms.flatMap(({ key, label, Icon }) => {
    const url = socialLinks?.[key]?.trim()
    return url ? [{ key, label, Icon, url }] : []
  })

  return (
    <footer className="border-t border-neutral/10 bg-primary text-neutral">
      <div className="section-shell !py-6 sm:!py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-6">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2.5 mb-5" aria-label="DRP Exotic Farms home">
              <div className="h-10 w-10 bg-neutral rounded-lg flex items-center justify-center overflow-hidden">
                <img src={BrandLogo} alt="DRP Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold leading-none">
                  {brandName}
                  <sup>TM</sup>
                </span>
                <span className="text-[0.55rem] uppercase tracking-[0.2em] font-bold mt-1 text-neutral/50">
                  Cultivating Nourishment
                </span>
              </div>
            </Link>
            <p className="text-neutral/60 text-sm leading-relaxed mb-6">
              Pioneering sustainable and profitable exotic fruit farming in India through expert grower guidance, scientific management, and market support.
            </p>
            <div className="flex items-center gap-4">
              {visibleSocials.map(({ key, label, Icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-neutral/40 hover:text-accent transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-8">
            <div>
              <h4 className="font-bold uppercase tracking-widest text-[0.65rem] mb-5 text-accent">Explore</h4>
              <nav className="grid grid-cols-2 gap-x-8 gap-y-3">
                {navLinks.map(({ label, to }) => (
                  <Link
                    key={to}
                    to={to}
                    className="text-neutral/60 hover:text-neutral text-sm transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="max-w-[200px]">
              <h4 className="font-bold uppercase tracking-widest text-[0.65rem] mb-5 text-accent">Get Started</h4>
              <p className="text-neutral/60 mb-4 text-xs leading-relaxed">
                Ready to build your profitable orchard? Start your journey today.
              </p>
              <Link 
                to="/produce" 
                className="text-accent hover:text-accent/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
              >
                Learn More
                <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-neutral/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.65rem] text-neutral/30 font-medium">
          <p>© {new Date().getFullYear()} {brandName.replace('™', '')}™. All rights reserved.</p>
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
