'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col" onClick={() => setOpen(false)}>
          <span className="text-base font-semibold tracking-tight text-white leading-tight">Tech Culture Club</span>
          <span className="text-xs text-neutral-500">AI × Culture</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm">
          <Link href="/posts" className="text-neutral-400 hover:text-white transition-colors">Archive</Link>
          <Link href="/about" className="text-neutral-400 hover:text-white transition-colors">About</Link>
          <Link href="/subscribe" className="bg-white text-neutral-900 font-medium px-4 py-1.5 rounded-full hover:bg-neutral-200 transition-colors text-sm">
            Subscribe
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-white origin-center"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5 bg-white"
            transition={{ duration: 0.2 }}
          />
          <motion.span
            animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-white origin-center"
            transition={{ duration: 0.2 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="sm:hidden overflow-hidden border-t border-neutral-800"
          >
            <nav className="flex flex-col px-5 py-4 gap-4 bg-neutral-950">
              <Link href="/posts" onClick={() => setOpen(false)} className="text-neutral-300 hover:text-white transition-colors text-base">Archive</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="text-neutral-300 hover:text-white transition-colors text-base">About</Link>
              <Link href="/subscribe" onClick={() => setOpen(false)} className="bg-white text-neutral-900 font-semibold px-5 py-2.5 rounded-full text-sm text-center hover:bg-neutral-200 transition-colors">
                Subscribe Free →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}