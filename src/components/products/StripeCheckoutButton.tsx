'use client';

import { useState } from 'react';

interface StripeCheckoutButtonProps {
	priceId: string;
	productName?: string; // Optional: for more descriptive button or messages
	className?: string; // To pass custom styles
}

export default function StripeCheckoutButton({
	priceId,
	productName = 'product',
	className,
}: StripeCheckoutButtonProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleCheckout = async () => {
		setIsLoading(true);
		setError(null);

		if (!priceId) {
			setError('Stripe Price ID is missing.');
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ priceId: priceId, quantity: 1 }), // Assuming quantity 1 for now
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to create Stripe session');
			}

			const { url } = await response.json();
			if (url) {
				window.location.href = url;
			} else {
				throw new Error('Stripe session URL not found.');
			}
		} catch (err) {
			const message = err instanceof Error ? err.message : 'An unknown error occurred';
			console.error(`Checkout error for ${productName}:`, message);
			setError(`Could not proceed to checkout: ${message}`);
			setIsLoading(false);
		}
	};

	const defaultClassName =
		'mt-2 px-4 py-2 border-2 rounded-md font-semibold transition-all duration-300 w-full';
	const activeClassName =
		'bg-primary text-white border-primary hover:bg-primary-dark hover:border-primary-dark';
	const disabledClassName = 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed';

	return (
		<>
			<button
				onClick={handleCheckout}
				disabled={isLoading || !priceId}
				className={`${defaultClassName} ${className || (priceId ? activeClassName : disabledClassName)}`}
			>
				{isLoading ? 'Processing...' : priceId ? 'Proceed to Checkout' : 'Unavailable'}
			</button>
			{error && <p className="text-red-500 text-sm mt-1">{error}</p>}
		</>
	);
}
