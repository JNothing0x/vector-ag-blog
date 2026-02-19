'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const topics = [
  'AI × Museums', 'Digital Culture', 'Generative Art',
  'Luxury × AI', 'Gallery Tech', 'Creative Machines',
  'Cultural Intelligence', 'AI Curation', 'Future of Art',
  'Algorithmic Beauty', 'Human × Machine', 'Tech Culture Club',
]

function TickerItem({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-600 font-medium px-6">
      <span className="w-1 h-1 rounded-full bg-neutral-700 inline-block" />
      {text}
    </span>
  )
}

export function Ticker() {
  return (
    <div className="border-y border-neutral-800 py-3 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none" />
      <div className="flex animate-ticker whitespace-nowrap">
        {[...topics, ...topics, ...topics].map((t, i) => (
          <TickerItem key={i} text={t} />
        ))}
      </div>
    </div>
  )
}

export function ScrollRevealImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    ['inset(0 50% 0 50%)', 'inset(0 0% 0 0%)']
  )
  const scale = useTransform(scrollYProgress, [0, 0.3, 1], [1.1, 1, 1])

  return (
    <div ref={ref} className="overflow-hidden rounded-xl">
      <motion.div style={{ clipPath, scale }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  )
}