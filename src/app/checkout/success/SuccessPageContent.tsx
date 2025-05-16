'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext'; // Adjust path as needed
import { useSearchParams } from 'next/navigation';
import FadeIn from '../../../../components/ui/FadeIn'; // Adjust path as needed

export default function SuccessPageContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [isProcessed, setIsProcessed] = useState(false); // To ensure clearCart runs once

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId && !isProcessed) {
      console.log('Checkout successful, session_id:', sessionId);
      clearCart();
      setIsProcessed(true); // Mark as processed
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, clearCart, isProcessed]); // Add isProcessed to deps

  return (
    <FadeIn>
      <h1 className="text-3xl md:text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-xl text-gray-700 mb-8">Thank you for your order. Your cart has been cleared.</p>
      <Link href="/products" className="px-6 py-3 bg-primary text-light rounded-md font-semibold transition-all duration-300 hover:bg-primary/80">
        Continue Shopping
      </Link>
    </FadeIn>
  );
} 