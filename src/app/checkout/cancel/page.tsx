'use client';
import Link from 'next/link';
import FadeIn from '../../../../components/ui/FadeIn'; // Adjust path as needed

export default function CheckoutCancelPage() {
  return (
    <main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-500 mb-4">Order Cancelled</h1>
          <p className="text-xl text-gray-700 mb-8">Your order was not completed. Your cart has not been changed.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/cart" className="px-6 py-3 bg-gray-300 text-dark-text rounded-md font-semibold transition-all duration-300 hover:bg-gray-400 w-full sm:w-auto">
              Back to Cart
            </Link>
            <Link href="/products" className="px-6 py-3 bg-primary text-light rounded-md font-semibold transition-all duration-300 hover:bg-primary/80 w-full sm:w-auto">
              Continue Shopping
            </Link>
          </div>
        </FadeIn>
      </div>
    </main>
  );
} 