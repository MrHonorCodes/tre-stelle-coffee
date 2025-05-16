import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Ensure STRIPE_SECRET_KEY is set in your .env.local or Vercel environment variables
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("Stripe secret key is not set. Check your .env.local or Vercel environment variables.");
  // Critical: Throw an error during module initialization if the key is missing.
  // This will make the build fail explicitly if the key isn't configured in Vercel.
  throw new Error("Stripe secret key is not set. Deployment will fail.");
}

// Initialize Stripe
const stripe = new Stripe(stripeSecretKey, { // No need for '!' if we throw error above
  apiVersion: '2025-04-30.basil', 
});

export async function POST(req: NextRequest) {
  // The stripe instance is initialized at the module level.
  // If stripeSecretKey was missing, the module would have already failed to load.
  
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
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`, // Stripe will replace {CHECKOUT_SESSION_ID}
      cancel_url: `${origin}/checkout/cancel`, // Changed to redirect to a dedicated cancel page
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