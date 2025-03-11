import React, { createContext, useState, useEffect, useContext } from "react";
import { getCart, createOrUpdateCart, removeProductFromCart } from "../services/cartServiceF";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !user.id || !user.token) {
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const cartData = await getCart(user.id, user.token);
        console.log("🛒 Carrito recibido desde la API:", cartData);
    
        if (cartData && cartData.products) {
          console.log("📌 Cantidades de productos en el backend:", cartData.products.map(p => ({
            id: p.productId._id,
            cantidad: p.quantity
          })));
    
          setCart(cartData.products);
          localStorage.setItem("cart", JSON.stringify(cartData.products));
        } else {
          console.warn("⚠️ El backend no devolvió un carrito válido.");
          setCart([]);
        }
      } catch (error) {
        console.error("❌ Error al obtener el carrito:", error);
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  // 🔹 Agregar o actualizar cantidad de un producto en el carrito (Corrección)
  const addToCart = async (productId, newQuantity) => {
    if (!user || !user.id || !user.token) return;
    if (isNaN(newQuantity) || newQuantity < 1) return;

    console.log(`📤 Enviando actualización al backend: Producto ${productId}, Nueva cantidad: ${newQuantity}`);

    try {
      const response = await createOrUpdateCart(user.id, productId, newQuantity, user.token);
      console.log("🔄 Respuesta del backend en `createOrUpdateCart`:", response);

      // 🔄 Obtener carrito actualizado desde el backend
      const updatedCart = await getCart(user.id, user.token);
      console.log("✅ Carrito actualizado desde el backend:", updatedCart.products);

      if (updatedCart && updatedCart.products) {
        setCart([...updatedCart.products]); // 🔥 Evitar mutaciones extrañas
        localStorage.setItem("cart", JSON.stringify(updatedCart.products));
      } else {
        console.warn("⚠️ El backend no devolvió un carrito válido.");
      }
    } catch (error) {
      console.error("❌ Error en addToCart():", error);
    }
  };

  // 🔹 Eliminar un producto del carrito
  const removeFromCart = async (productId) => {
    if (!user || !user.id || !user.token) return;

    try {
      console.log(`🗑 Eliminando producto ${productId} del carrito`);
      await removeProductFromCart(user.id, productId, user.token);

      // 🔄 Obtener carrito actualizado desde el backend
      const updatedCart = await getCart(user.id, user.token);
      console.log("✅ Carrito después de eliminar producto:", updatedCart.products);

      if (updatedCart && updatedCart.products) {
        setCart([...updatedCart.products]); // 🔥 Evitar mutaciones incorrectas
        localStorage.setItem("cart", JSON.stringify(updatedCart.products));
      }
    } catch (error) {
      console.error("❌ Error en removeFromCart():", error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};














































