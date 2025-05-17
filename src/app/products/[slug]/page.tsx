import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import type { Image as SanityImageType } from 'sanity';
import Link from 'next/link';
import FadeIn from '../../../../components/ui/FadeIn';
import ProductDisplayClient from '../../../components/products/ProductDisplayClient';

// Define the Sanity Product Type for this server component
interface SanityProduct extends SanityDocument {
  _id: string;
  name: string;
  slug: { current: string };
  images: SanityImageType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any[];
  price: number;
  category?: string;
  stripePriceId?: string;
  isOutOfStock?: boolean;
  reviews?: SanityReview[];
}

// Define the Sanity Review Type for this server component
interface SanityReview extends SanityDocument {
  _id: string;
  rating: number;
  title?: string;
  comment: string;
  authorName: string;
  submittedAt: string;
  // We don't fetch authorEmail or isApproved to the client for privacy/security
}

// Explicitly define Props for the page component
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const PRODUCT_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  images,
  details,
  price,
  category,
  stripePriceId,
  isOutOfStock,
  "reviews": *[_type == "review" && references(^._id) && isApproved == true]{
    _id,
    rating,
    title,
    comment,
    authorName,
    submittedAt
  } | order(submittedAt desc)
}`;

export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const params = await paramsPromise;
  const { slug } = params;
  const product = await client.fetch<SanityProduct | null>(
    PRODUCT_QUERY,
    { slug },
    { next: { tags: ['product', `product:${slug}`] } }
  );
  if (!product) {
    return { title: 'Product Not Found' };
  }
  return {
    title: `${product.name} | Tre Stelle Coffee`,
    description: `Details about ${product.name}. Price: $${product.price ? product.price.toFixed(2) : 'N/A'}.`,
  };
}

export default async function ProductDetailPage({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  const { slug } = params;
  const product = await client.fetch<SanityProduct | null>(
    PRODUCT_QUERY,
    { slug },
    { next: { tags: ['product', `product:${slug}`] } }
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-soft-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Product Not Found</h1>
          <p className="text-gray-700 mb-8">Sorry, we couldn&apos;t find the product you were looking for.</p>
          <Link href="/products" className="px-6 py-3 bg-secondary text-dark-text font-semibold rounded-md hover:bg-secondary-dark transition-colors">
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-soft-white pt-36 pb-12">
      <FadeIn>
        <div className="container mx-auto px-4">
          <ProductDisplayClient product={product} />
        </div>
      </FadeIn>
    </main>
  );
}
