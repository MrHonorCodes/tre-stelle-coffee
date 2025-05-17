import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    'STRIPE_SECRET_KEY is not set in the environment variables. Please add it to your .env.local file or Vercel environment variables.'
  );
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-04-30.basil', // Use the version your Stripe types expect
  typescript: true,
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
  }

  try {
    const response = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product', 'customer'],
    });
    const session = response as Stripe.Checkout.Session;

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

    let customerEmail: string | null = null;
    if (typeof session.customer !== 'string' && session.customer && !('deleted' in session.customer)) {
      customerEmail = session.customer.email;
    } else if (session.customer_details?.email) {
      customerEmail = session.customer_details.email;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shippingDetails = (session as any).shipping_details
      ? {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name: (session as any).shipping_details.name,
          address: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            line1: (session as any).shipping_details.address?.line1,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            line2: (session as any).shipping_details.address?.line2,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            city: (session as any).shipping_details.address?.city,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            state: (session as any).shipping_details.address?.state,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            postal_code: (session as any).shipping_details.address?.postal_code,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            country: (session as any).shipping_details.address?.country,
          },
        }
      : null;

    return NextResponse.json({
      lineItems,
      customerEmail,
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