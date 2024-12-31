// Default product image from Unsplash
const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';

/**
 * Validates if a URL is a valid image URL
 */
export const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png)$/i) !== null || url.includes('unsplash.com');
};

/**
 * Returns a valid image URL or falls back to default
 */
export const getValidImageUrl = (url?: string): string => {
  if (url && isValidImageUrl(url)) {
    return url;
  }
  return DEFAULT_PRODUCT_IMAGE;
};