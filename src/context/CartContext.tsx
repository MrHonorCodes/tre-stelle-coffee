'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import productsData from '../data/products.json'; // To get product details like price

// --- Types ---
type CartItem = {
  id: number; // Product ID
  quantity: number;
  options?: { [key: string]: string }; // e.g., { Size: 'M' }
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (id: number, quantity: number, options?: { [key: string]: string }) => void;
  removeFromCart: (id: number, options?: { [key: string]: string }) => void; // Need options to identify specific variants
  updateQuantity: (id: number, quantity: number, options?: { [key: string]: string }) => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
};

// --- Context Creation ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Helper Functions ---
// Helper to generate a unique key for a cart item including options
const generateCartItemKey = (id: number, options?: { [key: string]: string }): string => {
  let key = String(id);
  if (options) {
    // Sort option keys for consistent key generation
    Object.keys(options).sort().forEach(optionKey => {
      key += `-${optionKey}:${options[optionKey]}`;
    });
  }
  return key;
};

// --- Provider Component ---
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Optional: Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Optional: Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('shoppingCart')) { // Avoid saving empty initial cart unless clearing
       localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (id: number, quantity: number, options?: { [key: string]: string }) => {
    setCartItems(prevItems => {
      const itemKey = generateCartItemKey(id, options);
      // Check if item with the exact same options already exists
      const existingItemIndex = prevItems.findIndex(item => generateCartItemKey(item.id, item.options) === itemKey);

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        // TODO: Add check against available stock here if needed
        return updatedItems;
      } else {
        // Add new item to cart
        return [...prevItems, { id, quantity, options }];
      }
    });
  };

  const removeFromCart = (id: number, options?: { [key: string]: string }) => {
    setCartItems(prevItems => {
      const itemKey = generateCartItemKey(id, options);
      return prevItems.filter(item => generateCartItemKey(item.id, item.options) !== itemKey);
    });
  };

  const updateQuantity = (id: number, quantity: number, options?: { [key: string]: string }) => {
    setCartItems(prevItems => {
      const itemKey = generateCartItemKey(id, options);
      const updatedItems = prevItems.map(item => {
        if (generateCartItemKey(item.id, item.options) === itemKey) {
          // TODO: Add check against available stock here if needed
          return { ...item, quantity: Math.max(0, quantity) }; // Ensure quantity doesn't go below 0
        }
        return item;
      });
      // Filter out items with quantity 0
      return updatedItems.filter(item => item.quantity > 0);
    });
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const product = productsData.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const getItemCount = (): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('shoppingCart'); // Clear storage too
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getCartTotal, getItemCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// --- Custom Hook --- 
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 