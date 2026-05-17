import { motion } from 'framer-motion'
import { HelpCircle, Leaf, MessageCircleMore } from 'lucide-react'
import { PageMeta } from '@/components/seo/PageMeta'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { LOCAL_ASSETS } from '@/constants/assets'

const categories = [
  {
    title: 'Produce & sales',
    items: [
      {
        q: 'Do you sell packaged products online today?',
        a: 'Not yet. The Shop experience is being cultivated as a premium extension of the orchard brand, so current packaged goods and special requests are handled through direct conversations.',
      },
      {
        q: 'What fruits do you actively produce?',
        a: 'Blueberry, avocado, dragon fruit, Kesar mango, Red Diamond guava, and banana, all managed with a residue-aware, orchard-first discipline.',
      },
    ],
  },
  {
    title: 'Orchard programmes',
    items: [
      {
        q: 'What does “turnkey orchard” include?',
        a: 'Land readiness, varietal selection, irrigation and support architecture, nutrition programmes, labour-friendly layouts, and harvest realism aligned to your markets.',
      },
      {
        q: 'How do growers engage your team?',
        a: 'Most relationships begin with a structured conversation around geography, water, labour, and commercial intent before any programme shape is proposed.',
      },
    ],
  },
  {
    title: 'Digital & support',
    items: [
      {
        q: 'How does the newsletter signup work?',
        a: 'The form captures consent with double opt-in language. Once your email provider is connected, subscriptions can flow directly into that system.',
      },
      {
        q: 'Can you share references or a deeper programme deck?',
        a: 'Yes. Use the Contact page if you need a tailored response, buyer-facing references, or a more private conversation around a serious project.',
      },
    ],
  },
] as const

export default function FaqPage() {
  return (
    <>
      <PageMeta
        title="FAQ"
        description="A premium support experience with answers about DRP Exotic Farms produce, orchard services, partnerships, and direct enquiry flow."
        path="/faq"
      />

      <div className="relative overflow-hidden">
        <section className="relative isolate overflow-hidden bg-[#102f24] text-cream-50">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(8,24,18,0.25), rgba(8,24,18,0.82)), url(${LOCAL_ASSETS.dragonFruitRows})`,
            }}
          />
          <div className="section-shell relative z-10 py-18 sm:py-24 lg:py-28">
            <div className="max-w-4xl">
              <span className="section-label border-white/14 bg-white/8 text-cream-50/82">
                <HelpCircle className="size-4 text-gold-400" />
                FAQ
              </span>
              <h1 className="editorial-title mt-6 max-w-5xl text-cream-50">
                Straight answers, shaped with the same care as the rest of the experience.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-50/74 sm:text-lg lg:mt-6 lg:text-xl">
                Think of this page as a premium support lounge rather than a dry help centre. It is here to reduce
                friction while keeping the tone warm, clear, and human.
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-14 sm:py-18 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            <div>
              <span className="section-label">
                <Leaf className="size-4 text-gold-600" />
                Support categories
              </span>
              <h2 className="section-title mt-6 text-forest-900">Questions grouped by what visitors actually need to understand next.</h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-forest-900/72">
                Instead of one long wall of accordions, the conversation is organized around produce, orchard
                programmes, and digital support.
              </p>
            </div>

            <div className="responsive-stack-grid gap-4 sm:gap-5">
              {categories.map((category, index) => (
                <motion.section
                  key={category.title}
                  initial={{ opacity: 0, y: 24, scale: 0.99 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.75, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-4"
                >
                  <div className="cinematic-surface rounded-[1.8rem] p-5">
                    <p className="font-display text-3xl leading-none text-forest-900">{category.title}</p>
                  </div>
                  <Accordion type="single" collapsible className="grid gap-4">
                    {category.items.map((item, index) => (
                      <AccordionItem key={`${item.q}-${index}`} value={item.q}>
                        <AccordionTrigger>{item.q}</AccordionTrigger>
                        <AccordionContent>{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.section>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell pb-18 pt-8 sm:pb-24 sm:pt-10 lg:pb-28">
          <div className="cinematic-surface grid gap-6 rounded-[2.2rem] p-8 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <span className="section-label">
                <MessageCircleMore className="size-4 text-gold-600" />
                Still need help?
              </span>
              <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,3.8rem)] leading-[0.96] text-forest-900">
                For nuanced sourcing, orchard planning, or partnership questions, the direct conversation is always better.
              </h2>
            </div>
            <div className="rounded-[1.6rem] bg-forest-900 px-6 py-5 text-sm leading-relaxed text-cream-50/78">
              Use the Contact page or WhatsApp for responses tailored to your estate, project, or buying context.
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
