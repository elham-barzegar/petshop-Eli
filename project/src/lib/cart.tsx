import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from './supabase';
import type { Product, CartItem } from './supabase';

interface CartContextType {
  items: (CartItem & { product: Product })[];
  loading: boolean;
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  sessionId: string;
}

const CartContext = createContext<CartContextType | null>(null);

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('pet_shop_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('pet_shop_session_id', sessionId);
  }
  return sessionId;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<(CartItem & { product: Product })[]>([]);
  const [loading, setLoading] = useState(true);
  const sessionId = getSessionId();

  const fetchCart = useCallback(async () => {
    try {
      const { data: cartItems, error: cartError } = await supabase
        .from('cart_items')
        .select('*')
        .eq('session_id', sessionId);

      if (cartError) throw cartError;

      if (!cartItems || cartItems.length === 0) {
        setItems([]);
        return;
      }

      const productIds = cartItems.map((item) => item.product_id);
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')
        .in('id', productIds);

      if (productsError) throw productsError;

      const productsMap = new Map(products?.map((p) => [p.id, p]));
      const itemsWithProducts = cartItems
        .filter((item) => productsMap.has(item.product_id))
        .map((item) => ({
          ...item,
          product: productsMap.get(item.product_id)!,
        }));

      setItems(itemsWithProducts);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchCart().finally(() => setLoading(false));
  }, [fetchCart]);

  const addToCart = async (product: Product, quantity = 1) => {
    try {
      const { error } = await supabase.from('cart_items').upsert(
        {
          session_id: sessionId,
          product_id: product.id,
          quantity,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'session_id,product_id' }
      );
      if (error) throw error;
      await fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity, updated_at: new Date().toISOString() })
        .eq('session_id', sessionId)
        .eq('product_id', productId);
      if (error) throw error;
      await fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId);
      if (error) throw error;
      await fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const { error } = await supabase.from('cart_items').delete().eq('session_id', sessionId);
      if (error) throw error;
      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        loading,
        totalItems,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        sessionId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
