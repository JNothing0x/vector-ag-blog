'use client'
import { useState } from 'react'
import Header from '@/components/Header'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    
    setStatus('loading')
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

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

        {status === 'success' ? (
          <div className="border border-neutral-700 rounded-2xl p-8 text-center bg-neutral-900/50">
            <p className="text-lg font-semibold text-white mb-2">Almost there.</p>
            <p className="text-neutral-400 text-sm">Check your inbox for a confirmation email to complete your subscription.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading'}
              className="w-full px-5 py-3.5 rounded-full border border-neutral-700 bg-neutral-900 text-white text-sm placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-white text-neutral-900 font-semibold px-6 py-3.5 rounded-full text-sm hover:bg-neutral-100 active:scale-95 transition-all disabled:opacity-40"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe Free →'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 text-sm mt-3 text-center">Something went wrong. Please try again.</p>
        )}

        <p className="text-xs text-neutral-600 mt-6 text-center">
          No spam. Unsubscribe anytime.
        </p>
      </section>
    </main>
  )
}
