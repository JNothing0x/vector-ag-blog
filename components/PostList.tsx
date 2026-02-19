'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
    }
  })
}

export default function PostList({ posts }: { posts: any[] }) {
  if (!posts?.length) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-20 text-center">
        <p className="text-neutral-400 font-medium">First issue publishing soon.</p>
        <p className="text-neutral-600 text-sm mt-2">Subscribe to get it in your inbox first.</p>
        <Link href="/subscribe" className="inline-block mt-6 bg-white text-neutral-900 text-sm font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors">
          Join the Club →
        </Link>
      </div>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-5 pb-24">
      {posts.map((post: any, i: number) => (
        <motion.article
          key={post._id}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <Link href={`/posts/${post.slug.current}`}>
            <div className="flex items-start gap-4 sm:gap-5 py-6 border-b border-neutral-800/60 group cursor-pointer">
              {post.coverImage && (
                <div className="w-18 h-14 sm:w-28 sm:h-20 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                  <motion.img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2 uppercase tracking-wider">
                  <span>
                    {post.category === 'impulse' ? 'Impulse Talk'
                      : post.category === 'deep' ? 'Deep Discussion'
                      : post.category === 'case' ? 'Case Breakdown'
                      : post.category}
                  </span>
                  <span>·</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h2 className="text-base sm:text-lg font-medium text-neutral-100 group-hover:text-white transition-colors leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-neutral-500 mt-1.5 text-sm line-clamp-2 hidden sm:block">{post.excerpt}</p>
                )}
              </div>
              <motion.span
                className="text-neutral-600 flex-shrink-0 text-lg self-center"
                animate={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </div>
          </Link>
        </motion.article>
      ))}
    </section>
  )
}