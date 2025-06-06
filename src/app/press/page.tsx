'use client';
import { useEffect, useState } from 'react';
import FadeIn from '../../../components/ui/FadeIn';
import ScrollReveal from '../../../components/ui/ScrollReveal';
import Link from 'next/link';
import { client } from '../../sanity/lib/client'; // Corrected path
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@portabletext/react';
import type { SanityDocument, Image as SanityImageType, PortableTextBlock } from 'sanity'; // Added PortableTextBlock
import ImageWithFallback from '../../../components/ui/ImageWithFallback';

// Define the type for a Sanity Press Article based on your schema
interface SanityPressArticle extends SanityDocument {
	_id: string;
	title: string;
	slug: { current: string };
	publicationDate: string; // Assuming YYYY-MM-DD format
	sourceName: string;
	sourceUrl: string;
	excerpt?: PortableTextBlock[]; // Corrected type
	image?: SanityImageType;
	videoUrl?: string;
	isFeatured?: boolean;
}

// Setup for Sanity image URLs
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageType) {
	if (!source) {
		return undefined; // Or a placeholder URL
	}
	return builder.image(source);
}

// Helper function to get proper embed URL
function getEmbedUrl(url: string): string {
	// Handle WFAA URLs - extract video ID and convert to embed format
	const wfaaRegex = /wfaa\.com\/.*\/([0-9]+-[a-f0-9-]+)/;
	const wfaaMatch = url.match(wfaaRegex);
	
	if (wfaaMatch) {
		return `https://www.wfaa.com/embeds/video/responsive/${wfaaMatch[1]}/iframe?autoplay=true&mute=false`;
	}
	
	// Return original URL for other video types
	return url;
}

const PRESS_ARTICLES_QUERY = `*[_type == "pressArticle"]{
  _id,
  title,
  slug,
  publicationDate,
  sourceName,
  sourceUrl,
  excerpt,
  image,
  videoUrl,
  isFeatured
} | order(isFeatured desc, publicationDate desc)`;

export default function Press() {
	console.log('--- Press: Component rendering ---');

	// State to control video visibility
	const [showVideo, setShowVideo] = useState(false);
	const [articles, setArticles] = useState<SanityPressArticle[]>([]);

	// Fetch articles on component mount
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				console.log('--- Press: Fetching articles... ---');
				const fetchedArticles = await client.fetch(PRESS_ARTICLES_QUERY);
				console.log('--- Press: Articles fetched:', fetchedArticles);
				setArticles(fetchedArticles);
			} catch (error) {
				console.error('--- Press: Error fetching articles ---', error);
			}
		};

		fetchArticles();
	}, []);

	const featuredArticle = articles.find((article) => article.isFeatured);
	console.log('--- Press: Featured article:', featuredArticle);

	const regularArticles = articles.filter((article) => !article.isFeatured);
	console.log('--- Press: Regular articles count:', regularArticles.length);

	console.log('--- Press: Returning JSX... ---');
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

					{/* Featured Press Item from Sanity */}
					{featuredArticle && (
						<div className="mb-20">
							<ScrollReveal>
								<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
									<div className="grid grid-cols-1 md:grid-cols-2">
										<div className="p-8 md:p-12 flex flex-col justify-center">
											{featuredArticle.image && (
												<div className="h-16 mb-8 flex items-center">
													<ImageWithFallback
														src={urlFor(featuredArticle.image)?.width(800).quality(100).dpr(2).url()}
														alt={featuredArticle.sourceName}
														className="h-full object-contain"
													/>
												</div>
											)}
											<h3 className="text-2xl md:text-3xl text-primary font-bold mb-4">
												{featuredArticle.title}
											</h3>
											{featuredArticle.excerpt && (
												<div className="text-gray-700 mb-4 prose max-w-none">
													<PortableText value={featuredArticle.excerpt} />
												</div>
											)}
											<div className="flex justify-between items-center mt-auto">
												<span className="text-gray-500">
													{new Date(featuredArticle.publicationDate).toLocaleDateString('en-US', {
														year: 'numeric',
														month: 'long',
														day: 'numeric',
													})}
												</span>
												{featuredArticle.sourceUrl && (
													<Link
														href={featuredArticle.sourceUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="px-6 py-2 bg-secondary text-dark-text font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
													>
														Read Article
													</Link>
												)}
											</div>
										</div>
										{/* Media section for featured article - video player like original press page */}
										<div
											className="relative pb-[56.25%] h-0 bg-black flex items-center justify-center cursor-pointer group"
											onClick={() => featuredArticle.videoUrl && setShowVideo(true)}
										>
											{!showVideo || !featuredArticle.videoUrl ? (
												// Placeholder content
												<div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
													{featuredArticle.image ? (
														<ImageWithFallback
															src={urlFor(featuredArticle.image)?.width(800).quality(100).dpr(2).url()}
															alt={featuredArticle.sourceName}
															className="h-16 object-contain mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
														/>
													) : null}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-16 w-16 text-white opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
														fill="currentColor"
														viewBox="0 0 24 24"
													>
														<path d="M8 5v14l11-7z" />
													</svg>
													<p className="text-white text-sm mt-2 opacity-70 group-hover:opacity-100 transition-opacity">
														{featuredArticle.videoUrl ? 'Click to Play' : 'Featured Media'}
													</p>
												</div>
											) : (
												// Iframe - loaded only when showVideo is true
												<iframe
													key={`video-${featuredArticle._id}-${showVideo}`}
													className="absolute top-0 left-0 w-full h-full"
													src={getEmbedUrl(featuredArticle.videoUrl)}
													title={featuredArticle.title}
													allowFullScreen={true}
													allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
													frameBorder="0"
												/>
											)}
										</div>
									</div>
								</div>
							</ScrollReveal>
						</div>
					)}

					{/* Regular Press Grid from Sanity */}
					{regularArticles.length > 0 && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{regularArticles.map((article, index) => (
								<ScrollReveal key={article._id} delay={index * 0.1}>
									<div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
										<div className="p-8 flex flex-col h-full">
											{article.image && (
												<div className="h-12 mb-6 flex items-center">
													<ImageWithFallback
														src={urlFor(article.image)?.width(600).quality(100).dpr(2).url()}
														alt={article.sourceName}
														className="h-full object-contain"
													/>
												</div>
											)}
											<h3 className="text-xl font-bold text-primary mb-3">{article.title}</h3>
											{article.excerpt && (
												<div className="text-gray-600 mb-4 line-clamp-3 prose-sm max-w-none">
													<PortableText value={article.excerpt} />
												</div>
											)}
											<div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
												<span className="text-gray-500 text-sm">
													{new Date(article.publicationDate).toLocaleDateString('en-US', {
														year: 'numeric',
														month: 'long',
														day: 'numeric',
													})}
												</span>
												{article.sourceUrl && (
													<Link
														href={article.sourceUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="px-4 py-1 bg-secondary text-dark-text font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
													>
														Read Article
													</Link>
												)}
											</div>
										</div>
									</div>
								</ScrollReveal>
							))}
						</div>
					)}
				</div>
			</section>

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
											<ImageWithFallback
												src="/images/press/dallas-morning-news-logo.png"
												alt="Dallas Morning News Logo"
												className="h-full object-contain"
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
											<ImageWithFallback
												src="/images/press/dallas-observer-logo.png"
												alt="Dallas Observer Logo"
												className="h-full object-contain"
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
						<Link
							href="mailto:contact@trestellecoffeeco.com"
							className="px-8 py-3 bg-secondary text-dark-text font-semibold rounded-full uppercase tracking-wide text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
						>
							Contact For Press Inquiries
						</Link>
					</ScrollReveal>
				</div>
			</section>
		</main>
	);
}
