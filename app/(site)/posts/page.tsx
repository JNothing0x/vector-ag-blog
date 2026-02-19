export const dynamic = 'force-dynamic'
import { client } from '@/lib/sanity'
import Header from '@/components/Header'
import PostList from '@/components/PostList'
import { motion } from 'framer-motion'

async function getAllPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, category, publishedAt,
    "coverImage": coverImage.asset->url
  }`
  return client.fetch(query)
}

export default async function ArchivePage() {
  const posts = await getAllPosts()

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      <div className="max-w-4xl mx-auto px-5 pt-12 pb-4">
        <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Archive</p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-white">Every issue, every signal.</h1>
        <p className="text-neutral-500 mt-2 text-sm">{posts?.length || 0} posts published</p>
      </div>
      <PostList posts={posts || []} />
    </main>
  )
}