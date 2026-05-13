import { PageMeta } from '@/components/seo/PageMeta'
import { motion } from 'framer-motion'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const faqs = [
  {
    q: 'Do you sell packaged products online today?',
    a: 'Not yet—packaged goods are planned. Phase 1 focuses on brand clarity, enquiries, and WhatsApp-led conversations. The Shop page explains the roadmap.',
  },
  {
    q: 'What fruits do you actively produce?',
    a: 'Blueberry, avocado, dragon fruit, Kesar mango, Red Diamond guava, and banana—grown with residue-aware discipline across a 50-acre estate footprint.',
  },
  {
    q: 'What does “turnkey orchard” include?',
    a: 'Land readiness, varietal selection, irrigation and support architecture, nutrition programmes, labour-friendly layouts, and harvest realism aligned to your markets—not just installation.',
  },
  {
    q: 'How do growers engage your team?',
    a: 'Start with WhatsApp or the contact form. For multi-site groups, we typically schedule a field walk-through and review water, labour, and commercial windows before proposing a programme.',
  },
  {
    q: 'Is SEO and performance part of the public site?',
    a: 'Yes—unique titles and descriptions per route, logical heading structure, readable routes, responsive imagery, and a static sitemap/robots baseline you can host at your domain root.',
  },
  {
    q: 'How does the newsletter signup work?',
    a: 'The form captures consent and uses double opt-in language. Wire your provider endpoint via environment configuration when ready; until then, submissions are acknowledged in-browser only.',
  },
] as const

export default function FaqPage() {
  return (
    <>
      <PageMeta
        title="FAQ"
        description="Answers to common questions about Drpexoticfarms™ produce, turnkey orchard programmes, online sales plans, and how to get in touch."
        path="/faq"
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-700">FAQ</p>
          <h1 className="mt-3 font-display text-4xl text-forest-900 sm:text-5xl">Straight answers, field language</h1>
          <p className="mt-4 text-pretty text-forest-900/75">
            If you need references under NDA or a programme deck, use the contact page—this section covers the most
            common digital enquiries.
          </p>
        </motion.header>

        <div className="mt-10 rounded-[2rem] border border-cream-300/80 bg-cream-50/70 p-4 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  )
}
