import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-02-19',
      useCdn: true
    })
  : null

export function urlFor(source: any) {
  if (!client) return { url: () => '' }
  return imageUrlBuilder(client).image(source)
}