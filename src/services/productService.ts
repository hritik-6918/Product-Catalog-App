import { supabase } from '../lib/supabase';
import { Product } from '../types/product';
import { PaginationRange } from '../types/pagination';
import { sampleProducts } from '../data/sampleProducts';

export const productService = {
  async initializeSampleData() {
    const { data: existingProducts } = await supabase
      .from('products')
      .select('id')
      .limit(1);

    if (!existingProducts?.length) {
      await supabase.from('products').insert(sampleProducts);
    }
  },

  async getAllProducts(pagination?: PaginationRange) {
    let query = supabase
      .from('products')
      .select('*', { count: 'exact' });
    
    if (pagination) {
      query = query
        .range(pagination.start, pagination.end - 1)
        .order('created_at', { ascending: false });
    }
    
    const { data, error, count } = await query;
    
    if (error) throw error;
    return { data, total: count || 0 };
  },

  // ... rest of the service methods remain unchanged
}