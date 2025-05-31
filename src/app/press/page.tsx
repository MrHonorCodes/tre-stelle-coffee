/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';

// Press feature type
type PressFeature = {
	id: number;
	outlet: string;
	logo: string;
	headline?: string;
	excerpt?: string;
	date: string;
	link: string;
	featured?: boolean;
};

export default function Press() {
	// State to control video visibility
	const [showVideo, setShowVideo] = useState(false);

	// Add smooth scrolling effect
	useEffect(() => {
		document.documentElement.style.scrollBehavior = 'smooth';
		return () => {
			document.documentElement.style.scrollBehavior = 'auto';
		};
	}, []);

	// Press features data
	const pressFeatures: PressFeature[] = [
		{
			id: 1,
			outlet: 'WFAA Good Morning Texas',
			logo: '/images/press/wfaa-logo.jpg',
			headline: 'Cozy up with fall-inspired coffee drinks at Tre Stelle Coffee Co.',
			excerpt:
				'Tre Stelle Coffee Co. features beans sourced from around the world, roasted locally in Dallas.',
			date: 'September 26, 2022',
			link: 'https://www.wfaa.com/video/entertainment/television/programs/good-morning-texas/cozy-up-with-fall-inspired-coffee-drinks-at-tre-stelle-coffee-co/287-af38153a-df57-45d8-a8e5-82c465b83f9a',
			featured: true,
		},
		{
			id: 2,
			outlet: 'Dallas Morning News',
			logo: '/images/press/dallas-morning-news-logo.png',
			headline: 'East African-inspired coffee shop Tre Stelle opens in Dallas',
			excerpt:
				'The local roastery is building bridges between cultures and neighborhoods through their inclusive approach.',
			date: 'August 18, 2022',
			link: 'https://www.dallasnews.com/food/restaurant-news/2022/08/18/east-african-inspired-coffee-shop-tre-stelle-opens-in-dallas/',
		},
		{
			id: 3,
			outlet: 'Dallas Weekly',
			logo: '/images/press/dallas-weekly-logo.jpg',
			headline:
				'The Stars Align for Coffee Lover in North Texas with Opening of Tre Selle Coffee Co. in North Dallas',
			excerpt:
				"Entrepreneur Jonathan has gone from running from the smell of coffee to running Dallas' newest specialty coffee house.",
			date: 'August 9, 2022',
			link: 'https://dallasweekly.com/tag/tre-stelle/',
		},
		{
			id: 4,
			outlet: 'Daily Coffee News',
			logo: '/images/press/DCN_Logo.png',
			headline: "Coffee, Culture and Community Are Co-Stars at Tre Stelle's First Cafe in Dallas",
			excerpt:
				'The stars have aligned for specialty coffee in Far North Dallas as Eritrean family-run roasting company Tre Stelle Coffee has opened its first cafe.',
			date: 'August 17, 2022',
			link: 'https://dailycoffeenews.com/2022/08/17/coffee-culture-and-community-are-co-stars-at-tre-stelles-first-cafe-in-dallas/',
		},
		{
			id: 5,
			outlet: 'DALLAS OBSERVER',
			logo: '/images/press/dallas-observer-logo.png',
			headline: "Tre Stelle Is a 20-Year-Old's Dream Coffee Shop Made Reality",
			excerpt:
				"The shop is inspired by the traditions of Eritrea, homeland of the proprietor's parents.",
			date: 'October 16, 2023',
			link: 'https://www.dallasobserver.com/restaurants/tre-stelle-is-a-20-year-olds-dream-coffee-shop-made-reality-17650978',
		},
	];

	// Get featured press item (if any)
	const featuredPress = pressFeatures.find((item) => item.featured);
	const regularPress = pressFeatures.filter((item) => !item.featured);

	return (
		<main className="min-h-screen bg-soft-white">
			{/* Hero Section with maroon background */}
			<section className="relative h-[50vh] overflow-hidden bg-primary pt-16 flex items-center justify-center">
				<div className="absolute inset-0 z-0">
					{/* Overlay with coffee beans background */}
					<div
						className="absolute inset-0 bg-cover bg-center"
						style={{
							backgroundImage: "url('/images/press/press-banner.png')",
							backgroundSize: 'cover',
						}}
					/>
					<div className="absolute inset-0 bg-primary/60"></div>
				</div>

				<div className="container mx-auto px-4 relative z-10 text-center">
					<FadeIn delay={0.2}>
						<h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight text-secondary">
							Press
						</h1>
					</FadeIn>
				</div>
			</section>

			{/* Press Section */}
			<section className="py-16 md:py-24 bg-soft-white">
				<div className="container mx-auto px-4">
					{/* Introduction Text */}
					<div className="text-center mb-16">
						<FadeIn>
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
								Tre Stelle in the News
							</h2>
							<p className="text-gray-700 max-w-3xl mx-auto">
								We&apos;re grateful for the attention our coffee and story have received.
								Here&apos;s some of the press coverage featuring Tre Stelle Coffee Co.
							</p>
						</FadeIn>
					</div>

					{/* Featured Press Item (if exists) */}
					{featuredPress && (
						<div className="mb-20">
							<ScrollReveal>
								<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
									<div className="grid grid-cols-1 md:grid-cols-2">
										<div className="p-8 md:p-12 flex flex-col justify-center">
											<div className="h-16 mb-8 flex items-center">
												<img
													src={featuredPress.logo}
													alt={featuredPress.outlet}
													className="h-full object-contain"
													onError={(e) => {
														(e.target as HTMLImageElement).onerror = null;
														(e.target as HTMLImageElement).src =
															`https://via.placeholder.com/200x100?text=${featuredPress.outlet}`;
													}}
												/>
											</div>
											<h3 className="text-2xl md:text-3xl text-primary font-bold mb-4">
												{featuredPress.headline || 'Tre Stelle Coffee Featured on WFAA'}
											</h3>
											<p className="text-gray-700 mb-4">
												{featuredPress.excerpt ||
													'Watch how Tre Stelle Coffee brings Eritrean coffee culture to Dallas, featuring our owner Jonathan Ghebreamlak sharing his story and passion for coffee.'}
											</p>
											<div className="flex justify-between items-center">
												<span className="text-gray-500">{featuredPress.date || 'April 2023'}</span>
												{featuredPress.link ? (
													<a
														href={featuredPress.link}
														target="_blank"
														rel="noopener noreferrer"
														className="px-6 py-2 bg-secondary text-dark-text font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
													>
														Read Article
													</a>
												) : (
													<a
														href="https://www.wfaa.com"
														target="_blank"
														rel="noopener noreferrer"
														className="px-6 py-2 bg-secondary text-dark-text font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
													>
														Visit WFAA
													</a>
												)}
											</div>
										</div>
										{/* Video Placeholder / Iframe Area */}
										<div
											className="relative pb-[56.25%] h-0 bg-black flex items-center justify-center cursor-pointer group"
											onClick={() => setShowVideo(true)}
										>
											{!showVideo ? (
												// Placeholder content
												<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
													<img
														src="/images/press/wfaa-logo.jpg"
														alt="WFAA Logo"
														className="h-16 object-contain mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
														onError={(e) => {
															(e.target as HTMLImageElement).style.display = 'none'; // Hide if logo fails
														}}
													/>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-16 w-16 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M8 5v14l11-7z" />
													</svg>
													<p className="text-white text-sm mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
														Click to Play
													</p>
												</div>
											) : (
												// Iframe - loaded only when showVideo is true
												<iframe
													className="absolute top-0 left-0 w-full h-full"
													src="https://www.wfaa.com/embeds/video/responsive/287-af38153a-df57-45d8-a8e5-82c465b83f9a/iframe?autoplay=1" // Set autoplay=1 here so it plays on click
													title="Tre Stelle Coffee Featured on WFAA"
													allowFullScreen={true}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													loading="lazy"
												></iframe>
											)}
										</div>
									</div>
								</div>
							</ScrollReveal>
						</div>
					)}

					{/* Regular Press Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{regularPress.map((press, index) => (
							<ScrollReveal key={press.id} delay={index * 0.1}>
								<div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
									<div className="p-8">
										<div className="h-12 mb-6 flex items-center">
											<img
												src={press.logo}
												alt={press.outlet}
												className="h-full object-contain"
												onError={(e) => {
													(e.target as HTMLImageElement).onerror = null;
													(e.target as HTMLImageElement).src =
														`https://via.placeholder.com/200x60?text=${press.outlet}`;
												}}
											/>
										</div>
										<h3 className="text-xl font-bold text-primary mb-3">{press.headline}</h3>
										<p className="text-gray-600 mb-4 line-clamp-2">{press.excerpt}</p>
										<div className="flex justify-between items-center">
											<span className="text-gray-500 text-sm">{press.date}</span>
											<a
												href={press.link}
												target="_blank"
												rel="noopener noreferrer"
												className="px-4 py-1 bg-secondary text-dark-text font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
											>
												Read News
											</a>
										</div>
									</div>
								</div>
							</ScrollReveal>
						))}
					</div>
				</div>
			</section>

			{/* Media Kit Section OPTIONAL AND CAN BE ADDED LATER*/}
			{/* 
        <section className="py-16 bg-tertiary text-light-text">
            <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
                <ScrollReveal>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Media Resources</h2>
                    <p className="text-lg">
                    For press inquiries, please contact us directly. We&apos;ve also prepared a media kit with   
                    resources for publications and press.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <div className="h-12 w-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">Brand Assets</h3>
                    <p className="text-center mb-4">Logos, product images, and brand guidelines.</p>
                    <div className="text-center">
                        <a 
                        href="#" 
                        className="text-secondary hover:underline"
                        >
                        Download ZIP
                        </a>
                    </div>
                    </div>
                    
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <div className="h-12 w-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">Company Fact Sheet</h3>
                    <p className="text-center mb-4">Key information about our history and products.</p>
                    <div className="text-center">
                        <a 
                        href="#" 
                        className="text-secondary hover:underline"
                        >
                        Download PDF
                        </a>
                    </div>
                    </div>
                    
                    <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                    <div className="h-12 w-12 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-center">Founder Bios</h3>
                    <p className="text-center mb-4">Background information on our team and story.</p>
                    <div className="text-center">
                        <a 
                        href="#" 
                        className="text-secondary hover:underline"
                        >
                        Download PDF
                        </a>
                    </div>
                    </div>
                </div>
                
                <div className="text-center">
                    <a 
                    href="mailto:press@trestellecoffeeco.com" 
                    className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
                    >
                    Contact Press Team
                    </a>
                </div>
                </ScrollReveal>
            </div>
            </div>
        </section> */}

			{/* Press Quotes */}
			<section className="py-20 bg-soft-white">
				<div className="container mx-auto px-4">
					<div className="max-w-5xl mx-auto relative">
						<ScrollReveal>
							<div className="text-center mb-16">
								<h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
									What People Are Saying
								</h2>
								<div className="w-24 h-1 bg-secondary mx-auto"></div>
							</div>

							<div className="grid grid-cols-1 gap-8">
								<div className="bg-white rounded-xl shadow-md p-8 md:p-10 relative">
									<svg
										className="absolute text-primary opacity-10 top-6 left-6"
										width="50"
										height="50"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 24 24"
									>
										<path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
									</svg>

									<div className="text-center mb-8">
										<p className="text-lg md:text-xl italic text-gray-700 mb-6 relative z-10">
											&quot;In Jonathan Ghebreamlak&apos;s home, &apos;we drink coffee like
											water.&apos; His shop is designed for all kinds of coffee drinkers. For anyone
											who knows the &apos;coffee language,&apos; they&apos;re happy to oblige.&quot;
										</p>
										<div className="h-12 flex items-center justify-center">
											<img
												src="/images/press/dallas-morning-news-logo.png"
												alt="Dallas Morning News Logo"
												className="h-full object-contain"
												onError={(e) => {
													(e.target as HTMLImageElement).onerror = null;
													(e.target as HTMLImageElement).src =
														'https://via.placeholder.com/200x50?text=Dallas+Morning+News';
												}}
											/>
										</div>
									</div>

									<div className="text-center mb-8">
										<p className="text-lg md:text-xl italic text-gray-700 mb-6">
											&quot;Really every part of it is done in shop, from raw green coffee beans all
											the way to a cup of drinkable coffee. You can taste and smell the freshness in
											the coffee. That&apos;s what makes us different.&quot;
										</p>
										<div className="h-12 flex items-center justify-center">
											<img
												src="/images/press/dallas-observer-logo.png"
												alt="Dallas Observer Logo"
												className="h-full object-contain"
												onError={(e) => {
													(e.target as HTMLImageElement).onerror = null;
													(e.target as HTMLImageElement).src =
														'https://via.placeholder.com/200x50?text=Dallas+Observer';
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						</ScrollReveal>
					</div>
				</div>
			</section>

			{/* Press Contact CTA */}
			<section className="py-16 bg-soft-white text-primary">
				<div className="container mx-auto px-4 text-center">
					<ScrollReveal>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Write About Us</h2>
						<p className="text-xl mb-8 max-w-2xl mx-auto">
							Interested in featuring Tre Stelle Coffee Co. in your publication? We&apos;d love to
							share our story with you.
						</p>
						<a
							href="mailto:contact@trestellecoffeeco.com"
							className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
						>
							Contact For Press Inquiries
						</a>
					</ScrollReveal>
				</div>
			</section>
		</main>
	);
}
