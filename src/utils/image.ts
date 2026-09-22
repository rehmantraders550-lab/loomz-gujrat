/**
 * Local image paths used by the application.
 *
 * Images are served from public/images and can be replaced without changing
 * the React components. The URL fragments below are legacy data identifiers;
 * they are only used to keep existing catalog records compatible during the
 * migration away from the former external image provider.
 */
const LEGACY_IMAGE_IDS: Record<string, string> = {
  'photo-1507679799987-c73779587ccf': '/images/garment-01.svg',
  'photo-1552374196-1ab2a1c593e8': '/images/garment-02.svg',
  'photo-1490578474895-699bc4e2cf59': '/images/garment-03.svg',
  'photo-1516257984-b1b4d707412e': '/images/garment-04.svg',
  'photo-1607604276583-eef5d076aa5f': '/images/jamawar-primary.svg',
  'photo-1528459801416-a9e53bbf4e17': '/images/textile-macro.svg',
  'photo-1584917865442-de89df76afd3': '/images/khaddar-primary.svg',
  'photo-1579546929518-9e396f3cc809': '/images/khaddar-macro.svg',
  'photo-1509631179647-0177331693ae': '/images/boski-primary.svg',
  'photo-1558769132-cb1aea458c5e': '/images/cotton-blend-primary.svg',
};

/** Resolve an image record to a local, same-origin asset. */
export function resolveLocalImagePath(source: string): string {
  if (source.startsWith('/')) return source;

  const match = Object.entries(LEGACY_IMAGE_IDS).find(([id]) => source.includes(id));
  return match?.[1] || '/images/image-placeholder.svg';
}

/**
 * Retained as a compatibility export for any callers outside ResponsiveImage.
 * Local assets do not need generated format-specific URLs.
 */
export function buildOptimizedImageUrl(baseUrl: string): string {
  return resolveLocalImagePath(baseUrl);
}
