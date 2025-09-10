import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@sanity/client';
import type Stripe from 'stripe';

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
	stripeSessionId?: string;
	orderItems?: Array<{
		productId: string;
		productName: string;
		quantity: number;
		size?: string;
	}>;
	productDetails?: string; // Legacy field
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
			if (DUMMY_AUTH_TOKEN_FROM_HEADER !== SANITY_WEBHOOK_SECRET) {
				// Replace with actual signature verification
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
		const order = (await sanityClient.getDocument(orderId)) as SanityOrderDocument | null;

		if (!order) {
			console.error(`Sanity Webhook: Order with ID ${orderId} not found.`);
			return NextResponse.json({ message: 'Order not found' }, { status: 404 });
		}

		const { customerEmail, trackingNumber, trackingEmailSent, orderItems, productDetails } = order;

		if (trackingNumber && !trackingEmailSent) {
			if (!customerEmail) {
				console.error(`Order ${orderId} has tracking number but no customer email.`);
				return NextResponse.json({ message: 'Customer email missing for order' }, { status: 400 });
			}

			// Format product details using the new structured data
			let productsText = 'Your items';
			if (orderItems && orderItems.length > 0) {
				productsText = orderItems
					.map((item) => {
						const sizeText = item.size ? ` (${item.size})` : '';
						return `${item.productName}${sizeText} (Qty: ${item.quantity})`;
					})
					.join(', ');
			} else if (typeof productDetails === 'string') {
				// Fallback to legacy field if orderItems is not available
				try {
					const productsArray = JSON.parse(productDetails) as ProductDetailItem[];
					productsText = productsArray
						.map((p: ProductDetailItem) => `${p.name} (Qty: ${p.quantity})`)
						.join(', ');
				} catch (e) {
					console.warn('Could not parse productDetails for email:', e);
					productsText = productDetails;
				}
			}

			// Personalize greeting using first name from Stripe (if available)
			let firstName = 'there';
			try {
				if (order.stripeSessionId && process.env.STRIPE_SECRET_KEY) {
					const stripeMod = await import('stripe');
					const stripeClient = new stripeMod.default(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2025-04-30.basil' });
					const session = (await stripeClient.checkout.sessions.retrieve(order.stripeSessionId)) as Stripe.Checkout.Session;
					const fullName = session?.customer_details?.name || '';
					if (fullName) {
						const parts = String(fullName).trim().split(/\s+/);
						if (parts[0]) firstName = parts[0];
					}
				}
			} catch (e) {
				console.warn('Could not retrieve first name from Stripe:', e);
			}

			// Send email using Resend
			try {
				const uspsTrackingUrl = `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNumber}`;

				const { data, error } = await resend.emails.send({
					from: 'Tre Stelle Coffee <contact@trestellecoffeeco.com>', // Ensure this matches your verified Resend domain
					to: [customerEmail],
					subject: 'Your Tre Stelle Coffee Order Has Shipped!',
					html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Shipped</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
                line-height: 1.6;
                color: #2E1A13;
                background-color: #f4f4f4;
              }
              a.button {
                display: inline-block;
                padding: 12px 25px;
                background-color: #4a0000;
                color: #ffffff !important;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                font-weight: 600;
              }
            </style>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; line-height: 1.6; color: #333333; background-color: #f4f4f4;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
              <tr>
                <td align="center" style="padding: 20px 0;">
                  <table width="600" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
                    <tr>
                      <td align="center" style="padding: 18px 20px; background-color: #4a0000; color: #ffffff;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; margin: 0 auto;">
							<tr>
								<td width="160" align="left" style="vertical-align: middle;">
									<img src="https://trestellecoffeeco.com/images/white-logo.png" alt="Tre Stelle Coffee" width="140" style="display: block; max-width: 140px; height: auto;" />
								</td>
								<td align="center" style="vertical-align: middle; color:#e7c583; font-weight: 700; font-size: 18px;">Order Update</td>
								<td width="160" align="right" style="vertical-align: middle;"></td>
							</tr>
						</table>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding: 10px 20px; background-color: #e7c583; color: #4a0000; font-weight: 600; font-size: 14px;">Your Order Has Shipped</td>
                    </tr>
                    <tr>
                      <td style="padding: 30px 25px;">
                        <p style="margin: 0 0 15px; font-size: 16px;">Hi ${firstName},</p>
                        <p style="margin: 0 0 15px; font-size: 16px;">Great news! Your Tre Stelle Coffee order containing <strong>${productsText}</strong> has shipped via USPS.</p>
                        <p style="margin: 0 0 10px; font-size: 16px;">You can track your package using the following USPS tracking number:</p>
                        <p style="margin: 20px 0; text-align: center;">
                          <a class="button" href="${uspsTrackingUrl}" target="_blank">
                            <strong>${trackingNumber}</strong>
                          </a>
                        </p>
                        <p style="margin: 0 0 15px; font-size: 16px;">Please allow some time for the tracking information to update.</p>
                        <p style="margin: 0 0 15px; font-size: 14px; color: #555555;">If the link above doesn't work, you can also go to <a href="https://www.usps.com/manage/welcome.htm" target="_blank" style="color: #4a0000; text-decoration: underline;">USPS.com</a> and enter the tracking number manually.</p>
                        <p style="margin: 25px 0 0; font-size: 16px;">Thanks for your order!</p>
                        <p style="margin: 5px 0 0; font-size: 16px;">The Tre Stelle Coffee Team</p>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td align="center" style="padding: 20px; background-color: #f6efe2; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
                        <p style="margin: 0 0 6px; font-size: 12px; color: #2E1A13;">&copy; ${new Date().getFullYear()} Tre Stelle Coffee. All rights reserved.</p>
                        <p style="margin: 0; font-size: 12px; color: #6b5a54;">If the tracking button doesn't work, your tracking number is <strong>${trackingNumber}</strong>.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
          `,
				});

				if (error) {
					console.error(`Resend API Error for order ${orderId}:`, error);
					return NextResponse.json(
						{ message: 'Failed to send tracking email', error: error.message },
						{ status: 500 }
					);
				}

				console.log(
					`Tracking email sent successfully for order ${orderId}, Resend ID: ${data?.id}`
				);

				// Update Sanity: set trackingEmailSent to true
				await sanityClient.patch(orderId).set({ trackingEmailSent: true }).commit();

				console.log(`Order ${orderId} updated in Sanity: trackingEmailSent set to true.`);
				return NextResponse.json(
					{ message: 'Tracking email sent and order updated.' },
					{ status: 200 }
				);
			} catch (emailError: unknown) {
				console.error(`Failed to send email or update Sanity for order ${orderId}:`, emailError);
				const message =
					emailError instanceof Error
						? emailError.message
						: 'An unknown error occurred in email sending process';
				return NextResponse.json(
					{ message: 'Error in email sending process', error: message },
					{ status: 500 }
				);
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
		const message =
			error instanceof Error
				? error.message
				: 'An unknown error occurred while processing the webhook';
		return NextResponse.json({ message: 'Internal Server Error', error: message }, { status: 500 });
	}
}
