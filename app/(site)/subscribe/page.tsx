'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { motion } from 'framer-motion'

export default function SubscribePage() {
  useEffect(() => {
    // Redirect to Substack after a brief moment
    const timer = setTimeout(() => {
      window.location.href = 'https://techcultureclub.substack.com/subscribe'
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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
          <p className="text-base sm:text-lg text-neutral-400 mb-8 leading-relaxed">
            Weekly intelligence on how AI is reshaping museums, galleries, and luxury brands.
          </p>

          <div className="text-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="inline-block w-8 h-8 border-2 border-neutral-600 border-t-white rounded-full mb-4"
            />
            <p className="text-neutral-400 text-sm">Redirecting to Substack...</p>
          </div>

          <div className="text-center mt-6">
            <a
              href="https://techcultureclub.substack.com/subscribe"
              className="inline-block bg-white text-neutral-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-200 transition-colors"
            >
              Subscribe on Substack →
            </a>
          </div>

          <p className="text-xs text-neutral-600 mt-8 text-center">
            Or go directly to{' '}
            <a
              href="https://techcultureclub.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-neutral-400 transition-colors"
            >
              techcultureclub.substack.com
            </a>
          </p>
        </motion.div>
      </section>
    </main>
  )
}
