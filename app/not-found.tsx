import Header from '@/components/Header'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-600 mb-4 font-medium">404</p>
        <h1 className="text-3xl font-semibold text-white mb-4">Page not found.</h1>
        <p className="text-neutral-500 mb-8">The issue you're looking for might have moved or doesn't exist yet.</p>
        <Link href="/" className="inline-block bg-white text-neutral-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-100 transition-colors">
          Back to Home
        </Link>
      </div>
    </main>
  )
}