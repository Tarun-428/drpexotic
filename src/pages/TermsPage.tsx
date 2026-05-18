import { PageMeta } from '@/components/seo/PageMeta'

const sections = [
  {
    title: 'Use of this website',
    body: 'By accessing this website, you agree to these terms. Content is provided for general information and does not replace agronomic, legal, or financial advice.',
  },
  {
    title: 'Accuracy and reliance',
    body: 'DRP aims to describe its programmes and produce truthfully, but field outcomes always depend on weather, execution, and market dynamics beyond any website narrative.',
  },
  {
    title: 'Enquiries and contracts',
    body: 'Messages sent through forms, email, or WhatsApp do not create a binding agreement until confirmed in writing with agreed commercial terms.',
  },
  {
    title: 'Intellectual property',
    body: 'Text, layout, imagery, and brand elements belong to Drpexoticfarms™ or are used under license. Unauthorized copying or scraping may violate applicable law.',
  },
  {
    title: 'Third-party services and liability',
    body: 'Maps, hosting, analytics, and communication platforms operate under their own terms. To the extent permitted by law, DRP is not liable for indirect or consequential losses arising from website use.',
  },
] as const

export default function TermsPage() {
  return (
    <>
      <PageMeta
        title="Terms & conditions"
        description="Terms governing use of the DRP Exotic Farms website, enquiries, third-party services, and content reliance."
        path="/terms"
      />

      <div className="relative overflow-hidden">
        <section className="section-shell page-section-intro">
          <div className="max-w-4xl">
            <span className="section-label">Terms &amp; conditions</span>
            <h1 className="section-title mt-6 text-forest-900">Clear terms, presented with the same sense of care as every other page.</h1>
            <p className="mt-4 text-sm text-forest-900/55">Last updated: {new Date().toISOString().slice(0, 10)}</p>
          </div>

          <div className="responsive-stack-grid mt-8 gap-4 sm:mt-10 sm:gap-5">
            {sections.map((section) => (
              <article key={section.title} className="cinematic-surface rounded-[1.9rem] p-6">
                <h2 className="font-display text-3xl leading-none text-forest-900">{section.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-forest-900/70">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
