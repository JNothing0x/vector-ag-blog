import Header from '@/components/Header'

export const metadata = {
  title: 'Subscribe | Tech Culture Club',
  description: 'Weekly intelligence on AI, culture, and the frameworks that matter.',
}

export default function SubscribePage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      <section className="max-w-lg mx-auto px-5 py-20 sm:py-28">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-medium">Tech Culture Club</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4 leading-tight">
          Join the Club.
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed">
          Weekly intelligence on AI, culture, and the frameworks that matter. One issue per week. No noise.
        </p>

        {/* Substack embed form - official API */}
        <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
          <iframe 
            src="https://techcultureclub.substack.com/embed" 
            width="100%" 
            height="120" 
            style={{ border: 'none', background: 'transparent' }}
            frameBorder="0" 
            scrolling="no"
            title="Subscribe to Tech Culture Club"
          />
        </div>

        <p className="text-xs text-neutral-600 mt-6 text-center">
          No spam. Unsubscribe anytime.
        </p>
      </section>
    </main>
  )
}
