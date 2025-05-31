'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router
import { useCart } from '../../context/CartContext';
import FadeIn from '../../../components/ui/FadeIn';

export default function CheckoutPage() {
	const { cartItems, getCartTotal, clearCart } = useCart();
	const router = useRouter();

	// --- State for Form Inputs ---
	const [shippingInfo, setShippingInfo] = useState({
		name: '',
		address: '',
		city: '',
		state: 'Texas', // Default or pre-filled based on logic
		zip: '',
		email: '',
		phone: '',
	});
	const [paymentInfo, setPaymentInfo] = useState({
		cardNumber: '',
		expiryDate: '',
		cvv: '',
		nameOnCard: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// --- Calculate Totals ---
	const subtotal = getCartTotal();
	const SHIPPING_RATE = 5.0; // Match cart page
	const TAX_RATE = 0.0825; // Example tax rate (8.25%)
	const taxes = subtotal * TAX_RATE;
	const total = subtotal + SHIPPING_RATE + taxes;

	// --- Input Handler ---
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		section: 'shipping' | 'payment'
	) => {
		const { name, value } = e.target;
		if (section === 'shipping') {
			setShippingInfo((prev) => ({ ...prev, [name]: value }));
		} else {
			setPaymentInfo((prev) => ({ ...prev, [name]: value }));
		}
	};

	// --- Form Submission Handler ---
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		// --- Basic Validation (Example) ---
		if (
			!shippingInfo.name ||
			!shippingInfo.address ||
			!shippingInfo.city ||
			!shippingInfo.zip ||
			!shippingInfo.email
		) {
			setError('Please fill in all required shipping fields.');
			setIsLoading(false);
			return;
		}
		// TODO: Add more robust validation (email format, zip format, card details etc.)
		// TODO: Implement actual payment processing logic (e.g., Stripe, Square)

		console.log('Submitting Order:', { shippingInfo, paymentInfo, cartItems, total });

		// Simulate API call/order processing
		try {
			// Replace with your actual order submission logic
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// On successful order:
			console.log('Order placed successfully!');
			clearCart(); // Clear the cart
			// Redirect to an order confirmation page (optional)
			// router.push('/order-confirmation?orderId=12345'); // Example redirect
			alert('Order Placed Successfully! (Placeholder)'); // Placeholder confirmation
			router.push('/'); // Redirect home for now
		} catch (err) {
			console.error('Order submission failed:', err);
			setError('Failed to place order. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	// If cart is empty, redirect back to cart page or show message
	if (cartItems.length === 0 && !isLoading) {
		// Avoid redirect during submission
		// Optionally show a message or redirect
		// router.push('/cart');
		return (
			<main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16 flex items-center justify-center">
				<div className="container mx-auto px-4 text-center">
					<FadeIn>
						<h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">Checkout</h1>
						<p className="text-xl text-gray-600 mb-6">
							Your cart is empty. Add items to proceed to checkout.
						</p>
						<Link
							href="/products"
							className="px-6 py-3 bg-secondary text-dark-text border-2 border-secondary rounded-md font-semibold transition-all duration-300 hover:bg-transparent hover:text-secondary"
						>
							Shop Now
						</Link>
					</FadeIn>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16">
			<div className="container mx-auto px-4">
				<FadeIn>
					<h1 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
						Checkout
					</h1>

					<form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
						{/* Shipping & Payment Info (Left/Main Column) */}
						<div className="lg:col-span-2 space-y-8">
							{/* Shipping Information */}
							<section className="bg-white p-6 rounded-lg shadow-md">
								<h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-3">
									Shipping Information
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{/* Form fields ... */}
									<div>
										<label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
											Full Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={shippingInfo.name}
											onChange={(e) => handleInputChange(e, 'shipping')}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
										/>
									</div>
									{/* Add more fields: Address, City, State (Dropdown/Select), Zip, Email, Phone */}
									<div>
										<label
											htmlFor="address"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Address
										</label>
										<input
											type="text"
											id="address"
											name="address"
											value={shippingInfo.address}
											onChange={(e) => handleInputChange(e, 'shipping')}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
										/>
									</div>
									<div>
										<label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
											City
										</label>
										<input
											type="text"
											id="city"
											name="city"
											value={shippingInfo.city}
											onChange={(e) => handleInputChange(e, 'shipping')}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
										/>
									</div>
									<div>
										<label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
											State
										</label>
										{/* Consider making this a dropdown if shipping outside Texas is planned */}
										<input
											type="text"
											id="state"
											name="state"
											value={shippingInfo.state}
											onChange={(e) => handleInputChange(e, 'shipping')}
											required
											readOnly
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 focus:outline-none"
										/>
										<p className="text-xs text-gray-500 mt-1">
											*Currently shipping only within Texas.
										</p>
									</div>
									<div>
										<label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
											ZIP Code
										</label>
										<input
											type="text"
											id="zip"
											name="zip"
											value={shippingInfo.zip}
											onChange={(e) => handleInputChange(e, 'shipping')}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
											Email Address
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={shippingInfo.email}
											onChange={(e) => handleInputChange(e, 'shipping')}
											required
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
										/>
									</div>
									<div className="md:col-span-2">
										<label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
											Phone Number (Optional)
										</label>
										<input
											type="tel"
											id="phone"
											name="phone"
											value={shippingInfo.phone}
											onChange={(e) => handleInputChange(e, 'shipping')}
											className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
										/>
									</div>
								</div>
							</section>

							{/* Payment Information - Placeholder */}
							<section className="bg-white p-6 rounded-lg shadow-md">
								<h2 className="text-2xl font-semibold text-primary mb-6 border-b pb-3">
									Payment Information
								</h2>
								{/* Placeholder for Payment Integration (e.g., Stripe Elements) */}
								<div className="bg-gray-100 p-4 rounded-md text-center text-gray-600">
									<p className="font-semibold mb-2">Payment Gateway Placeholder</p>
									<p className="text-sm">
										Actual payment processing (e.g., Stripe, Square) would be integrated here.
									</p>
									{/* Basic card fields for layout example - DO NOT use for real payments without secure integration */}
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-left">
										<div>
											<label
												htmlFor="cardNumber"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Card Number
											</label>
											<input
												type="text"
												id="cardNumber"
												name="cardNumber"
												value={paymentInfo.cardNumber}
												onChange={(e) => handleInputChange(e, 'payment')}
												placeholder="•••• •••• •••• ••••"
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
											/>
										</div>
										<div>
											<label
												htmlFor="nameOnCard"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Name on Card
											</label>
											<input
												type="text"
												id="nameOnCard"
												name="nameOnCard"
												value={paymentInfo.nameOnCard}
												onChange={(e) => handleInputChange(e, 'payment')}
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
											/>
										</div>
										<div>
											<label
												htmlFor="expiryDate"
												className="block text-sm font-medium text-gray-700 mb-1"
											>
												Expiry Date (MM/YY)
											</label>
											<input
												type="text"
												id="expiryDate"
												name="expiryDate"
												value={paymentInfo.expiryDate}
												onChange={(e) => handleInputChange(e, 'payment')}
												placeholder="MM/YY"
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
											/>
										</div>
										<div>
											<label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
												CVV
											</label>
											<input
												type="text"
												id="cvv"
												name="cvv"
												value={paymentInfo.cvv}
												onChange={(e) => handleInputChange(e, 'payment')}
												placeholder="•••"
												className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
											/>
										</div>
									</div>
								</div>
							</section>
						</div>

						{/* Order Summary (Right Column) */}
						<div className="lg:col-span-1">
							<div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
								<h2 className="text-xl font-semibold text-primary mb-6 border-b pb-3">
									Order Summary
								</h2>

								{/* List cart items - Simplified view */}
								<div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
									{cartItems.map((item) => {
										// Note: We don't have full product details here without extra fetching.
										// For a real app, consider passing details or fetching them.
										// Showing basic info available in CartContext.
										const itemKey = `${item.productId}-${JSON.stringify(item.options)}`; // Recreate key. Changed item.id to item.productId
										return (
											<div key={itemKey} className="flex justify-between items-center text-sm">
												<div>
													<span className="font-medium">{item.name}</span>{' '}
													{item.options && `(${Object.values(item.options).join(', ')})`}{' '}
													{/* Changed to display item.name */}
													<span className="block text-xs text-gray-500">Qty: {item.quantity}</span>
												</div>
												{/* Price requires fetching product data - showing placeholder */}
												{/* <span className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</span> */}
											</div>
										);
									})}
								</div>

								<div className="border-t pt-4 space-y-2">
									<div className="flex justify-between items-center">
										<span className="text-gray-600">Subtotal</span>
										<span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600">Shipping</span>
										<span className="font-semibold text-primary">${SHIPPING_RATE.toFixed(2)}</span>
									</div>
									<div className="flex justify-between items-center">
										<span className="text-gray-600">Taxes</span>
										<span className="font-semibold text-primary">${taxes.toFixed(2)}</span>
									</div>
									<div className="border-t pt-3 mt-3 flex justify-between items-center font-bold text-lg text-primary">
										<span>Total</span>
										<span>${total.toFixed(2)}</span>
									</div>
								</div>

								{error && <p className="text-red-600 text-sm mt-4 text-center">{error}</p>}

								{/* Place Order Button */}
								<button
									type="submit"
									disabled={isLoading || cartItems.length === 0}
									className={`mt-6 w-full text-center px-6 py-3 rounded-md font-semibold text-lg transition-all duration-300 
                    ${isLoading || cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-light hover:bg-primary/80'}`}
								>
									{isLoading ? 'Processing...' : 'Place Order'}
								</button>

								{/* Back to Cart Link */}
								<div className="text-center mt-4">
									<Link href="/cart" className="text-sm text-gray-600 hover:text-primary underline">
										Back to Cart
									</Link>
								</div>
							</div>
						</div>
					</form>
				</FadeIn>
			</div>
		</main>
	);
}
