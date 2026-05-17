import { Link } from 'react-router-dom'
import { ArrowUpRight, Sprout } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import type { SiteConfig } from '@/types/siteConfig'
import { buildWhatsAppUrl } from '@/utils/whatsapp'

const socialPlatforms: Array<{ key: keyof SiteConfig['socialLinks']; label: string; Icon: IconType }> = [
  { key: 'instagram', label: 'Instagram', Icon: FaInstagram },
  { key: 'facebook', label: 'Facebook', Icon: FaFacebookF },
  { key: 'youtube', label: 'YouTube', Icon: FaYoutube },
  { key: 'linkedin', label: 'LinkedIn', Icon: FaLinkedinIn },
  { key: 'twitter', label: 'Twitter/X', Icon: FaXTwitter },
  { key: 'whatsapp', label: 'WhatsApp', Icon: FaWhatsapp },
]

export function Footer() {
  const brandName = useSiteConfigStore((s) => s.config.brandName)
  const footerContent = useSiteConfigStore((s) => s.config.footerContent)
  const newsletter = useSiteConfigStore((s) => s.config.newsletter)
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(200,169,107,0.18),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(90,143,99,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
      <div className="section-shell relative grid gap-10 py-18 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-cream-200/10 text-gold-400 ring-1 ring-gold-500/30">
              <Sprout className="size-5" aria-hidden />
            </span>
            <span className="font-display text-2xl text-cream-50">{brandName}</span>
          </div>
          <p className="mt-5 max-w-lg font-display text-[clamp(1.8rem,3vw,3rem)] leading-[1.02] text-cream-50">
            A premium orchard story shaped by calm systems, living soil, and fruit worth remembering.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-200/78">
            {footerContent}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="sm" className="w-fit">
              <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                Start a conversation
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="sm" variant="secondary" className="w-fit border-white/20 bg-white/8 text-cream-50 hover:bg-white/12">
              <Link to="/contact">Plan your visit</Link>
            </Button>
          </div>
          {visibleSocials.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {visibleSocials.map(({ key, label, Icon, url }) => (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit DRP Exotic Farms on ${label}`}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-cream-200/15 bg-cream-50/6 text-cream-100 transition duration-300 hover:-translate-y-0.5 hover:border-gold-400/45 hover:bg-gold-400/12 hover:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="hover:text-cream-50" to="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/produce">
                  Produce
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/growers">
                  Grower network
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/journal">
                  Journal
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/shop">
                  Shop (soon)
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">Visit</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="hover:text-cream-50" to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/gallery">
                  Gallery
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/privacy">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/terms">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">{newsletter.heading}</p>
          <p className="mt-2 max-w-sm text-sm text-cream-200/80">{newsletter.description}</p>
          <div className="mt-4 rounded-[1.75rem] border border-cream-200/15 bg-cream-50 p-4 text-forest-900 shadow-inner shadow-black/5">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-cream-200/10">
        <div className="section-shell flex flex-col gap-2 py-6 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Drpexoticfarms™. All rights reserved.</p>
          <p className="text-cream-200/50">Packaged online sales are planned. Subscribers will hear first.</p>
        </div>
      </div>
    </footer>
  )
}
