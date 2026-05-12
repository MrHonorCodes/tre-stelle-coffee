import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Wholesale Partnerships',
	description:
		'Partner with Tre Stelle Coffee Co. — wholesale specialty coffee for cafés, restaurants, and offices in the Dallas-Fort Worth area.',
	alternates: { canonical: 'https://trestellecoffeeco.com/wholesale' },
	openGraph: {
		title: 'Wholesale Partnerships | Tre Stelle Coffee Co.',
		description:
			'Partner with Tre Stelle Coffee Co. — wholesale specialty coffee for cafés, restaurants, and offices.',
		url: 'https://trestellecoffeeco.com/wholesale',
		type: 'website',
	},
};

export default function WholesaleLayout({ children }: { children: React.ReactNode }) {
	return children;
}
