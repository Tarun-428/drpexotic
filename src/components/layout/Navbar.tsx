import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import { routePreloaders } from '@/routes/routePreloaders'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/produce', label: 'Produce' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
] as const

function NavItem({
  to,
  label,
  onClick,
}: {
  to: string
  label: string
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={() => {
        void routePreloaders[to]?.()
      }}
      onFocus={() => {
        void routePreloaders[to]?.()
      }}
      className={({ isActive }) =>
        cn(
          'rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200',
          isActive
            ? 'bg-primary text-neutral'
            : 'text-primary/70 hover:text-primary hover:bg-secondary/50',
        )
      }
    >
      {label}
    </NavLink>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(
    whatsapp,
    'Hello DRP Exotic Farms, I am looking for agricultural consultancy services.',
  )

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 py-4',
        scrolled ? 'bg-neutral/80 backdrop-blur-md border-b border-primary/5 py-3 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="DRP Exotic Farms home">
          <div data-intro-logo-target className="h-12 w-12 bg-neutral rounded-xl flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
            <img src={BrandLogo} alt="DRP Logo" className="h-full w-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className={cn('font-display text-xl font-bold leading-none transition-colors', scrolled ? 'text-primary' : 'text-neutral')}>
              DRP Exotic Farms
            </span>
            <span className={cn('text-[0.6rem] uppercase tracking-[0.2em] font-bold mt-1 transition-colors', scrolled ? 'text-primary/50' : 'text-neutral/50')}>
              Agricultural Consultancy
            </span>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-2 bg-secondary/30 p-1 rounded-full border border-primary/5">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-3">
          <Button asChild variant="secondary" size="sm">
            <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
          </Button>
          <Button asChild size="sm">
            <Link to="/contact">Book Consultation</Link>
          </Button>
        </div>

        <div className="xl:hidden">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-xl">
                <Menu className={cn('size-5', scrolled ? 'text-primary' : 'text-neutral')} />
              </Button>
            </DialogTrigger>
            <DialogSheet className="bg-neutral p-8 border-l border-primary/5">
              <DialogTitle className="text-3xl font-display text-primary mb-8">Menu</DialogTitle>
              <nav className="grid gap-4 mb-8">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-display text-primary/70 hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="grid gap-4">
                <Button asChild className="w-full">
                  <Link to="/contact" onClick={() => setOpen(false)}>Book Consultation</Link>
                </Button>
                <Button asChild variant="secondary" className="w-full">
                  <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
                </Button>
              </div>
            </DialogSheet>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
