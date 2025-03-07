import api from "./apiF";

export const getCart = async (userId, token) => {
  try {
    const response = await api.get(`/cart/${userId}`, {
      headers: { "x-auth-token": token }
    });

    console.log("🚀 Datos recibidos en `getCart()`:", response.data); // 🔥 Verifica la respuesta

    if (response.data && response.data.cart && Array.isArray(response.data.cart.products)) {
      return response.data.cart; // 🔥 Solo devolvemos el `cart` con `products`
    } else {
      console.warn("⚠️ `getCart()` no devolvió un carrito válido.");
      return { products: [] }; // Evita `undefined`
    }
  } catch (error) {
    console.error("❌ Error en `getCart()`:", error);
    return { products: [] }; // Asegurar que al menos devuelva un array vacío
  }
};


// Agregar o actualizar un producto en el carrito
export const createOrUpdateCart = async (userId, productId, quantity, token) => {
  try {
    const response = await api.post(
      "/cart",
      { userId, productId, quantity },
      {
        headers: {
          "x-auth-token": token, // 🔹 Enviando correctamente el token
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error en `createOrUpdateCart`:", error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un producto del carrito
export const removeProductFromCart = async (userId, productId, token) => {
  try {
    const response = await api.delete(`/cart/${userId}/${productId}`, {
      headers: {
        "x-auth-token": token, // 🔹 Header en minúsculas
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error en `removeProductFromCart`:", error.response?.data || error.message);
    throw error;
  }
};




























