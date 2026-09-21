import { useState, useMemo } from 'react';
import { getResponsiveImageSet } from '../utils/image';

export interface ResponsiveImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  widths?: number[];
  quality?: number;
  priority?: boolean;
}

/**
 * ResponsiveImage - High-performance editorial image component with AVIF/WebP negotiation
 * 
 * Implements HTML5 <picture> element containing:
 * 1. <source type="image/avif"> for cutting-edge next-gen compression
 * 2. <source type="image/webp"> for wide modern browser support
 * 3. <img srcSet> fallback for standard image delivery, preserving optimized fallback URLs
 * 
 * Configured with responsive `sizes` attribute and asynchronous decoding for 60fps scrolling.
 */
export function ResponsiveImage({
  src,
  fallbackSrc: customFallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full block',
  sizes = '(max-width: 640px) 94vw, (max-width: 1024px) 48vw, (max-width: 1440px) 32vw, 380px',
  widths = [360, 480, 640, 800, 1080, 1280, 1600],
  quality = 82,
  priority = false,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const { avifSrcSet, webpSrcSet, fallbackSrcSet, fallbackSrc } = useMemo(
    () => getResponsiveImageSet(src, widths, quality, customFallbackSrc),
    [src, widths, quality, customFallbackSrc]
  );

  return (
    <picture className={containerClassName}>
      {/* 1. Next-Generation AVIF Image Stream (Superior compression efficiency) */}
      <source
        type="image/avif"
        srcSet={avifSrcSet}
        sizes={sizes}
      />

      {/* 2. WebP Image Stream (Ubiquitous high-efficiency modern format) */}
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={sizes}
      />

      {/* 3. Progressive Fallback Image with responsive srcSet & decoding */}
      <img
        src={fallbackSrc}
        srcSet={fallbackSrcSet}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        }`}
      />
    </picture>
  );
}
