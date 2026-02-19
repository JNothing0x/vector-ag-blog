export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getPost(slug: string) {
  if (!client) return null
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, publishedAt, content, tags,
    "coverImage": coverImage.asset->url
  }`
  return client.fetch(query, { slug })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()

  const categoryMap: Record<string, string> = {
    impulse: 'Impulse Talk',
    deep: 'Deep Discussion',
    case: 'Case Breakdown'
  }
  const categoryLabel = categoryMap[post.category] || post.category

  return (
    <main className="min-h-screen">
      <header className="border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">Tech Culture Club</Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/posts" className="hover:text-neutral-600 transition-colors">Archive</Link>
            <Link href="/about" className="hover:text-neutral-600 transition-colors">About</Link>
            <Link href="/subscribe" className="bg-neutral-900 text-white px-4 py-1.5 rounded-full hover:bg-neutral-700 transition-colors">Subscribe</Link>
          </nav>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 text-xs text-neutral-500 mb-6 uppercase tracking-wider font-medium">
          <span>{categoryLabel}</span>
          <span>·</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-6">{post.title}</h1>
        {post.excerpt && (
          <p className="text-lg text-neutral-600 leading-relaxed mb-8 border-l-2 border-neutral-300 pl-4">{post.excerpt}</p>
        )}
        {post.coverImage && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover" />
          </div>
        )}
        <div className="prose prose-neutral max-w-none">
          {post.content && <PortableText value={post.content} />}
        </div>
        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-neutral-200 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </article>

      <section className="border-t border-neutral-200 bg-neutral-900 text-white">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <p className="text-sm uppercase tracking-widest text-neutral-400 mb-3">Tech Culture Club</p>
          <h2 className="text-2xl font-semibold mb-4">Enjoyed this? Get every issue first.</h2>
          <p className="text-neutral-400 mb-6">Weekly deep dives on AI × culture. No noise.</p>
          <Link href="/subscribe" className="inline-block bg-white text-neutral-900 font-medium px-6 py-3 rounded-full hover:bg-neutral-100 transition-colors">
            Subscribe Free →
          </Link>
        </div>
      </section>
    </main>
  )
}