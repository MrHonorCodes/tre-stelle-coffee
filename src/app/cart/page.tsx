'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import productsData from '../../data/products.json';
import FadeIn from '../../../components/ui/FadeIn';

// Type definition for Product (simplified for cart context)
type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  stock: number | { [optionValue: string]: number }; 
  options?: { [optionName: string]: string[] } | null;
};

// Helper to find product data (could be optimized later if needed)
function getProductDetails(id: number): Product | undefined {
  return productsData.find(p => p.id === id) as Product | undefined;
}

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  // --- Shipping Configuration ---
  const SHIPPING_RATE = 5.00;
  const SHIPPING_DESTINATION = "Texas";

  // Combine cart items with product details
  const detailedCartItems = cartItems.map(item => {
    const product = getProductDetails(item.id);
    return {
      ...item, 
      productDetails: product, // Add full product details
      itemTotal: product ? product.price * item.quantity : 0,
    };
  }).filter(item => item.productDetails); // Filter out items where product details weren't found

  const subtotal = getCartTotal();
  const total = subtotal + SHIPPING_RATE; // Calculate total including shipping

  const handleQuantityChange = (id: number, newQuantity: number, options?: { [key: string]: string }) => {
    if (newQuantity < 1) {
      removeFromCart(id, options); // Remove if quantity goes below 1
    } else {
      // TODO: Check against stock for the specific option before updating
      updateQuantity(id, newQuantity, options);
    }
  };

  return (
    <main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">Your Shopping Cart</h1>

          {detailedCartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-6">Your cart is currently empty.</p>
              <Link href="/products" className="px-6 py-3 bg-secondary text-dark-text border-2 border-secondary rounded-md font-semibold transition-all duration-300 hover:bg-transparent hover:text-secondary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items List (Left/Main Column) */}
              <div className="lg:col-span-2 space-y-6">
                {detailedCartItems.map((item) => (
                  <div key={`${item.id}-${JSON.stringify(item.options)}`} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4">
                    {/* Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <Image 
                        src={item.productDetails!.images[0]} 
                        alt={item.productDetails!.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details & Actions */}
                    <div className="flex-grow flex flex-col md:flex-row justify-between items-center w-full">
                      {/* Name & Options */}
                      <div className="mb-2 md:mb-0 text-center md:text-left">
                        <Link href={`/products/${item.id}`} className="text-lg font-semibold text-primary hover:text-secondary transition-colors">
                          {item.productDetails!.name}
                        </Link>
                        {item.options && (
                          <div className="text-sm text-gray-500 mt-1">
                            {Object.entries(item.options).map(([key, value]) => (
                              <span key={key} className="mr-2">{key}: {value}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center gap-4 md:gap-6">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.options)}
                            className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md"
                            aria-label="Decrease quantity"
                          >-</button>
                          <span className="px-3 py-1 border-l border-r border-gray-300 text-center text-sm w-10">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.options)}
                            className="px-2 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md"
                            // TODO: Disable based on stock
                            aria-label="Increase quantity"
                          >+</button>
                        </div>

                        {/* Item Total */}
                        <span className="text-lg font-semibold text-primary w-20 text-right">
                          ${item.itemTotal.toFixed(2)}
                        </span>

                        {/* Remove Button */}
                        <button 
                          onClick={() => removeFromCart(item.id, item.options)}
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                 {/* Clear Cart Button */} 
                 <div className="text-right mt-4">
                    <button 
                      onClick={clearCart}
                      className="text-sm text-gray-500 hover:text-red-600 underline transition-colors"
                    >
                      Clear Cart
                    </button>
                 </div>
              </div>

              {/* Order Summary (Right Column) */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
                  <h2 className="text-xl font-semibold text-primary mb-6 border-b pb-3">Order Summary</h2>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-primary">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Updated Shipping Row */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold text-primary">${SHIPPING_RATE.toFixed(2)}</span>
                  </div>
                  {/* Tax Placeholder */}
                  <div className="flex justify-between items-center mb-6 text-gray-500 text-sm">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>

                  {/* Updated Total Row */}
                  <div className="border-t pt-4 flex justify-between items-center font-bold text-lg text-primary">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Texas Shipping Note */}
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    * Currently shipping only to addresses within {SHIPPING_DESTINATION}. *
                  </p>

                  {/* Checkout Button - Updated Link */}
                  <Link 
                    href="/checkout" 
                    className="mt-6 block w-full text-center px-6 py-3 bg-primary text-light rounded-md font-semibold text-lg transition-all duration-300 hover:bg-primary/80"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </FadeIn>
      </div>
    </main>
  );
} 