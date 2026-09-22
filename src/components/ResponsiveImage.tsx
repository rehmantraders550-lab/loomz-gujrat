import { useState } from 'react';
import { resolveLocalImagePath } from '../utils/image';

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
 * Renders images from the local public/images directory.
 *
 * The legacy srcSet/CDN generation was intentionally removed so image delivery
 * is controlled entirely by the application owner. Add or replace the files
 * documented in public/images/README.md without changing component code.
 */
export function ResponsiveImage({
  src,
  fallbackSrc: customFallbackSrc,
  alt,
  className = 'w-full h-full object-cover',
  containerClassName = 'w-full h-full block',
  priority = false,
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageSrc = resolveLocalImagePath(customFallbackSrc || src);

  return (
    <picture className={containerClassName}>
      <img
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        }`}
      />
    </picture>
  );
}
