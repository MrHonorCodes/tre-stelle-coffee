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
  images?: SanityImageType[]; // Changed from image?: SanityImageType
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
  images?: SanityImageType[]; // Changed from image?: SanityImageType
  slug?: { current: string }; // For linking from cart
  quantity: number;
  options?: { [key: string]: string };
  stripePriceId?: string;
};

// Updated CartContextType to reflect new addToCart signature
type CartContextType = {
  cartItems: CartItem[];
  // addToCart now accepts a ProductForCart object
  addToCart: (product: ProductForCart, quantity: number, options?: { [key: string]: string }) => { success: boolean; quantityAdded: number; finalQuantity: number; message?: string };
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

const MAX_QUANTITY_PER_ORDER = 5; // Define here or import from shared constants
const MAX_TOTAL_ITEMS_IN_CART = 50; // Example value, adjust as needed

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
  const addToCart = (product: ProductForCart, quantityToAdd: number = 1, selectedOptions?: { [key: string]: string }): { success: boolean; message: string; quantityAdded: number; finalQuantity: number } => {
    let resultState = {
      success: false,
      message: "Item could not be added to cart.",
      quantityAdded: 0,
      finalQuantity: 0
    };

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.productId === product._id && JSON.stringify(item.options) === JSON.stringify(selectedOptions || {}));
      const newItems = [...prevItems];

      if (existingItemIndex !== -1) {
        const existingItem = newItems[existingItemIndex];
        const newQuantity = Math.min(existingItem.quantity + quantityToAdd, MAX_QUANTITY_PER_ORDER);
        const quantityChange = newQuantity - existingItem.quantity;
        
        if (quantityChange >= 0) { // If quantity can be increased or stays the same (at max)
          newItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
            images: product.images || existingItem.images // Preserve or update images
          };
          resultState = {
            success: true,
            message: quantityChange < quantityToAdd && quantityToAdd > 0 ?
              `Only ${quantityChange} more ${product.name}(s) could be added (max ${MAX_QUANTITY_PER_ORDER} per item). Total: ${newQuantity}` :
              `${product.name} quantity updated to ${newQuantity}.`,
            quantityAdded: quantityChange,
            finalQuantity: newQuantity
          };
        } else {
           // This case should ideally not be hit if quantityToAdd is positive due to Math.min
           resultState = {
            success: false,
            message: `Could not update ${product.name} quantity.`,
            quantityAdded: 0,
            finalQuantity: existingItem.quantity
          };
        }
      } else { // Adding a new item
        const currentTotalQuantityInCart = newItems.reduce((sum, item) => sum + item.quantity, 0);
        if (currentTotalQuantityInCart + quantityToAdd <= MAX_TOTAL_ITEMS_IN_CART) {
          const quantityForNewItem = Math.min(quantityToAdd, MAX_QUANTITY_PER_ORDER);
          
          newItems.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            images: product.images, // Store the images array
            slug: product.slug,
            quantity: quantityForNewItem,
            options: selectedOptions || {},
            stripePriceId: product.stripePriceId,
          });
          resultState = {
            success: true,
            message: `${quantityForNewItem} ${product.name}(s) added to cart.` + 
                     (quantityForNewItem < quantityToAdd ? ` Max ${MAX_QUANTITY_PER_ORDER} per item.` : ''),
            quantityAdded: quantityForNewItem,
            finalQuantity: quantityForNewItem
          };
        } else {
          resultState = {
            success: false,
            message: `Cannot add ${product.name}. Adding ${quantityToAdd} items would exceed max ${MAX_TOTAL_ITEMS_IN_CART} items in cart.`,
            quantityAdded: 0,
            finalQuantity: 0 // Or current quantity of this item if it were somehow findable, but it's a new item scenario
          };
        }
      }
      
      // The updater must return the new state array.
      // The side effect (updating resultState) is okay here because it's used by the calling component.
      return newItems; 
    });

    // This return provides immediate feedback to the calling component (e.g., ProductDisplayClient).
    // Note: `resultState` is determined *synchronously* within the `setCartItems` planning phase,
    // but the actual `cartItems` state update is asynchronous. This is a common pattern for immediate UI feedback.
    return resultState;
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