import { readClient } from '@/sanity/lib/client';
import { SITE_URL } from '@/lib/site';

export const revalidate = 3600;

type ProductSlug = { slug?: { current?: string }; _updatedAt?: string };

type Entry = {
	loc: string;
	lastmod?: string;
	changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
	priority?: number;
};

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET() {
	const now = new Date().toISOString();

	const staticEntries: Entry[] = [
		{ loc: SITE_URL, lastmod: now, changefreq: 'daily', priority: 1 },
		{ loc: `${SITE_URL}/about-us`, lastmod: now, changefreq: 'monthly', priority: 0.8 },
		{ loc: `${SITE_URL}/products`, lastmod: now, changefreq: 'daily', priority: 0.9 },
		{ loc: `${SITE_URL}/events`, lastmod: now, changefreq: 'weekly', priority: 0.7 },
		{ loc: `${SITE_URL}/press`, lastmod: now, changefreq: 'monthly', priority: 0.6 },
		{ loc: `${SITE_URL}/wholesale`, lastmod: now, changefreq: 'monthly', priority: 0.7 },
		{ loc: `${SITE_URL}/find-us`, lastmod: now, changefreq: 'monthly', priority: 0.8 },
		{ loc: `${SITE_URL}/catering`, lastmod: now, changefreq: 'monthly', priority: 0.6 },
		{ loc: `${SITE_URL}/privacy-policy`, lastmod: now, changefreq: 'yearly', priority: 0.3 },
		{ loc: `${SITE_URL}/terms`, lastmod: now, changefreq: 'yearly', priority: 0.3 },
	];

	let productEntries: Entry[] = [];
	try {
		const products = await readClient.fetch<ProductSlug[]>(
			`*[_type == "product" && !(_id in path("drafts.**")) && defined(slug.current)]{
				slug,
				_updatedAt
			}`
		);
		productEntries = products
			.filter((p) => p.slug?.current)
			.map((p) => ({
				loc: `${SITE_URL}/products/${p.slug!.current}`,
				lastmod: p._updatedAt || now,
				changefreq: 'weekly' as const,
				priority: 0.7,
			}));
	} catch (err) {
		console.warn('sitemap.xml: failed to fetch products from Sanity', err);
	}

	const entries = [...staticEntries, ...productEntries];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(e) => `	<url>
		<loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `\n\t\t<lastmod>${e.lastmod}</lastmod>` : ''}${e.changefreq ? `\n\t\t<changefreq>${e.changefreq}</changefreq>` : ''}${typeof e.priority === 'number' ? `\n\t\t<priority>${e.priority.toFixed(1)}</priority>` : ''}
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
		},
	});
}
