import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Find Us',
	description:
		'Visit Tre Stelle Coffee Co. — directions, hours, and location details for our Dallas, TX coffee shop.',
	alternates: { canonical: 'https://trestellecoffeeco.com/find-us' },
	openGraph: {
		title: 'Find Us | Tre Stelle Coffee Co.',
		description: 'Visit Tre Stelle Coffee Co. in Dallas, TX. Directions, hours, and location.',
		url: 'https://trestellecoffeeco.com/find-us',
		type: 'website',
	},
};

export default function FindUsLayout({ children }: { children: React.ReactNode }) {
	return children;
}
