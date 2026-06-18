import { motion } from 'framer-motion'
import { PageMeta } from '@/components/seo/PageMeta'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useSiteConfigStore } from '@/store/siteConfigStore'
import { buildWhatsAppUrl } from '@/utils/whatsapp'
import { LOCAL_ASSETS } from '@/constants/assets'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: 'easeOut' },
} as const

const faqCategories = [
  {
    category: 'Orchard Development',
    items: [
      {
        question: 'What is the minimum land requirement for a commercial exotic orchard?',
        answer: 'While we can establish orchards on smaller plots, for a truly viable commercial project, we recommend a minimum of 2 to 5 acres. This ensures economies of scale for infrastructure like irrigation and better market negotiation power for your harvest.'
      },
      {
        question: 'How long does it take to set up an orchard?',
        answer: 'From initial land assessment to complete plantation and system setup, the process typically takes 3 to 6 months depending on the crop, land readiness, and season.'
      }
    ]
  },
  {
    category: 'Crop Selection & Planting Material',
    items: [
      {
        question: 'How do you decide which crop is right for my land?',
        answer: 'We conduct a thorough scientific assessment of your soil profile, water quality, and local climatic conditions. Based on this data and your commercial goals, we recommend the most suitable exotic fruit varieties (like Dragon Fruit, Avocado, or Mango).'
      },
      {
        question: 'Do you provide the planting material?',
        answer: 'Yes. We supply premium, high-yield, and disease-resistant planting materials directly from our trusted nurseries to ensure the best foundation for your orchard.'
      }
    ]
  },
  {
    category: 'Irrigation & Farm Management',
    items: [
      {
        question: 'What kind of irrigation setup is required?',
        answer: 'Exotic crops require precise water management. We design and install automated drip irrigation systems tailored to your specific crop\'s needs, optimizing water use and nutrient delivery.'
      },
      {
        question: 'Do you offer ongoing farm management support?',
        answer: 'Absolutely. We are growers beside you. We provide step-by-step guidance on nutrition schedules, pruning, and pest management throughout the crop cycle.'
      }
    ]
  },
  {
    category: 'Harvest & Market Support',
    items: [
      {
        question: 'When can I expect my first harvest?',
        answer: 'This varies by crop. Dragon fruit typically starts yielding in 12-18 months, while crops like Avocado may take 3-4 years. We provide realistic timelines during the planning phase.'
      },
      {
        question: 'Do you help with selling the harvest?',
        answer: 'Yes. A successful orchard needs a strong market. We provide market linkage support, connecting your high-quality harvest with premium domestic retail networks and export channels.'
      }
    ]
  }
]

export default function FaqPage() {
  const whatsapp = useSiteConfigStore((s) => s.config.contact.whatsappE164)
  const wa = buildWhatsAppUrl(whatsapp, 'Hello DRP Exotic Farms, I have a few questions about starting an orchard.')

  return (
    <>
      <PageMeta
        title="FAQ | DRP Exotic Farms"
        description="Find answers to common questions about orchard development, planting material, crop selection, and market support."
        path="/faq"
      />

      <section className="bg-primary pt-24 pb-12 text-neutral relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={LOCAL_ASSETS.dragonFruitCut} alt="" className="w-full h-full object-cover opacity-10" />
        </div>
        <div className="section-shell relative z-10">
          <motion.div {...fadeIn} className="max-w-3xl mx-auto text-center">
            <span className="section-label border-neutral/20 bg-neutral/10 text-neutral">Grower Support</span>
            <h1 className="text-3xl sm:text-5xl font-display leading-tight mt-4 mb-4">
              Frequently Asked <span className="text-accent">Questions</span>
            </h1>
            <p className="text-base text-neutral/80 leading-relaxed max-w-2xl mx-auto">
              Clear, practical answers for farmers and landowners looking to build profitable exotic fruit orchards.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-secondary/20 py-16">
        <div className="section-shell">
          <div className="max-w-4xl mx-auto space-y-12">
            {faqCategories.map((categoryGroup, categoryIdx) => (
              <motion.div key={categoryGroup.category} {...fadeIn} transition={{ delay: categoryIdx * 0.1 }}>
                <h2 className="text-xl font-bold text-primary mb-6 border-b border-primary/10 pb-2">{categoryGroup.category}</h2>
                <Accordion type="multiple" className="space-y-3">
                  {categoryGroup.items.map((item, itemIdx) => (
                    <AccordionItem key={itemIdx} value={`${categoryIdx}-${itemIdx}`} className="bg-neutral/50 rounded-xl px-4 border-none shadow-sm">
                      <AccordionTrigger className="text-base font-semibold text-primary hover:no-underline text-left py-4">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-primary/80 pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-neutral text-center">
        <div className="section-shell py-16">
          <motion.div {...fadeIn} className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-display mb-6">Still have questions?</h2>
            <p className="text-neutral/70 mb-8 max-w-md mx-auto">
              We are growers who help other growers. Get in touch with us to discuss your specific land and vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="btn-primary">
                <a href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="btn-secondary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
