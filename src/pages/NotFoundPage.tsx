import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageMeta } from '@/components/seo/PageMeta'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found" description="The page you requested could not be found." path="/404" />
      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center px-4 py-20 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">404</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">This row isn’t planted</h1>
          <p className="mt-4 text-forest-900/75">
            The URL may have moved during a replant. Head home or jump to produce and services.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/">Back to home</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/contact">Contact</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
