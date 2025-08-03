'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CoffeePromoPopup() {
	const [isVisible, setIsVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// Set mounted state to true after component mounts
		setIsMounted(true);

		// Check if popup has been shown in this session
		const hasSeenPopup = sessionStorage.getItem('coffeePromoSeen');
		
		if (!hasSeenPopup) {
			// Show popup after a short delay for better UX
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, []);

	const handleDismiss = () => {
		setIsVisible(false);
		sessionStorage.setItem('coffeePromoSeen', 'true');
	};

	const handleNavigateToProducts = () => {
		setIsVisible(false);
		sessionStorage.setItem('coffeePromoSeen', 'true');
	};

	// Don't render anything until component is mounted on client
	if (!isMounted || !isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div 
				className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"
				onClick={handleDismiss}
			/>
			
			{/* Modal Content */}
			<div className="relative bg-soft-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
				{/* Close Button */}
				<button
					onClick={handleDismiss}
					className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200 text-gray-500 hover:text-gray-700"
					aria-label="Close popup"
				>
					<svg
						className="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				{/* Hero Image */}
				<div className="h-48 bg-primary relative overflow-hidden">
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: "url('/images/home-coffee-beans.jpg')",
						}}
					/>
					<div className="absolute inset-0 bg-primary/70" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="text-center text-secondary">
							<h2 className="text-2xl font-bold mb-2">Fresh Roasted Coffee</h2>
							<p className="text-secondary-light">Just in!</p>
						</div>
					</div>
				</div>

				{/* Content */}
				<div className="p-6">
					<h3 className="text-xl font-bold text-primary mb-3 text-center">
						Discover Our Freshly Roasted Coffee
					</h3>
					<p className="text-gray-700 text-center mb-6 leading-relaxed">
						Experience the perfect blend of tradition and innovation with our premium coffee collection, 
						roasted to perfection daily.
					</p>

					{/* Action Buttons */}
					<div className="flex flex-col gap-3">
						<Link
							href="/products"
							onClick={handleNavigateToProducts}
							className="w-full bg-primary text-light font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 hover:bg-tertiary transform hover:scale-105 shadow-md hover:shadow-lg"
						>
							Shop Fresh Coffee
						</Link>
						<button
							onClick={handleDismiss}
							className="w-full bg-transparent text-primary font-medium py-2 px-6 rounded-full border-2 border-primary hover:bg-primary hover:text-light transition-all duration-300"
						>
							Maybe Later
						</button>
					</div>
				</div>
			</div>
		</div>
	);
} 