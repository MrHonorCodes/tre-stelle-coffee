/* eslint-disable @next/next/no-img-element */
// 'use client'; // Removed: This page is a Server Component for data fetching
// Client-specific hooks and components are removed from here and will be in a child client component
// import { useEffect, useState } from 'react';
// import Link from 'next/link'; // No longer used
// import StripeCheckoutButton from '../../components/products/StripeCheckoutButton'; // Removed
// import FadeIn from '../../../components/ui/FadeIn'; // FadeIn might be okay if it doesn't use client hooks directly
// import ScrollReveal from '../../../components/ui/ScrollReveal'; // Client component
// import productsData from '../../data/products.json'; // Data now from Sanity
// import { useCart } from '../../context/CartContext'; // Client hook
import { type SanityDocument } from 'next-sanity'; // For typing Sanity documents
import { client } from '../../sanity/lib/client'; // Your Sanity client
// import imageUrlBuilder from '@sanity/image-url'; // For Sanity images
import type { Image } from 'sanity'; // Sanity image type
// PortableText can be added later when we render rich text details
// import { PortableText } from 'next-sanity';
import ProductListWithFilter from '../../components/products/ProductListWithFilter';
import FadeIn from '../../../components/ui/FadeIn';

// Define the Sanity Product Type (adjust based on your Sanity schema)
interface SanityProduct extends SanityDocument {
	_id: string;
	name: string;
	slug: { current: string };
	images: Image[]; // Changed from image: Image to images: Image[]
	// Add other fields from your Sanity productType schema as needed
	// For example:
	// details?: any[]; // For Portable Text
	price: number;
	category?: string; // Assuming category is a string field
	stripePriceId?: string;
	isOutOfStock?: boolean; // Added isOutOfStock
	// stock related fields if managed in Sanity
}

const PRODUCTS_QUERY = `*[_type == "product"]{
  _id,
  name,
  slug,
  images, // Changed from image to images
  price,
  category,
  stripePriceId,
  isOutOfStock // Added isOutOfStock
  // details, // Fetch details if you plan to display them on this list page
}`;

// Note: This page is now an async Server Component for data fetching.
// Client-side interactivity (like filters, add to cart state) will need to be moved
// to a separate client component that receives data as props.
export default async function ShopPage() {
	const products = await client.fetch<SanityProduct[]>(
		PRODUCTS_QUERY,
		{},
		{ next: { tags: ['product'] } }
	);

	// All client-side state and effects (useState, useEffect, filtering logic, cart logic)
	// have been removed. This component now only fetches data and passes it to the JSX.
	// The interactive parts will be handled by a new Client Component.

	return (
		<main className="min-h-screen bg-soft-white">
			{/* Hero Section with maroon background */}
			<section className="relative h-[50vh] overflow-hidden bg-primary pt-16 flex items-center justify-center">
				<div className="absolute inset-0 z-0">
					{/* Overlay with coffee brewing background */}
					<div
						className="absolute inset-0 bg-cover bg-center rounded-2xl"
						style={{
							backgroundImage: "url('/images/Products-Banner.png')",
							backgroundSize: 'cover',
						}}
					/>
					<div className="absolute inset-0 bg-primary/60"></div>
				</div>

				<div className="container mx-auto px-4 relative z-10 text-center">
					<FadeIn delay={0.2}>
						<h1 className="text-4xl md:text-6xl font-extrabold mb-2 leading-tight text-secondary">
							Shop Our Collection
						</h1>
					</FadeIn>
				</div>
			</section>

			{/* Products Section - This section will eventually be largely replaced by a Client Component */}
			<section className="py-16 md:py-24 bg-soft-white">
				<div className="container mx-auto px-4">
					{/* Introduction Text */}
					<div className="text-center mb-12">
						<FadeIn>
							<h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">Our Products</h2>
							<p className="text-gray-700 max-w-3xl mx-auto">
								Discover our selection of premium coffees and merchandise, crafted with care.
							</p>
						</FadeIn>
					</div>

					{/* Category Filters and Products Grid (Client Component) */}
					<ProductListWithFilter products={products} />
				</div>
			</section>

			{/* Brewing Guide CTA  OPTIONAL FOR NOW*/}
			{/*   <section className="py-16 bg-soft-white">
        <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
                <ScrollReveal>
                <h2 className="text-2xl md:text-3xl text-primary font-bold mb-4">
                    Get the Most From Your Coffee
                </h2>
                <p className="text-gray-700 mb-6">
                    Check out our brewing guides to learn how to make the perfect cup using your favorite method.
                </p>
                <a 
                    href="/brewing-guides" 
                    className="px-6 py-2 bg-primary text-light font-semibold rounded-full text-sm inline-block transition-all duration-300 hover:bg-transparent hover:text-primary border-2 border-primary w-fit"
                >
                    Brewing Guides
                </a>
                </ScrollReveal>
            </div>
            
            <div className="bg-primary">
                <img 
                src="/images/brewing-guide.jpg" 
                alt="Coffee Brewing Guide" 
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Brewing+Guide';
                }}
                />
            </div>
            </div>
        </div>
        </div>
    </section> */}
		</main>
	);
}
