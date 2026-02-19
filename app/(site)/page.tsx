export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Link from 'next/link'

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

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-5">
        <div className="border-t border-neutral-800" />
      </div>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-5 pb-24 mt-2">
        {posts?.length > 0 ? (
          <div>
            {posts.map((post: any, i: number) => (
              <article key={post._id}>
                <Link href={`/posts/${post.slug.current}`}>
                  <div className="flex items-start gap-5 py-6 border-b border-neutral-800/60 group">
                    {post.coverImage && (
                      <div className="w-20 h-16 sm:w-28 sm:h-20 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                        <span>
                          {post.category === 'impulse' && 'Impulse Talk'}
                          {post.category === 'deep' && 'Deep Discussion'}
                          {post.category === 'case' && 'Case Breakdown'}
                        </span>
                        <span>·</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h2 className="text-base sm:text-lg font-medium text-neutral-100 group-hover:text-white transition-colors leading-snug">{post.title}</h2>
                      {post.excerpt && (
                        <p className="text-neutral-500 mt-1.5 text-sm line-clamp-2 hidden sm:block">{post.excerpt}</p>
                      )}
                    </div>
                    <span className="text-neutral-600 group-hover:text-neutral-400 transition-colors flex-shrink-0 text-lg self-center">→</span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-neutral-400 text-base font-medium">First issue publishing soon.</p>
            <p className="text-neutral-600 text-sm mt-2">Subscribe to get it in your inbox first.</p>
            <Link href="/subscribe" className="inline-block mt-6 bg-white text-neutral-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors">
              Join the Club →
            </Link>
          </div>
        )}
      </section>

      <footer className="border-t border-neutral-800">
        <div className="max-w-4xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
          <span>© 2026 Vector AG · Tech Culture Club</span>
          <div className="flex gap-5">
            <Link href="/subscribe" className="hover:text-neutral-400 transition-colors">Subscribe</Link>
            <Link href="/about" className="hover:text-neutral-400 transition-colors">About</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}