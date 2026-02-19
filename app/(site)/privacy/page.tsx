import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Tech Culture Club',
  description: 'How Tech Culture Club collects, uses, and protects your data. GDPR and CCPA compliant.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="max-w-2xl mx-auto px-5 py-20">
        <h1 className="text-3xl font-semibold mb-2">Privacy Policy</h1>
        <p className="text-neutral-500 text-sm mb-10">Last updated: February 19, 2026</p>

        <div className="space-y-8 text-neutral-300 leading-relaxed">
          <section>
            <h2 className="text-lg font-medium text-white mb-3">What we collect</h2>
            <p>When you subscribe to Tech Culture Club, we collect:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
              <li>Your email address (required for newsletter delivery)</li>
              <li>Subscription date and source (for analytics)</li>
              <li>Optional: UTM parameters if you came via a campaign link</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">How we use your data</h2>
            <ul className="list-disc list-inside space-y-1 text-neutral-400">
              <li>Send you the Tech Culture Club newsletter</li>
              <li>Track open rates and click rates (to improve content)</li>
              <li>Occasionally notify you of important updates</li>
            </ul>
            <p className="mt-3 text-neutral-400">We do not sell, rent, or share your email with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">Third-party services</h2>
            <p className="text-neutral-400">We use:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
              <li><strong>Beehiiv</strong> — for newsletter delivery and subscriber management</li>
              <li><strong>GitHub</strong> — for backup storage of subscriber list</li>
              <li><strong>Vercel Analytics</strong> — for anonymous site usage statistics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">Your rights (GDPR/CCPA)</h2>
            <p className="text-neutral-400">You can:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-400">
              <li>Unsubscribe anytime via the link in any email</li>
              <li>Request a copy of your data</li>
              <li>Request deletion of your data</li>
              <li>Contact us with privacy questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">Cookies</h2>
            <p className="text-neutral-400">We use minimal cookies for analytics. No tracking cookies from advertisers. No Facebook pixel. No Google Ads.</p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-white mb-3">Contact</h2>
            <p className="text-neutral-400">Privacy questions? Email <a href="mailto:john.commandcenter@gmail.com" className="text-white underline underline-offset-2">john.commandcenter@gmail.com</a></p>
          </section>

          <div className="pt-8 border-t border-neutral-800">
            <p className="text-neutral-500 text-sm">Tech Culture Club is a publication by John. Based in Switzerland. Operating globally.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
