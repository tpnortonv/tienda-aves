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
  
        // 🔥 Muestra la estructura de la respuesta del carrito
        console.log("🚀 Respuesta de `getCart()`: ", cartData);
  
        if (cartData && cartData.products) {
          setCart(cartData.products);
        } else {
          console.warn("⚠️ La respuesta de `getCart()` no contiene `products`. Verifica la API.");
          setCart([]); // No borres los datos si hay un error
        }
      } catch (error) {
        console.error("❌ Error al obtener el carrito:", error);
        setCart([]); // Asegurar que no quede en un estado incorrecto
      }
    };
  
    fetchCart();
  }, [user]);
  
  const addToCart = async (productId, newQuantity) => {
    if (!user || !user.id || !user.token) {
      alert("⚠️ Debes iniciar sesión para modificar el carrito.");
      return;
    }
  
    try {
      console.log(`🛒 Actualizando cantidad de producto ${productId} en el carrito de ${user.id}`);
      await createOrUpdateCart(user.id, productId, newQuantity, user.token);
  
      console.log("🔄 Volviendo a cargar el carrito desde la API...");
      const updatedCart = await getCart(user.id, user.token); // 🔥 Recargar datos
  
      if (updatedCart && updatedCart.products) {
        setCart([...updatedCart.products]); // 🔥 Asegurar actualización de React
      } else {
        console.warn("⚠️ `getCart()` no devolvió `products`. Verifica la API.");
      }
    } catch (error) {
      console.error("❌ Error al actualizar producto en el carrito:", error);
    }
  };  

  const removeFromCart = async (productId) => {
    if (!user || !user.id || !user.token) {
      alert("⚠️ Debes iniciar sesión para modificar el carrito.");
      return;
    }
  
    if (!productId) {
      console.error("❌ Error: `productId` es undefined al intentar eliminar del carrito.");
      return;
    }
  
    // 🔹 Actualizamos localmente el estado del carrito antes de llamar la API
    const updatedCart = cart.filter((item) => item.productId._id !== productId);
    setCart([...updatedCart]); 
  
    try {
      console.log(`🗑️ Eliminando producto ${productId} del carrito del usuario ${user.id}`);
      const response = await removeProductFromCart(user.id, productId, user.token);
  
      if (response && response.cart && Array.isArray(response.cart.products)) {
        setCart([...response.cart.products]); // 🔥 Refrescamos con la respuesta real
      } else {
        console.warn("⚠️ No se encontró `cart.products` en la respuesta del backend.");
        setCart(updatedCart); // Si la API falla, mantenemos el estado local
      }
    } catch (error) {
      console.error("❌ Error al eliminar producto del carrito:", error);
      setCart(updatedCart); 
    }
  };  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};












































