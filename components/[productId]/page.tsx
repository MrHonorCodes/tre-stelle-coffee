'use client'

import { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image'; 
import productsData from '../../src/data/products.json';
import FadeIn from '../ui/FadeIn';
import { useCart } from '../../src/context/CartContext';

// --- Configuration ---
const MAX_QUANTITY_PER_ORDER = 5;

// Type definition (should match the one in products/page.tsx and products.json)
type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  images: string[];
  description?: string;
  // Stock can be a number or an object mapping option value (size) to number
  stock: number | { [optionValue: string]: number }; 
  options?: { [optionName: string]: string[] } | null;
};

// Fetch product data based on ID
function getProductById(id: number): Product | undefined {
  // Ensure IDs are treated as numbers consistently if they come from JSON
  return productsData.find(product => Number(product.id) === id);
}

// Helper to calculate total stock
function calculateTotalStock(stock: Product['stock']): number {
  return typeof stock === 'number' ? stock : Object.values(stock).reduce((sum, count) => sum + count, 0);
}

export default function ProductDetailPage() { 
  const params = useParams();
  // Ensure productId is treated as string, useParams can return string | string[]
  const productIdParam = Array.isArray(params.productId) ? params.productId[0] : params.productId;
  
  // Add basic check if productIdParam exists before parsing
  if (!productIdParam) {
    notFound(); // Or handle appropriately if ID is missing
  }

  const productId = parseInt(productIdParam, 10);
  const product = getProductById(productId);

  // Handle product not found
  if (!product) {
    notFound(); 
  }

  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  // Initialize selectedOptions based on product options
  const initialOptions: { [key: string]: string } = {};
  // Check if product.options exists before accessing keys
  if (product.options) { 
    Object.keys(product.options).forEach(key => {
      initialOptions[key] = ''; // Default to empty string, meaning not selected
    });
  }
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>(initialOptions);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Calculate total stock for initial display
  const totalStock = calculateTotalStock(product.stock);
  const isOutOfStock = totalStock === 0;
  // Ensure product.options is checked before accessing keys
  const hasOptions = !!product.options && Object.keys(product.options).length > 0; 
  
  // Check if required options are selected, ensuring options exist
  const requiredOptionSelected = !hasOptions || (product.options && selectedOptions[Object.keys(product.options)[0]] !== ''); 

  // Handle option selection
  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
    setQuantity(1); // Reset quantity when size changes
  };
  
  // Determine stock for the currently selected option (if applicable)
  let currentOptionStock = typeof product.stock === 'number' ? product.stock : Infinity; // Default to Infinity if not object or size not selected
  let selectedSize = '';
  if (hasOptions && typeof product.stock === 'object') {
    // Added check for product.options existence
    const optionKeys = product.options ? Object.keys(product.options) : [];
    if (optionKeys.length > 0) {
      const sizeKey = optionKeys[0]; // Assuming 'Size' is the first/only option key
      selectedSize = selectedOptions[sizeKey];
      if (selectedSize && product.stock.hasOwnProperty(selectedSize)) { // Check if size exists in stock object
         currentOptionStock = product.stock[selectedSize];
      } else {
        currentOptionStock = 0; // Treat as 0 stock if size not selected or not found
      }
    }
  }

  const handleQuantityChange = (amount: number) => {
    // Determine the real maximum based on stock AND the order limit
    const maxAllowedByStock = currentOptionStock; 
    // Ensure stock check considers if it's a valid number > 0
    const effectiveStockLimit = (typeof maxAllowedByStock === 'number' && maxAllowedByStock > 0) ? maxAllowedByStock : Infinity;
    const effectiveMaxQuantity = Math.min(effectiveStockLimit, MAX_QUANTITY_PER_ORDER); 

    setQuantity(prev => {
      const newQuantity = prev + amount;
      // Ensure quantity is between 1 and the effective maximum
      return Math.max(1, Math.min(effectiveMaxQuantity, newQuantity));
    });
  };

  const isSelectedOptionOutOfStock = hasOptions && requiredOptionSelected && currentOptionStock === 0;
  const sizeDisplay = hasOptions && requiredOptionSelected && product.options ? selectedOptions[Object.keys(product.options)[0]] : '';

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);

    const optionsToSend = hasOptions ? selectedOptions : undefined;

    addToCart(product.id, quantity, optionsToSend);
    console.log(`Added ${quantity} of ${product.name} (ID: ${product.id}) ${optionsToSend ? `with options: ${JSON.stringify(optionsToSend)}` : ''} to cart.`);

    setShowConfirmation(true);
    setTimeout(() => {
        setIsAdding(false);
        setShowConfirmation(false);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 relative">
            
            {/* Confirmation Message - Changed to fixed, bottom-center */}
            {showConfirmation && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg z-50 transition-opacity duration-300 ease-in-out"> {/* Changed absolute to fixed, top to bottom, increased z-index */} 
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> Item added to cart.</span>
                </div>
             )}

            {/* Image Gallery Section */}
            <div className="flex flex-col">
              {/* Main Image Display Area */}
              <div className="aspect-square w-full bg-gray-100 rounded-lg overflow-hidden shadow-md mb-4 relative">
                <Image 
                  key={currentImageIndex}
                  src={product.images[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  fill 
                  style={{ objectFit: 'cover' }} 
                  className="transition-opacity duration-300 ease-in-out"
                  priority 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/600x600?text=${product.name}`;
                  }}
                />
              </div>
              
              {/* Thumbnails Row */}
              {product.images.length > 1 && (
                <div className="flex flex-wrap justify-center gap-3 p-2">
                  {product.images.map((img, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 transition-all duration-200 
                        ${currentImageIndex === index 
                          ? 'border-secondary scale-105 shadow-md' 
                          : 'border-gray-200 hover:border-gray-400'}
                          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary`}
                    >
                      <Image 
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col justify-center">
              <span className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.category}</span>
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary mb-4">${product.price.toFixed(2)}</p>
              
              {product.description && (
                <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
              )}

              {/* Options */} 
              {product.options && Object.entries(product.options).map(([optionName, values]) => (
                <div key={optionName} className="mb-4">
                  <label htmlFor={optionName} className="block text-sm font-medium text-gray-700 mb-1">{optionName}:</label>
                  <select 
                    id={optionName} 
                    name={optionName} 
                    value={selectedOptions[optionName]} 
                    onChange={(e) => handleOptionChange(optionName, e.target.value)} 
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-secondary focus:border-secondary sm:text-sm rounded-md"
                  >
                    <option value="" disabled>{`Select ${optionName}`}</option> 
                    {values.map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              ))}

              {/* Stock Indicator */} 
              <p className={`text-sm mb-4 ${isOutOfStock || (hasOptions && requiredOptionSelected && isSelectedOptionOutOfStock) ? 'text-red-600' : 'text-green-600'} font-medium`}>
                {isOutOfStock ? 'Out of Stock' : 
                 (hasOptions && !requiredOptionSelected) ? 'Select size to see availability' : 
                 (hasOptions && requiredOptionSelected && isSelectedOptionOutOfStock) ? `Size ${sizeDisplay} - Out of Stock` : 
                 (hasOptions && requiredOptionSelected) ? `Size ${sizeDisplay} - In Stock (${currentOptionStock} available)` : 
                 `In Stock (${totalStock} available)`}
              </p>

              {/* Quantity Selector */} 
              {!isOutOfStock && (
                <div className={`mb-6 ${hasOptions && !requiredOptionSelected ? 'opacity-50' : ''}`}>
                  <div className="flex items-center">
                    <span className="mr-4 text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      {/* Decrease button */}
                      <button 
                        onClick={() => handleQuantityChange(-1)} 
                        className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={Boolean(quantity <= 1 || (hasOptions && !requiredOptionSelected) || isSelectedOptionOutOfStock) }
                        aria-label="Decrease quantity"
                      >-</button>
                      {/* Quantity display */}
                      <span className="px-4 py-1 border-l border-r border-gray-300 text-center w-12">{quantity}</span>
                      {/* Increase button */}
                      <button 
                      onClick={() => handleQuantityChange(1)} 
                        className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={Boolean(
                          (hasOptions && !requiredOptionSelected) || // Option not selected
                          quantity >= currentOptionStock ||         // Reached stock limit
                          quantity >= MAX_QUANTITY_PER_ORDER ||     // Reached order limit
                          isSelectedOptionOutOfStock                // Selected option is OOS
                        )}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                  </div>
                  {/* Max Quantity Note */}
                  <p className="text-xs text-gray-500 mt-1 ml-1">Max {MAX_QUANTITY_PER_ORDER} per order</p>
                </div>
              )}

              {/* Add to Cart Button */} 
              <button 
                onClick={handleAddToCart}
                className={`w-full px-6 py-3 rounded-md font-semibold text-lg transition-all duration-300 
                  ${isOutOfStock || (hasOptions && !requiredOptionSelected) || isSelectedOptionOutOfStock || isAdding
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-secondary text-dark-text border-2 border-secondary hover:bg-transparent hover:text-secondary'}`}
                disabled={Boolean(isOutOfStock || (hasOptions && !requiredOptionSelected) || isSelectedOptionOutOfStock || isAdding)}
              >
                {isAdding ? 'Adding...' : 
                 isOutOfStock ? 'Out of Stock' : 
                 (hasOptions && !requiredOptionSelected) ? 'Select Size' : 
                 isSelectedOptionOutOfStock ? `Size ${sizeDisplay} - Out of Stock` : 
                 'Add to Cart'}
              </button>

            </div>
          </div>
        </FadeIn>
      </div>
    </main>
  );
} 