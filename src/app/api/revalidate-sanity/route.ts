import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type?: string }>( // _type is optional for test pings
      req,
      process.env.SANITY_WEBHOOK_SECRET 
    );

    if (!isValidSignature) {
      return new Response('Invalid Sanity webhook signature', { status: 401 });
    }

    // If the body is null or _type is missing, it might be a test ping from Sanity
    if (!body || !body._type) {
      console.log('Webhook received, likely a test ping or missing _type. Body:', body);
      // Sanity test pings might send a null body or a body without _type
      // As long as the signature is valid, we can acknowledge it as a successful ping.
      return NextResponse.json({ status: 200, message: 'Webhook acknowledged (test ping or missing _type)' });
    }

    // If we have a body and a _type, proceed with revalidation
    revalidateTag(body._type);
    console.log(`Revalidated tag: ${body._type}`);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      message: `Revalidated tag: ${body._type}`,
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