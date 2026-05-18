import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About Us',
	description:
		'Discover the story, craft, and people behind Tre Stelle Coffee Co. — bridging modern and traditional coffee craftsmanship in Dallas, TX.',
	alternates: { canonical: 'https://trestellecoffeeco.com/about-us' },
	openGraph: {
		title: 'About Us | Tre Stelle Coffee Co.',
		description:
			'Discover the story, craft, and people behind Tre Stelle Coffee Co. — bridging modern and traditional coffee craftsmanship in Dallas, TX.',
		url: 'https://trestellecoffeeco.com/about-us',
		type: 'website',
	},
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
	return children;
}
