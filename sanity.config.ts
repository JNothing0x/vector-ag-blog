import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'
import post from './schemas/post'
import venue from './schemas/venue'

export const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'vto6zswf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  title: 'Tech Culture Club',
  apiVersion: '2024-02-19',
  basePath: '/studio',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: [post, venue]
  }
})

export default config