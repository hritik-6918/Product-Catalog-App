import React, { useState } from 'react';
import { Product } from '../types/product';
import { supabase } from '../lib/supabase';
import { FormInput } from './FormInput';
import { ProductFormData } from '../types/form';
import { validateRequired, validatePrice, validateStock, validateImageUrl } from '../utils/validation';

interface ProductFormProps {
  product?: Product;
  onSubmit: () => void;
}

export function ProductForm({ product, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: {
      value: product?.name || '',
      touched: false
    },
    description: {
      value: product?.description || '',
      touched: false
    },
    price: {
      value: product?.price?.toString() || '',
      touched: false
    },
    image_url: {
      value: product?.image_url || '',
      touched: false
    },
    stock: {
      value: product?.stock?.toString() || '',
      touched: false
    }
  });

  const validateField = (name: keyof ProductFormData, value: string) => {
    let error;
    switch (name) {
      case 'name':
        error = validateRequired(value, 'Name');
        break;
      case 'price':
        error = validatePrice(value);
        break;
      case 'stock':
        error = validateStock(value);
        break;
      case 'image_url':
        error = validateImageUrl(value);
        break;
    }
    return error;
  };

  const updateField = (name: keyof ProductFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validateField(name, value)
      }
    }));
  };

  const handleBlur = (name: keyof ProductFormData) => {
    setFormData(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validateField(name, prev[name].value)
      }
    }));
  };

  const isValid = () => {
    const newFormData = { ...formData };
    let isValid = true;

    (Object.keys(formData) as Array<keyof ProductFormData>).forEach(key => {
      const error = validateField(key, formData[key].value);
      if (error?.type === 'error') {
        isValid = false;
      }
      newFormData[key] = {
        ...newFormData[key],
        touched: true,
        error
      };
    });

    setFormData(newFormData);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValid()) {
      return;
    }

    const productData = {
      name: formData.name.value,
      description: formData.description.value,
      price: parseFloat(formData.price.value) || 0,
      image_url: formData.image_url.value,
      stock: parseInt(formData.stock.value) || 0,
    };
    
    try {
      if (product?.id) {
        await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
      } else {
        await supabase
          .from('products')
          .insert([productData]);
      }
      onSubmit();
    } catch (error) {
      console.error('Error saving product:', error);
      // Handle error appropriately
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <FormInput
        label="Name"
        type="text"
        field={formData.name}
        onChange={(value) => updateField('name', value)}
        onBlur={() => handleBlur('name')}
      />
      
      <FormInput
        label="Description"
        type="textarea"
        field={formData.description}
        onChange={(value) => updateField('description', value)}
        onBlur={() => handleBlur('description')}
        rows={3}
      />
      
      <FormInput
        label="Price"
        type="number"
        field={formData.price}
        onChange={(value) => updateField('price', value)}
        onBlur={() => handleBlur('price')}
        min="0"
        step="0.01"
      />
      
      <FormInput
        label="Image URL"
        type="url"
        field={formData.image_url}
        onChange={(value) => updateField('image_url', value)}
        onBlur={() => handleBlur('image_url')}
      />
      
      <FormInput
        label="Stock"
        type="number"
        field={formData.stock}
        onChange={(value) => updateField('stock', value)}
        onBlur={() => handleBlur('stock')}
        min="0"
      />
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {product ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
}