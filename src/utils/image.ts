/**
 * Image optimization utility for generating responsive srcSet strings
 * with next-generation format negotiation (AVIF and WebP) and viewport-calibrated widths.
 * Preserves optimized fallback URLs while providing responsive descriptors.
 */

export interface ImageTransformOptions {
  width: number;
  format?: 'avif' | 'webp' | 'jpg';
  quality?: number;
}

/**
 * Builds an optimized image URL with custom dimension, format, and compression parameters.
 * Supports Unsplash CDN URL architecture and falls back gracefully for other image providers.
 * Preserves pre-existing optimization parameters (like auto=format, fit=crop) when format is not overridden.
 */
export function buildOptimizedImageUrl(
  baseUrl: string,
  { width, format, quality = 80 }: ImageTransformOptions
): string {
  try {
    const parsed = new URL(baseUrl);

    // Check if URL is from Unsplash CDN
    if (parsed.hostname.includes('unsplash.com')) {
      parsed.searchParams.set('w', width.toString());
      if (!parsed.searchParams.has('fit')) {
        parsed.searchParams.set('fit', 'crop');
      }
      if (quality) {
        parsed.searchParams.set('q', quality.toString());
      }

      if (format) {
        parsed.searchParams.set('fm', format);
        parsed.searchParams.delete('auto');
      } else if (!parsed.searchParams.has('auto')) {
        parsed.searchParams.set('auto', 'format');
      }

      return parsed.toString();
    }

    // Generic URL with query parameters support
    parsed.searchParams.set('w', width.toString());
    if (format) parsed.searchParams.set('format', format);
    parsed.searchParams.set('q', quality.toString());
    return parsed.toString();
  } catch {
    // If not an absolute URL, append query parameters directly
    const separator = baseUrl.includes('?') ? '&' : '?';
    const fmt = format ? `&fm=${format}` : '&auto=format';
    return `${baseUrl}${separator}w=${width}&q=${quality}${fmt}`;
  }
}

/**
 * Generates a standard HTML srcSet string for a specific image format and width array.
 * Example output: "url?w=480&fm=avif 480w, url?w=800&fm=avif 800w, ..."
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[],
  format?: 'avif' | 'webp' | 'jpg',
  quality = 80
): string {
  return widths
    .map((width) => `${buildOptimizedImageUrl(baseUrl, { width, format, quality })} ${width}w`)
    .join(', ');
}

export interface ResponsiveImageSet {
  avifSrcSet: string;
  webpSrcSet: string;
  fallbackSrcSet: string;
  fallbackSrc: string;
}

/**
 * Creates a complete suite of responsive srcSet descriptors across AVIF, WebP, and standard fallback.
 * Preserves the optimized fallback URL on the <img> fallback element.
 */
export function getResponsiveImageSet(
  baseUrl: string,
  widths: number[] = [360, 480, 640, 800, 1080, 1280, 1600],
  quality = 82,
  customFallbackSrc?: string
): ResponsiveImageSet {
  // Preserve the caller-supplied or original optimized fallback URL
  const preservedFallbackSrc =
    customFallbackSrc ||
    baseUrl ||
    buildOptimizedImageUrl(baseUrl, { width: widths[Math.min(3, widths.length - 1)] || 800, quality });

  return {
    avifSrcSet: generateSrcSet(baseUrl, widths, 'avif', quality),
    webpSrcSet: generateSrcSet(baseUrl, widths, 'webp', quality),
    // Fallback srcSet preserves the optimized format pipeline (auto=format)
    fallbackSrcSet: generateSrcSet(baseUrl, widths, undefined, quality),
    fallbackSrc: preservedFallbackSrc,
  };
}
