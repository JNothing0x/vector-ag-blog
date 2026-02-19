'use client'
import Header from '@/components/Header'
import { motion } from 'framer-motion'
import Link from 'next/link'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      <div className="max-w-2xl mx-auto px-5 py-16 sm:py-24">

        <motion.p custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-medium">
          About
        </motion.p>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-8 leading-tight">
          The newsletter that connects AI to everything that matters.
        </motion.h1>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="space-y-5 text-neutral-400 leading-relaxed text-base">

          <p>
            Tech Culture Club exists because the most interesting things are happening at the edges — where AI meets fashion, where machine learning walks into a museum, where a luxury brand quietly becomes a tech company.
          </p>
          <p>
            We monitor OpenAI, Google DeepMind, and the big tech labs. But we also read Business of Fashion, Dezeen, and the Guggenheim's annual report. Then we connect the dots.
          </p>
          <p>
            Every issue asks: <span className="text-white font-medium italic">what does this mean for culture, for creativity, for the humans who make things?</span>
          </p>
          <p>
            This isn't a hype newsletter. We don't cover every model release. We cover the ones that will reshape how galleries curate, how luxury brands speak to customers, how cities build cultural institutions for the next 50 years.
          </p>
        </motion.div>

        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-3 font-medium">Curated by</p>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-lg">J</div>
            <div>
              <p className="font-medium text-white">John</p>
              <p className="text-sm text-neutral-500 mt-1">
                Tracking how AI reshapes creative industries. Former strategy consultant, now full-time observer 
                of the intersection between technology and culture. Based in Switzerland, writing for a global audience.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-sm text-neutral-500 mb-2 uppercase tracking-widest font-medium">We track</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              'OpenAI', 'Google DeepMind', 'Anthropic', 'Meta AI',
              'Business of Fashion', 'Dezeen', 'Artnet', 'Wired',
              'MIT Tech Review', 'The Verge', 'Vogue Business', 'Hypebeast',
              'Christie\'s', 'Sotheby\'s', 'Luxury Daily', 'Creative Review'
            ].map(source => (
              <span key={source} className="text-xs bg-neutral-900 border border-neutral-800 text-neutral-400 px-3 py-1.5 rounded-full">
                {source}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible"
          className="mt-12">
          <Link href="/subscribe"
            className="inline-block bg-white text-neutral-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-200 transition-colors">
            Join the Club — Free →
          </Link>
        </motion.div>

      </div>

      <footer className="border-t border-neutral-800 mt-12">
        <div className="max-w-4xl mx-auto px-5 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-600">
          <span>© 2026 Tech Culture Club — by John</span>
          <div className="flex gap-5">
            <a href="/subscribe" className="hover:text-neutral-400 transition-colors">Subscribe</a>
            <a href="/privacy" className="hover:text-neutral-400 transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  )
}