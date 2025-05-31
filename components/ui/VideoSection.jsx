'use client';

import { useState, useEffect } from 'react';
import FadeIn from '../../components/ui/FadeIn';

// Create a separate client component for the video
const VideoSection = () => {
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		// Return a placeholder with the same dimensions during SSR
		return (
			<div className="absolute right-0 top-0 w-full md:w-1/2 h-[50vh] z-0 hidden md:block overflow-hidden border border-gray-300">
				<FadeIn delay={0.5}>
					<div className="relative w-full h-full">
						{/* Placeholder div that matches the video's styling */}
						<div className="absolute inset-0 bg-tertiary"></div>
						<div className="absolute inset-0 bg-tertiary opacity-30"></div>
					</div>
				</FadeIn>
			</div>
		);
	}

	// Only rendered on client after mount
	return (
		<div className="absolute right-0 top-0 w-full md:w-1/2 h-[50vh] z-0 hidden md:block overflow-hidden border border-gray-300">
			<FadeIn delay={0.5}>
				<div className="relative w-full h-full">
					<video
						className="absolute inset-0 w-full h-full object-cover"
						autoPlay
						muted
						loop
						playsInline
					>
						<source src="/videos/coffee-pour.mp4" type="video/mp4" />
						Your browser does not support the video tag.
					</video>

					<div className="absolute inset-0 bg-tertiary opacity-30"></div>
				</div>
			</FadeIn>
		</div>
	);
};

// Export the component to be used in your Home page
export default VideoSection;
