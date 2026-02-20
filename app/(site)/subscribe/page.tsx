'use client'
import { useState } from 'react'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import { BorderBeam } from '@/components/magicui/border-beam'

export default function SubscribePage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('https://techcultureclub.substack.com/api/v1/free', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, first_url: 'https://techcultureclub.vercel.app', source: 'blog' })
      })
      if (res.ok || res.status === 200 || res.status === 201) {
        setStatus('success')
      } else {
        // Substack may reject CORS — fall back to redirect with email pre-filled
        window.location.href = `https://techcultureclub.substack.com/subscribe?email=${encodeURIComponent(email)}`
      }
    } catch {
      // CORS blocked — redirect with email pre-filled so user only needs to click confirm
      window.location.href = `https://techcultureclub.substack.com/subscribe?email=${encodeURIComponent(email)}`
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      <section className="max-w-lg mx-auto px-5 py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-medium">Tech Culture Club</p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-4 leading-tight">
            Join the Club.
          </h1>
          <p className="text-base sm:text-lg text-neutral-400 mb-10 leading-relaxed">
            Weekly intelligence on AI, culture, and the frameworks that matter. One issue per week. No noise.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative border border-neutral-700 rounded-2xl p-8 text-center overflow-hidden bg-neutral-900/50"
            >
              <BorderBeam size={80} duration={4} colorFrom="#a3a3a3" colorTo="#404040" />
              <div className="relative z-10">
                <p className="text-lg font-semibold text-white mb-2">You're in.</p>
                <p className="text-neutral-400 text-sm">Check your inbox to confirm your subscription.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-5 py-3.5 rounded-full border border-neutral-700 bg-neutral-900 text-white text-sm placeholder:text-neutral-600 outline-none focus:border-neutral-500 transition-colors"
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
            <p className="text-red-400 text-sm mt-3 text-center">{errorMsg}</p>
          )}

          <p className="text-xs text-neutral-600 mt-6 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </section>
    </main>
  )
}
