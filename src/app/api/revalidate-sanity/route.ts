import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

// Define the expected body structure from the webhook (including slug for products)
interface SanityWebhookBody {
  _type?: string;
  slug?: { current: string }; // Assuming slug is an object with a current property
}

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
      req,
      process.env.SANITY_WEBHOOK_SECRET 
    );

    if (!isValidSignature) {
      return new Response('Invalid Sanity webhook signature', { status: 401 });
    }

    if (!body || !body._type) {
      console.log('Webhook received, likely a test ping or missing _type. Body:', body);
      return NextResponse.json({ status: 200, message: 'Webhook acknowledged (test ping or missing _type)' });
    }

    // Revalidate the general tag for the document type
    revalidateTag(body._type);
    console.log(`Revalidated tag: ${body._type}`);

    let pathRevalidated = false;
    // If it's a product and a slug is provided, also revalidate the specific product path
    if (body._type === 'product' && body.slug?.current) {
      const productPath = `/products/${body.slug.current}`;
      revalidatePath(productPath);
      console.log(`Revalidated path: ${productPath}`);
      pathRevalidated = true;
    }

    // Also revalidate the main products page if a product was changed
    if (body._type === 'product') {
      revalidatePath('/products');
      console.log('Revalidated path: /products');
      // We can set pathRevalidated to true here as well, or adjust the logging message for clarity
      // For now, the existing pathRevalidated logic for specific slugs is fine.
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      tagRevalidated: body._type,
      pathRevalidated: pathRevalidated ? (body._type === 'product' && body.slug?.current ? `/products/${body.slug.current}` : 'N/A') : 'No specific path revalidated by slug',
      now: Date.now(),
    });
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error in Sanity revalidation webhook:', error);
    return new Response(`Webhook error: ${errorMessage}`, { status: 500 });
  }
} 