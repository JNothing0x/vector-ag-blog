import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Culture Club | AI × Culture',
  description: 'Where artificial intelligence meets cultural institutions. Case studies, deep dives, and frameworks for museums, galleries, and luxury brands.',
  openGraph: {
    title: 'Tech Culture Club',
    description: 'AI × Culture by Vector AG',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-neutral-950 text-neutral-50 antialiased`}>
        {children}
      </body>
    </html>
  )
}