import { PageMeta } from '@/components/seo/PageMeta'

export default function PrivacyPage() {
  return (
    <>
      <PageMeta
        title="Privacy policy"
        description="How Drpexoticfarms™ collects, uses, and protects personal information on this website—including forms, maps, cookies, and marketing preferences."
        path="/privacy"
      />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="font-display text-4xl text-forest-900">Privacy policy</h1>
        <p className="mt-3 text-sm text-forest-900/60">Last updated: {new Date().toISOString().slice(0, 10)}</p>

        <div className="mt-10 space-y-8 text-forest-900/80">
          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Who we are</h2>
            <p>
              This website is operated by <strong>Drpexoticfarms™</strong> (“we”, “us”). Contact details published on the
              Contact page are authoritative for privacy-related requests.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">What we collect</h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Enquiries:</strong> name, email, phone, topic, and message content when you submit the contact
                form.
              </li>
              <li>
                <strong>Newsletter:</strong> email address and consent records when you subscribe.
              </li>
              <li>
                <strong>Technical data:</strong> basic logs from hosting/CDN providers (for example IP address, user
                agent, timestamps) as configured on your infrastructure.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Why we process data</h2>
            <p>
              We process data to respond to enquiries, operate the website, improve security, and—if you consent—send
              marketing updates.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Maps and third parties</h2>
            <p>
              Embedded maps (for example Google Maps) may collect data according to the map provider’s policies. Loading
              a map constitutes interaction with that provider’s services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Cookies</h2>
            <p>
              We use essential cookies required for basic functionality. Optional analytics or marketing cookies are only
              activated in line with your cookie choice banner where implemented.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Retention</h2>
            <p>
              Retention depends on your email provider, CRM, and hosting configuration. Align retention schedules with your
              legal counsel—especially for marketing lists and double opt-in records.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Your rights</h2>
            <p>
              Depending on applicable law (including Indian privacy developments), you may have rights to access, correct,
              delete, or restrict certain processing. Submit requests via the Contact page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Children</h2>
            <p>This website is not directed to children, and we do not knowingly collect children’s data.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-2xl text-forest-900">Updates</h2>
            <p>We may update this policy as operations evolve. Material changes should be communicated through the website.</p>
          </section>
        </div>
      </article>
    </>
  )
}
