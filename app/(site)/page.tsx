import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { Ticker } from '@/components/AnimationUtils'
import PostList from '@/components/PostList'

export const metadata: Metadata = {
  title: 'Tech Culture Club — AI × Culture, Fashion & Luxury',
  description: 'Weekly intelligence on how AI reshapes museums, galleries, and luxury brands. Deep dives at the intersection of technology and creative industries.',
  alternates: {
    canonical: 'https://techcultureclub.vercel.app',
  },
}

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, publishedAt,
    "coverImage": coverImage.asset->url
  }`
  return client.fetch(query)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      <Hero />
      <Ticker />
      <PostList posts={posts} />

      <footer className="border-t border-neutral-800 mt-12">
        <div className="max-w-4xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
          <span>© 2026 Tech Culture Club — by John</span>
          <div className="flex gap-5">
            <a href="/subscribe" className="hover:text-neutral-400 transition-colors">Subscribe</a>
            <a href="/about" className="hover:text-neutral-400 transition-colors">About</a>
            <a href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  )
}