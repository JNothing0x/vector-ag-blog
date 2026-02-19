import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      await resend.contacts.create({ email, audienceId, unsubscribed: false })
    }

    await resend.emails.send({
      from: 'Tech Culture Club <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Tech Culture Club',
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding-bottom:32px;border-bottom:1px solid #262626;">
            <p style="margin:0;font-size:14px;font-weight:600;color:#ffffff;letter-spacing:-0.3px;">Tech Culture Club</p>
            <p style="margin:4px 0 0;font-size:11px;color:#525252;text-transform:uppercase;letter-spacing:0.1em;">AI × Culture</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:40px 0 32px;">
            <h1 style="margin:0 0 20px;font-size:28px;font-weight:600;color:#ffffff;line-height:1.2;letter-spacing:-0.5px;">
              Welcome to the Club.
            </h1>
            <p style="margin:0 0 16px;font-size:15px;color:#a3a3a3;line-height:1.7;">
              You're in. Every week, you'll get deep dives on how AI is reshaping the institutions that define culture — museums, galleries, luxury houses, fashion brands.
            </p>
            <p style="margin:0 0 16px;font-size:15px;color:#a3a3a3;line-height:1.7;">
              Not the hype. Not every model release. The <em style="color:#e5e5e5;">implications</em> — for creativity, for collections, for the humans who make things that last.
            </p>
            <p style="margin:0 0 32px;font-size:15px;color:#a3a3a3;line-height:1.7;">
              First issue lands soon. Stay curious.
            </p>

            <!-- CTA -->
            <a href="https://techcultureclub.vercel.app/posts"
               style="display:inline-block;background:#ffffff;color:#0a0a0a;font-size:14px;font-weight:600;padding:12px 24px;border-radius:100px;text-decoration:none;">
              Browse the Archive →
            </a>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="border-top:1px solid #262626;padding-top:24px;">
            <p style="margin:0;font-size:11px;color:#404040;line-height:1.6;">
              © 2026 Tech Culture Club · <a href="https://techcultureclub.vercel.app" style="color:#525252;">techcultureclub.vercel.app</a><br>
              You're receiving this because you subscribed. <a href="#" style="color:#525252;">Unsubscribe</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}