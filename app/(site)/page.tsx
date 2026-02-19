export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import { Ticker } from '@/components/AnimationUtils'
import PostList from '@/components/PostList'

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
          <span>© 2026 Vector AG · Tech Culture Club</span>
          <div className="flex gap-5">
            <a href="/subscribe" className="hover:text-neutral-400 transition-colors">Subscribe</a>
            <a href="/about" className="hover:text-neutral-400 transition-colors">About</a>
          </div>
        </div>
      </footer>
    </main>
  )
}