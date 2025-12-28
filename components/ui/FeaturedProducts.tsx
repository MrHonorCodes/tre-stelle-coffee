'use client';
import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '../../src/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityDocument, Image as SanityImageType } from 'sanity';

// Sanity Product interface
interface SanityProduct extends SanityDocument {
	_id: string;
	name: string;
	slug: { current: string };
	images: SanityImageType[];
	price: number;
	category?: string;
	isOutOfStock?: boolean;
	stripePriceId?: string;
}

// Setup for Sanity image URLs
const builder = imageUrlBuilder(client);
function urlFor(source: SanityImageType, category?: string) {
	if (!source) return '/images/products/placeholder.jpg';
	// For bundle products, return full image without any cropping or resizing
	if (category === 'bundle') {
		return builder.image(source).url();
	}
	// For regular products, use 'fill' to crop to exact dimensions
	return builder.image(source).width(800).height(450).fit('fill').url();
}

// Sanity query for featured products - excludes bundle products (Holiday Box disabled)
const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && category == "whole-bean"][0...4] | order(_createdAt desc){
  _id,
  name,
  slug,
  images,
  price,
  category,
  isOutOfStock,
  stripePriceId,
  isFeatured
}`;

export default function FeaturedProducts() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAutoPlaying, setIsAutoPlaying] = useState(true);
	const [products, setProducts] = useState<SanityProduct[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	// Fetch products from Sanity
	useEffect(() => {
		async function fetchProducts() {
			try {
				setIsLoading(true);
				const fetchedProducts = await client.fetch<SanityProduct[]>(FEATURED_PRODUCTS_QUERY);
				setProducts(fetchedProducts);
				setError(null);
			} catch (err) {
				console.error('Error fetching featured products:', err);
				setError('Failed to load products');
			} finally {
				setIsLoading(false);
			}
		}
		fetchProducts();
	}, []);

	// Auto-advance carousel
	useEffect(() => {
		if (!isAutoPlaying || products.length === 0) return;

		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
		}, 4000); // Change slide every 4 seconds

		return () => clearInterval(interval);
	}, [isAutoPlaying, products.length]);

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
		setIsAutoPlaying(false); // Stop auto-play when user manually navigates
		setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
	};

	const nextSlide = () => {
		if (products.length > 0) {
			goToSlide((currentIndex + 1) % products.length);
		}
	};

	const prevSlide = () => {
		if (products.length > 0) {
			goToSlide((currentIndex - 1 + products.length) % products.length);
		}
	};

	// Show loading state
	if (isLoading) {
		return (
			<section className="py-24 bg-soft-white">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
								Our Featured Products
							</h2>
							<div className="flex justify-center">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}

	// Show error state
	if (error || products.length === 0) {
		return (
			<section className="py-24 bg-soft-white">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto">
						<div className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
								Our Featured Products
							</h2>
							<p className="text-gray-600">
								{error || 'No featured products available at the moment.'}
							</p>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-24 bg-soft-white">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					{/* Section Header */}
					<div className="text-center mb-12">
						<ScrollReveal>
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-6">
								Our Featured Products
							</h2>
							<p className="text-gray-700 text-lg max-w-2xl mx-auto">
								Discover our carefully selected coffee beans, each offering unique flavors and characteristics 
								from coffee regions around the world.
							</p>
						</ScrollReveal>
					</div>

					{/* Carousel Container */}
					<div className="relative">
						<ScrollReveal delay={0.2}>
							<div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
								{/* Product Display */}
								<div className="flex transition-transform duration-500 ease-in-out"
									 style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
									{products.map((product) => (
										<div key={product._id} className="w-full flex-shrink-0">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
												{/* Product Image */}
												<div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
													{product.category === 'bundle' ? (
														// Bundle products: smaller square image centered in container
														<div className="relative w-full aspect-square max-h-full">
															<Image
																src={product.images?.[0] ? urlFor(product.images[0], product.category) : '/images/products/placeholder.jpg'}
																alt={product.name}
																fill
																className="object-contain transition-transform duration-300 hover:scale-105"
																onError={(e) => {
																	(e.target as HTMLImageElement).src = 
																		'https://via.placeholder.com/400x400?text=Holiday+Box';
																}}
															/>
														</div>
													) : (
														// Regular products: full size image
														<Image
															src={product.images?.[0] ? urlFor(product.images[0], product.category) : '/images/products/placeholder.jpg'}
															alt={product.name}
															fill
															className="object-cover transition-transform duration-300 hover:scale-105"
															onError={(e) => {
																(e.target as HTMLImageElement).src = 
																	'https://via.placeholder.com/400x400?text=Coffee+Beans';
															}}
														/>
													)}
													{product.isOutOfStock && (
														<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
															<span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
																Out of Stock
															</span>
														</div>
													)}
												</div>

												{/* Product Info */}
												<div className="flex flex-col justify-center">
													<h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
														{product.name}
													</h3>
													<p className="text-gray-700 mb-6 text-lg leading-relaxed">
														Premium coffee beans carefully selected for exceptional quality and flavor. 
														Perfect for brewing your favorite cup at home.
													</p>
													<div className="flex items-center justify-between mb-6">
														<span className="text-3xl font-bold text-secondary">
															${product.price.toFixed(2)}
														</span>
														<span className="text-sm text-gray-500">
															{product.isOutOfStock ? 'Out of stock' : 'In stock'}
														</span>
													</div>
													<div className="flex gap-4">
														<Link
															href={`/products/${product.slug.current}`}
															className="px-6 py-3 bg-secondary text-dark-text font-semibold rounded-full transition-all duration-300 hover:bg-transparent hover:text-secondary border-2 border-secondary"
														>
															View Product
														</Link>
														<Link
															href="/products"
															className="px-6 py-3 bg-transparent text-primary font-semibold rounded-full border-2 border-primary transition-all duration-300 hover:bg-primary hover:text-light"
														>
															All Products
														</Link>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Navigation Arrows */}
								<button
									onClick={prevSlide}
									className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
									aria-label="Previous product"
								>
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
									</svg>
								</button>
								<button
									onClick={nextSlide}
									className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
									aria-label="Next product"
								>
									<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</button>
							</div>
						</ScrollReveal>

						{/* Dots Indicator */}
						<div className="flex justify-center mt-8 space-x-2">
							{products.map((_, index) => (
								<button
									key={index}
									onClick={() => goToSlide(index)}
									className={`w-3 h-3 rounded-full transition-all duration-300 ${
										index === currentIndex 
											? 'bg-primary scale-125' 
											: 'bg-gray-300 hover:bg-gray-400'
									}`}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}