import { NextResponse } from 'next/server';
import { client } from '@/sanity/lib/client'; // Adjust path as necessary

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      productId,
      rating,
      title,
      comment,
      authorName,
      authorEmail,
    } = body;

    // Basic validation
    if (!productId || !rating || !comment || !authorName) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Invalid rating value' }, { status: 400 });
    }

    // Create the review document in Sanity
    const reviewDocument = {
      _type: 'review',
      product: {
        _type: 'reference',
        _ref: productId,
      },
      rating: Number(rating),
      title: title || '', // Handle optional title
      comment,
      authorName,
      authorEmail: authorEmail || '', // Handle optional email
      submittedAt: new Date().toISOString(),
      isApproved: false, // Reviews are not approved by default
    };

    const createdReview = await client.create(reviewDocument);

    // Optional: Trigger a revalidation of the product page if desired
    // await revalidateTag(`product:${productId}`); // If you have slug-based tags
    // await revalidateTag('product'); // Or a general product tag

    return NextResponse.json(
        { message: 'Review submitted successfully. It will appear once approved.', reviewId: createdReview._id }, 
        { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting review:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: 'Failed to submit review', error: errorMessage }, { status: 500 });
  }
} 