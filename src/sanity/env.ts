export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-05-13';

export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

// Only export these in a server context!
export const writeToken = process.env.SANITY_API_WRITE_TOKEN;
export const readToken = process.env.SANITY_API_READ_TOKEN;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
	if (v === undefined) {
		throw new Error(errorMessage);
	}

	return v;
}
