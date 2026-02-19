export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import Link from 'next/link'

async function getPosts() {
  if (!client) return []
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, publishedAt,
    "coverImage": coverImage.asset->url
  }`
  return client.fetch(query)
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="min-h-screen">
      <header className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-semibold tracking-tight">Tech Culture Club</Link>
            <p className="text-sm text-neutral-500 mt-1">AI × Culture · By Vector AG</p>
          </div>
          <nav className="flex gap-6 text-sm">
            <Link href="/posts" className="hover:text-neutral-600 transition-colors">Archive</Link>
            <Link href="/about" className="hover:text-neutral-600 transition-colors">About</Link>
            <Link href="/subscribe" className="bg-neutral-900 text-white px-4 py-1.5 rounded-full hover:bg-neutral-700 transition-colors">Subscribe</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          Where artificial intelligence<br />
          <span className="text-neutral-400">meets cultural institutions.</span>
        </h1>
        <p className="text-lg text-neutral-600 mt-6 max-w-2xl">
          Case studies, deep dives, and frameworks for museums, galleries, and luxury brands navigating the AI shift.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        {posts?.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post: any) => (
              <article key={post._id} className="group">
                <Link href={`/posts/${post.slug.current}`}>
                  <div className="flex items-start gap-6 py-6 border-t border-neutral-200">
                    {post.coverImage && (
                      <div className="w-32 h-24 bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 text-xs text-neutral-500 mb-2">
                        <span className="uppercase tracking-wider font-medium">
                          {post.category === 'impulse' && 'Impulse Talk'}
                          {post.category === 'deep' && 'Deep Discussion'}
                          {post.category === 'case' && 'Case Breakdown'}
                        </span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h2 className="text-xl font-medium group-hover:text-neutral-600 transition-colors">{post.title}</h2>
                      {post.excerpt && <p className="text-neutral-600 mt-2 line-clamp-2">{post.excerpt}</p>}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="border-t border-neutral-200 py-20 text-center text-neutral-400">
            <p className="font-medium">First issue publishing soon.</p>
            <p className="text-sm mt-2">Subscribe to get it first.</p>
            <Link href="/subscribe" className="inline-block mt-6 bg-neutral-900 text-white text-sm px-6 py-3 rounded-full hover:bg-neutral-700 transition-colors">
              Join the Club →
            </Link>
          </div>
        )}
      </section>

      <footer className="border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-8 text-sm text-neutral-500">
          © 2026 Vector AG · Tech Culture Club
        </div>
      </footer>
    </main>
  )
}