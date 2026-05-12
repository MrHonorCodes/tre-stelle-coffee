import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Press & Media',
	description:
		'See where Tre Stelle Coffee Co. has been featured — press coverage, awards, and recognition from local and national outlets.',
	alternates: { canonical: 'https://trestellecoffeeco.com/press' },
	openGraph: {
		title: 'Press & Media | Tre Stelle Coffee Co.',
		description:
			'See where Tre Stelle Coffee Co. has been featured — press coverage, awards, and recognition.',
		url: 'https://trestellecoffeeco.com/press',
		type: 'website',
	},
};

export default function PressLayout({ children }: { children: React.ReactNode }) {
	return children;
}
