'use client'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import Link from 'next/link'
import ScrambleText from '@/components/ScrambleText'
import { Particles } from '@/components/magicui/particles'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
  })
}

export default function Hero() {
  return (
    <section className="relative max-w-4xl mx-auto px-5 pt-14 pb-12 overflow-hidden">
      {/* Ambient particles */}
      <Particles
        className="absolute inset-0 -z-10"
        quantity={50}
        color="#ffffff"
        size={0.5}
        staticity={70}
        ease={60}
      />

      <motion.p
        custom={0} variants={fadeUp} initial="hidden" animate="visible"
        className="text-xs uppercase tracking-widest text-neutral-500 mb-5 font-medium"
      >
        AI × Culture × The World
      </motion.p>

      <motion.h1
        custom={1} variants={fadeUp} initial="hidden" animate="visible"
        className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-white mb-6"
      >
        Where{' '}
        <ScrambleText text="artificial intelligence" delay={400} className="text-neutral-400" />
        <br />
        meets cultural institutions.
      </motion.h1>

      <motion.p
        custom={2} variants={fadeUp} initial="hidden" animate="visible"
        className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-xl mb-8"
      >
        Case studies, deep dives, and signals for museums, galleries, luxury brands, and fashion houses navigating the AI shift.
      </motion.p>

      <motion.div
        custom={3} variants={fadeUp} initial="hidden" animate="visible"
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center bg-white text-neutral-900 font-semibold px-7 py-3.5 rounded-full text-sm hover:bg-neutral-100 active:scale-95 transition-all duration-200 w-full sm:w-auto"
        >
          Join the Club — Free →
        </Link>
        <Link
          href="/posts"
          className="inline-flex items-center justify-center border border-neutral-700 text-neutral-300 font-medium px-6 py-3.5 rounded-full text-sm hover:border-neutral-500 hover:text-white transition-colors w-full sm:w-auto"
        >
          Browse Archive
        </Link>
      </motion.div>
    </section>
  )
}