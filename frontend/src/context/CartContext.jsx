import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'ecommerce_cart';

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (err) {
      console.error('Error loading cart from localStorage:', err);
      return [];
    }
  });

  // Sync to localStorage whenever cart state updates
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart to localStorage:', err);
    }
  }, [cart]);

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, parseInt(quantity) || 1);
    const productId = product.id || product._id;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => (item.id || item._id) === productId
      );

      if (existingIndex > -1) {
        // Update existing item
        const updatedCart = [...prevCart];
        const currentItem = updatedCart[existingIndex];
        const newQty = currentItem.quantity + qty;
        const maxStock = product.stock !== undefined ? product.stock : 999;
        
        updatedCart[existingIndex] = {
          ...currentItem,
          quantity: Math.min(newQty, maxStock)
        };
        return updatedCart;
      } else {
        // Add new item
        return [
          ...prevCart,
          {
            id: productId,
            name: product.name,
            brand: product.brand,
            category: product.category,
            image: product.image,
            price: Number(product.price),
            originalPrice: Number(product.originalPrice || product.price),
            stock: product.stock !== undefined ? Number(product.stock) : 50,
            quantity: qty
          }
        ];
      }
    });
  };

  // Remove single product from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => (item.id || item._id) !== productId)
    );
  };

  // Update specific product quantity
  const updateQuantity = (productId, newQuantity) => {
    const qty = parseInt(newQuantity);
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if ((item.id || item._id) === productId) {
          const maxStock = item.stock || 999;
          return {
            ...item,
            quantity: Math.min(qty, maxStock)
          };
        }
        return item;
      })
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Aggregated totals
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
