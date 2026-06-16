'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export function isAnniversaryEnabled(now: Date = new Date()): boolean {
	const override = process.env.NEXT_PUBLIC_ENABLE_ANNIVERSARY;
	if (override === 'true') return true;
	if (override === 'false') return false;

	// Active now through the 4th anniversary on June 20, 2026, then auto-hides
	const start = new Date(2026, 0, 1, 0, 0, 0, 0);
	const end = new Date(2026, 5, 20, 23, 59, 59, 999);
	return now >= start && now <= end;
}

export default function AnniversaryPopup() {
	const [isVisible, setIsVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const enabled = isAnniversaryEnabled();

	useEffect(() => {
		setIsMounted(true);
		const hasSeen = sessionStorage.getItem('anniversaryPopupSeen');
		if (!hasSeen) {
			const timer = setTimeout(() => setIsVisible(true), 1500);
			return () => clearTimeout(timer);
		}
	}, []);

	const handleDismiss = () => {
		setIsVisible(false);
		sessionStorage.setItem('anniversaryPopupSeen', 'true');
	};

	if (!enabled || !isMounted || !isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
				onClick={handleDismiss}
			/>

			{/* Modal */}
			<div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
				{/* Close Button */}
				<button
					onClick={handleDismiss}
					className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all duration-200 text-gray-600 hover:text-gray-900 cursor-pointer"
					aria-label="Close"
				>
					<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>

				{/* Flyer Image */}
				<div className="relative w-full aspect-[3/4]">
					<Image
						src="/images/anniversary-celebration.png"
						alt="Tre Stelle Coffee Co. 4 Year Celebration - June 20, 10AM - 17390 Preston Rd Ste 210"
						fill
						className="object-cover"
						priority
					/>
				</div>

				{/* Caption */}
				<div className="px-5 pt-4 pb-2 bg-[#f5f0e8] text-center">
					<h3 className="text-xl font-bold text-primary mb-1">
						We&apos;re Turning 4! 🎉
					</h3>
					<p className="text-sm text-gray-700 mb-2">
						Join us for our 4 Year Celebration on <strong>Saturday, June 20</strong> starting at{' '}
						<strong>10 AM</strong>. Come toast four years of Tre Stelle with us!
					</p>
					<p className="text-sm text-gray-600">
						☕ Coffee &bull; 🍵 Matcha &bull; 🎧 Live DJ &bull; 👕 Merch &bull; 🎁 Raffle Prizes
					</p>
					<p className="text-xs text-gray-500 mt-2">
						17390 Preston Rd, Ste 210 &bull; Dallas, TX
					</p>
				</div>

				{/* CTA */}
				<div className="px-4 pt-2 pb-4 bg-[#f5f0e8] flex flex-col gap-2">
					<a
						href="https://maps.google.com/?q=17390+Preston+Rd+Ste+210+Dallas+TX"
						target="_blank"
						rel="noopener noreferrer"
						onClick={handleDismiss}
						className="w-full bg-primary text-light font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 hover:bg-tertiary transform hover:scale-105 shadow-md cursor-pointer"
					>
						Get Directions
					</a>
					<button
						onClick={handleDismiss}
						className="w-full bg-transparent text-primary font-medium py-2 px-6 rounded-full border-2 border-primary hover:bg-primary hover:text-light transition-all duration-300 cursor-pointer"
					>
						See You There!
					</button>
				</div>
			</div>
		</div>
	);
}
