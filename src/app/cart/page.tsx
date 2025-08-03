'use client';

import Link from 'next/link';
import { useState } from 'react'; // Added for loading/error state
import NextImage from 'next/image'; // Renamed to avoid conflict with Sanity Image type
import { useCart } from '../../context/CartContext';
// import productsData from '../../data/products.json'; // No longer needed
import FadeIn from '../../../components/ui/FadeIn';

// Import Sanity types and imageUrlBuilder
import type { Image as SanityImageType } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../../sanity/lib/client'; // Assuming client is configured for projectId and dataset

// Configure the image URL builder (or import urlFor from a shared lib)
const { projectId, dataset } = client.config();
const SanityImageBuilder = imageUrlBuilder({ projectId: projectId || '', dataset: dataset || '' });

function urlFor(source: SanityImageType) {
	if (!source) return undefined;
	return SanityImageBuilder.image(source);
}

// Product type is no longer needed here as details are on CartItem
// type Product = { ... };

// getProductDetails is no longer needed
// function getProductDetails(id: number): Product | undefined { ... }

const MAX_QUANTITY_PER_ORDER = 5; // Same as in ProductDisplayClient for consistency

export default function CartPage() {
	const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const SHIPPING_RATE = 5.0;
	const FREE_SHIPPING_THRESHOLD = 50;
	// const SHIPPING_DESTINATION = "Texas"; // Not used in current JSX, can be re-added if needed

	// cartItems from useCart() now have product details directly
	// We just need to calculate itemTotal if not already on CartItem
	const detailedCartItems = cartItems.map((item) => {
		return {
			...item,
			itemTotal: item.price * item.quantity, // price is now directly on item
		};
	});

	const subtotal = getCartTotal(); // This should now work correctly with CartContext changes
	const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
	const shippingCost = qualifiesForFreeShipping ? 0 : SHIPPING_RATE;
	const total = subtotal + shippingCost;

	const handleQuantityChange = (
		productId: string,
		newQuantity: number,
		options?: { [key: string]: string }
	) => {
		const clampedQuantity = Math.max(0, Math.min(newQuantity, MAX_QUANTITY_PER_ORDER));
		if (clampedQuantity === 0) {
			// If trying to go below 1, or newQuantity was 0
			removeFromCart(productId, options);
		} else {
			updateQuantity(productId, clampedQuantity, options);
		}
	};

	const handleCheckout = async () => {
		setIsLoading(true);
		setError(null);

		const lineItems = cartItems
			.filter((item) => item.productId && item.quantity > 0)
			.map((item) => ({
				productId: item.productId,
				quantity: item.quantity,
				...(item.options?.size && { size: item.options.size }),
			}));

		if (lineItems.length === 0) {
			setError('No items in the cart are available for checkout.');
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ lineItems }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Failed to create Stripe session');
			}

			const { url } = await response.json();
			window.location.href = url;
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An unknown error occurred during checkout.');
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16">
			<div className="container mx-auto px-4">
				<FadeIn>
					<h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
						Your Shopping Cart
					</h1>

					{detailedCartItems.length === 0 ? (
						<div className="text-center py-12">
							<p className="text-xl text-gray-600 mb-6">Your cart is currently empty.</p>
							<Link
								href="/products"
								className="px-6 py-3 bg-secondary text-dark-text border-2 border-secondary rounded-md font-semibold transition-all duration-300 hover:bg-transparent hover:text-secondary"
							>
								Continue Shopping
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
							<div className="lg:col-span-2 space-y-6">
								{detailedCartItems.map((item) => (
									// Use item.productId and options for a unique key
									<div
										key={generateCartItemKeyInternal(item.productId, item.options)}
										className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4"
									>
										<div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
											{item.images && item.images.length > 0 && urlFor(item.images[0]) ? (
												<NextImage
													src={urlFor(item.images[0])!.width(96).height(96).fit('crop').url()}
													alt={item.name}
													width={96}
													height={96}
													className="w-full h-full object-cover"
												/>
											) : (
												<div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
													No Image
												</div>
											)}
										</div>
										<div className="flex-grow flex flex-col md:flex-row justify-between items-center w-full">
											<div className="mb-2 md:mb-0 text-center md:text-left">
												{/* Link to product using slug if available, otherwise construct from productId */}
												<Link
													href={
														item.slug?.current
															? `/products/${item.slug.current}`
															: `/products/${item.productId}`
													}
													className="text-lg font-semibold text-primary hover:text-secondary transition-colors"
												>
													{item.name}
												</Link>
												{item.options && (
													<div className="text-sm text-gray-500 mt-1">
														{Object.entries(item.options).map(([key, value]) => (
															<span key={key} className="mr-2">
																{key}: {value}
															</span>
														))}
													</div>
												)}
											</div>
											<div className="flex items-center gap-4 md:gap-6">
												<div className="flex items-center border border-gray-300 rounded-md">
													<button
														onClick={() =>
															handleQuantityChange(item.productId, item.quantity - 1, item.options)
														}
														className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md"
														aria-label="Decrease quantity"
													>
														-
													</button>
													<span className="px-3 py-1 border-l border-r border-gray-300 text-center text-sm w-10">
														{item.quantity}
													</span>
													<button
														onClick={() =>
															handleQuantityChange(item.productId, item.quantity + 1, item.options)
														}
														className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
														aria-label="Increase quantity"
														disabled={item.quantity >= MAX_QUANTITY_PER_ORDER}
													>
														+
													</button>
												</div>
												<span className="text-lg font-semibold text-primary w-20 text-right">
													${item.itemTotal.toFixed(2)}
												</span>
												<button
													onClick={() => removeFromCart(item.productId, item.options)}
													className="text-gray-400 hover:text-red-600 transition-colors"
													aria-label="Remove item"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											</div>
										</div>
									</div>
								))}
								<div className="text-right mt-4">
									<button
										onClick={clearCart}
										className="text-sm text-gray-500 hover:text-red-600 underline transition-colors"
									>
										Clear Cart
									</button>
								</div>
							</div>

							{/* Order Summary */}
							<div className="lg:col-span-1">
								<div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
									<h2 className="text-xl font-semibold text-primary mb-6 border-b pb-3">
										Order Summary
									</h2>
									<div className="flex justify-between items-center mb-4">
										<span className="text-gray-600">Subtotal</span>
										<span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between items-center mb-4">
										<span className="text-gray-600">Shipping</span>
										<span className="font-semibold text-primary">
											{qualifiesForFreeShipping ? 'Free' : `$${shippingCost.toFixed(2)}`}
										</span>
									</div>
									{!qualifiesForFreeShipping && subtotal > 0 && (
										<div className="text-sm text-gray-500 mb-4 text-center">
											Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping!
										</div>
									)}
									<div className="flex justify-between items-center mb-6 text-gray-500 text-sm">
										<span>Taxes</span>
										<span>Calculated at checkout</span>
									</div>
									<div className="border-t pt-4 flex justify-between items-center font-bold text-lg text-primary">
										<span>Total</span>
										<span>${total.toFixed(2)}</span>
									</div>
									<p className="text-xs text-gray-500 mt-4 text-center">
										* Currently shipping only to addresses within Texas. *
									</p>
									<button
										onClick={handleCheckout}
										disabled={isLoading || detailedCartItems.length === 0}
										className="cart-proceed-checkout-button mt-6 block w-full text-center px-6 py-3 bg-primary text-light rounded-md font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-primary"
									>
										{isLoading ? 'Processing...' : 'Proceed to Checkout'}
									</button>
									{error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
								</div>
							</div>
						</div>
					)}
				</FadeIn>
			</div>
		</main>
	);
}

// Internal helper for generating keys, as CartContext's one is not exported
const generateCartItemKeyInternal = (
	productId: string,
	options?: { [key: string]: string }
): string => {
	let key = productId;
	if (options) {
		Object.keys(options)
			.sort()
			.forEach((optionKey) => {
				key += `-${optionKey}:${options[optionKey]}`;
			});
	}
	return key;
};
