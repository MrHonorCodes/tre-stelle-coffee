import { type SanityDocument } from 'next-sanity';
import { readClient as client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SITE_URL } from '@/lib/site';
import type { Image as SanityImageType } from 'sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FadeIn from '../../../../components/ui/FadeIn';
import ProductDisplayClient from '../../../components/products/ProductDisplayClient';
import { isHolidayBoxEnabled } from '@/lib/seasonal';

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
	sizes?: string[];
	optionLabel?: string;
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
  productId,
  name,
  slug,
  images,
  details,
  price,
  category,
  stripePriceId,
  isOutOfStock,
  sizes,
  optionLabel,
  isFeatured,
  bundleOptions{
    coffeeChoices[]->{
      _id,
      name,
      slug
    },
    hasTShirt,
    hasCoffeeMug
  },
  "reviews": *[_type == "review" && references(^._id) && isApproved == true]{
    _id,
    rating,
    title,
    comment,
    authorName,
    submittedAt
  } | order(submittedAt desc)
}`;

export async function generateMetadata({
	params: paramsPromise,
}: {
	params: Promise<{ slug: string }>;
}) {
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
	const priceLabel = product.price ? `$${product.price.toFixed(2)}` : '';
	const description = `${product.name} from Tre Stelle Coffee Co.${priceLabel ? ` ${priceLabel}.` : ''} Premium specialty coffee roasted in Dallas, TX.`;
	const imageUrl = product.images?.[0]
		? urlFor(product.images[0]).width(1200).height(630).fit('crop').url()
		: undefined;
	const canonical = `${SITE_URL}/products/${slug}`;
	return {
		title: `${product.name} | Tre Stelle Coffee`,
		description,
		alternates: { canonical },
		openGraph: {
			title: `${product.name} | Tre Stelle Coffee`,
			description,
			type: 'website',
			url: canonical,
			images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: product.name }] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title: `${product.name} | Tre Stelle Coffee`,
			description,
			images: imageUrl ? [imageUrl] : undefined,
		},
	};
}

export default async function ProductDetailPage({ params: paramsPromise }: Props) {
	const params = await paramsPromise;
	const { slug } = params;

	// After the holiday season, hide the Holiday Box product route entirely.
	if (slug === 'holiday-box' && !isHolidayBoxEnabled()) {
		notFound();
	}

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
					<p className="text-gray-700 mb-8">
						Sorry, we couldn&apos;t find the product you were looking for.
					</p>
					<Link
						href="/products"
						className="px-6 py-3 bg-secondary text-dark-text font-semibold rounded-md hover:bg-secondary-dark transition-colors"
					>
						Back to Products
					</Link>
				</div>
			</main>
		);
	}

	const productImage = product.images?.[0]
		? urlFor(product.images[0]).width(1200).height(1200).fit('crop').url()
		: undefined;
	const approvedReviews = product.reviews ?? [];
	const avgRating = approvedReviews.length
		? approvedReviews.reduce((sum, r) => sum + (r.rating || 0), 0) / approvedReviews.length
		: 0;
	const productJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		image: productImage ? [productImage] : undefined,
		description: `${product.name} from Tre Stelle Coffee Co. Premium specialty coffee roasted in Dallas, TX.`,
		brand: { '@type': 'Brand', name: 'Tre Stelle Coffee Co.' },
		offers: {
			'@type': 'Offer',
			url: `${SITE_URL}/products/${slug}`,
			priceCurrency: 'USD',
			price: product.price ?? 0,
			availability: product.isOutOfStock
				? 'https://schema.org/OutOfStock'
				: 'https://schema.org/InStock',
		},
		...(approvedReviews.length > 0 && {
			aggregateRating: {
				'@type': 'AggregateRating',
				ratingValue: avgRating.toFixed(1),
				reviewCount: approvedReviews.length,
			},
			review: approvedReviews.slice(0, 5).map((r) => ({
				'@type': 'Review',
				reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
				author: { '@type': 'Person', name: r.authorName },
				datePublished: r.submittedAt,
				...(r.title && { name: r.title }),
				reviewBody: r.comment,
			})),
		}),
	};

	return (
		<main className="min-h-screen bg-soft-white pt-36 pb-12">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
			/>
			<FadeIn>
				<div className="container mx-auto px-4">
					<ProductDisplayClient product={product} />
				</div>
			</FadeIn>
		</main>
	);
}
