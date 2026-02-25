/**
 * Sanity client for GoldTech Consulting
 * Use with REACT_APP_SANITY_PROJECT_ID and REACT_APP_SANITY_DATASET in .env.local
 */
import { createClient } from '@sanity/client'

const projectId = process.env.REACT_APP_SANITY_PROJECT_ID
const dataset = process.env.REACT_APP_SANITY_DATASET || 'production'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
})
