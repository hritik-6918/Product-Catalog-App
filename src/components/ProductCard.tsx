import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { getValidImageUrl } from '../utils/imageUtils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="aspect-w-16 aspect-h-9 relative">
          <img
            src={getValidImageUrl(product.image_url)}
            alt={product.name}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = getValidImageUrl();
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {product.description.length > 100
              ? `${product.description.substring(0, 100)}...`
              : product.description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              ${product.price.toFixed(2)}
            </span>
            <span className={`text-sm ${
              product.stock > 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}