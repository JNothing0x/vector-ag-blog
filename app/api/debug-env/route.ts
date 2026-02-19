import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
export async function GET() {
  return NextResponse.json({
    has_gh_token: !!process.env.GITHUB_TOKEN,
    gh_token_prefix: process.env.GITHUB_TOKEN?.substring(0, 8) || 'missing',
    has_resend: !!process.env.RESEND_API_KEY,
    has_db: !!process.env.DATABASE_URL,
  })
}
