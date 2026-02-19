export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import { PortableText } from '@portabletext/react'
import Header from '@/components/Header'
import Link from 'next/link'
import { notFound } from 'next/navigation'

async function getPost(slug: string) {
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
    <main className="min-h-screen bg-neutral-950">
      <Header />

      <article className="max-w-2xl mx-auto px-5 py-12 sm:py-16">
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-6 uppercase tracking-wider font-medium">
          <span>{categoryLabel}</span>
          <span>·</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-5">{post.title}</h1>

        {post.excerpt && (
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-8 border-l-2 border-neutral-700 pl-4">{post.excerpt}</p>
        )}

        {post.coverImage && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-48 sm:h-64 object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-neutral max-w-none prose-p:text-neutral-300 prose-headings:text-white prose-a:text-white prose-strong:text-white">
          {post.content && <PortableText value={post.content} />}
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-neutral-800 text-neutral-400 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </article>

      <section className="border-t border-neutral-800">
        <div className="max-w-2xl mx-auto px-5 py-12 text-center">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3">Tech Culture Club</p>
          <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3">Get every issue first.</h2>
          <p className="text-neutral-500 text-sm mb-6">Weekly deep dives on AI × culture. No noise.</p>
          <Link href="/subscribe" className="inline-block bg-white text-neutral-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-200 transition-colors">
            Subscribe Free →
          </Link>
        </div>
      </section>
    </main>
  )
}