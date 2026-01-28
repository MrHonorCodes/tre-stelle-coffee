'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Eventbrite link - update this with the actual link
const EVENTBRITE_URL = 'https://www.eventbrite.com/e/immersive-coffee-experience-tickets-1981758000527?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl'; // TODO: Replace with actual Eventbrite URL

export function isImmersiveCoffeeEventEnabled(now: Date = new Date()): boolean {
	const override = process.env.NEXT_PUBLIC_ENABLE_IMMERSIVE_COFFEE_EVENT;
	if (override === 'true') return true;
	if (override === 'false') return false;

	// Default behavior: enabled from Jan 15 through Feb 15, 2026
	const start = new Date(2026, 0, 15, 0, 0, 0, 0); // Jan 15, 2026
	const end = new Date(2026, 1, 15, 23, 59, 59, 999); // Feb 15, 2026 end of day
	return now >= start && now <= end;
}

export default function ImmersiveCoffeePopup() {
	const [isVisible, setIsVisible] = useState(false);
	const [isMounted, setIsMounted] = useState(false);

	const eventEnabled = isImmersiveCoffeeEventEnabled();

	useEffect(() => {
		// Set mounted state to true after component mounts
		setIsMounted(true);

		// Check if popup has been shown in this session
		const hasSeenPopup = sessionStorage.getItem('immersiveCoffeeEventSeen');

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
		sessionStorage.setItem('immersiveCoffeeEventSeen', 'true');
	};

	const handleGetTickets = () => {
		sessionStorage.setItem('immersiveCoffeeEventSeen', 'true');
		window.open(EVENTBRITE_URL, '_blank');
		setIsVisible(false);
	};

	// Don't render anything until component is mounted on client
	if (!eventEnabled || !isMounted || !isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Overlay */}
			<div
				className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
				onClick={handleDismiss}
			/>

			{/* Modal Content */}
			<div className="relative bg-soft-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
				{/* Close Button */}
				<button
					onClick={handleDismiss}
					className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-gray-800 cursor-pointer"
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

				{/* Event Image */}
				<div className="relative w-full aspect-[3/4]">
					<Image
						src="/images/immersive-coffee-event.png"
						alt="Immersive Coffee Experience - Tre Stelle Coffee Co. x The Habesha Barista - February 15, 2026"
						fill
						className="object-cover"
						priority
					/>
				</div>

				{/* Action Buttons */}
				<div className="p-4 flex flex-col gap-3 bg-[#f5f0e8]">
					<button
						onClick={handleGetTickets}
						className="w-full bg-primary text-light font-semibold py-3 px-6 rounded-full text-center transition-all duration-300 hover:bg-tertiary transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
					>
						Get Tickets on Eventbrite
					</button>
					<button
						onClick={handleDismiss}
						className="w-full bg-transparent text-primary font-medium py-2 px-6 rounded-full border-2 border-primary hover:bg-primary hover:text-light transition-all duration-300 cursor-pointer"
					>
						Maybe Later
					</button>
				</div>
			</div>
		</div>
	);
}
