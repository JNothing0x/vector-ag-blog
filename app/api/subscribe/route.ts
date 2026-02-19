import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { Client } from 'pg'

export const dynamic = 'force-dynamic'

async function storeSubscriber(email: string) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  })
  try {
    await client.connect()
    await client.query(
      `INSERT INTO subscribers (email, source) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING`,
      [email, 'website']
    )
    await client.end()
    return true
  } catch (err) {
    console.error('Supabase store error:', err)
    try { await client.end() } catch {}
    return false
  }
}

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  // 1. Store to Supabase
  const stored = await storeSubscriber(email)
  console.log(`Subscriber ${email} stored: ${stored}`)

  // 2. Notify owner (always works — Resend sandbox allows sending to verified email)
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    await resend.emails.send({
      from: 'Tech Culture Club <onboarding@resend.dev>',
      to: 'john.commandcenter@gmail.com',
      subject: `🎉 New subscriber: ${email}`,
      html: `<p style="font-family:sans-serif">New subscriber joined Tech Culture Club:</p><p style="font-family:sans-serif;font-size:18px;font-weight:bold">${email}</p><p style="font-family:sans-serif;color:#666">${new Date().toLocaleString('en-GB', {timeZone:'Europe/Zurich'})}</p>`
    })
  } catch (err) {
    console.error('Owner notify error:', err)
  }

  // 3. Welcome email to subscriber (requires verified domain — will fail in sandbox for non-owner emails)
  try {
    await resend.emails.send({
      from: 'Tech Culture Club <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Tech Culture Club',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #262626;">
          <p style="margin:0;font-size:14px;font-weight:600;color:#ffffff;">Tech Culture Club</p>
          <p style="margin:4px 0 0;font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:0.1em;">AI × Culture</p>
        </td></tr>
        <tr><td style="padding:40px 0 32px;">
          <h1 style="margin:0 0 20px;font-size:28px;font-weight:600;color:#ffffff;line-height:1.2;">Welcome to the Club.</h1>
          <p style="margin:0 0 16px;font-size:15px;color:#a3a3a3;line-height:1.7;">You're in. Every week, deep dives on how AI is reshaping the institutions that define culture — museums, galleries, luxury houses, fashion brands.</p>
          <p style="margin:0 0 16px;font-size:15px;color:#a3a3a3;line-height:1.7;">Not the hype. Not every model release. The <em style="color:#e5e5e5;">implications</em> — for creativity, for collections, for the humans who make things that last.</p>
          <p style="margin:0 0 32px;font-size:15px;color:#a3a3a3;line-height:1.7;">First issue lands soon. Stay curious.</p>
          <a href="https://techcultureclub.vercel.app/posts" style="display:inline-block;background:#ffffff;color:#0a0a0a;font-size:14px;font-weight:600;padding:12px 24px;border-radius:100px;text-decoration:none;">Browse the Archive →</a>
        </td></tr>
        <tr><td style="border-top:1px solid #262626;padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#404040;">© 2026 Tech Culture Club · <a href="https://techcultureclub.vercel.app" style="color:#525252;">techcultureclub.vercel.app</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
    })
  } catch (err) {
    console.error('Welcome email error:', err)
  }

  return NextResponse.json({ success: true })
}
