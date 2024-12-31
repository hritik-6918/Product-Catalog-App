export interface FormError {
  message: string;
  type: 'error' | 'warning';
}

export interface FormField {
  value: string;
  error?: FormError;
  touched: boolean;
}

export interface ProductFormData {
  name: FormField;
  description: FormField;
  price: FormField;
  image_url: FormField;
  stock: FormField;
}