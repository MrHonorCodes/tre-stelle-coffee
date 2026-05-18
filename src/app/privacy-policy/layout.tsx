import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description: 'How Tre Stelle Coffee Co. collects, uses, and protects your personal data.',
	alternates: { canonical: 'https://trestellecoffeeco.com/privacy-policy' },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
	return children;
}
