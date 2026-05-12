import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description: 'The terms and conditions governing your use of trestellecoffeeco.com.',
	alternates: { canonical: 'https://trestellecoffeeco.com/terms' },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
	return children;
}
