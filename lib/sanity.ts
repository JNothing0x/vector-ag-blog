import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vto6zswf'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-02-19',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}