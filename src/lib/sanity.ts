import {createClient} from '@sanity/client'

export const client = createClient({
  // Find these in your Sanity project -> API
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id', 
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: false, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
})
