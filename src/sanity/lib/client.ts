import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, writeToken } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Changed to false for more direct cache control with Next.js revalidation
  token: writeToken, // Only set this for server-side usage!
})
