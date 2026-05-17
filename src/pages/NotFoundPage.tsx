import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found" description="The page you requested could not be found." path="/404" />

      <div className="relative overflow-hidden">
        <section className="section-shell flex min-h-[72vh] items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="cinematic-surface max-w-4xl rounded-[2.4rem] p-8 sm:p-10"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-gold-600">404</p>
            <h1 className="mt-5 font-display text-[clamp(2.4rem,4vw,4.8rem)] leading-[0.94] text-forest-900">
              This orchard path has drifted out of view.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-forest-900/72">
              The page may have moved during a replant. Head back to the homepage or continue into produce, services,
              and contact from here.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/" className="inline-flex items-center gap-2">
                  Back to home
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/contact">Contact the team</Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  )
}
