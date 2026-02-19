import { client } from '@/lib/sanity'
import { NextResponse } from 'next/server'

export async function GET() {
  const query = `*[_type == "post"] | order(publishedAt desc) [0...10] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    content,
    category
  }`
  
  const posts = await client.fetch(query)
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Tech Culture Club</title>
    <link>https://techcultureclub.vercel.app</link>
    <description>Where AI meets culture, fashion, luxury, and art. Weekly intelligence on how AI reshapes creative industries.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://techcultureclub.vercel.app/api/rss" rel="self" type="application/rss+xml"/>
    ${posts.map((post: any) => {
      const content = post.content?.map((block: any) => {
        const text = block.children?.map((c: any) => c.text).join('') || ''
        return text
      }).join('\n\n') || post.excerpt || ''
      
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://techcultureclub.vercel.app/posts/${post.slug.current}</link>
      <guid>https://techcultureclub.vercel.app/posts/${post.slug.current}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category || 'article'}</category>
      <description>${escapeXml(post.excerpt || '')}</description>
      <content:encoded>${escapeXml(content)}</content:encoded>
    </item>`
    }).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 'public, max-age=3600'
    }
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
