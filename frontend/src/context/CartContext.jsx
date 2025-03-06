import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, removeFromCart } from "../services/cartServiceF";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user?._id) {
        setCart([]);
        return;
      }

      try {
        const userCart = await getCart(user._id);
        setCart(userCart.cart.products || []);
      } catch (error) {
        console.error("❌ Error al obtener el carrito:", error.message);
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  const handleAddToCart = async (productId, quantity = 1) => {
    if (!user?._id) return console.error("❌ Usuario no autenticado.");

    try {
      const updatedCart = await addToCart(user._id, productId, quantity);
      setCart(updatedCart.cart.products);
    } catch (error) {
      console.error("❌ Error al agregar al carrito:", error.message);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    if (!user?._id) return;

    try {
      const updatedCart = await removeFromCart(user._id, productId);
      setCart(updatedCart.cart.products);
    } catch (error) {
      console.error("❌ Error al eliminar del carrito:", error.message);
    }
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);















