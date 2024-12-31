import { FormError } from '../types/form';

export const validateRequired = (value: string, fieldName: string): FormError | undefined => {
  if (!value.trim()) {
    return {
      type: 'error',
      message: `${fieldName} is required`
    };
  }
};

export const validatePrice = (value: string): FormError | undefined => {
  if (isNaN(Number(value)) || Number(value) < 0) {
    return {
      type: 'error',
      message: 'Price must be a valid positive number'
    };
  }
};

export const validateStock = (value: string): FormError | undefined => {
  if (!Number.isInteger(Number(value)) || Number(value) < 0) {
    return {
      type: 'error',
      message: 'Stock must be a valid non-negative integer'
    };
  }
};

export const validateImageUrl = (value: string): FormError | undefined => {
  if (value && !value.match(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i)) {
    return {
      type: 'warning',
      message: 'URL should point to an image file'
    };
  }
};