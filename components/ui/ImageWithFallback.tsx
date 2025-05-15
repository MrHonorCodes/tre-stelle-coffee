'use client';

import { useState, useEffect } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  alt: string; // Ensure alt is always provided
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    setCurrentSrc(src); // Reset src if the prop changes
    setErrorOccurred(false); // Reset error state if src prop changes
  }, [src]);

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!errorOccurred) { // Prevent infinite loop if fallback also fails
      setErrorOccurred(true);
      const placeholder = fallbackSrc || `https://via.placeholder.com/200x100?text=${encodeURIComponent(alt || 'Image')}`;
      setCurrentSrc(placeholder);
    }
    // Call original onError if provided
    if (onError) {
      onError(event);
    }
  };

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={currentSrc} alt={alt} onError={handleError} {...props} />;
} 