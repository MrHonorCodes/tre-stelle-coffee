/* eslint-disable @next/next/no-img-element */
// 'use client'; // Removed: This page is a Server Component for data fetching
// Client-specific hooks and components are removed from here and will be in a child client component
// import { useEffect, useState } from 'react';
import Link from 'next/link';
// import StripeCheckoutButton from '../../components/products/StripeCheckoutButton'; // Removed
import FadeIn from '../../../components/ui/FadeIn'; // FadeIn might be okay if it doesn't use client hooks directly
// import ScrollReveal from '../../../components/ui/ScrollReveal'; // Client component
// import productsData from '../../data/products.json'; // Data now from Sanity
// import { useCart } from '../../context/CartContext'; // Client hook
import { type SanityDocument } from 'next-sanity'; // For typing Sanity documents
import { client } from '../../sanity/lib/client'; // Your Sanity client
import imageUrlBuilder from '@sanity/image-url'; // For Sanity images
import type { Image } from 'sanity'; // Sanity image type
// PortableText can be added later when we render rich text details
// import { PortableText } from 'next-sanity';

// Configure the image URL builder
const { projectId, dataset } = client.config();
const builder = imageUrlBuilder({ projectId: projectId || '', dataset: dataset || '' });

function urlFor(source: Image) {
  return builder.image(source);
}

// Define the Sanity Product Type (adjust based on your Sanity schema)
interface SanityProduct extends SanityDocument {
  _id: string;
  name: string;
  slug: { current: string };
  image: Image; // Main product image
  // Add other fields from your Sanity productType schema as needed
  // For example:
  // details?: any[]; // For Portable Text
  price: number;
  category?: string; // Assuming category is a string field
  stripePriceId?: string;
  // stock related fields if managed in Sanity
}

const PRODUCTS_QUERY = `*[_type == "product"]{
  _id,
  name,
  slug,
  image,
  price,
  category,
  stripePriceId
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
              backgroundSize: 'cover'
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
              <h2 className="text-3xl md:text-4xl text-primary font-bold mb-4">
                Our Products
              </h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Discover our selection of premium coffees and merchandise, crafted with care.
              </p>
            </FadeIn>
          </div>

          {/* Category Filters - Placeholder */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <p className="text-gray-500">Category filters will be here (Client Component)</p>
          </div>

          {/* Products Grid - Responsive gap */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {products.map((product) => {
              // Simplified product card - interactivity removed for now
              // const isOutOfStock = ...; // Logic for stock will be in client component
              // const hasOptions = ...; // Logic for options will be in client component
              // const isAdding = ...; // Logic for adding state will be in client component
              return (
                // ScrollReveal was here - will be in client component
                <Link key={product._id} href={`/products/${product.slug.current}`} className="block group h-full">
                  <div className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl relative flex flex-col h-full`}>
                    {/* Out of Stock badge - logic will be in client component */}
                    <div className="h-64 overflow-hidden">
                      {product.image && (
                        <img 
                          src={urlFor(product.image).width(400).height(400).url()}
                          alt={product.name}
                          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                          width={400}
                          height={400}
                        />
                      )}
                    </div>
                    <div className="p-6 text-center flex flex-col items-center flex-grow">
                      <span className="text-sm text-gray-500">{product.category || 'Coffee'}</span>
                      <h3 className="text-xl font-bold text-primary my-2 group-hover:text-secondary transition-colors">{product.name}</h3>
                      {/* Product description (PortableText) can be added here or on detail page */}
                      
                      <div className="mt-auto w-full">
                        <span className="text-2xl font-bold text-primary mt-4 block">${product.price ? product.price.toFixed(2) : 'N/A'}</span>
                        <button
                          className="mt-2 px-4 py-2 border-2 rounded-md font-semibold transition-all duration-300 w-full bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                          disabled={true}
                        >
                          View Options / Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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