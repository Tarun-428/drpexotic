import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, Sprout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
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

  return (
    <header className="sticky top-0 z-40 border-b border-cream-300/70 bg-cream-200/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-forest-900 text-gold-500 shadow-glow transition group-hover:rotate-[-6deg]">
            <Sprout className="size-5" aria-hidden />
          </span>
          <span className="font-display text-lg leading-none text-forest-900 sm:text-xl">Drpexoticfarms™</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild variant="secondary" size="sm">
            <a href={wa} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button asChild size="sm">
            <Link to="/contact">Plan a visit</Link>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button asChild size="sm">
            <a href={wa} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </Button>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="fixed inset-0 left-0 top-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-6 rounded-none border-0 bg-cream-200 p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <DialogTitle className="font-display text-2xl">Menu</DialogTitle>
              </div>
              <div className="grid gap-2">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-2xl border border-cream-300 bg-cream-50/70 px-4 py-3 text-base font-semibold text-forest-900"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="mt-auto grid gap-2">
                <Button asChild>
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    Contact
                  </Link>
                </Button>
                <Button asChild variant="secondary">
                  <a href={wa} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
                    WhatsApp
                  </a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      </AnimatePresence>
    </header>
  )
}
