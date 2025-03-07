import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart, createOrUpdateCart, removeProductFromCart } from "../services/cartServiceF";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === undefined) {
      console.warn("⏳ Esperando a que `AuthContext` cargue el usuario...");
      return;
    }

    if (!user || !user.id || !user.token) {
      console.warn("⚠️ No se encontró un usuario autenticado en `CartContext`. Inicializando carrito vacío.");
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        console.log(`📥 Obteniendo carrito para el usuario: ${user.id}`);
        const cartData = await getCart(user.id, user.token);
        // Verificar qué contiene la respuesta de cartData
        console.log("🚀 Datos del carrito obtenidos:", cartData);
        setCart(cartData.products || []);
      } catch (error) {
        console.error("❌ Error al obtener el carrito:", error);
        setCart([]); // Asegurarse de vaciar el carrito en caso de error
      }
    };

    fetchCart();
  }, [user]);

  const addToCart = async (productId, quantity) => {
    if (!user || !user.id || !user.token) {
      alert("⚠️ Debes iniciar sesión para agregar productos al carrito.");
      return;
    }

    try {
      console.log(`🛒 Agregando producto ${productId} al carrito del usuario ${user.id}`);
      const updatedCart = await createOrUpdateCart(user.id, productId, quantity, user.token);
      // Verifica que updatedCart tenga los productos
      console.log("🚀 Carrito actualizado:", updatedCart);
      setCart(updatedCart.products || []); // Asegúrate de que `updatedCart` tenga la propiedad `products`
    } catch (error) {
      console.error("❌ Error al agregar producto al carrito:", error);
    }
  };

  const removeFromCart = async (userId, productId) => {
    try {
      console.log(`🛒 Eliminando producto ${productId} del carrito del usuario ${userId}`);
      const updatedCart = await removeProductFromCart(userId, productId, user.token);
      console.log("🚀 Carrito actualizado tras eliminar producto:", updatedCart);
      setCart(updatedCart.products || []);
    } catch (error) {
      console.error("❌ Error al eliminar producto del carrito:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};












































