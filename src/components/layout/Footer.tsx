import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'
import { NewsletterForm } from '@/components/forms/NewsletterForm'
import { useSiteConfigStore } from '@/store/siteConfigStore'

export function Footer() {
  const newsletter = useSiteConfigStore((s) => s.config.newsletter)

  return (
    <footer className="border-t border-cream-300/80 bg-forest-900 text-cream-200">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-cream-200/10 text-gold-400 ring-1 ring-gold-500/30">
              <Sprout className="size-5" aria-hidden />
            </span>
            <span className="font-display text-2xl text-cream-50">Drpexoticfarms™</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream-200/80">
            Premium exotic and native fruits, residue-aware practices, and turnkey orchard programmes that help
            growers succeed beyond the first season.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-4">
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
                <Link className="hover:text-cream-50" to="/shop">
                  Shop (soon)
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
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
              <li>
                <Link className="hover:text-cream-50" to="/faq">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-cream-50" to="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">{newsletter.heading}</p>
          <p className="mt-2 text-sm text-cream-200/80">{newsletter.description}</p>
          <div className="mt-4 rounded-2xl border border-cream-200/15 bg-cream-50 p-4 text-forest-900 shadow-inner shadow-black/5">
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-cream-200/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-cream-200/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Drpexoticfarms™. All rights reserved.</p>
          <p className="text-cream-200/50">Packaged online sales are planned — subscribers hear first.</p>
        </div>
      </div>
    </footer>
  )
}
