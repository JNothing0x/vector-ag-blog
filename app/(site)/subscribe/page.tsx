'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Tech Culture Club
          </Link>
        </div>
      </header>

      <section className="max-w-lg mx-auto px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Vector AG</p>
        <h1 className="text-4xl font-semibold tracking-tight mb-4">
          Join the Club
        </h1>
        <p className="text-lg text-neutral-600 mb-10">
          Weekly intelligence on how AI is reshaping museums, galleries, and luxury brands. First 50 members get a free 1:1 AI strategy session.
        </p>

        {status === 'success' ? (
          <div className="bg-neutral-900 text-white rounded-2xl p-8">
            <p className="text-lg font-medium">You're in. 🎉</p>
            <p className="text-neutral-400 mt-2">First issue lands next Wednesday.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-full border border-neutral-300 text-sm outline-none focus:border-neutral-900 transition-colors"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-neutral-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe Free'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-500 text-sm mt-3">Something went wrong. Try again.</p>
        )}

        <p className="text-xs text-neutral-400 mt-6">No spam. Unsubscribe anytime.</p>
      </section>
    </main>
  )
}