import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

const GITHUB_REPO = 'JNothing0x/vector-ag-blog'
const GITHUB_FILE = 'data/subscribers.json'

async function storeSubscriberGitHub(email: string): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return false

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }

  try {
    // Get current file
    const getRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`, { headers })
    const fileData = await getRes.json()
    const sha = fileData.sha
    const currentContent = JSON.parse(Buffer.from(fileData.content, 'base64').toString())

    // Check duplicate
    if (currentContent.subscribers.some((s: { email: string }) => s.email === email)) {
      return true // already exists
    }

    // Append new subscriber
    currentContent.subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      source: 'website'
    })

    // Commit back
    const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: `feat: new subscriber ${email.split('@')[0]}@***`,
        content: Buffer.from(JSON.stringify(currentContent, null, 2)).toString('base64'),
        sha
      })
    })

    return updateRes.ok
  } catch (err) {
    console.error('GitHub store error:', err)
    return false
  }
}

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  // 1. Store to GitHub (works from Vercel serverless)
  const stored = await storeSubscriberGitHub(email)
  console.log(`Subscriber ${email} stored in GitHub: ${stored}`)

  // 2. Notify owner (Resend sandbox — always works to verified email)
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    await resend.emails.send({
      from: 'Tech Culture Club <onboarding@resend.dev>',
      to: 'john.commandcenter@gmail.com',
      subject: `🎉 New subscriber: ${email}`,
      html: `
        <div style="font-family:sans-serif;padding:20px">
          <h2>New TCC Subscriber</h2>
          <p><strong>${email}</strong></p>
          <p style="color:#666">${new Date().toLocaleString('en-GB', { timeZone: 'Europe/Zurich' })} CET</p>
          <p style="color:#666">Total stored in GitHub: ${stored ? 'yes' : 'failed'}</p>
        </div>`
    })
  } catch (err) {
    console.error('Notify error:', err)
  }

  // 3. Welcome email (will work once domain is verified in Resend)
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
