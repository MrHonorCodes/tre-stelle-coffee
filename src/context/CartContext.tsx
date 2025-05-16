'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
// productsData import will be removed later as product details will be on CartItem
// import productsData from '../data/products.json'; 

// Import Sanity types needed for CartItem
import type { SanityDocument, Image as SanityImageType } from 'sanity'; // Removed PortableTextBlock

// Define the structure of a Sanity Product (can be shared from a types file)
// This helps in defining what product information is passed to addToCart
interface ProductForCart extends SanityDocument { // Or use your existing SanityProduct interface if imported
  _id: string;
  name: string;
  price: number;
  image?: SanityImageType; // Optional: for displaying image in cart
  // Add other fields you might need in the cart, like slug for linking back
  slug?: { current: string }; 
  stripePriceId?: string;
}

// --- Types --- 
// Updated CartItem to store more product details and use string ID
type CartItem = {
  productId: string; // Changed from id: number
  name: string;
  price: number;
  image?: SanityImageType; // To display in cart summary
  slug?: { current: string }; // For linking from cart
  quantity: number;
  options?: { [key: string]: string };
  stripePriceId?: string;
};

// Updated CartContextType to reflect new addToCart signature
type CartContextType = {
  cartItems: CartItem[];
  // addToCart now accepts a ProductForCart object
  addToCart: (product: ProductForCart, quantity: number, options?: { [key: string]: string }) => void;
  removeFromCart: (productId: string, options?: { [key: string]: string }) => void; 
  updateQuantity: (productId: string, quantity: number, options?: { [key: string]: string }) => void;
  getCartTotal: () => number;
  getItemCount: () => number;
  clearCart: () => void;
};

// --- Context Creation ---
const CartContext = createContext<CartContextType | undefined>(undefined);

// --- Helper Functions ---
// generateCartItemKey updated to use productId: string
const generateCartItemKey = (productId: string, options?: { [key: string]: string }): string => {
  let key = productId;
  if (options) {
    Object.keys(options).sort().forEach(optionKey => {
      key += `-${optionKey}:${options[optionKey]}`;
    });
  }
  return key;
};

// --- Provider Component ---
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length > 0 || localStorage.getItem('shoppingCart')) {
       localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // addToCart function updated
  const addToCart = (product: ProductForCart, quantity: number, options?: { [key: string]: string }) => {
    console.log('[CartContext addToCart] Called with:', { product, quantityPassed: quantity, options });
    setCartItems(prevItems => {
      console.log('[CartContext addToCart] prevItems:', prevItems, 'quantityPassed to updater:', quantity);
      const itemKey = generateCartItemKey(product._id, options);
      const existingItemIndex = prevItems.findIndex(item => generateCartItemKey(item.productId, item.options) === itemKey);

      if (existingItemIndex > -1) {
        // Item already exists, map to a new array
        return prevItems.map((item, index) => {
          if (index === existingItemIndex) {
            console.log(`[CartContext addToCart] Updating existing item. Prev qty: ${item.quantity}, Adding: ${quantity}`);
            return { ...item, quantity: item.quantity + quantity }; // Increment quantity
          }
          return item;
        });
      } else {
        // Item does not exist, add as new
        console.log(`[CartContext addToCart] Adding new item. Quantity: ${quantity}`);
        const newCartItem: CartItem = {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          slug: product.slug,
          quantity: quantity,
          options: options,
          stripePriceId: product.stripePriceId,
        };
        return [...prevItems, newCartItem];
      }
    });
  };

  // removeFromCart and updateQuantity will also need to use string productId
  // and their logic for finding items in the cart updated if itemKey generation changes.
  const removeFromCart = (productId: string, options?: { [key: string]: string }) => {
    setCartItems(prevItems => {
      const itemKey = generateCartItemKey(productId, options);
      return prevItems.filter(item => generateCartItemKey(item.productId, item.options) !== itemKey);
    });
  };

  const updateQuantity = (productId: string, quantity: number, options?: { [key: string]: string }) => {
    console.log('[CartContext updateQuantity] Called with:', { productId, newQuantity: quantity, options });
    setCartItems(prevItems => {
      const itemKey = generateCartItemKey(productId, options);
      console.log('[CartContext updateQuantity] prevItems:', prevItems, 'targetKey:', itemKey, 'newQuantity:', quantity);
      const updatedItems = prevItems.map(item => {
        if (generateCartItemKey(item.productId, item.options) === itemKey) {
          console.log('[CartContext updateQuantity] Updating item:', item, 'to quantity:', quantity);
          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      });
      console.log('[CartContext updateQuantity] updatedItems before filter:', updatedItems);
      return updatedItems.filter(item => item.quantity > 0);
    });
  };

  // getCartTotal updated to use price from CartItem
  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      // const product = productsData.find(p => p.id === item.productId); // No longer needed
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getItemCount = (): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };
  
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('shoppingCart');
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