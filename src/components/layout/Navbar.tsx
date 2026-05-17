import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LOCAL_ASSETS } from '@/constants/assets'
import BrandLogo from '../../../img/logo.svg'
import {
  Dialog,
  DialogSheet,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { cn } from '@/lib/utils'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/produce', label: 'Produce' },
  { to: '/growers', label: 'Growers' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/journal', label: 'Journal' },
  { to: '/shop', label: 'Shop' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
] as const

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'rounded-full px-3 py-2 text-sm font-medium text-forest-900/80 transition hover:text-forest-900',
          isActive && 'bg-cream-300/70 text-forest-900',
        )
      }
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello Drpexoticfarms — I would like guidance on produce / orchard services.',
  )

  // Lock body scroll when mobile menu is open to avoid background scroll conflicts
  useEffect(() => {
    const { body, documentElement } = document
    if (!open) {
      body.style.overflow = ''
      documentElement.style.overflow = ''
      body.style.paddingRight = ''
      return
    }

    const scrollY = window.scrollY
    const prev = {
      overflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
      paddingRight: body.style.paddingRight,
    }

    const scrollbarWidth = window.innerWidth - documentElement.clientWidth
    body.style.overflow = 'hidden'
    documentElement.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      body.style.overflow = prev.overflow
      documentElement.style.overflow = prev.htmlOverflow
      body.style.paddingRight = prev.paddingRight
      window.scrollTo(0, scrollY)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div className="cinematic-surface header-glass mx-auto flex h-[4.1rem] max-w-[min(100%,96rem)] items-center justify-between rounded-full px-3 sm:h-[4.45rem] sm:px-4 lg:px-5">
        <Link to="/" className="brand-lockup group" aria-label="Drpexoticfarms home">
          <span className="brand-lockup__mark" data-intro-logo-target>
            <img src={BrandLogo} alt="" className="brand-lockup__mark-logo" aria-hidden="true" decoding="async" />
          </span>
          <div className="brand-lockup__text">
            <span className="brand-lockup__name">
              Drpexoticfarms<sup>TM</sup>
            </span>
            <span className="brand-lockup__tagline">Cinematic Orchard Estate</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <Button asChild variant="secondary" size="sm">
            <a href={wa} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button asChild size="sm" className="shadow-[0_14px_30px_-18px_rgba(11,61,46,0.75)]">
            <Link to="/contact" className="inline-flex items-center gap-2">
              Plan a visit
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" aria-label="Open menu" className="rounded-full">
                <motion.span
                  animate={{ rotate: open ? 90 : 0, scale: open ? 1.05 : 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="inline-flex"
                >
                  <Menu className="size-5" />
                </motion.span>
              </Button>
            </DialogTrigger>
            <DialogSheet
              className="h-[56dvh] max-h-[62dvh] overflow-y-auto overscroll-contain hide-scrollbar rounded-b-[2.1rem] border-white/10 bg-cover bg-center p-5 text-cream-50 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.6)] backdrop-blur-sm transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-b-[2.5rem] sm:p-8"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(11,61,46,0.92), rgba(27,135,103,0.5)), url(${LOCAL_ASSETS.dragonFruitRows})`,
              }}
            >
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display text-3xl">Menu</DialogTitle>
              </div>
              <div>
                <p className="max-w-xs text-sm leading-relaxed text-cream-50/72">
                  Explore the estate, orchard programmes, signature produce, and the people shaping the farm.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-[1.3rem] border border-white/15 bg-white/8 px-4 py-3 text-sm font-semibold text-cream-50 backdrop-blur sm:rounded-[1.6rem] sm:px-5 sm:text-base"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto grid gap-2">
                <Button asChild>
                  <Link to="/contact" onClick={() => setOpen(false)} className="inline-flex items-center gap-2">
                    Contact
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <a href={wa} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </DialogSheet>
          </Dialog>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-10 bottom-0 h-px rounded-full bg-gradient-to-r from-transparent via-gold-500/70 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
    </header>
  )
}
