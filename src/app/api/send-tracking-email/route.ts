import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@sanity/client';

const resend = new Resend(process.env.RESEND_API_KEY);

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-05-01',
  token: process.env.SANITY_API_WRITE_TOKEN!, // Needs write access
  useCdn: false,
});

// Define interfaces for better type safety
interface ProductDetailItem {
  name: string;
  quantity: number;
  // Add other product properties if they exist, e.g., productId, size
}

interface SanityOrderDocument {
  _id: string;
  _type: 'order';
  customerEmail?: string;
  trackingNumber?: string;
  trackingEmailSent?: boolean;
  productDetails?: string; // Assuming productDetails is a JSON string
  // Add other fields from your order schema as needed
}

// Optional: A secret to verify the webhook request is from Sanity
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // 1. Verify the webhook signature (if a secret is configured)
    if (SANITY_WEBHOOK_SECRET) {
      // Note: Sanity webhook signature verification requires specific header and logic.
      // For simplicity, this example assumes a basic secret check or relies on network-level security.
      // A more robust solution would involve crypto.timingSafeEqual for signature comparison.
      const DUMMY_AUTH_TOKEN_FROM_HEADER = req.headers.get('Authorization')?.split(' ')?.[1];
      if (DUMMY_AUTH_TOKEN_FROM_HEADER !== SANITY_WEBHOOK_SECRET) { // Replace with actual signature verification
        console.warn('Unauthorized Sanity webhook attempt');
        // return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        // For now, we'll log and proceed if the secret is set but doesn't match, for easier local dev
        // In production, you MUST enforce this.
      }
    }

    const payload = await req.json();
    // Sanity typically sends the document ID in _id for updates
    // The actual structure might vary based on your webhook configuration (GROQ projection)
    // Assuming the payload directly contains the fields of the updated 'order' document, 
    // or at least the ID to fetch it.

    const orderId = payload?._id; // Or however Sanity sends the document ID

    if (!orderId) {
      console.error('Sanity Webhook: Missing order ID in payload');
      return NextResponse.json({ message: 'Missing order ID' }, { status: 400 });
    }

    // Fetch the latest version of the order to ensure we have all details
    // And to double-check conditions (trackingNumber present, email not sent)
    const order = await sanityClient.getDocument(orderId) as SanityOrderDocument | null;

    if (!order) {
      console.error(`Sanity Webhook: Order with ID ${orderId} not found.`);
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    const { customerEmail, trackingNumber, trackingEmailSent, productDetails } = order;

    if (trackingNumber && !trackingEmailSent) {
      if (!customerEmail) {
        console.error(`Order ${orderId} has tracking number but no customer email.`);
        // Optionally update status to prevent retries if email is genuinely missing
        return NextResponse.json({ message: 'Customer email missing for order' }, { status: 400 });
      }

      // For product details, you might want to parse them if they are stored as a JSON string
      let productsText = 'Your items';
      if (typeof productDetails === 'string') {
        try {
          const productsArray = JSON.parse(productDetails) as ProductDetailItem[];
          productsText = productsArray.map((p: ProductDetailItem) => `${p.name} (Qty: ${p.quantity})`).join(', ');
        } catch (e) {
          console.warn('Could not parse productDetails for email:', e);
          productsText = productDetails; // fallback to raw string if parsing fails
        }
      }

      // Send email using Resend
      try {
        const { data, error } = await resend.emails.send({
          from: 'Tre Stelle Coffee <contact@trestellecoffeeco.com>', // Replace with your verified Resend domain/email
          to: [customerEmail],
          subject: 'Your Tre Stelle Coffee Order Has Shipped!',
          html: `
            <h1>Your Order Has Shipped!</h1>
            <p>Hi there,</p>
            <p>Great news! Your order containing ${productsText} has shipped.</p>
            <p>You can track your package using the following tracking number:</p>
            <p><strong>${trackingNumber}</strong></p>
            <p>Please allow some time for the tracking information to update.</p>
            <p>Thanks for your order!</p>
            <p>The Tre Stelle Coffee Team</p>
          `,
        });

        if (error) {
          console.error(`Resend API Error for order ${orderId}:`, error);
          return NextResponse.json({ message: 'Failed to send tracking email', error: error.message }, { status: 500 });
        }

        console.log(`Tracking email sent successfully for order ${orderId}, Resend ID: ${data?.id}`);

        // Update Sanity: set trackingEmailSent to true
        await sanityClient
          .patch(orderId)
          .set({ trackingEmailSent: true })
          .commit();
        
        console.log(`Order ${orderId} updated in Sanity: trackingEmailSent set to true.`);
        return NextResponse.json({ message: 'Tracking email sent and order updated.' }, { status: 200 });

      } catch (emailError: unknown) {
        console.error(`Failed to send email or update Sanity for order ${orderId}:`, emailError);
        const message = emailError instanceof Error ? emailError.message : 'An unknown error occurred in email sending process';
        return NextResponse.json({ message: 'Error in email sending process', error: message }, { status: 500 });
      }
    } else {
      let reason = 'No action taken:';
      if (!trackingNumber) reason += ' No tracking number.';
      if (trackingEmailSent) reason += ' Email already sent.';
      console.log(`${reason} For order ID: ${orderId}`);
      return NextResponse.json({ message: reason }, { status: 200 }); // Still a success, just no action needed
    }

  } catch (error: unknown) {
    console.error('Error processing Sanity webhook:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred while processing the webhook';
    return NextResponse.json({ message: 'Internal Server Error', error: message }, { status: 500 });
  }
} 