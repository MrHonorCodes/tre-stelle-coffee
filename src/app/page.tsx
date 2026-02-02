/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useRef } from 'react';
import FadeIn from '../../components/ui/FadeIn';
import ScrollReveal from '../../components/ui/ScrollReveal';
import ContactSection from '../../components/layout/ContactSection';
import FeaturedProducts from '../../components/ui/FeaturedProducts';
import FeaturedEvent from '../../components/ui/FeaturedEvent';

// Use Next.js dynamic import with SSR disabled
// const VideoSection = dynamic(() => import('../../components/ui/VideoSection'), {
//   ssr: false
// });

export default function Home() {
	// Ref for the video element
	const videoRef = useRef<HTMLVideoElement>(null);

	// Effect to set initial volume
	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.volume = 0.5; // Set volume to 50%
		}
	}, []); // Empty dependency array means this runs once on mount

	// Add smooth scrolling effect
	useEffect(() => {
		document.documentElement.style.scrollBehavior = 'smooth';
		return () => {
			document.documentElement.style.scrollBehavior = 'auto';
		};
	}, []);

	return (
		<main className="min-h-screen bg-soft-white">
			{/* Hero Section replicating Press page structure */}
			<section className="relative h-screen overflow-hidden pt-16 bg-primary">
				{/* Container for background layers */}
				<div className="absolute inset-0 z-0">
					{/* Background Image Div - Added opacity and filter */}
					<div
						className="absolute inset-0 bg-cover bg-center opacity-50"
						style={{
							backgroundImage: "url('/images/home-coffee-beans.jpg')",
							backgroundSize: 'cover',
							filter: 'brightness(0.4)',
						}}
					/>
					{/* Overlay Div (Primary color with 30% opacity) */}
					<div className="absolute inset-0 bg-primary/30"></div>
				</div>

				{/* Content Container (Ensure it's above background layers) */}
				<div className="relative container mx-auto px-4 h-[calc(100%-80px)] flex items-center z-10">
					<div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center w-full">
						{/* Text Content */}
						<div className="w-full lg:w-1/2 text-light text-center lg:text-left">
							<FadeIn delay={0.2}>
								<h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight text-secondary">
									Bridging the gap between modern & traditional coffee!
								</h1>
							</FadeIn>
							<FadeIn delay={0.4}>
								<p className="text-base md:text-lg mb-8 max-w-lg mx-auto lg:mx-0">
									We partner with trusted suppliers to bring you the finest coffee beans, carefully
									selected from farms worldwide. Discover the harmony of tradition and quality in
									every cup.
								</p>
							</FadeIn>
							<FadeIn delay={0.6}>
								<div className="flex flex-wrap gap-4 justify-center lg:justify-start">
									<a
										href="https://trestellecoffeeco.square.site/"
										target="_blank"
										rel="noopener noreferrer"
										className="px-8 py-3 bg-transparent text-secondary font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 border-2 border-secondary hover:bg-secondary hover:text-dark-text"
									>
										Order Now
									</a>
									<a
										href="/about-us"
										className="px-8 py-3 text-light font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-light hover:text-primary border-2 border-light"
									>
										Learn More
									</a>
								</div>
							</FadeIn>
						</div>

						{/* Video Section */}
						<div className="w-full lg:w-1/2 max-w-md lg:max-w-none">
							<FadeIn delay={0.8}>
								<div 
									className="rounded-lg overflow-hidden shadow-xl border-2 relative" 
									style={{ borderColor: '#e7c583' }}
								>
									{/* Fallback background in case poster doesn't load */}
									<div 
										className="absolute inset-0 bg-cover bg-center"
										style={{
											backgroundImage: "url('/images/home-coffee-beans.jpg')",
											zIndex: 1
										}}
									/>
									<video
										ref={videoRef}
										controls
										preload="metadata"
										poster="/images/Thumbnail.jpg"
										className="w-full h-full aspect-video object-cover relative z-10"
										src="/videos/Introduction.mp4"
									>
										Your browser does not support the video tag.
									</video>
								</div>
							</FadeIn>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Event Section - Conditionally rendered based on active promotions */}
			<FeaturedEvent />

			{/* Featured Products Section */}
			<FeaturedProducts />

			{/* Wholesale Partnership Section */}
			<section className="relative py-20 bg-primary text-light overflow-hidden">
				<div className="absolute inset-0 z-0">
					{/* Background Image */}
					<div
						className="absolute inset-0 bg-cover bg-center opacity-30"
						style={{
							backgroundImage: "url('/images/wholesale.jpg')",
							backgroundSize: 'cover',
							filter: 'brightness(0.4)',
						}}
					/>
					{/* Overlay */}
					<div className="absolute inset-0 bg-primary/70"></div>
				</div>

				<div className="container mx-auto px-4 relative z-10">
					<div className="max-w-4xl mx-auto text-center">
						<ScrollReveal>
							<span className="text-sm text-secondary uppercase tracking-wider font-semibold mb-4 block">
								Partner With Us
							</span>
							<h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-secondary">
								Wholesale Partnerships
							</h2>
						</ScrollReveal>
						<ScrollReveal delay={0.2}>
							<p className="text-xl text-light mb-8 max-w-2xl mx-auto">
								Quality coffee solutions for cafes, restaurants, offices, and more. We love partnering 
								up with other local businesses!
							</p>
						</ScrollReveal>
						<ScrollReveal delay={0.4}>
							<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-10 max-w-3xl mx-auto">
								<p className="text-lg text-light/90">
									At Tre Stelle Coffee Co., we&apos;re passionate about helping businesses elevate
									their coffee offerings. As a locally owned Roastery, we understand the importance of
									quality, consistency, and personalized service.
								</p>
							</div>
						</ScrollReveal>
						<ScrollReveal delay={0.6}>
							<div className="flex flex-wrap gap-4 justify-center">
								<a
									href="/wholesale"
									className="px-8 py-3 bg-secondary text-primary font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
								>
									Learn More
								</a>
								<a
									href="mailto:contact@trestellecoffeeco.com"
									className="px-8 py-3 text-light font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-light hover:text-primary border-2 border-light"
								>
									Contact Us
								</a>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Location Section */}
			<section className="relative bg-soft-white pt-24 pb-24 text-primary">
				{/* Container now has relative positioning implicitly from parent, no need for z-10 if SVG is positioned correctly */}
				<div className="container mx-auto px-4">
					<ScrollReveal>
						{/* Heading text color is already primary */}
						<h2 className="text-4xl font-bold text-center text-primary mb-16">Where to Find us?</h2>
					</ScrollReveal>

					<div className="relative bg-soft-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
						<ScrollReveal delay={0.1}>
							<div className="relative rounded-full p-4 ">
								<img
									src="/images/Tre-Stelle-Co-Coffee-Shop.jpg"
									alt="Tre Stelle Coffee Shop Storefront"
									className="w-full object-cover rounded"
									onError={(e) => {
										(e.target as HTMLImageElement).onerror = null;
										(e.target as HTMLImageElement).src =
											'https://via.placeholder.com/800x400?text=Tre+Stelle+Coffee+Storefront';
									}}
								/>
								<div className="absolute inset-0 bg-primary/20 rounded-full"></div>
							</div>

							{/* Gradient Overlay Div */}
							<div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-soft-white to-transparent pointer-events-none rounded-t-lg"></div>

							<div className="p-8 text-center">
								<h3 className="text-3xl font-bold text-primary mb-4">Tre Stelle Coffee Co.</h3>
								<address className="not-italic mb-6 text-lg">
									17390 Preston Road, Suite 210
									<br />
									Dallas, Texas 75252
								</address>
								<a
									href="https://maps.google.com/?q=17390+Preston+Road+suite+210+Dallas+Texas+75252"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-block px-8 py-3 bg-secondary text-tertiary font-semibold rounded-full uppercase tracking-wide text-sm transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-tertiary"
								>
									VIEW LOCATION
								</a>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Contact and Follow Section */}
			<ContactSection />
		</main>
	);
}
