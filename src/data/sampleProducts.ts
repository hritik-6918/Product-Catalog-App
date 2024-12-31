import { Product } from '../types/product';

// Sample product data with proper image URLs from Unsplash
export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 59.99,
    description: "High-quality wireless headphones with noise-canceling features.",
    image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Smartphone Stand",
    price: 12.99,
    description: "Adjustable smartphone stand suitable for all devices.",
    image_url: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80",
    stock: 150,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  // Add more products with actual Unsplash images...
];