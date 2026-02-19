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
      from: 'John @ Tech Culture Club <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to Tech Culture Club 🎉',
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #171717;">
          <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 16px;">Welcome to the Club.</h1>
          <p style="color: #525252; line-height: 1.6; margin-bottom: 16px;">
            You're now part of a small group of people who believe AI and culture can coexist beautifully.
          </p>
          <p style="color: #525252; line-height: 1.6; margin-bottom: 16px;">
            Every week, I break down how AI is reshaping museums, galleries, and luxury brands — with case studies, frameworks, and things you can actually use.
          </p>
          <p style="color: #525252; line-height: 1.6; margin-bottom: 32px;">
            First issue lands next Wednesday. Stay curious.
          </p>
          <p style="color: #171717; font-weight: 500;">— John, Vector AG</p>
          <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 32px 0;" />
          <p style="color: #a3a3a3; font-size: 12px;">Tech Culture Club · vector.ag</p>
        </div>
      `
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}