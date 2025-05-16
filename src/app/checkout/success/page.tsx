'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext'; // Adjust path as needed
import { useSearchParams } from 'next/navigation';
import FadeIn from '../../../../components/ui/FadeIn'; // Adjust path as needed

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // You could fetch order details from Stripe here using the session_id
      // For now, just clearing the cart and logging
      console.log('Checkout successful, session_id:', sessionId);
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount, clearCart and searchParams are stable or correctly handled by deps

  return (
    <main className="min-h-screen bg-soft-white pt-24 md:pt-32 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-700 mb-8">Thank you for your order. Your cart has been cleared.</p>
          <Link href="/products" className="px-6 py-3 bg-primary text-light rounded-md font-semibold transition-all duration-300 hover:bg-primary/80">
            Continue Shopping
          </Link>
        </FadeIn>
      </div>
    </main>
  );
} 