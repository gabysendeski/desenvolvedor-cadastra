import { useState } from 'react';
import { CartItem, Product } from '../types';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product, selectedSize: string) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        item => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { product, quantity: 1, selectedSize }];
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(
      item => !(item.product.id === productId && item.selectedSize === size)
    ));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPrice,
    clearCart
  };
};