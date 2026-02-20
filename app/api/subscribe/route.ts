import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // Proxy to Substack's subscription endpoint
    const substackRes = await fetch('https://techcultureclub.substack.com/api/v1/free', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Origin': 'https://techcultureclub.substack.com',
        'Referer': 'https://techcultureclub.substack.com/',
      },
      body: new URLSearchParams({
        email,
        source: 'website',
        referrer: 'https://techcultureclub.vercel.app'
      }).toString(),
    })

    // Substack returns 200 or 302 on success
    if (substackRes.ok || substackRes.status === 302) {
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
