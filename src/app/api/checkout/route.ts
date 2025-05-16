import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Stripe with the secret key
// Ensure STRIPE_SECRET_KEY is set in your .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil', // Use the latest API version
});

export async function POST(req: NextRequest) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { lineItems } = body; // Expect an array of lineItems

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ message: 'Line items are required and must be an array.' }, { status: 400 });
    }

    // Validate each line item
    for (const item of lineItems) {
      if (!item.priceId || typeof item.quantity !== 'number' || item.quantity < 1) {
        return NextResponse.json({ message: 'Each line item must have a valid priceId and quantity.' }, { status: 400 });
      }
    }
    
    // For dynamic origin for success and cancel URLs
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems.map(item => ({
        price: item.priceId,
        quantity: item.quantity,
      })),
      // Add shipping address collection
      shipping_address_collection: {
        allowed_countries: ['US'], // Only allow US shipping addresses
      },
      // Specify the shipping rate to use
      shipping_options: [
        {
          shipping_rate: 'shr_1RPTqYCmUENvPwLMop0pjdPF',
        },
      ],
      success_url: `${origin}/cart?session_id={CHECKOUT_SESSION_ID}`, // Stripe will replace {CHECKOUT_SESSION_ID}
      cancel_url: `${origin}/cart`, // Changed to redirect back to the cart page
      // automatic_tax: { enabled: true }, // Optional: Enable automatic tax calculation if configured in Stripe
    });

    if (session.url) {
      return NextResponse.json({ url: session.url }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Could not create Stripe session' }, { status: 500 });
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
    console.error('Stripe session creation error:', error);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 