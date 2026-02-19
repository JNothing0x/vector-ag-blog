import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tech Culture Club — AI × Culture, Fashion & Luxury',
  description: 'Where AI meets culture, fashion, luxury, and art. Deep dives and signals from the intersection of technology and creative industries.',
  keywords: ['AI', 'culture', 'fashion', 'luxury', 'art', 'generative AI', 'creative industry'],
  authors: [{ name: 'John', url: 'https://techcultureclub.vercel.app/about' }],
  creator: 'John',
  publisher: 'Tech Culture Club',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Tech Culture Club — AI × Culture, Fashion & Luxury',
    description: 'Weekly intelligence on how AI reshapes museums, galleries, and luxury brands.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Tech Culture Club',
    url: 'https://techcultureclub.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Culture Club — AI × Culture, Fashion & Luxury',
    description: 'Weekly intelligence on how AI reshapes museums, galleries, and luxury brands.',
    creator: '@JohnNothin26657',
  },
  alternates: {
    canonical: 'https://techcultureclub.vercel.app',
  },
  verification: {
    google: '', // Add when you have Search Console
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