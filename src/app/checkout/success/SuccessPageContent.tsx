'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext'; // Adjust path as needed
import { useSearchParams } from 'next/navigation';
import FadeIn from '../../../../components/ui/FadeIn'; // Adjust path as needed

// Define a type for the order details we expect
interface OrderDetails {
	lineItems: Array<{
		id: string;
		product_name: string;
		quantity: number;
		amount_total: number;
	}>;
	customerEmail?: string;
	shippingDetails?: {
		name?: string | null;
		address?: {
			line1?: string | null;
			line2?: string | null;
			city?: string | null;
			state?: string | null;
			postal_code?: string | null;
			country?: string | null;
		};
	};
}

export default function SuccessPageContent() {
	const { clearCart } = useCart();
	const searchParams = useSearchParams();
	const [isProcessed, setIsProcessed] = useState(false); // To ensure clearCart runs once
	const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const sessionId = searchParams.get('session_id');
		if (sessionId && !isProcessed) {
			const fetchOrderDetails = async () => {
				setLoading(true);
				try {
					const response = await fetch(`/api/order-details?session_id=${sessionId}`);
					if (!response.ok) {
						const errorData = await response.json();
						throw new Error(
							errorData.error || `Error fetching order details: ${response.statusText}`
						);
					}
					const data: OrderDetails = await response.json();
					setOrderDetails(data);
					clearCart(); // Clear cart only after successfully fetching details
					setIsProcessed(true);
					setError(null);
				} catch (err) {
					console.error('Failed to fetch order details:', err);
					setError(err instanceof Error ? err.message : 'An unknown error occurred');
					// Optionally, you could try to clear cart even if fetching details fails,
					// but it might be better to understand why fetching failed first.
					// clearCart();
					// setIsProcessed(true); // If you decide to clear cart on error too.
				}
				setLoading(false);
			};

			fetchOrderDetails();
		}
	}, [searchParams, clearCart, isProcessed]); // isProcessed is correctly in deps

	if (loading && !isProcessed) {
		// Show loading only on initial load for session processing
		return (
			<div className="text-center py-10">
				<p className="text-xl text-gray-700">Loading your order details...</p>
				{/* You could add a spinner here */}
			</div>
		);
	}

	if (error) {
		return (
			<FadeIn>
				<h1 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
					Order Confirmation Error
				</h1>
				<p className="text-xl text-gray-700 mb-2">
					We encountered an issue retrieving your order details.
				</p>
				<p className="text-md text-gray-600 mb-8">Error: {error}</p>
				<p className="text-lg text-gray-700 mb-8">
					Don&apos;t worry, if your payment was successful, you should receive an email confirmation
					from Stripe shortly. Your cart has also been preserved for now.
				</p>
				<div className="space-y-4 md:space-y-0 md:space-x-4">
					<Link
						href="/products"
						className="w-full md:w-auto inline-block text-center px-6 py-3 bg-primary text-light rounded-md font-semibold transition-all duration-300 hover:bg-primary/80"
					>
						Continue Shopping
					</Link>
					<Link
						href="/cart"
						className="w-full md:w-auto inline-block text-center px-6 py-3 bg-gray-200 text-gray-700 rounded-md font-semibold transition-all duration-300 hover:bg-gray-300"
					>
						Back to Cart
					</Link>
				</div>
			</FadeIn>
		);
	}

	if (!orderDetails && !loading) {
		// If not loading and no details (e.g., no session_id)
		return (
			<FadeIn>
				<h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">Almost there!</h1>
				<p className="text-xl text-gray-700 mb-8">
					If you just completed a payment, your order confirmation is loading. Otherwise, please
					ensure you have a valid session.
				</p>
				<Link
					href="/products"
					className="px-6 py-3 bg-primary text-light rounded-md font-semibold transition-all duration-300 hover:bg-primary/80"
				>
					Continue Shopping
				</Link>
			</FadeIn>
		);
	}

	if (orderDetails) {
		return (
			<FadeIn>
				<div className="bg-white p-6 md:p-10 rounded-lg shadow-xl max-w-2xl mx-auto">
					<h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-6 text-center">
						Payment Successful!
					</h1>
					<p className="text-lg text-gray-700 mb-4 text-center">
						Thank you for your order! A confirmation email has been sent to{' '}
						<span className="font-semibold">
							{orderDetails.customerEmail || 'your email address'}
						</span>
						.
					</p>

					<div className="my-8">
						<h2 className="text-2xl font-semibold text-primary mb-4">Order Summary</h2>
						{orderDetails.lineItems && orderDetails.lineItems.length > 0 ? (
							<ul className="divide-y divide-gray-200">
								{orderDetails.lineItems.map((item) => (
									<li key={item.id} className="py-4 flex justify-between items-center">
										<div>
											<p className="font-medium text-gray-800">{item.product_name}</p>
											<p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
										</div>
										<p className="text-gray-800 font-medium">${item.amount_total.toFixed(2)}</p>
									</li>
								))}
							</ul>
						) : (
							<p className="text-gray-600">No items found in this order.</p>
						)}
					</div>

					{orderDetails.shippingDetails && orderDetails.shippingDetails.name && (
						<div className="my-8">
							<h2 className="text-2xl font-semibold text-primary mb-4">Shipping To</h2>
							<div className="text-gray-700 bg-gray-50 p-4 rounded-md">
								<p className="font-semibold">{orderDetails.shippingDetails.name}</p>
								<p>{orderDetails.shippingDetails.address?.line1}</p>
								{orderDetails.shippingDetails.address?.line2 && (
									<p>{orderDetails.shippingDetails.address.line2}</p>
								)}
								<p>
									{orderDetails.shippingDetails.address?.city},{' '}
									{orderDetails.shippingDetails.address?.state}{' '}
									{orderDetails.shippingDetails.address?.postal_code}
								</p>
								<p>{orderDetails.shippingDetails.address?.country}</p>
							</div>
						</div>
					)}

					<div className="text-center mt-10">
						<Link
							href="/products"
							className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-md hover:bg-secondary-dark transition-colors duration-300"
						>
							Continue Shopping
						</Link>
					</div>
				</div>
			</FadeIn>
		);
	}

	// Fallback for any other state, though ideally covered above
	return (
		<FadeIn>
			<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Order Status</h1>
			<p className="text-xl text-gray-700 mb-8">Checking your order details...</p>
			<Link
				href="/products"
				className="px-6 py-3 bg-primary text-light rounded-md font-semibold transition-all duration-300 hover:bg-primary/80"
			>
				Continue Shopping
			</Link>
		</FadeIn>
	);
}
