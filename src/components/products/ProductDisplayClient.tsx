'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import type { Image as SanityImageType, PortableTextBlock } from 'sanity';
import { PortableText, type SanityDocument } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { useCart } from '../../context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import type { Swiper as SwiperClass } from 'swiper';

// Star component for displaying ratings
const StarIcon = ({ filled, halfFilled }: { filled: boolean; halfFilled?: boolean }) => (
  <svg className={`w-5 h-5 ${filled || halfFilled ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    {halfFilled ? (
      <>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipRule="evenodd" fillRule="evenodd" />
        <path d="M10 2.236l-1.07 3.292a1 1 0 00-.95.69H4.518c-.97 0-1.371 1.24-.588 1.81l2.8 2.034a1 1 0 00.364 1.118l-1.07 3.292c-.3.921.755 1.688 1.54 1.118l2.8-2.034a1 1 0 001.175 0l2.8 2.034c.784.57 1.838-.197 1.539-1.118l-1.07-3.292a1 1 0 00-.364-1.118l2.8-2.034c.783-.57.38-1.81-.588-1.81H12.47a1 1 0 00-.95-.69L10 2.236z" opacity="0.5" />
      </>
    ) : (
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    )}
  </svg>
);

const RatingStars = ({ rating, totalStars = 5 }: { rating: number; totalStars?: number }) => {
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    const filled = i <= Math.floor(rating);
    const halfFilled = !filled && i === Math.ceil(rating) && rating % 1 !== 0;
    stars.push(<StarIcon key={i} filled={filled} halfFilled={halfFilled} />);
  }
  return <div className="flex items-center">{stars}</div>;
};

// Reuse the SanityProduct interface (can also be imported from a shared types file)
interface SanityProduct extends SanityDocument {
  _id: string;
  name: string;
  slug: { current: string };
  images: SanityImageType[];
  details?: PortableTextBlock[];
  price: number;
  category?: string;
  stripePriceId?: string;
  isOutOfStock?: boolean;
  reviews?: SanityReview[];
  size?: string;
  sizes?: string[];
}

// Define the Sanity Review Type (can also be imported from a shared types file)
interface SanityReview extends SanityDocument {
  _id: string;
  rating: number;
  title?: string;
  comment: string;
  authorName: string;
  submittedAt: string;
}

// Configure the image URL builder (should ideally come from a shared Sanity lib)
// For simplicity, re-defining here. In a real app, import from your Sanity client/lib file.
const tempProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'woqu8pre'; // Fallback, use your actual project ID
const tempDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';   // Fallback, use your actual dataset

const builder = imageUrlBuilder({ projectId: tempProjectId, dataset: tempDataset });

// Define global window properties for hCaptcha to satisfy TypeScript

interface HCaptchaRenderParams {
  sitekey: string;
  callback: (token: string) => void;
  // Add other hCaptcha parameters as needed, e.g.:
  // theme?: 'light' | 'dark';
  // size?: 'normal' | 'compact';
  // tabindex?: number;
}

declare global {
  interface Window {
    hcaptcha?: {
      render: (container: string | HTMLElement, params: HCaptchaRenderParams) => string | undefined;
      // Add other hCaptcha methods like reset, getResponse if you use them
    };
    onHCaptchaScriptLoad?: () => void;
  }
}

function urlFor(source: SanityImageType) {
  if (!source) return undefined; // Handle cases where image might be undefined
  return builder.image(source);
}

const MAX_QUANTITY_PER_ORDER = 5; // Or from config

export default function ProductDisplayClient({ product }: { product: SanityProduct }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<'success' | 'warning' | 'error'>('success');

  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewAuthorName, setReviewAuthorName] = useState('');
  const [reviewAuthorEmail, setReviewAuthorEmail] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewFormMessage, setReviewFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Use the isOutOfStock field from the product prop
  const isOutOfStock = product.isOutOfStock || false;

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  const [selectedSize, setSelectedSize] = useState<string>("");

  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [isHCaptchaLoaded, setIsHCaptchaLoaded] = useState(false);

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => {
      const newQuantity = prev + amount;
      // Basic validation: 1 to MAX_QUANTITY_PER_ORDER
      // More complex stock checking would go here if stock levels are available
      return Math.max(1, Math.min(MAX_QUANTITY_PER_ORDER, newQuantity));
    });
  };

  const handleAddToCart = () => {
    if (!product) return;
    if (product.category === 'merchandise' && product.sizes && product.sizes.length > 0 && !selectedSize) {
      setToastType('error');
      setToastMessage('Please select a size.');
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
      return;
    }
    setIsAdding(true);
    // Log before calling addToCart
    console.log(`[ProductDisplayClient] About to call addToCart. Product ID: ${product._id}, Name: ${product.name}, Quantity to add: ${quantity}, Size: ${selectedSize}`);
    const options = product.category === 'merchandise' ? { size: selectedSize } : undefined;
    const result = addToCart({ ...product }, quantity, options);

    setToastMessage(result.message || (result.success ? `${product.name} updated in cart.` : "Could not add item to cart."));
    
    if (result.quantityAdded === quantity && result.finalQuantity <= MAX_QUANTITY_PER_ORDER && quantity > 0) {
      setToastType('success');
    } else if (result.quantityAdded >= 0 && result.quantityAdded < quantity) { // Used >= 0 for quantityAdded in case none were added but it was a clamp.
      setToastType('warning'); // Partially added due to max quantity or already at max
    } else if (!result.success) {
      setToastType('error');
    }

    setShowConfirmation(true);
    setTimeout(() => {
        setIsAdding(false);
        setShowConfirmation(false);
        // Only reset quantity if it was a full success where all requested items were added.
        if (toastType === 'success' && result.quantityAdded === quantity) { 
          setQuantity(1); 
        }
    }, 3000); // Increased timeout for toast visibility
  };
  
  const toastBgColor = toastType === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 
                       toastType === 'warning' ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 
                       'bg-red-100 border-red-400 text-red-700';

  const handleSubmitReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    setReviewFormMessage(null);

    if (reviewRating === 0) {
      setReviewFormMessage({ type: 'error', text: 'Please select a rating.' });
      setIsSubmittingReview(false);
      return;
    }
    if (!hcaptchaToken) {
      setReviewFormMessage({ type: 'error', text: 'Please complete the captcha.' });
      setIsSubmittingReview(false);
      return;
    }

    try {
      const response = await fetch('/api/submit-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product._id,
          rating: reviewRating,
          title: reviewTitle,
          comment: reviewComment,
          authorName: reviewAuthorName,
          authorEmail: reviewAuthorEmail,
          hcaptchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit review.');
      }

      setReviewFormMessage({ type: 'success', text: 'Review submitted successfully! It will appear once approved.' });
      setShowReviewForm(false);
      // Optionally, clear form fields
      setReviewRating(0);
      setReviewTitle('');
      setReviewComment('');
      setReviewAuthorName('');
      setReviewAuthorEmail('');
      // Potentially re-fetch product data or optimistically update UI if reviews are live updated
    } catch (error) {
      if (error instanceof Error) {
        setReviewFormMessage({ type: 'error', text: error.message });
      } else {
        setReviewFormMessage({ type: 'error', text: 'An unexpected error occurred.' });
      }
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  // Callback function for hCaptcha
  const handleHCaptchaVerify = useCallback((token: string) => {
    console.log("hCaptcha verified with token:", token);
    setHcaptchaToken(token);
  }, [setHcaptchaToken]);

  // Function to explicitly render hCaptcha
  const renderHCaptcha = useCallback(() => {
    if (window.hcaptcha && document.getElementById('hcaptcha-container') && !hcaptchaToken) {
      try {
        console.log("Attempting to render hCaptcha");
        window.hcaptcha.render('hcaptcha-container', {
          sitekey: "a31e8ca2-e870-49da-9500-16a25b00362e",
          callback: handleHCaptchaVerify,
        });
        console.log("hCaptcha render called.");
      } catch (error) {
        console.error("Error rendering hCaptcha:", error);
      }
    } else {
      console.log("hCaptcha not ready or container not found or already solved.");
    }
  }, [hcaptchaToken, handleHCaptchaVerify]);

  useEffect(() => {
    window.onHCaptchaScriptLoad = () => {
      console.log("hCaptcha script finished loading.");
      setIsHCaptchaLoaded(true);
      renderHCaptcha();
    };

    if (!document.getElementById('hcaptcha-api-script')) {
      const script = document.createElement('script');
      script.id = 'hcaptcha-api-script';
      script.src = 'https://js.hcaptcha.com/1/api.js?render=explicit&onload=onHCaptchaScriptLoad';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      console.log("hCaptcha script appended to head.");
    } else {
      if (window.hcaptcha) {
        setIsHCaptchaLoaded(true);
        renderHCaptcha();
      }
    }

    return () => {
      delete window.onHCaptchaScriptLoad;
    };
  }, [renderHCaptcha]); // Added renderHCaptcha to dependencies

  useEffect(() => {
    if (showReviewForm && isHCaptchaLoaded) {
      renderHCaptcha();
    }
  }, [showReviewForm, isHCaptchaLoaded, renderHCaptcha]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Confirmation Message */} 
      {showConfirmation && (
          <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 ${toastBgColor} px-4 py-3 rounded shadow-lg z-50 transition-opacity duration-300 ease-in-out`}>
              <strong className="font-bold">{toastType === 'success' ? 'Success!' : toastType === 'warning' ? 'Note:' : 'Error!'}</strong>
              <span className="block sm:inline ml-1"> {toastMessage}</span>
              {toastType === 'success' && (
                <Link href="/cart" className="ml-2 underline hover:text-green-900 font-semibold">
                  View Cart
                </Link>
              )}
          </div>
      )}

      {/* Product Image Gallery with Swiper */}
      <div className="w-full max-w-2xl mx-auto bg-gray-100 rounded-lg overflow-visible shadow-md relative flex flex-col items-center justify-center">
        <Swiper
          modules={[Navigation, Pagination, Thumbs]}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          className="mb-4"
          style={{ width: '100%', height: 400 }}
        >
          {product.images.map((img, idx) => {
            const imageUrl = urlFor(img)?.url();
            return (
              <SwiperSlide key={idx}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    style={{ width: '100%', height: 400, objectFit: 'contain', background: '#fff' }}
                  />
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
        {product.images.length > 1 && (
          <Swiper
            modules={[Thumbs]}
            onSwiper={setThumbsSwiper}
            slidesPerView={Math.min(product.images.length, 5)}
            watchSlidesProgress
            style={{ width: '100%', height: 100 }}
          >
            {product.images.map((img, idx) => {
              const thumbUrl = urlFor(img)?.width(100).height(100).url();
              return (
                <SwiperSlide key={idx}>
                  {thumbUrl && (
                    <img
                      src={thumbUrl}
                      alt={product.name}
                      style={{ width: '100%', height: 100, objectFit: 'contain', background: '#fff' }}
                    />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        {isOutOfStock && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            OUT OF STOCK
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col">
        <span className="text-sm text-gray-500 mb-1 uppercase tracking-wider">{product.category || 'Coffee'}</span>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{product.name}</h1>
        
        {/* Average Rating Display */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="flex items-center mb-4">
            <RatingStars rating={averageRating} />
            <span className="ml-2 text-sm text-gray-600">
              ({averageRating.toFixed(1)} based on {product.reviews.length} review{product.reviews.length > 1 ? 's' : ''})
            </span>
          </div>
        )}
        {(!product.reviews || product.reviews.length === 0) && (
           <div className="mb-4 text-sm text-gray-500">No reviews yet.</div>
        )}

        <div className="text-3xl font-semibold text-primary mb-6">
          ${product.price ? product.price.toFixed(2) : 'N/A'}
        </div>

        {product.details && product.details.length > 0 && (
          <div className="prose prose-lg max-w-none text-gray-700 mb-6">
            <PortableText value={product.details} />
          </div>
        )}

        {/* Size selector for merchandise */}
        {product.category === 'merchandise' && product.sizes && product.sizes.length > 0 && (
          <div className="mb-4">
            <label htmlFor="size-select" className="block text-sm font-medium text-gray-700 mb-1">Select Size:</label>
            <select
              id="size-select"
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="">Choose a size</option>
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* Quantity Selector */}
        {!isOutOfStock && (
          <div className="mb-6">
            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => handleQuantityChange(-1)} 
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity <= 1 || isAdding}
                  aria-label="Decrease quantity"
                >-</button>
                <span className="px-4 py-1 border-l border-r border-gray-300 text-center w-12 select-none">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)} 
                  className="px-3 py-1 text-lg text-gray-600 hover:bg-gray-100 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity >= MAX_QUANTITY_PER_ORDER || isAdding}
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 ml-1">Max {MAX_QUANTITY_PER_ORDER} per order</p>
          </div>
        )}

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className={`mt-2 px-8 py-3 border-2 rounded-md font-semibold text-lg transition-all duration-300 w-full md:w-auto
                      ${isOutOfStock || isAdding
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300' 
                        : 'bg-secondary text-dark-text border-secondary hover:bg-opacity-90'}`}
          disabled={isOutOfStock || isAdding}
        >
          {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>

        <div className="mt-8">
          <Link href="/products" className="text-primary hover:text-secondary transition-colors">
            &larr; Back to all products
          </Link>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-primary mb-6">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-2">
                  <RatingStars rating={review.rating} />
                  {review.title && <h3 className="ml-3 text-lg font-semibold text-gray-800">{review.title}</h3>}
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <div className="text-sm text-gray-500">
                  <span>By {review.authorName}</span>
                  <span className="mx-1">&bull;</span>
                  <span>{new Date(review.submittedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Be the first to review this product!</p>
        )}

        {/* Review Submission Form */}
        <div className="mt-8">
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-2 bg-secondary text-dark-text font-semibold rounded-md hover:bg-opacity-90 transition-colors"
          >
            {showReviewForm ? 'Cancel Review' : 'Write a Review'}
          </button>

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="mt-6 bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-primary mb-4">Submit Your Review</h3>
              
              {reviewFormMessage && (
                <div className={`p-3 mb-4 rounded text-sm ${reviewFormMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {reviewFormMessage.text}
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="reviewAuthorName" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input type="text" id="reviewAuthorName" value={reviewAuthorName} onChange={(e) => setReviewAuthorName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
              </div>

              <div className="mb-4">
                <label htmlFor="reviewAuthorEmail" className="block text-sm font-medium text-gray-700 mb-1">Your Email <span className="text-xs text-gray-500">(Not published)</span></label>
                <input type="email" id="reviewAuthorEmail" value={reviewAuthorEmail} onChange={(e) => setReviewAuthorEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setReviewRating(star)} className="focus:outline-none">
                      <StarIcon filled={star <= reviewRating} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700 mb-1">Review Title (Optional)</label>
                <input type="text" id="reviewTitle" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"/>
              </div>

              <div className="mb-6">
                <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                <textarea id="reviewComment" value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} rows={4} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
              </div>

              {/* hCaptcha widget */}
              <div className="mb-6">
                <div id="hcaptcha-container"></div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmittingReview}
                className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSubmittingReview ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 