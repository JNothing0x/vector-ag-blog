'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
}

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-5 pt-14 pb-12">
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-xs uppercase tracking-widest text-neutral-500 mb-5 font-medium"
      >
        The intersection of AI + culture
      </motion.p>

      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white mb-6"
      >
        Where artificial<br className="hidden sm:block" /> intelligence{' '}
        <span className="text-neutral-500">meets cultural institutions.</span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl mb-8"
      >
        Case studies, deep dives, and frameworks for museums, galleries, and luxury brands navigating the AI shift.
      </motion.p>

      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="/subscribe"
          className="inline-block bg-white text-neutral-900 font-semibold px-6 py-3 rounded-full text-sm hover:bg-neutral-200 transition-colors text-center"
        >
          Join the Club — Free →
        </Link>
        <Link
          href="/posts"
          className="inline-block border border-neutral-700 text-neutral-300 font-medium px-6 py-3 rounded-full text-sm hover:border-neutral-500 hover:text-white transition-colors text-center"
        >
          Browse Archive
        </Link>
      </motion.div>
    </section>
  )
}