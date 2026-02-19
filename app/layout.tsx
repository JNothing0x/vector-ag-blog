import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Culture Club | AI × Culture',
  description: 'Where AI meets culture, fashion, luxury, and art. Deep dives and signals from the intersection of technology and creative industries.',
  openGraph: {
    title: 'Tech Culture Club',
    description: 'Where AI meets culture, fashion, and art.',
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