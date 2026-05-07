import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ProductVariant = {
  id: string;
  product_id: string;
  name: string;
  unit: string;
  unit_value: number;
  variant_value: number;
  unit_price: number;
  price: number;
  old_price: number;
  stock: number;
  sku: string;
  is_default: boolean;
  is_active: boolean;
  sort_order: number;
};

export type MenuItem = {
  id: string;
  restaurant_id: string;
  category_id: string;
  name: string;
  alt_name: string;
  description: string;
  alt_description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  menu_categories: {name: string} | null;
  product_variants: ProductVariant[];
};

export type MenuCategory = {
  id: string;
  restaurant_id: string;
  name: string;
  img_url: string;
  alt_name: string;
  sort_order: number;
  description: string;
  is_active: boolean;
};
