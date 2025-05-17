import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    'STRIPE_SECRET_KEY is not set in the environment variables. Please add it to your .env.local file or Vercel environment variables.'
  );
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2024-06-20', // Use the latest API version available or your preferred one
  typescript: true,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer'],
    });

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Extract relevant information
    const lineItems = session.line_items?.data.map(item => {
      // Type guard to ensure price.product is a Stripe.Product
      const product = item.price?.product as Stripe.Product;
      return {
        id: item.id,
        description: item.description,
        quantity: item.quantity,
        amount_total: item.amount_total / 100, // Convert from cents to dollars
        price_id: item.price?.id,
        product_name: product?.name || 'Product Name Not Available',
        // If you have product images stored in Stripe, you could access them via product.images
      };
    });

    const customerEmail = typeof session.customer === 'string' ? null : session.customer?.email;
    const shippingDetails = session.shipping_details
      ? {
          name: session.shipping_details.name,
          address: {
            line1: session.shipping_details.address?.line1,
            line2: session.shipping_details.address?.line2,
            city: session.shipping_details.address?.city,
            state: session.shipping_details.address?.state,
            postal_code: session.shipping_details.address?.postal_code,
            country: session.shipping_details.address?.country,
          },
        }
      : null;

    return NextResponse.json({
      lineItems,
      customerEmail: customerEmail || session.customer_details?.email,
      shippingDetails,
      // You can add more details from the session object if needed
      // For example: session.payment_status, session.total_details, etc.
    });
  } catch (error) {
    console.error('Error retrieving session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 