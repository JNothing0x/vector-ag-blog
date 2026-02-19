import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Culture Club | AI × Culture',
  description: 'Where artificial intelligence meets cultural institutions. Case studies, deep dives, and the future of creative work.',
  openGraph: {
    title: 'Tech Culture Club',
    description: 'Where AI meets culture',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-50 text-neutral-900`}>
        {children}
      </body>
    </html>
  )
}