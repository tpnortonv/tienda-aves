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
  
  const addToCart = async (productId, quantity) => {
    if (!user || !user.id || !user.token) {
      alert("⚠️ Debes iniciar sesión para agregar productos al carrito.");
      return;
    }
  
    try {
      console.log(`🛒 Agregando producto ${productId} al carrito del usuario ${user.id}`);
      await createOrUpdateCart(user.id, productId, quantity, user.token);
  
      console.log("🔄 Volviendo a cargar el carrito desde la API...");
      const updatedCart = await getCart(user.id, user.token); // 🔥 Forzar recarga
  
      if (updatedCart && updatedCart.products) {
        setCart([...updatedCart.products]); // 🔥 Asegurar actualización de React
        console.log("✅ Carrito actualizado correctamente: ", updatedCart.products);
      } else {
        console.warn("⚠️ `getCart()` no devolvió `products`. Verifica la API.");
      }
    } catch (error) {
      console.error("❌ Error al agregar producto al carrito:", error);
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

  try {
    console.log(`🗑️ Eliminando producto ${productId} del carrito del usuario ${user.id}`);
    const updatedCart = await removeProductFromCart(user.id, productId, user.token);

    console.log("🚀 Respuesta de `removeProductFromCart()`: ", updatedCart);

    if (updatedCart && updatedCart.cart && Array.isArray(updatedCart.cart.products)) {
      setCart([...updatedCart.cart.products]); // 🔥 Fuerza a React a detectar el cambio
    } else {
      console.warn("⚠️ No se encontró `cart.products` en la respuesta del backend.");
    }
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












































