import { PageMeta } from '@/components/seo/PageMeta'

export default function TermsPage() {
  return (
    <>
      <PageMeta
        title="Terms & conditions"
        description="Terms governing use of the Drpexoticfarms™ website, enquiries, content accuracy, and limitations of liability."
        path="/terms"
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl text-forest-900">Terms &amp; conditions</h1>
        <p className="mt-3 text-sm text-forest-900/60">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <div className="mt-10 space-y-8 text-forest-900/80">
          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Use of this website</h2>
            <p>
              By accessing this website, you agree to these terms. If you disagree, discontinue use. Content is provided
              for general information and does not constitute agronomic, legal, or financial advice on its own.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Accuracy</h2>
            <p>
              We aim for accuracy in describing programmes, geographies served, and produce characteristics. Field
              outcomes depend on weather, execution, and market factors beyond any website narrative.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Enquiries and reliance</h2>
            <p>
              Messages sent through forms or WhatsApp do not create a binding contract until confirmed in writing by
              authorised representatives with agreed commercial terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Intellectual property</h2>
            <p>
              Text, imagery, layouts, and branding elements are owned by Drpexoticfarms™ or used under licence.
              Unauthorised copying or scraping may violate applicable law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Third-party services</h2>
            <p>
              Maps, analytics, email providers, and hosting platforms operate under their own terms. Your infrastructure
              choices may add additional obligations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, we are not liable for indirect or consequential losses arising from
              use of the website or reliance on its content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Governing law</h2>
            <p>
              These terms are intended to be governed by the laws of India unless a separate written agreement specifies
              otherwise.
            </p>
          </section>
        </div>
      </article>
    </>
  )
}
