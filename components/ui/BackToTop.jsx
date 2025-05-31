'use client';

import { useState, useEffect } from 'react';

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	// Show button when page is scrolled down
	const toggleVisibility = () => {
		if (window.scrollY > 300) {
			setIsVisible(true);
		} else {
			setIsVisible(false);
		}
	};

	// Set up scroll event listener
	useEffect(() => {
		window.addEventListener('scroll', toggleVisibility);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	// Scroll to top function
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<>
			{isVisible && (
				<button
					onClick={scrollToTop}
					className="back-to-top-button fixed bottom-6 right-6 bg-secondary text-light-text p-3 rounded-full shadow-lg transition-opacity transform duration-300 z-[999] focus:outline-none"
					aria-label="Back to top"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M18 15l-6-6-6 6" />
					</svg>
				</button>
			)}
		</>
	);
};

export default BackToTop;
