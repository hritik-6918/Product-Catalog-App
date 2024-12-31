import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import { Product } from '../types/product';
import { ProductForm } from '../components/ProductForm';
import { supabase } from '../lib/supabase';
import { getValidImageUrl } from '../utils/imageUtils';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    if (!id) return;
    
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (data) {
      setProduct(data);
    }
  };

  const handleDelete = async () => {
    if (!product?.id) return;
    
    if (window.confirm('Are you sure you want to delete this product?')) {
      await supabase
        .from('products')
        .delete()
        .eq('id', product.id);
      
      navigate('/');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
        <ProductForm
          product={product}
          onSubmit={() => {
            setIsEditing(false);
            loadProduct();
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={getValidImageUrl(product.image_url)}
              alt={product.name}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = getValidImageUrl();
              }}
            />
          </div>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:text-blue-800"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            
            <p className="mt-4 text-gray-600">{product.description}</p>
            
            <div className="mt-6">
              <div className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </div>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}