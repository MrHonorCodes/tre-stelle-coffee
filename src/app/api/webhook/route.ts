import { NextRequest, NextResponse } from 'next/server';
// import { buffer } from 'micro' // Removed: Not used in App Router for this purpose
import Stripe from 'stripe';
import { createClient } from '@sanity/client';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: '2025-04-30.basil', // Updated to match expected type
});

// Initialize Sanity client
const sanityClient = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
	apiVersion: '2024-05-01', // use a UTC date string
	token: process.env.SANITY_API_WRITE_TOKEN!, // Must be a write token
	useCdn: false, // Must be false to ensure fresh data for writes
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
	console.log(`Webhook received. Method: ${req.method}, URL: ${req.url}`);

	if (req.method !== 'POST') {
		console.warn(`Webhook rejected. Method was ${req.method}, not POST.`);
		return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
	}

	const sig = req.headers.get('stripe-signature');
	if (!sig) {
		console.error('Webhook Error: Missing stripe-signature header');
		return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
	}

	// Convert ReadableStream to buffer
	const reqBuffer = await req.text(); // Read the stream as text first
	const buf = Buffer.from(reqBuffer); // Then convert to buffer

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : 'Unknown webhook construction error';
		console.error(`Webhook signature verification failed: ${message}`);
		return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
	}

	// Handle the checkout.session.completed event
	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session;

		const customerEmail = session.customer_details?.email;
		// Retrieve and parse product details from metadata
		const productDetailsRaw = session.metadata?.productDetails || 'Unknown Product';
		const orderId = session.id;

		if (!customerEmail) {
			console.error('Webhook Error: Customer email not found in session');
			// You might still want to save the order with a placeholder or handle this case
			return NextResponse.json({ error: 'Customer email not found' }, { status: 400 });
		}

		// Parse the product details JSON
		let orderItems: Array<{
			_key: string;
			product: { _type: string; _ref: string } | null;
			productId: string;
			productName: string;
			quantity: number;
			size: string | null;
		}> = [];
		try {
			if (productDetailsRaw !== 'Unknown Product') {
				const parsedProducts = JSON.parse(productDetailsRaw);
				
				// Get all productIds from the order
				const productIds = parsedProducts.map((item: { productId?: string }) => item.productId).filter(Boolean);
				
				// Fetch products from Sanity using productId field
				const sanityProducts = await sanityClient.fetch(
					`*[_type == "product" && productId in $productIds]{ _id, productId }`,
					{ productIds }
				);
				
				// Create a map of productId -> Sanity _id
				const productIdToSanityId = Object.fromEntries(
					sanityProducts.map((p: { productId: string; _id: string }) => [p.productId, p._id])
				);
				
				orderItems = parsedProducts.map((item: { productId?: string; name?: string; quantity?: number; size?: string | null }, index: number) => {
					const sanityId = productIdToSanityId[item.productId || ''];
					return {
						_key: `item-${index}-${item.productId || 'unknown'}-${Date.now()}`,
						product: sanityId ? {
							_type: 'reference',
							_ref: sanityId,
						} : null,
						productId: item.productId || 'unknown',
						productName: item.name || 'Unknown Product',
						quantity: item.quantity || 1,
						size: item.size || null,
					};
				});
			}
		} catch (error) {
			console.warn('Failed to parse product details JSON:', error);
			// Fallback: create a single item with the raw string
			orderItems = [
				{
					_key: `fallback-${Date.now()}`,
					product: null, // No reference available for fallback
					productId: 'unknown',
					productName: productDetailsRaw,
					quantity: 1,
					size: null,
				},
			];
		}

		try {
			const newOrder = await sanityClient.create({
				_type: 'order',
				customerEmail: customerEmail,
				orderItems: orderItems,
				productDetails: productDetailsRaw, // Keep legacy field for backward compatibility
				stripeSessionId: orderId,
				trackingEmailSent: false,
				orderTimestamp: new Date().toISOString(),
			});
			console.log('Order created in Sanity:', newOrder._id);
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Unknown Sanity order creation error';
			console.error('Sanity Order Creation Error:', message);
			return NextResponse.json(
				{ error: `Failed to save order to Sanity: ${message}` },
				{ status: 500 }
			);
		}
	}

	return NextResponse.json({ received: true }, { status: 200 });
}

// It's good practice to explicitly tell Next.js about the expected body type if not using built-in parsers.
// However, since we are using buffer(req) and bodyParser: false is for pages router,
// we handle the raw body directly. For App router, Next.js handles body parsing by default
// but we need the raw body for Stripe. The `await req.text()` and `Buffer.from()` handles this.
