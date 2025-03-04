import { createContext, useState, useEffect } from 'react';
import { getCart, createOrUpdateCart, removeProductFromCart } from '../services/cartServiceF';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        try {
          const data = await getCart(user.id);
          setCart(data.cart.products);
        } catch (error) {
          console.error('Error al obtener el carrito:', error);
        }
      }
    };

    fetchCart();
  }, []);

  const addToCart = async (productId, quantity) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      const data = await createOrUpdateCart(user.id, productId, quantity);
      setCart(data.cart.products);
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
    }
  };

  const removeFromCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    try {
      const data = await removeProductFromCart(user.id, productId);
      setCart(data.cart.products);
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
