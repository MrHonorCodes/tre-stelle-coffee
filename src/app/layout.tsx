import './globals.css';
import type { Metadata } from 'next';
import BackToTop from '../../components/ui/BackToTop';
import { CartProvider } from '../context/CartContext';
import InnerLayoutClient from './InnerLayoutClient';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, DEFAULT_OG_IMAGE, BUSINESS } from '@/lib/site';

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: `${SITE_NAME} | Premium Coffee Roastery`,
		template: `%s | ${SITE_NAME}`,
	},
	description: SITE_DESCRIPTION,
	openGraph: {
		title: `${SITE_NAME} | Premium Coffee Roastery`,
		description: SITE_DESCRIPTION,
		type: 'website',
		url: SITE_URL,
		siteName: SITE_NAME,
		images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
	},
	twitter: {
		card: 'summary_large_image',
		title: `${SITE_NAME} | Premium Coffee Roastery`,
		description: SITE_DESCRIPTION,
		images: [DEFAULT_OG_IMAGE],
	},
	alternates: { canonical: SITE_URL },
};

const localBusinessJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'CafeOrCoffeeShop',
	name: BUSINESS.name,
	url: SITE_URL,
	image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
	telephone: BUSINESS.telephone,
	email: BUSINESS.email,
	address: {
		'@type': 'PostalAddress',
		streetAddress: BUSINESS.streetAddress,
		addressLocality: BUSINESS.addressLocality,
		addressRegion: BUSINESS.addressRegion,
		postalCode: BUSINESS.postalCode,
		addressCountry: BUSINESS.addressCountry,
	},
	priceRange: '$',
	sameAs: BUSINESS.sameAs,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body
				suppressHydrationWarning={true}
				className="flex flex-col min-h-screen bg-soft-white text-dark-text"
			>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
				/>
				<CartProvider>
					<InnerLayoutClient>{children}</InnerLayoutClient>
					<BackToTop />
				</CartProvider>
			</body>
		</html>
	);
}
