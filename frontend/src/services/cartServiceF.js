import api from "./apiF";

export const getCart = async (userId, token) => {
  try {
    const response = await api.get(`/cart/${userId}`, {
      headers: { "x-auth-token": token }
    });

    console.log("🚀 Datos recibidos en `getCart()`:", response.data);

    if (response.data && response.data.cart && Array.isArray(response.data.cart.products)) {
      return response.data.cart;
    } else {
      console.warn("⚠️ `getCart()` no devolvió un carrito válido.");
      return { products: [] };
    }
  } catch (error) {
    console.error("❌ Error en `getCart()`:", error);
    return { products: [] };
  }
};

// ✅ **Corrección en `createOrUpdateCart`**
export const createOrUpdateCart = async (userId, productId, quantity, token) => {
  try {
    if (isNaN(quantity) || quantity < 1) {
      console.error("❌ Error en `createOrUpdateCart()`: Cantidad inválida:", quantity);
      return;
    }

    console.log(`📤 Enviando actualización al carrito: { userId: ${userId}, productId: ${productId}, quantity: ${quantity} }`);

    const response = await api.post(
      "/cart",
      { userId, productId, quantity },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    console.log("✅ Respuesta recibida en `createOrUpdateCart()`:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en `createOrUpdateCart()`: ", error.response?.data || error.message);
    throw error;
  }
};

// ✅ **Corrección en `removeProductFromCart`**
export const removeProductFromCart = async (userId, productId, token) => {
  try {
    console.log(`🗑 Eliminando producto ${productId} del carrito de usuario ${userId}`);

    const response = await api.delete(`/cart/${userId}/${productId}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    console.log("✅ Producto eliminado correctamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en `removeProductFromCart()`:", error.response?.data || error.message);
    throw error;
  }
};

// frontend/services/cartServiceF.js
export const clearCartFromBackend = async (userId, token) => {
  try {
    console.log(`🗑 Eliminando todo el carrito del usuario ${userId}`);

    const response = await api.delete(`/cart/${userId}`, {
      headers: { "x-auth-token": token },
    });

    console.log("✅ Carrito eliminado correctamente:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error en `clearCartFromBackend()`:", error.response?.data || error.message);
    throw error;
  }
};






























