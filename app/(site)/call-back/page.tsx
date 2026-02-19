'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Header from '@/components/Header'

function CallbackContent() {
  const params = useSearchParams()
  const code = params.get('code')
  const state = params.get('state')
  const error = params.get('error')
  const fullUrl = typeof window !== 'undefined' ? window.location.href : ''

  if (error) {
    return (
      <div className="max-w-lg mx-auto px-5 py-20 text-center">
        <p className="text-4xl mb-4">❌</p>
        <h1 className="text-2xl font-semibold text-white mb-3">Authorization denied</h1>
        <p className="text-neutral-500 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-20">
      <p className="text-xs uppercase tracking-widest text-neutral-500 mb-4">Twitter OAuth 2.0</p>
      <h1 className="text-2xl font-semibold text-white mb-6">Authorization successful ✓</h1>

      {code && (
        <div className="mb-6">
          <p className="text-sm text-neutral-400 mb-2">Authorization code:</p>
          <code className="block bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-green-400 text-xs break-all">
            {code}
          </code>
        </div>
      )}

      <div className="mb-6">
        <p className="text-sm text-neutral-400 mb-2">Full URL (copy this entire line):</p>
        <code className="block bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-yellow-400 text-xs break-all">
          {fullUrl}
        </code>
      </div>

      <div className="bg-neutral-900 border border-neutral-700 rounded-lg p-4">
        <p className="text-sm text-neutral-300 font-medium mb-2">Next step</p>
        <p className="text-sm text-neutral-500">
          Copy the full URL above and paste it into the terminal running{' '}
          <code className="text-neutral-300">python3 twitter-auth.py</code>
        </p>
      </div>
    </div>
  )
}

export default function CallbackPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      <Suspense fallback={<div className="py-20 text-center text-neutral-500">Loading…</div>}>
        <CallbackContent />
      </Suspense>
    </main>
  )
}
