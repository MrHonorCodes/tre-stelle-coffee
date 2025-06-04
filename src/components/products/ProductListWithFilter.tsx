'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Image, SanityDocument } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const { projectId, dataset } = client.config();
const builder = imageUrlBuilder({ projectId: projectId || '', dataset: dataset || '' });
function urlFor(source: Image) {
	return builder.image(source);
}

interface Product extends SanityDocument {
	_id: string;
	name: string;
	slug: { current: string };
	images: Image[];
	price: number;
	category?: string;
	stripePriceId?: string;
	isOutOfStock?: boolean;
}

const CATEGORIES = [
	{ label: 'All', value: 'all' },
	{ label: 'Whole Bean', value: 'whole-bean' },
	{ label: 'Merchandise', value: 'merchandise' },
];

export default function ProductListWithFilter({ products }: { products: Product[] }) {
	const [selectedCategory, setSelectedCategory] = useState<string>('all');

	const filteredProducts = selectedCategory === 'all' 
		? products.sort((a, b) => {
				// Show coffee products first, then others
				const aIsCoffee = a.category === 'ground-coffee' || a.category === 'whole-bean';
				const bIsCoffee = b.category === 'ground-coffee' || b.category === 'whole-bean';
				
				if (aIsCoffee && !bIsCoffee) return -1;
				if (!aIsCoffee && bIsCoffee) return 1;
				return 0; // Keep original order for items in same category type
			})
		: products.filter((p) => p.category === selectedCategory);

	return (
		<>
			{/* Category Filters */}
			<div className="flex flex-wrap justify-center gap-4 mb-12">
				{CATEGORIES.map((cat) => (
					<button
						key={cat.value}
						className={`px-4 py-2 rounded-full font-semibold border transition-colors duration-200
              ${
								selectedCategory === cat.value
									? 'bg-primary text-white border-primary'
									: 'bg-white text-primary border-primary hover:bg-primary hover:text-white'
							}
            `}
						onClick={() => setSelectedCategory(cat.value)}
					>
						{cat.label}
					</button>
				))}
			</div>

			{/* Products Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
				{filteredProducts.map((product) => {
					const isOutOfStock = product.isOutOfStock || false;
					return (
						<Link
							key={product._id}
							href={`/products/${product.slug.current}`}
							className={`block group h-full ${isOutOfStock ? 'opacity-70' : ''}`}
						>
							<div
								className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl relative flex flex-col h-full`}
							>
								{isOutOfStock && (
									<div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
										OUT OF STOCK
									</div>
								)}
								<div className="h-72 overflow-hidden bg-gray-50">
									{product.images && product.images[0] && (
										<img
											src={urlFor(product.images[0]).width(400).url()}
											alt={product.name}
											className="w-full h-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
											width={400}
										/>
									)}
								</div>
								<div className="p-6 text-center flex flex-col items-center flex-grow">
									<span className="text-sm text-gray-500">{product.category || 'Coffee'}</span>
									<h3 className="text-xl font-bold text-primary my-2 group-hover:text-secondary transition-colors">
										{product.name}
									</h3>
									<div className="mt-auto w-full">
										<span className="text-2xl font-bold text-primary mt-4 block">
											${product.price ? product.price.toFixed(2) : 'N/A'}
										</span>
										<button
											className={`product-view-details-button mt-2 px-4 py-2 border-2 rounded-md font-semibold transition-all duration-300 w-full cursor-pointer 
                        ${
													isOutOfStock
														? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
														: 'border-primary text-primary hover:bg-primary hover:text-white'
												}`}
											disabled={isOutOfStock}
										>
											{isOutOfStock ? 'Out of Stock' : 'View Details'}
										</button>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}
