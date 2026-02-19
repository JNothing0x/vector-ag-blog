import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUB_ID || 'pub_48f9dbdd-e712-4fc1-994a-7032753a9c91'
const GITHUB_REPO = 'JNothing0x/vector-ag-blog'
const GITHUB_FILE = 'data/subscribers.json'

async function addToBeehiiv(email: string): Promise<boolean> {
  const apiKey = process.env.BEEHIIV_API_KEY
  if (!apiKey) return false

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: 'website',
          utm_medium: 'organic',
        }),
      }
    )
    return res.ok
  } catch (err) {
    console.error('Beehiiv error:', err)
    return false
  }
}

async function addToGitHub(email: string): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN
  if (!token) return false

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }

  try {
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
      { headers }
    )
    const fileData = await getRes.json()
    const sha = fileData.sha
    const current = JSON.parse(
      Buffer.from(fileData.content.replace(/\n/g, ''), 'base64').toString('utf8')
    )

    if (current.subscribers.some((s: { email: string }) => s.email === email)) {
      return true // already exists
    }

    current.subscribers.push({
      email,
      subscribedAt: new Date().toISOString(),
      source: 'website',
    })

    const updateRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_FILE}`,
      {
        method: 'PUT',
        headers,
        body: JSON.stringify({
          message: `feat: new subscriber`,
          content: Buffer.from(JSON.stringify(current, null, 2)).toString('base64'),
          sha,
        }),
      }
    )
    return updateRes.ok
  } catch (err) {
    console.error('GitHub store error:', err)
    return false
  }
}

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  // 1. Add to Beehiiv (handles welcome email + subscriber management)
  const beehiivOk = await addToBeehiiv(email)

  // 2. Also store in GitHub as backup
  addToGitHub(email).catch(console.error) // fire-and-forget

  if (!beehiivOk) {
    console.error(`Beehiiv add failed for ${email}`)
  }

  return NextResponse.json({ success: true })
}
