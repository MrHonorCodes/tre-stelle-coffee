import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Events & Private Bookings',
	description:
		'Book Tre Stelle Coffee Co. for private events, coffee experiences, and community gatherings in Dallas, TX.',
	alternates: { canonical: 'https://trestellecoffeeco.com/events' },
	openGraph: {
		title: 'Events & Private Bookings | Tre Stelle Coffee Co.',
		description:
			'Book Tre Stelle Coffee Co. for private events, coffee experiences, and community gatherings in Dallas, TX.',
		url: 'https://trestellecoffeeco.com/events',
		type: 'website',
	},
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
	return children;
}
