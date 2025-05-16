'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Image as SanityImageType, PortableTextBlock } from 'sanity';
import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { useCart } from '../../context/CartContext';

// Reuse the SanityProduct interface (can also be imported from a shared types file)
interface SanityProduct extends SanityDocument {
  _id: string;
  name: string;
  slug: { current: string };
  image: SanityImageType;
  details?: PortableTextBlock[];
  price: number;
  category?: string;
  stripePriceId?: string;
}

// Configure the image URL builder (should ideally come from a shared Sanity lib)
// For simplicity, re-defining here. In a real app, import from your Sanity client/lib file.
const tempProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'woqu8pre'; // Fallback, use your actual project ID
const tempDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';   // Fallback, use your actual dataset

const builder = imageUrlBuilder({ projectId: tempProjectId, dataset: tempDataset });

function urlFor(source: SanityImageType) {
  if (!source) return undefined; // Handle cases where image might be undefined
  return builder.image(source);
}

const MAX_QUANTITY_PER_ORDER = 5; // Or from config

export default function ProductDisplayClient({ product }: { product: SanityProduct }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error'>('success');

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      // Basic validation: 1 to MAX_QUANTITY_PER_ORDER
      // More complex stock checking would go here if stock levels are available
      return Math.max(1, Math.min(MAX_QUANTITY_PER_ORDER, newQuantity));
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);

    // Log before calling addToCart
    console.log(`[ProductDisplayClient] About to call addToCart. Product ID: ${product._id}, Name: ${product.name}, Quantity to add: ${quantity}`);
    const result = addToCart(product, quantity); 

    setToastMessage(result.message || (result.success ? `${product.name} updated in cart.` : "Could not add item to cart."));
    
    if (result.quantityAdded === quantity && result.finalQuantity <= MAX_QUANTITY_PER_ORDER && quantity > 0) {
      setToastType('success');
    } else if (result.quantityAdded >= 0 && result.quantityAdded < quantity) { // Used >= 0 for quantityAdded in case none were added but it was a clamp.
      setToastType('warning'); // Partially added due to max quantity or already at max
    } else if (!result.success) {
      setToastType('error');
    }

    setShowConfirmation(true);
    setTimeout(() => {
        setIsAdding(false);
        setShowConfirmation(false);
        // Only reset quantity if it was a full success where all requested items were added.
        if (toastType === 'success' && result.quantityAdded === quantity) { 
          setQuantity(1); 
        }
    }, 3000); // Increased timeout for toast visibility
  };
  
  // Simple check for out of stock - replace with actual stock logic if available from Sanity
  const isOutOfStock = false; // Placeholder: product.stock === 0;

  const toastBgColor = toastType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 
                       toastType === 'warning' ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 
                       'bg-red-100 border-red-400 text-red-700';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Confirmation Message */} 
      {showConfirmation && (
          <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 ${toastBgColor} px-4 py-3 rounded shadow-lg z-50 transition-opacity duration-300 ease-in-out`}>
              <strong className="font-bold">{toastType === 'success' ? 'Success!' : toastType === 'warning' ? 'Note:' : 'Error!'}</strong>
              <span className="block sm:inline ml-1"> {toastMessage}</span>
              {toastType === 'success' && (
                <Link href="/cart" className="ml-2 underline hover:text-green-900 font-semibold">
                  View Cart
                </Link>
              )}
          </div>
      )}

      {/* Product Image */}
      <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
        {product.image && urlFor(product.image) && (
          <img 
            src={urlFor(product.image)!.width(800).height(800).fit('crop').url()} // Ensure responsive image
            alt={product.name}
            className="w-full h-full object-cover"
            width={800}
            height={800}
          />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1 uppercase tracking-wider">{product.category || 'Coffee'}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{product.name}</h1>
        
        <div className="text-3xl font-semibold text-primary mb-6">
          ${product.price ? product.price.toFixed(2) : 'N/A'}
        </div>

        {product.details && product.details.length > 0 && (
          <div className="prose prose-lg max-w-none text-gray-700 mb-6">
            <PortableText value={product.details} />
          </div>
        )}

        {/* Quantity Selector */}
        {!isOutOfStock && (
          <div className="mb-6">
            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(-1)} 
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || isAdding}
                  aria-label="Decrease quantity"
                >-</button>
                <span className="px-4 py-1 border-l border-r border-gray-300 text-center w-12 select-none">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)} 
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= MAX_QUANTITY_PER_ORDER || isAdding}
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">Max {MAX_QUANTITY_PER_ORDER} per order</p>
          </div>
        )}

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className={`mt-2 px-8 py-3 border-2 rounded-md font-semibold text-lg transition-all duration-300 w-full md:w-auto
                      ${isOutOfStock || isAdding
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' 
                        : 'bg-secondary text-dark-text border-secondary hover:bg-opacity-90'}`}
          disabled={isOutOfStock || isAdding}
        >
          {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <div className="mt-8">
          <Link href="/products" className="text-primary hover:text-secondary transition-colors">
            &larr; Back to all products
          </Link>
        </div>
      </div>
    </div>
  );
} 