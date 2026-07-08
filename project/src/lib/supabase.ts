import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          pet_type: 'dog' | 'cat' | 'both';
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          image_url?: string | null;
          pet_type: 'dog' | 'cat' | 'both';
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          image_url?: string | null;
          pet_type?: 'dog' | 'cat' | 'both';
          display_order?: number;
          created_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          price: number;
          compare_at_price: number | null;
          image_url: string;
          images: string[];
          category_id: string | null;
          pet_type: 'dog' | 'cat' | 'both';
          stock: number;
          sku: string | null;
          featured: boolean;
          best_seller: boolean;
          rating: number;
          reviews_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          short_description?: string | null;
          price: number;
          compare_at_price?: number | null;
          image_url: string;
          images?: string[];
          category_id?: string | null;
          pet_type: 'dog' | 'cat' | 'both';
          stock?: number;
          sku?: string | null;
          featured?: boolean;
          best_seller?: boolean;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          short_description?: string | null;
          price?: number;
          compare_at_price?: number | null;
          image_url?: string;
          images?: string[];
          category_id?: string | null;
          pet_type?: 'dog' | 'cat' | 'both';
          stock?: number;
          sku?: string | null;
          featured?: boolean;
          best_seller?: boolean;
          rating?: number;
          reviews_count?: number;
          created_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          product_id: string;
          author_name: string;
          rating: number;
          title: string | null;
          content: string | null;
          verified_purchase: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          author_name: string;
          rating: number;
          title?: string | null;
          content?: string | null;
          verified_purchase?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          product_id?: string;
          author_name?: string;
          rating?: number;
          title?: string | null;
          content?: string | null;
          verified_purchase?: boolean;
          created_at?: string;
        };
      };
      cart_items: {
        Row: {
          id: string;
          session_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          session_id: string;
          product_id: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          session_id?: string;
          product_id?: string;
          quantity?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          session_id: string;
          email: string;
          first_name: string;
          last_name: string;
          address: string;
          apartment: string | null;
          city: string;
          state: string;
          zip_code: string;
          phone: string | null;
          subtotal: number;
          shipping: number;
          total: number;
          status: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_number: string;
          session_id: string;
          email: string;
          first_name: string;
          last_name: string;
          address: string;
          apartment?: string | null;
          city: string;
          state: string;
          zip_code: string;
          phone?: string | null;
          subtotal: number;
          shipping?: number;
          total: number;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_number?: string;
          session_id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          address?: string;
          apartment?: string | null;
          city?: string;
          state?: string;
          zip_code?: string;
          phone?: string | null;
          subtotal?: number;
          shipping?: number;
          total?: number;
          status?: string;
          notes?: string | null;
          created_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string | null;
          product_name: string;
          product_image: string | null;
          price: number;
          quantity: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id?: string | null;
          product_name: string;
          product_image?: string | null;
          price: number;
          quantity: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string | null;
          product_name?: string;
          product_image?: string | null;
          price?: number;
          quantity?: number;
          created_at?: string;
        };
      };
    };
  };
};

export type Category = Database['public']['Tables']['categories']['Row'];
export type Product = Database['public']['Tables']['products']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type CartItem = Database['public']['Tables']['cart_items']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
