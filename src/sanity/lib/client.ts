import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, writeToken } from '../env';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: false, // Changed to false for more direct cache control with Next.js revalidation
	token: writeToken, // Only set this for server-side usage!
});

// Read-only client without token — enables CDN edge caching for public reads.
// Use this for fetching products, press articles, etc. on public pages.
export const readClient = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true,
});
