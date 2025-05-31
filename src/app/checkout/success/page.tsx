import { Suspense } from 'react';
import SuccessPageContent from './SuccessPageContent'; // Import the new component
import FadeIn from '../../../../components/ui/FadeIn'; // Could be used for a loading fallback

// Loading fallback component
function LoadingFallback() {
	return (
		<FadeIn>
			<h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
				Processing your order...
			</h1>
			<p className="text-xl text-gray-600">Please wait a moment.</p>
			{/* You could add a spinner here */}
		</FadeIn>
	);
}

export default function CheckoutSuccessPage() {
	return (
		<main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16 flex items-center justify-center">
			<div className="container mx-auto px-4 text-center">
				<Suspense fallback={<LoadingFallback />}>
					<SuccessPageContent />
				</Suspense>
			</div>
		</main>
	);
}
