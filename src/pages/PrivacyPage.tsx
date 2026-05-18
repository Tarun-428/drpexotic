import { PageMeta } from '@/components/seo/PageMeta'

const sections = [
  {
    title: 'Who we are',
    body: 'This website is operated by Drpexoticfarms™. The contact details published on the Contact page are the authoritative route for privacy-related requests.',
  },
  {
    title: 'What we collect',
    body: 'We collect enquiry details, newsletter consent records, and limited technical information generated through hosting and infrastructure providers.',
  },
  {
    title: 'Why we process data',
    body: 'We use data to respond to enquiries, operate the website, improve security, and send updates only where consent has been given.',
  },
  {
    title: 'Maps, cookies, and third parties',
    body: 'Embedded map providers and connected services may process data according to their own policies. Optional tracking should only be activated in line with consent choices where implemented.',
  },
  {
    title: 'Retention and rights',
    body: 'Retention depends on your provider stack and legal obligations. Depending on applicable law, visitors may have rights to access, correct, delete, or restrict processing.',
  },
] as const

export default function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Privacy policy"
        description="How DRP Exotic Farms collects, uses, and protects personal information across forms, maps, and communication workflows."
        path="/privacy"
      />

      <div className="relative overflow-hidden">
        <section className="section-shell page-section-intro">
          <div className="max-w-4xl">
            <span className="section-label">Privacy policy</span>
            <h1 className="section-title mt-6 text-forest-900">Privacy, handled with the same calm clarity as the rest of the brand.</h1>
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
