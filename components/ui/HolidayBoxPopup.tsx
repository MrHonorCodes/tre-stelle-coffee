'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { client } from '../../src/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import type { Image as SanityImageType } from 'sanity';

// Setup for Sanity image URLs
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageType) {
	if (!source) return '/images/products/placeholder.jpg';
	return builder.image(source).url();
}

export default function HolidayBoxPopup() {
	const [isVisible, setIsVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const [holidayBoxImage, setHolidayBoxImage] = useState<string | null>(null);

	useEffect(() => {
		// Set mounted state to true after component mounts
		setIsMounted(true);

		// Fetch Holiday Box product image
		async function fetchHolidayBoxImage() {
			try {
				const product = await client.fetch(
					`*[_type == "product" && slug.current == "holiday-box"][0]{
						images
					}`
				);
				if (product?.images?.[0]) {
					setHolidayBoxImage(urlFor(product.images[0]));
				}
			} catch (error) {
				console.error('Error fetching Holiday Box image:', error);
			}
		}
		
		fetchHolidayBoxImage();

		// Check if popup has been shown in this session
		const hasSeenPopup = sessionStorage.getItem('holidayBoxPromoSeen');
		
		if (!hasSeenPopup) {
			// Show popup after a short delay for better UX
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 2000); // Show after 2 seconds

			return () => clearTimeout(timer);
		}
	}, []);

	const handleDismiss = () => {
		setIsVisible(false);
		sessionStorage.setItem('holidayBoxPromoSeen', 'true');
	};

	const handleNavigateToProduct = () => {
		setIsVisible(false);
		sessionStorage.setItem('holidayBoxPromoSeen', 'true');
	};

	// Don't render anything until component is mounted on client
	if (!isMounted || !isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div 
				className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
				onClick={handleDismiss}
			/>
			
			{/* Modal Content */}
			<div className="relative bg-soft-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
				{/* Close Button */}
				<button
					onClick={handleDismiss}
					className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-gray-800"
					aria-label="Close popup"
				>
					<svg
						className="w-6 h-6"
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

				<div className="grid md:grid-cols-2 gap-0">
					{/* Image Section */}
					<div className="relative h-64 md:h-auto bg-primary/10">
						<div className="absolute inset-0 flex items-center justify-center p-8">
							{holidayBoxImage ? (
								<div className="relative w-full h-full">
									<Image
										src={holidayBoxImage}
										alt="Holiday Box"
										fill
										className="object-contain"
										priority
									/>
								</div>
							) : (
								<div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-tertiary/20 rounded-lg">
									<div className="text-center">
										<div className="text-6xl mb-4">🎁</div>
										<p className="text-primary font-semibold text-lg">Holiday Box</p>
										<p className="text-gray-600 text-sm mt-2">Loading...</p>
									</div>
								</div>
							)}
						</div>
					</div>

					{/* Content Section */}
					<div className="p-8 flex flex-col justify-center">
						<div className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
							🎄 LIMITED TIME OFFER
						</div>
						
						<h2 className="text-3xl font-bold text-primary mb-3">
							Holiday Box Special
						</h2>
						
						<p className="text-gray-700 mb-4 leading-relaxed">
							The perfect gift for coffee lovers! Get our exclusive Holiday Box featuring:
						</p>

						<ul className="space-y-2 mb-6 text-gray-700">
							<li className="flex items-start">
								<svg className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
								<span><strong>Your choice</strong> of premium coffee bag</span>
							</li>
							<li className="flex items-start">
								<svg className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
								<span>Exclusive Tre Stelle Coffee Co. <strong>t-shirt</strong></span>
							</li>
							<li className="flex items-start">
								<svg className="w-5 h-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
									<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
								</svg>
								<span>Premium <strong>coffee mug</strong></span>
							</li>
						</ul>

						<div className="flex items-baseline mb-6">
							<span className="text-4xl font-bold text-primary">$60</span>
							<span className="text-gray-500 ml-2 line-through text-lg">$85</span>
							<span className="text-green-600 ml-2 font-semibold">Save $25!</span>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col gap-3">
							<Link
								href="/products/holiday-box"
								onClick={handleNavigateToProduct}
								className="w-full bg-primary text-light font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 hover:bg-tertiary transform hover:scale-105 shadow-md hover:shadow-lg"
							>
								Get Your Holiday Box
							</Link>
							<button
								onClick={handleDismiss}
								className="w-full bg-transparent text-primary font-medium py-2 px-6 rounded-full border-2 border-primary hover:bg-primary hover:text-light transition-all duration-300"
							>
								Continue Shopping
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
