import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItemsCount = Object.keys(localStorage).filter((item) =>
      item.startsWith('cart-')
    )?.length;
    setCartCount(cartItemsCount);
  }, []);

  const updateCartItemsCount = () => {
    const cartItemsCount = Object.keys(localStorage).filter((item) =>
      item.startsWith('cart-')
    )?.length;

    setCartCount(cartItemsCount);
  };

  const getCart = () => {
    const cart = Object.keys(localStorage)
      .filter((item) => item.startsWith('cart-'))
      .map((cartElm) => {
        const val = JSON.parse(localStorage.getItem(cartElm));
        val['garmentId'] = cartElm.slice(5);
        return val;
      });

    return cart;
  };

  return (
    <CartContext.Provider value={{ updateCartItemsCount, cartCount, getCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
