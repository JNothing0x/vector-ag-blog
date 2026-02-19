import type { Metadata } from 'next'
export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import Header from '@/components/Header'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) {
    return { title: 'Post Not Found | Tech Culture Club' }
  }
  return {
    title: `${post.title} | Tech Culture Club`,
    description: post.excerpt || `${post.title} — analysis from Tech Culture Club on AI and culture.`,
    authors: [{ name: 'John', url: 'https://techcultureclub.vercel.app/about' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: ['John'],
      url: `https://techcultureclub.vercel.app/posts/${slug}`,
    },
    alternates: {
      canonical: `https://techcultureclub.vercel.app/posts/${slug}`,
    },
  }
}

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, category, publishedAt, content, tags,
    "coverImage": coverImage.asset->url
  }`
  return client.fetch(query, { slug })
}

function RenderBlocks({ blocks }: { blocks: any[] }) {
  if (!blocks?.length) return null
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const text = block.children?.map((c: any) => c.text).join('') || ''
        if (!text) return null
        switch (block.style) {
          case 'h2': return <h2 key={i} className="text-xl sm:text-2xl font-semibold text-white mt-8 mb-3">{text}</h2>
          case 'h3': return <h3 key={i} className="text-lg font-semibold text-white mt-6 mb-2">{text}</h3>
          default:   return <p key={i} className="text-neutral-300 leading-relaxed">{text}</p>
        }
      })}
    </div>
  )
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
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
          <span>·</span>
          <Link href="/about" className="hover:text-white transition-colors">By John</Link>
        </div>

        <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-white leading-tight mb-5">
          {post.title}
        </h1>

        {post.excerpt && (
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed mb-10 border-l-2 border-neutral-700 pl-4">
            {post.excerpt}
          </p>
        )}

        {post.coverImage && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <img src={post.coverImage} alt={post.title} className="w-full h-48 sm:h-64 object-cover" />
          </div>
        )}

        <RenderBlocks blocks={post.content} />

        {post.tags?.length > 0 && (
          <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs bg-neutral-800 text-neutral-400 px-3 py-1 rounded-full">
                {tag}
              </span>
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